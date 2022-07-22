import { Router } from 'express';
import MessageController from '../controllers/MessagesController';

const router = Router();

router.post('/send-message', MessageController.sendMessage);

export default router;