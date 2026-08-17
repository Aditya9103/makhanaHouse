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
    minOrderAmount: {
        type: String, // e.g. "₹999"
        required: [true, 'Please provide a minimum order text'],
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
