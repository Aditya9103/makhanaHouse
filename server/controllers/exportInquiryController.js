import ExportInquiry from '../models/ExportInquiry.js';
import sendEmail from '../utils/emailService.js';
import { getExportInquiryStatusEmailTemplate } from '../utils/emailTemplates.js';

// @desc    Create new export inquiry
// @route   POST /api/export
// @access  Public
export const createExportInquiry = async (req, res) => {
    try {
        const {
            fullName,
            companyName,
            email,
            phone,
            targetCountry,
            productInterest,
            estimatedQuantity,
            privateLabel,
            additionalRequirements,
            specSheetUrl
        } = req.body;

        const inquiry = new ExportInquiry({
            user: req.user ? req.user._id : undefined, // Attach user if logged in
            fullName,
            companyName,
            email,
            phone,
            targetCountry,
            productInterest,
            estimatedQuantity,
            privateLabel,
            additionalRequirements,
            specSheetUrl
        });

        const createdInquiry = await inquiry.save();
        res.status(201).json(createdInquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user export inquiries
// @route   GET /api/export/myinquiries
// @access  Private
export const getMyExportInquiries = async (req, res) => {
    try {
        const inquiries = await ExportInquiry.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all export inquiries (Admin)
// @route   GET /api/export
// @access  Private/Admin
export const getExportInquiries = async (req, res) => {
    try {
        const inquiries = await ExportInquiry.find({}).sort({ createdAt: -1 }).populate('user', 'name email');
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update export inquiry status (Admin)
// @route   PUT /api/export/:id/status
// @access  Private/Admin
export const updateExportInquiryStatus = async (req, res) => {
    try {
        const { status, customMessage } = req.body;
        
        const inquiry = await ExportInquiry.findById(req.params.id);

        if (inquiry) {
            inquiry.status = status;
            const updatedInquiry = await inquiry.save();

            // Send notification email
            if (inquiry.email) {
                const emailHtml = getExportInquiryStatusEmailTemplate(updatedInquiry, customMessage);
                await sendEmail({
                    email: inquiry.email,
                    subject: `Update on your Export Inquiry #${inquiry._id.toString().substring(18)}`,
                    html: emailHtml
                });
            }

            res.json(updatedInquiry);
        } else {
            res.status(404);
            throw new Error('Inquiry not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
