import mongoose from 'mongoose';

const storeConfigSchema = new mongoose.Schema({
    freeShippingThreshold: {
        type: Number,
        required: true,
        default: 999
    },
    standardShippingCharge: {
        type: Number,
        required: true,
        default: 50
    },
    expressShippingChargeBase: {
        type: Number,
        required: true,
        default: 149
    },
    expressShippingChargeDiscounted: {
        type: Number,
        required: true,
        default: 99
    }
}, {
    timestamps: true
});

const StoreConfig = mongoose.model('StoreConfig', storeConfigSchema);

export default StoreConfig;
