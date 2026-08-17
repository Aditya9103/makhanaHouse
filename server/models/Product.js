import mongoose from 'mongoose';

const variationSchema = mongoose.Schema({
    weight: { type: String, required: true }, // e.g., '250g', '500g', '1kg'
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true, default: 0 },
});

const nutritionalInfoSchema = mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
});

const badgeSchema = mongoose.Schema({
    icon: { type: String, required: true },
    label: { type: String, required: true },
});

const highlightSchema = mongoose.Schema({
    icon: { type: String, required: true },
    label: { type: String, required: true },
});

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        images: [
            {
                type: String,
                required: true,
            },
        ],
        brand: {
            type: String,
            required: true,
            default: 'Makhana House',
        },
        category: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
        },
        badge: {
            type: String,
        },
        description: [
            {
                type: String,
            }
        ],
        ingredients: {
            type: String,
        },
        shelfLife: {
            type: String,
        },
        nutritionalInfo: [nutritionalInfoSchema],
        variations: [variationSchema],
        badges: [badgeSchema],
        highlights: [highlightSchema],
        isFeatured: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
