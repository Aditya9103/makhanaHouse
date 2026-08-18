import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['brochure', 'spec_sheet', 'invoice', 'other'],
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Document = mongoose.model('Document', documentSchema);
export default Document;
