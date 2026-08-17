import mongoose from 'mongoose';

const exportInquirySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false, // Optional if guest submits
    },
    fullName: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    targetCountry: {
        type: String,
        required: true,
    },
    productInterest: {
        type: String,
        required: true,
    },
    estimatedQuantity: {
        type: String,
        required: true,
    },
    privateLabel: {
        type: Boolean,
        default: false,
    },
    additionalRequirements: {
        type: String,
    },
    specSheetUrl: {
        type: String, // Store S3 URL if uploaded
    },
    status: {
        type: String,
        enum: ['Pending', 'Reviewed', 'Contacted', 'Closed'],
        default: 'Pending',
    }
}, {
    timestamps: true,
});

const ExportInquiry = mongoose.model('ExportInquiry', exportInquirySchema);

export default ExportInquiry;
