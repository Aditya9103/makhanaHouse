import express from 'express';
import {
    getUserCart,
    updateUserCart,
    getUserWishlist,
    toggleWishlistItem,
    getUserAddresses,
    updateUserAddresses,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/profile/cart')
    .get(protect, getUserCart)
    .put(protect, updateUserCart);

router.route('/profile/wishlist')
    .get(protect, getUserWishlist)
    .put(protect, toggleWishlistItem);

router.route('/profile/addresses')
    .get(protect, getUserAddresses)
    .put(protect, updateUserAddresses);

export default router;
