import express from 'express';
import multer from 'multer';
import { uploadFileToS3 } from '../utils/uploadS3.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Configure multer to use memory storage for images
const storage = multer.memoryStorage();
const uploadImage = multer({
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

// Configure multer for videos (10MB limit)
const uploadVideo = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(mp4|webm|mov)$/)) {
            return cb(new Error('Please upload a valid video file (mp4, webm, mov) under 10MB'));
        }
        cb(undefined, true);
    }
});

// @desc    Upload file to S3
// @route   POST /api/upload
// @access  Private
router.post('/', protect, uploadImage.single('file'), async (req, res) => {
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

// @desc    Upload video to S3
// @route   POST /api/upload/video
// @access  Private
router.post('/video', protect, uploadVideo.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No video uploaded' });
        }

        const folder = req.body.folder || 'reels';

        const url = await uploadFileToS3(
            req.file.buffer,
            req.file.originalname,
            req.file.mimetype,
            folder
        );

        res.json({
            message: 'Video uploaded successfully',
            url,
        });
    } catch (error) {
        console.error('Video Upload Error:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
