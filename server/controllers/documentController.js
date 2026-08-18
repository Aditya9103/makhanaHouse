import Document from '../models/Document.js';

// @desc    Get all documents
// @route   GET /api/documents
// @access  Public
export const getDocuments = async (req, res) => {
    const documents = await Document.find({}).sort({ createdAt: -1 });
    res.json(documents);
};

// @desc    Add a document
// @route   POST /api/documents
// @access  Private/Admin
export const addDocument = async (req, res) => {
    const { name, type, url } = req.body;

    const document = new Document({
        name,
        type,
        url
    });

    const createdDocument = await document.save();
    res.status(201).json(createdDocument);
};

// @desc    Delete a document
// @route   DELETE /api/documents/:id
// @access  Private/Admin
export const deleteDocument = async (req, res) => {
    const document = await Document.findById(req.params.id);

    if (document) {
        await Document.deleteOne({ _id: document._id });
        res.json({ message: 'Document removed' });
    } else {
        res.status(404);
        throw new Error('Document not found');
    }
};
