import Product from '../models/Product.js';
import Order from '../models/Order.js';

// @desc    Fetch dynamic filter options
// @route   GET /api/products/filters
// @access  Public
const getProductFilters = async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        const flavors = await Product.distinct('tag');
        const badges = await Product.distinct('badges.label');
        const highlights = await Product.distinct('highlights.label');
        const dietary = [...new Set([...badges, ...highlights])].filter(Boolean);
        const packSizes = await Product.distinct('variations.weight');

        res.json({
            categories: categories.filter(Boolean),
            flavors: flavors.filter(Boolean),
            dietary,
            packSizes: packSizes.filter(Boolean),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Failed to fetch filters' });
    }
};

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        // You can add more filters here (e.g., category, price range)
        const filter = { ...keyword };

        // Category filtering (supports multiple via categories, or single via category)
        if (req.query.categories) {
            const categories = req.query.categories.split(',');
            if (!categories.includes('All Products') && categories.length > 0) {
                filter.category = { $in: categories };
            }
        } else if (req.query.category && req.query.category !== 'All Products') {
            filter.category = req.query.category;
        }

        // Flavor/Tag filtering
        if (req.query.flavors) {
            filter.tag = { $in: req.query.flavors.split(',') };
        }

        // Dietary filtering (badges or highlights)
        if (req.query.dietary) {
            const dietary = req.query.dietary.split(',');
            if (!filter.$and) filter.$and = [];
            filter.$and.push({
                $or: [
                    { 'badges.label': { $in: dietary } },
                    { 'highlights.label': { $in: dietary } }
                ]
            });
        }

        // Pack Size filtering
        if (req.query.packSizes) {
            filter['variations.weight'] = { $in: req.query.packSizes.split(',') };
        }

        // Availability filtering
        if (req.query.availability === 'true') {
            filter['variations.countInStock'] = { $gt: 0 };
        }

        // Rating filtering
        if (req.query.rating) {
            filter.rating = { $gte: Number(req.query.rating) };
        }

        // Price Filtering
        const minPrice = Number(req.query.minPrice) || 0;
        const maxPrice = Number(req.query.maxPrice) || Infinity;
        if (req.query.minPrice || req.query.maxPrice) {
            filter['variations.price'] = { $gte: minPrice, $lte: maxPrice };
        }

        // Sorting
        let sortOption = { createdAt: -1 }; // default: newest
        if (req.query.sort) {
            switch (req.query.sort) {
                case 'price_asc':
                    sortOption = { 'variations.price': 1 };
                    break;
                case 'price_desc':
                    sortOption = { 'variations.price': -1 };
                    break;
                case 'rating':
                    sortOption = { rating: -1 };
                    break;
                case 'featured':
                    sortOption = { isFeatured: -1, createdAt: -1 };
                    break;
            }
        }

        const products = await Product.find(filter).sort(sortOption);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Failed to fetch products' });
    }
};

// @desc    Fetch single product by ID or Slug
// @route   GET /api/products/:idOrSlug
// @access  Public
const getProductById = async (req, res) => {
    try {
        const { idOrSlug } = req.params;
        let product;

        // Check if it's a valid ObjectId
        if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
            product = await Product.findById(idOrSlug);
        } else {
            product = await Product.findOne({ slug: idOrSlug });
        }

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Failed to fetch product' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const {
            name,
            slug,
            images,
            brand,
            category,
            description,
            ingredients,
            shelfLife,
            nutritionalInfo,
            variations,
            isFeatured,
            tag,
            badge,
            badges,
            highlights,
            video
        } = req.body;

        const product = new Product({
            name,
            slug,
            user: req.user._id,
            images: images && images.length > 0 ? images : ['/images/sample.jpg'], // fallback
            brand,
            category,
            description,
            ingredients,
            shelfLife,
            nutritionalInfo,
            variations: variations || [],
            badges: badges || [],
            highlights: highlights || [],
            tag,
            badge,
            isFeatured: isFeatured || false,
            video,
            numReviews: 0,
            rating: 0,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: error.message || 'Invalid product data' });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const {
            name,
            slug,
            images,
            brand,
            category,
            description,
            ingredients,
            shelfLife,
            nutritionalInfo,
            variations,
            isFeatured,
            tag,
            badge,
            badges,
            highlights,
            video,
            views
        } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.slug = slug || product.slug;
            product.images = images || product.images;
            product.brand = brand || product.brand;
            product.category = category || product.category;
            product.description = description || product.description;
            product.ingredients = ingredients !== undefined ? ingredients : product.ingredients;
            product.shelfLife = shelfLife !== undefined ? shelfLife : product.shelfLife;
            product.nutritionalInfo = nutritionalInfo || product.nutritionalInfo;
            product.variations = variations || product.variations;
            product.badges = badges || product.badges;
            product.highlights = highlights || product.highlights;
            product.tag = tag !== undefined ? tag : product.tag;
            product.badge = badge !== undefined ? badge : product.badge;
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.video = video !== undefined ? video : product.video;
            product.views = views !== undefined ? Number(views) : product.views;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message || 'Failed to update product' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await Product.deleteOne({ _id: product._id });
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Failed to delete product' });
    }
};

