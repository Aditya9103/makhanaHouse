import Product from '../models/Product.js';

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
        
        if (req.query.category && req.query.category !== 'All Products') {
            filter.category = req.query.category;
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
            highlights
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
            highlights
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

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
