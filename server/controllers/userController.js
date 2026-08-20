import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Get user cart
// @route   GET /api/users/profile/cart
// @access  Private
export const getUserCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate(
                'cart.product',
                'name variations images slug'
            );

        if (user) {
            res.json(user.cart || []);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error('Get user cart error:', error);

        res.status(500).json({
            message: error.message
        });
    }
};

// @desc    Update user cart
// @route   PUT /api/users/profile/cart
// @access  Private
export const updateUserCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            // Expecting an array of:
            // { product: id, quantity, size }
            await User.updateOne(
                { _id: req.user._id },
                { $set: { cart: req.body.cart || [] } }
            );

            const updatedUser = await User.findById(req.user._id)
                .populate(
                    'cart.product',
                    'name variations images slug'
                );

            res.json(updatedUser.cart || []);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error('Update user cart error:', error);

        res.status(500).json({
            message: error.message
        });
    }
};

// @desc    Get user wishlist
// @route   GET /api/users/profile/wishlist
// @access  Private
export const getUserWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate(
                'wishlist',
                'name variations images slug'
            );

        if (user) {
            // Remove any null products that may exist
            // because the referenced product was deleted.
            const wishlist = (user.wishlist || []).filter(
                item => item != null
            );

            res.json(wishlist);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error('Get user wishlist error:', error);

        res.status(500).json({
            message: error.message
        });
    }
};

// @desc    Toggle item in wishlist
// @route   PUT /api/users/profile/wishlist
// @access  Private
export const toggleWishlistItem = async (req, res) => {
    try {
        const { productId } = req.body;

        // Validate productId
        if (!productId) {
            return res.status(400).json({
                message: 'Product ID is required'
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // IMPORTANT:
        // Remove null/undefined values before using .toString()
        // This fixes:
        // "Cannot read properties of null (reading 'toString')"
        user.wishlist = (user.wishlist || []).filter(
            id => id != null
        );

        // Check whether product is already in wishlist
        const alreadyInWishlist = user.wishlist.find(
            id => id.toString() === productId
        );

        if (alreadyInWishlist) {
            // Product already exists -> REMOVE it
            user.wishlist = user.wishlist.filter(
                id => id.toString() !== productId
            );
        } else {
            // Product doesn't exist -> ADD it
            user.wishlist.push(productId);
        }

        await User.updateOne(
            { _id: req.user._id },
            { $set: { wishlist: user.wishlist } }
        );

        // Get updated wishlist with product details
        const updatedUser = await User.findById(req.user._id)
            .populate(
                'wishlist',
                'name variations images slug'
            );

        // Remove any null populated products
        const updatedWishlist = (
            updatedUser.wishlist || []
        ).filter(item => item != null);

        res.json(updatedWishlist);

    } catch (error) {
        console.error('Toggle wishlist error:', error);

        res.status(500).json({
            message: error.message
        });
    }
};

// @desc    Get user addresses
// @route   GET /api/users/profile/addresses
// @access  Private
export const getUserAddresses = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json(user.addresses || []);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error('Get user addresses error:', error);

        res.status(500).json({
            message: error.message
        });
    }
};

// @desc    Update user addresses
// @route   PUT /api/users/profile/addresses
// @access  Private
export const updateUserAddresses = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            // Expecting an array of address objects
            user.addresses = req.body.addresses || [];

            await user.save();

            res.json(user.addresses);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error('Update user addresses error:', error);

        res.status(500).json({
            message: error.message
        });
    }
};