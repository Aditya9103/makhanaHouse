import express from 'express';
import multer from 'multer';
import { uploadFileToS3 } from '../utils/uploadS3.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp|pdf)$/)) {
            return cb(new Error('Please upload a valid image or PDF document'));
        }
        cb(undefined, true);
    }
});

// @desc    Upload file to S3
// @route   POST /api/upload
// @access  Private
router.post('/', protect, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const folder = req.body.folder || 'general'; // Client can specify folder (e.g. 'avatars' or 'spec-sheets')
        
        const url = await uploadFileToS3(
            req.file.buffer,
            req.file.originalname,
            req.file.mimetype,
            folder
        );

        res.json({
            message: 'File uploaded successfully',
            url,
        });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
