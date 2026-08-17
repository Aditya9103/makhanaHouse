import Order from '../models/Order.js';
import RewardHistory from '../models/RewardHistory.js';
import sendEmail from '../utils/emailService.js';
import { getOrderStatusEmailTemplate } from '../utils/emailTemplates.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        } else {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            });

            const createdOrder = await order.save();

            // Clear the user's cart after successful order creation
            req.user.cart = [];
            
            // Assign reward points (e.g. 10 points for every 100 spent)
            const earnedPoints = Math.floor(totalPrice / 100) * 10;
            req.user.rewardsPoints = (req.user.rewardsPoints || 0) + earnedPoints;
            
            await req.user.save();

            // Create reward history entry
            if (earnedPoints > 0) {
                await RewardHistory.create({
                    user: req.user._id,
                    description: `Order #${createdOrder.orderId || createdOrder._id}`,
                    points: earnedPoints,
                    type: 'earned'
                });
            }

            res.status(201).json(createdOrder);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            // Check if the order belongs to the user or if the user is an admin
            if (order.user._id.toString() === req.user._id.toString() || req.user.role === 'admin') {
                res.json(order);
            } else {
                res.status(403).json({ message: 'Not authorized to view this order' });
            }
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer ? req.body.payer.email_address : '',
            };

            const updatedOrder = await order.save();
            
            // Add rewards points (1 point per ₹100 spent)
            if (req.user) {
                const pointsEarned = Math.floor(order.totalPrice / 100);
                req.user.rewardsPoints = (req.user.rewardsPoints || 0) + pointsEarned;
                await req.user.save();
            }

            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name email').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            order.status = req.body.status || order.status;
            
            if (req.body.trackingNumber) {
                order.trackingNumber = req.body.trackingNumber;
            }
            if (req.body.courierName) {
                order.courierName = req.body.courierName;
            }

            if (req.body.status === 'Delivered') {
                order.isDelivered = true;
                order.deliveredAt = Date.now();
            } else if (req.body.status === 'Processing' || req.body.status === 'Shipped' || req.body.status === 'Cancelled') {
                order.isDelivered = false;
            }

            const updatedOrder = await order.save();

            // Send Email Notification
            if (order.user && order.user.email) {
                const subject = `Your Makhana House Order ${order.orderId || order._id} is now ${order.status}`;
                const htmlContent = getOrderStatusEmailTemplate(order);

                await sendEmail({
                    email: order.user.email,
                    subject: subject,
                    html: htmlContent,
                });
            }

            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
