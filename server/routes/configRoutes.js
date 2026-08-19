import express from 'express';
import { getStoreConfig, updateStoreConfig } from '../controllers/configController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getStoreConfig)
    .put(protect, admin, updateStoreConfig);

export default router;
