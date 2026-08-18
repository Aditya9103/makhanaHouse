import NewsletterSubscriber from '../models/NewsletterSubscriber.js';

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
// @access  Public
export const subscribeNewsletter = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error('Please provide an email address');
    }

    const subscriberExists = await NewsletterSubscriber.findOne({ email });

    if (subscriberExists) {
        if (subscriberExists.status === 'unsubscribed') {
            subscriberExists.status = 'subscribed';
            await subscriberExists.save();
            return res.status(200).json({ message: 'Successfully resubscribed to the newsletter' });
        }
        res.status(400);
        throw new Error('Email is already subscribed');
    }

    const subscriber = await NewsletterSubscriber.create({
        email
    });

    if (subscriber) {
        res.status(201).json({ message: 'Successfully subscribed to the newsletter' });
    } else {
        res.status(400);
        throw new Error('Invalid subscriber data');
    }
};

// @desc    Get all subscribers
// @route   GET /api/newsletter
// @access  Private/Admin
export const getSubscribers = async (req, res) => {
    const subscribers = await NewsletterSubscriber.find({}).sort({ createdAt: -1 });
    res.json(subscribers);
};

// @desc    Update subscriber status
// @route   PUT /api/newsletter/:id/status
// @access  Private/Admin
export const updateSubscriberStatus = async (req, res) => {
    const { status } = req.body;
    const subscriber = await NewsletterSubscriber.findById(req.params.id);

    if (subscriber) {
        subscriber.status = status;
        const updatedSubscriber = await subscriber.save();
        res.json(updatedSubscriber);
    } else {
        res.status(404);
        throw new Error('Subscriber not found');
    }
};

// @desc    Delete subscriber
// @route   DELETE /api/newsletter/:id
// @access  Private/Admin
export const deleteSubscriber = async (req, res) => {
    const subscriber = await NewsletterSubscriber.findById(req.params.id);

    if (subscriber) {
        await NewsletterSubscriber.deleteOne({ _id: subscriber._id });
        res.json({ message: 'Subscriber removed' });
    } else {
        res.status(404);
        throw new Error('Subscriber not found');
    }
};
