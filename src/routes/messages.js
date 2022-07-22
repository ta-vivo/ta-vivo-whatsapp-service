import { Router } from 'express';
import MessageController from '../controllers/MessagesController';
import { verifyToken } from '../middlewares/Auth';

const router = Router();

router.post('/send-message', verifyToken, MessageController.sendMessage);

export default router;