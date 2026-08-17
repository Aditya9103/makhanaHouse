import mongoose from 'mongoose';

const rewardHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    points: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['earned', 'redeemed'],
        required: true,
    }
}, {
    timestamps: true
});

const RewardHistory = mongoose.model('RewardHistory', rewardHistorySchema);
export default RewardHistory;
