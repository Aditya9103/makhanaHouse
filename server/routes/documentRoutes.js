import express from 'express';
import { getDocuments, addDocument, deleteDocument } from '../controllers/documentController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getDocuments)
    .post(protect, admin, addDocument);

router.route('/:id')
    .delete(protect, admin, deleteDocument);

export default router;
