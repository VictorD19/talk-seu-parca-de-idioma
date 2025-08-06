import { Request, Response } from 'express';
import UserRepository from '../../infrastructure/repository/user.repository';
import MessageRepository from '../../infrastructure/repository/message.repository';
import OpenAIService from '../../infrastructure/services/openAI.service';
import WhatsappService from '../../infrastructure/services/whatsapp.service';
import { IReceivedWebhookMessage } from '../../domain/objs/receivedWebhookMessage';
import { UserCreation } from '../../domain/entities/user';
import { PhoneValidator } from '../../shared/utils/phonevalidator';
import { AppError } from "../../shared/errors/appErros"
import SaveMessage from 'src/application/useCase/message/saveMessage';

export class WebhookController {
    private _userRepository;
    private _messageRepository;
    private _openAIService;
    private _whatsappService;
    private _saveMessage;
    constructor(
    ) {
        this._userRepository = new UserRepository();
        this._messageRepository = new MessageRepository();
        this._openAIService = new OpenAIService();
        this._whatsappService = new WhatsappService();
        this._saveMessage = new SaveMessage(this._messageRepository, this._userRepository);
    }
    async handle(req: Request, res: Response) {

        try {
            let receivedMessage: IReceivedWebhookMessage = req.body.data
            let telefone = receivedMessage.key.participant ? receivedMessage.key.participant.split('@')[0] : receivedMessage.key.remoteJid.split('@')[0]
            let message = receivedMessage.message.conversation || "";
            let typeMessage = receivedMessage.messageType
            let isValidPhone = PhoneValidator(telefone);
            if (!isValidPhone)
                throw new AppError("Formato de telefone não valido ")

            let user = await this._userRepository.findByPhone(telefone);
            if (!user) {
                let newUser: UserCreation = {
                    name: receivedMessage.pushName || 'Desconhecido',
                    telefone: telefone,
                    type_message_preference: "text"
                }
                user = await this._userRepository.create(newUser);
            }
            if (user.limitedMessage == 0 && !user.isPremium) {
                await this._whatsappService.sendMessage(user.telefone, "Seu teste gratuito chegou a fim, Deseja aquirid a versão full ?");
                return
            }
            console.log(user,"controa")
            await this._saveMessage.store('user', user, message, typeMessage)

            let resposta = await this._openAIService.processMessage(message, user)

            setTimeout(async () => {
                await this._whatsappService.sendMessage(user.telefone, resposta);
                await this._saveMessage.store('agent', user, resposta, "conversation")

            }, 1000)

            return res.status(200).json({ success: true });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.log(error)
            return res.status(400).json({ error: 'Ocorreu um erro ao processar a requisição' });
        }

    }
}