import { Router } from 'express';
import MessageController from '../controllers/MessagesController';
import { verifyToken } from '../middlewares/Auth';

const router = Router();

router.post('/send-message', verifyToken, MessageController.sendMessage);
router.post('/send-message-template', verifyToken, MessageController.sendMessageTemplate);

export default router;