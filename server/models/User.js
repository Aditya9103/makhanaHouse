import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
    },
    phone: {
        type: String,
        default: '',
    },
    avatar: {
        type: String,
        default: '',
    },
    location: {
        type: String,
        default: '',
    },
    customerId: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    rewardsPoints: {
        type: Number,
        default: 0
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ],
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            size: {
                type: String,
                default: '250g',
            }
        }
    ],
    addresses: [
        {
            type: {
                type: String,
                required: true,
                default: 'Home',
            },
            name: { type: String, required: true },
            line1: { type: String, required: true },
            line2: { type: String },
            phone: { type: String, required: true },
            isDefault: { type: Boolean, default: false },
        }
    ]
}, {
    timestamps: true,
});

// Generate customerId before validating and saving
userSchema.pre('validate', function () {
    if (!this.customerId) {
        // Generate random 6 digit number and prefix with MH
        const randomId = Math.floor(100000 + Math.random() * 900000);
        this.customerId = `MH${randomId}`;
    }
});

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
