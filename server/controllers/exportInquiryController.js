import ExportInquiry from '../models/ExportInquiry.js';

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
        const inquiries = await ExportInquiry.find({}).sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
