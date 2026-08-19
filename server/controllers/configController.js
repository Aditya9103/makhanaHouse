import StoreConfig from '../models/StoreConfig.js';

// @desc    Get store config
// @route   GET /api/config
// @access  Public
const getStoreConfig = async (req, res) => {
    try {
        let config = await StoreConfig.findOne({});

        if (!config) {
            // Create default config if it doesn't exist
            config = await StoreConfig.create({});
        }

        res.json(config);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update store config
// @route   PUT /api/config
// @access  Private/Admin
const updateStoreConfig = async (req, res) => {
    try {
        let config = await StoreConfig.findOne({});

        if (!config) {
            config = new StoreConfig({});
        }

        config.freeShippingThreshold = req.body.freeShippingThreshold || config.freeShippingThreshold;
        config.standardShippingCharge = req.body.standardShippingCharge ?? config.standardShippingCharge;
        config.expressShippingChargeBase = req.body.expressShippingChargeBase ?? config.expressShippingChargeBase;
        config.expressShippingChargeDiscounted = req.body.expressShippingChargeDiscounted ?? config.expressShippingChargeDiscounted;

        const updatedConfig = await config.save();
        res.json(updatedConfig);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getStoreConfig, updateStoreConfig };
