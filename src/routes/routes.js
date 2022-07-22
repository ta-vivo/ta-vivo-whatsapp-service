import { Router } from 'express';
import Messages from './messages';

const router = Router();

// routes
router.use('/messages', Messages);

export default router;