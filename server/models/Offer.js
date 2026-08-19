import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Please provide an offer code'],
        unique: true,
        uppercase: true,
    },
    title: {
        type: String,
        required: [true, 'Please provide an offer title'],
    },
    expiryDate: {
        type: String, // e.g. "Valid till 31 Dec 2024" or a real Date
        required: [true, 'Please provide an expiry text'],
    },
    minOrderValue: {
        type: Number, // strict mathematical minimum order value
        default: 0,
    },
    discountType: {
        type: String,
        enum: ['percentage', 'flat', 'fixed'],
        default: 'percentage',
    },
    discountValue: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    colorTheme: {
        type: String,
        enum: ['Gold', 'Purple', 'Emerald'],
        default: 'Gold',
    }
}, {
    timestamps: true
});

const Offer = mongoose.model('Offer', offerSchema);
export default Offer;
