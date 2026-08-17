import express from 'express';
const router = express.Router();
import {
    getProductFilters,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    updateProductReview,
    deleteProductReview,
    approveProductReview,
    getAllReviews
} from '../controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct);

router.route('/filters')
    .get(getProductFilters);

router.route('/reviews/all')
    .get(protect, admin, getAllReviews);

router.route('/:idOrSlug')
    .get(getProductById);

router.route('/:id')
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

router.route('/:id/reviews')
    .post(protect, createProductReview);

router.route('/:id/reviews/:reviewId')
    .put(protect, updateProductReview)
    .delete(protect, admin, deleteProductReview);

router.route('/:id/reviews/:reviewId/approve')
    .put(protect, admin, approveProductReview);

export default router;