// @desc    Get all reviews across all products
// @route   GET /api/products/reviews/all
// @access  Private/Admin
const getAllReviews = async (req, res) => {
    try {
        // Fetch all products that have at least one review
        const products = await Product.find({ 'reviews.0': { $exists: true } }).select('name reviews');

        let allReviews = [];
        products.forEach(product => {
            product.reviews.forEach(review => {
                allReviews.push({
                    _id: review._id,
                    productId: product._id,
                    productName: product.name,
                    userName: review.name,
                    userId: review.user,
                    rating: review.rating,
                    comment: review.comment,
                    image: review.image,
                    isApproved: review.isApproved,
                    createdAt: review.createdAt
                });
            });
        });

        // Sort newest first
        allReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json(allReviews);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
    try {
        const { rating, comment, image } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            // 1. Check if user already reviewed
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                res.status(400);
                throw new Error('Product already reviewed');
            }

            // 2. Check if user actually ordered and received this product
            const orders = await Order.find({ user: req.user._id, status: 'Delivered' });

            // Look for this product in their delivered orders
            let hasBought = false;
            for (const order of orders) {
                const boughtItem = order.orderItems.find(item => item.product.toString() === req.params.id.toString());
                if (boughtItem) {
                    hasBought = true;
                    break;
                }
            }

            if (!hasBought) {
                res.status(403);
                throw new Error('You can only review products after they have been successfully delivered to you.');
            }

            // 3. Create review (default unapproved)
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                image,
                user: req.user._id,
                isApproved: false
            };

            product.reviews.push(review);
            await product.save();
            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Update a review
// @route   PUT /api/products/:id/reviews/:reviewId
// @access  Private
const updateProductReview = async (req, res) => {
    try {
        const { rating, comment, image } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            const review = product.reviews.find(
                (r) => r._id.toString() === req.params.reviewId.toString()
            );

            if (review) {
                // Ensure only the review author can update it
                if (review.user.toString() !== req.user._id.toString()) {
                    res.status(401);
                    throw new Error('User not authorized to update this review');
                }

                review.rating = Number(rating) || review.rating;
                review.comment = comment || review.comment;
                review.image = image !== undefined ? image : review.image;
                
                review.isApproved = false; // Require re-approval after edit

                // Recalculate rating if it was approved
                const approvedReviews = product.reviews.filter(r => r.isApproved);
                product.numReviews = approvedReviews.length;
                product.rating = approvedReviews.length > 0
                    ? approvedReviews.reduce((acc, item) => item.rating + acc, 0) / approvedReviews.length
                    : 0;

                await product.save();
                res.json({ message: 'Review updated and pending approval' });
            } else {
                res.status(404);
                throw new Error('Review not found');
            }
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Approve a review
// @route   PUT /api/products/:id/reviews/:reviewId/approve
// @access  Private/Admin
const approveProductReview = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            const review = product.reviews.find(
                (r) => r._id.toString() === req.params.reviewId.toString()
            );

            if (review) {
                review.isApproved = true;

                const approvedReviews = product.reviews.filter(r => r.isApproved);
                product.numReviews = approvedReviews.length;
                product.rating = approvedReviews.length > 0
                    ? approvedReviews.reduce((acc, item) => item.rating + acc, 0) / approvedReviews.length
                    : 0;

                await product.save();
                res.json({ message: 'Review approved' });
            } else {
                res.status(404);
                throw new Error('Review not found');
            }
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Delete a review
// @route   DELETE /api/products/:id/reviews/:reviewId
// @access  Private/Admin
const deleteProductReview = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            const reviewIndex = product.reviews.findIndex(
                (r) => r._id.toString() === req.params.reviewId.toString()
            );

            if (reviewIndex !== -1) {
                product.reviews.splice(reviewIndex, 1);

                const approvedReviews = product.reviews.filter(r => r.isApproved);
                product.numReviews = approvedReviews.length;
                product.rating = approvedReviews.length > 0
                    ? approvedReviews.reduce((acc, item) => item.rating + acc, 0) / approvedReviews.length
                    : 0;

                await product.save();
                res.json({ message: 'Review removed' });
            } else {
                res.status(404);
                throw new Error('Review not found');
            }
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Increment product view count
// @route   PUT /api/products/:id/view
// @access  Public
const incrementProductView = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.views = (product.views || 0) + 1;
            await product.save();
            res.json({ views: product.views });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export {
    getProductFilters,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    updateProductReview,
    deleteProductReview,
    approveProductReview,
    getAllReviews,
    incrementProductView
};
