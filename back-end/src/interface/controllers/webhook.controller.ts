import { Request, Response } from 'express';
import UserRepository from '../../infrastructure/repository/user.repository';
import MessageRepository from '../../infrastructure/repository/message.repository';
import OpenAIService from '../../infrastructure/services/openAI.service';
import WhatsappService from '../../infrastructure/services/whatsapp.service';
import { IReceivedWebhookMessage } from '../../domain/objs/receivedWebhookMessage';
import { User, UserCreation } from '../../domain/entities/user';
import { Message, MessageCreation } from '../../domain/entities/message';

export class WebhookController {
    constructor(
        private userRepository: UserRepository,
        private messageRepository: MessageRepository,
        private openAIService: OpenAIService,
        private whatsappService: WhatsappService
    ) { }

    async handle(req: Request, res: Response) {
        const { from, message, ...data } = req.body;

        try {
            let receivedMessage: IReceivedWebhookMessage = req.body
            console.log('Received webhook:', req.body.data);
            
            let user = await this.userRepository.findByPhone(receivedMessage.key.remoteJid.split('@')[0]);

            if (!user) {
                let newUser: UserCreation = {
                    nome: receivedMessage.pushName || 'Desconhecido',
                    telefone: receivedMessage.key.remoteJid.split('@')[0],
                    genero_agente: 'masculino',
                    linguagem_preferida: 'informal',
                    tipo_mensagem_preferida: 'texto',
                    nome_agente: 'Talk',
                    thread_id: "",
                    created_at: new Date(),
                    updated_at: new Date()
                }
                user = await this.userRepository.create(newUser);
            }

            // 2. Salvar mensagem recebid
            let contentMessage = receivedMessage.messageType === "conversation" ? receivedMessage.message.conversation : receivedMessage.message.base64;
            let message: MessageCreation = {
                user_id: user.id,
                sender: 'user',
                content: contentMessage,
                type: 'text',
                created_at: new Date()
            }
            await this.messageRepository.create(message);

            // // 3. Processar com OpenAI
            // const aiResponse = await this.openAIService.processMessage(
            //     user.thread_id,
            //     message
            // );

            // // 4. Salvar resposta do agente
            // await this.messageRepository.create({
            //     user_id: user.id,
            //     sender: 'agent',
            //     content: aiResponse,
            //     type: 'text'
            // });

            // // 5. Enviar resposta via WhatsApp
            // await this.whatsappService.sendMessage(from, aiResponse);

            return res.status(200).json({ success: true });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}