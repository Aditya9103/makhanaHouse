import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Get user cart
// @route   GET /api/users/profile/cart
// @access  Private
export const getUserCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart.product', 'name variations images slug');
        if (user) {
            res.json(user.cart);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user cart
// @route   PUT /api/users/profile/cart
// @access  Private
export const updateUserCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.cart = req.body.cart; // Expecting an array of {product: id, quantity, size}
            await user.save();
            const updatedUser = await User.findById(req.user._id).populate('cart.product', 'name variations images slug');
            res.json(updatedUser.cart);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user wishlist
// @route   GET /api/users/profile/wishlist
// @access  Private
export const getUserWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist', 'name variations images slug');
        if (user) {
            res.json(user.wishlist);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle item in wishlist
// @route   PUT /api/users/profile/wishlist
// @access  Private
export const toggleWishlistItem = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user._id);

        if (user) {
            const alreadyInWishlist = user.wishlist.find(id => id.toString() === productId);
            if (alreadyInWishlist) {
                user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
            } else {
                user.wishlist.push(productId);
            }
            await user.save();
            const updatedUser = await User.findById(req.user._id).populate('wishlist', 'name variations images slug');
            res.json(updatedUser.wishlist);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user addresses
// @route   GET /api/users/profile/addresses
// @access  Private
export const getUserAddresses = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            res.json(user.addresses);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user addresses (add, edit, remove handled client-side then synced)
// @route   PUT /api/users/profile/addresses
// @access  Private
export const updateUserAddresses = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.addresses = req.body.addresses;
            await user.save();
            res.json(user.addresses);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
