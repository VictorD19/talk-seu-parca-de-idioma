import { Router } from 'express';
import { WebhookController } from '../controllers/webhook.controller';
import UserRepository from '../../infrastructure/repository/user.repository';
import MessageRepository from '../../infrastructure/repository/message.repository';
import OpenAIService from '../../infrastructure/services/openAI.service';
import WhatsappService from '../../infrastructure/services/whatsapp.service';


const webhookRoutes = Router();

const webhookController = new WebhookController(
    new UserRepository(),
    new MessageRepository(),
    new OpenAIService(),
    new WhatsappService()
);

webhookRoutes.post('/webhook', async (req, res) => await webhookController.handle(req, res));
export default webhookRoutes;