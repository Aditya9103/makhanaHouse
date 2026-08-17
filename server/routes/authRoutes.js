import express from 'express';
import {
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile,
    registerAdmin,
    authAdmin
} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/admin/register', registerAdmin);
router.post('/admin/login', authAdmin);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
