import express from 'express';
import {
    getActiveOffers,
    getAllOffers,
    createOffer,
    deleteOffer,
    getMyRewardHistory,
    assignPoints
} from '../controllers/rewardController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/offers').get(getActiveOffers).post(protect, admin, createOffer);
router.route('/offers/admin').get(protect, admin, getAllOffers);
router.route('/offers/:id').delete(protect, admin, deleteOffer);

router.route('/history').get(protect, getMyRewardHistory);
router.route('/assign').post(protect, admin, assignPoints);

export default router;
