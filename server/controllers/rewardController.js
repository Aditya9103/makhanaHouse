import Offer from '../models/Offer.js';
import RewardHistory from '../models/RewardHistory.js';
import User from '../models/User.js';

// @desc    Get all active offers (Public/User)
// @route   GET /api/rewards/offers
// @access  Public
export const getActiveOffers = async (req, res) => {
    try {
        const offers = await Offer.find({ isActive: true }).sort({ createdAt: -1 });
        res.json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all offers (Admin)
// @route   GET /api/rewards/offers/admin
// @access  Private/Admin
export const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find({}).sort({ createdAt: -1 });
        res.json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new offer
// @route   POST /api/rewards/offers
// @access  Private/Admin
export const createOffer = async (req, res) => {
    const { code, title, expiryDate, minOrderAmount, isActive, colorTheme } = req.body;

    try {
        const offerExists = await Offer.findOne({ code });
        if (offerExists) {
            return res.status(400).json({ message: 'Offer code already exists' });
        }

        const offer = await Offer.create({
            code,
            title,
            expiryDate,
            minOrderAmount,
            isActive,
            colorTheme
        });

        res.status(201).json(offer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete offer
// @route   DELETE /api/rewards/offers/:id
// @access  Private/Admin
export const deleteOffer = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);
        if (offer) {
            await offer.deleteOne();
            res.json({ message: 'Offer removed' });
        } else {
            res.status(404).json({ message: 'Offer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user reward history
// @route   GET /api/rewards/history
// @access  Private
export const getMyRewardHistory = async (req, res) => {
    try {
        const history = await RewardHistory.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Manually assign points to a user
// @route   POST /api/rewards/assign
// @access  Private/Admin
export const assignPoints = async (req, res) => {
    const { userId, points, description, type } = req.body; // type can be 'earned' or 'redeemed'

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const pointsNum = Number(points);
        if (type === 'earned') {
            user.rewardsPoints += pointsNum;
        } else if (type === 'redeemed') {
            user.rewardsPoints -= pointsNum;
            if (user.rewardsPoints < 0) user.rewardsPoints = 0;
        }

        await user.save();

        const history = await RewardHistory.create({
            user: userId,
            description,
            points: pointsNum,
            type
        });

        res.status(201).json({ user, history });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
