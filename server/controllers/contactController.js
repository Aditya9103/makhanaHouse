import ContactMessage from '../models/ContactMessage.js';

// @desc    Submit a new contact message
// @route   POST /api/contact
// @access  Public
export const submitMessage = async (req, res) => {
    try {
        const { name, company, email, phone, subject, message } = req.body;

        if (!name || !company || !email || !phone || !subject || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const contactMessage = new ContactMessage({
            name,
            company,
            email,
            phone,
            subject,
            message,
        });

        const createdMessage = await contactMessage.save();
        res.status(201).json(createdMessage);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Failed to submit message' });
    }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
export const getMessages = async (req, res) => {
    try {
        const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Failed to fetch messages' });
    }
};

// @desc    Update message status
// @route   PUT /api/contact/:id/status
// @access  Private/Admin
export const updateMessageStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const message = await ContactMessage.findById(req.params.id);

        if (message) {
            message.status = status || message.status;
            const updatedMessage = await message.save();
            res.json(updatedMessage);
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Failed to update status' });
    }
};

// @desc    Delete a message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteMessage = async (req, res) => {
    try {
        const message = await ContactMessage.findById(req.params.id);

        if (message) {
            await ContactMessage.deleteOne({ _id: message._id });
            res.json({ message: 'Message removed' });
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Failed to delete message' });
    }
};
