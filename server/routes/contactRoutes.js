import express from 'express';
import {
    submitMessage,
    getMessages,
    updateMessageStatus,
    deleteMessage,
} from '../controllers/contactController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(submitMessage)
    .get(protect, admin, getMessages);

router.route('/:id/status')
    .put(protect, admin, updateMessageStatus);

router.route('/:id')
    .delete(protect, admin, deleteMessage);

export default router;
