import express from 'express';
import { subscribeNewsletter, getSubscribers, updateSubscriberStatus, deleteSubscriber } from '../controllers/newsletterController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(subscribeNewsletter)
    .get(protect, admin, getSubscribers);

router.route('/:id/status')
    .put(protect, admin, updateSubscriberStatus);

router.route('/:id')
    .delete(protect, admin, deleteSubscriber);

export default router;
