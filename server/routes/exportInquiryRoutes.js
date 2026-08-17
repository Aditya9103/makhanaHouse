import express from 'express';
import {
    createExportInquiry,
    getMyExportInquiries,
    getExportInquiries,
    updateExportInquiryStatus,
} from '../controllers/exportInquiryController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Allow public to create inquiry, but optionally parse user token if present
const optionalAuth = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        return protect(req, res, next);
    }
    next();
};

router.route('/')
    .post(optionalAuth, createExportInquiry)
    .get(protect, admin, getExportInquiries);

router.route('/myinquiries')
    .get(protect, getMyExportInquiries);

router.route('/:id/status')
    .put(protect, admin, updateExportInquiryStatus);

export default router;
