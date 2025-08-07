import { Router } from 'express';
import { WebhookController } from '../controllers/webhook.controller';

const webhookRoutes = Router();

const webhookController = new WebhookController()

webhookRoutes.post('/webhook', async (req, res) => await webhookController.handle(req, res));
export default webhookRoutes;