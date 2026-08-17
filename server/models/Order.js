import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    orderItems: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            size: { type: String, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
        }
    ],
    shippingAddress: {
        type: { type: String, required: true },
        name: { type: String, required: true },
        line1: { type: String, required: true },
        line2: { type: String },
        phone: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing',
    },
    trackingNumber: {
        type: String,
    },
    courierName: {
        type: String,
    }
}, {
    timestamps: true,
});

// Auto-generate a readable order ID string like MH100245
orderSchema.pre('save', function () {
    if (this.isNew) {
        const randomId = Math.floor(100000 + Math.random() * 900000);
        this.orderId = `MH${randomId}`;
    }
});

// Need to actually add orderId to schema to save it
orderSchema.add({ orderId: { type: String, unique: true } });

const Order = mongoose.model('Order', orderSchema);

export default Order;
