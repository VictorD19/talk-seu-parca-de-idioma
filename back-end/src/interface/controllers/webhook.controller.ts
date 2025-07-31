import { Request, Response } from 'express';
import UserRepository from '../../infrastructure/repository/user.repository';
import MessageRepository from '../../infrastructure/repository/message.repository';
import OpenAIService from '../../infrastructure/services/openAI.service';
import WhatsappService from '../../infrastructure/services/whatsapp.service';
import { IReceivedWebhookMessage } from '../../domain/objs/receivedWebhookMessage';
import { UserCreation } from '../../domain/entities/user';
import { PhoneValidator } from '../../shared/utils/phonevalidator';
import { AppError } from "../../shared/errors/appErros"

export class WebhookController {
    constructor(
        private userRepository: UserRepository,
        private messageRepository: MessageRepository,
        private openAIService: OpenAIService,
        private whatsappService: WhatsappService
    ) { }

    async handle(req: Request, res: Response) {

        try {
            let receivedMessage: IReceivedWebhookMessage = req.body.data
            let telefone = receivedMessage.key.participant ? receivedMessage.key.participant.split('@')[0] : receivedMessage.key.remoteJid.split('@')[0]
            let message = receivedMessage.message.conversation || "";

            let isValidPhone = PhoneValidator(telefone);
            if (!isValidPhone)
                throw new AppError("Formato de telefone não valido ")

            let user = await this.userRepository.findByPhone(telefone);
            if (!user) {
                let newUser: UserCreation = {
                    nome: receivedMessage.pushName || 'Desconhecido',
                    telefone: telefone,
                    linguagem_preferida: 'informal',
                    tipo_mensagem_preferida: 'text'
                }
                user = await this.userRepository.create(newUser);
            }
            if (user.limitedMessage == 0 && !user.isPremium)
                return //Enviar mensagem de fluxo de pagamento

            let resposta = await this.openAIService.processMessage(user.thread_id || "", message)
            console.log(resposta, "resposta")
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