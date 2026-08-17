import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const products = [
    {
        name: 'Himalayan Pink Salt Makhana',
        slug: 'himalayan-pink-salt-makhana',
        brand: 'Makhana House',
        category: 'Roasted Makhana',
        tag: 'Healthy & Delicious',
        badge: 'Bestseller',
        description: [
            'Seasoned with pure Himalayan pink salt for a mineral-rich healthy snack.',
            'Lightly roasted, not fried',
            'No preservatives or artificial flavors',
            'Perfect for your evening tea or mid-day cravings.'
        ],
        ingredients: 'Phool Makhana (Fox Nuts), Edible Vegetable Oil, Himalayan Pink Salt',
        shelfLife: '6 Months',
        isFeatured: true,
        images: ['/makhanabowl.png', '/makhanabowl.png'],
        variations: [
            { weight: '250g', price: 299, countInStock: 50 },
            { weight: '500g', price: 549, countInStock: 25 },
            { weight: '1kg', price: 999, countInStock: 10 }
        ],
        badges: [
            { icon: 'Leaf', label: '100% Natural' },
            { icon: 'Flame', label: 'Low Calorie' }
        ],
        highlights: [
            { icon: 'BadgeCheck', label: 'Handpicked Quality' },
            { icon: 'Sparkles', label: 'Hygienically Packed' }
        ],
        nutritionalInfo: [
            { label: 'Energy', value: '380 kcal' },
            { label: 'Protein', value: '11 g' },
            { label: 'Carbs', value: '72 g' },
            { label: 'Fiber', value: '13 g' }
        ],
        numReviews: 124,
        rating: 4.8
    },
    {
        name: 'Peri Peri Spicy Makhana',
        slug: 'peri-peri-spicy-makhana',
        brand: 'Makhana House',
        category: 'Flavored Makhana',
        tag: 'Spicy & Tangy',
        badge: 'New',
        description: [
            'A fiery blend of African peri peri spices roasted to crunchy perfection.',
            'Perfect spicy kick to satisfy your junk food cravings the healthy way.',
            'Gluten-free and vegan.',
            'A hit at parties and get-togethers!'
        ],
        ingredients: 'Makhana, Peri Peri Spice Mix, Edible Oil, Salt',
        shelfLife: '6 Months',
        isFeatured: true,
        images: ['/makhanabowl.png', '/makhanabowl.png'],
        variations: [
            { weight: '250g', price: 349, countInStock: 30 },
            { weight: '500g', price: 649, countInStock: 15 }
        ],
        badges: [
            { icon: 'Flame', label: 'Spicy' },
            { icon: 'Sprout', label: 'Vegan' },
            { icon: 'WheatOff', label: 'Gluten Free' }
        ],
        highlights: [
            { icon: 'BadgeCheck', label: 'Premium Spices' },
            { icon: 'Package', label: 'Zipper Pouch' }
        ],
        nutritionalInfo: [
            { label: 'Energy', value: '395 kcal' },
            { label: 'Protein', value: '10 g' },
            { label: 'Carbs', value: '70 g' }
        ],
        numReviews: 89,
        rating: 4.6
    },
    {
        name: 'Classic Raw Phool Makhana',
        slug: 'classic-raw-phool-makhana',
        brand: 'Makhana House',
        category: 'Raw Makhana',
        tag: 'Pure & Natural',
        badge: '',
        description: [
            'Premium size, raw unroasted makhana straight from the farms of Bihar.',
            'Perfect for making curries, kheer, or roasting at home to your taste.',
            'Packed with protein, calcium, and antioxidants.',
            'Sourced directly from farmers.'
        ],
        ingredients: '100% Raw Makhana (Fox Nuts)',
        shelfLife: '12 Months',
        isFeatured: false,
        images: ['/makhanabowl.png'],
        variations: [
            { weight: '500g', price: 599, countInStock: 100 },
            { weight: '1kg', price: 1150, countInStock: 50 },
            { weight: '5kg', price: 5500, countInStock: 5 }
        ],
        badges: [
            { icon: 'Leaf', label: '100% Natural' },
            { icon: 'Drumstick', label: 'High Protein' }
        ],
        highlights: [
            { icon: 'Tractor', label: 'Direct from Farm' },
            { icon: 'BadgeCheck', label: 'Jumbo Size' }
        ],
        nutritionalInfo: [
            { label: 'Energy', value: '347 kcal' },
            { label: 'Protein', value: '9.7 g' },
            { label: 'Calcium', value: '60 mg' }
        ],
        numReviews: 45,
        rating: 4.9
    },
    {
        name: 'Cream & Onion Makhana',
        slug: 'cream-and-onion-makhana',
        brand: 'Makhana House',
        category: 'Flavored Makhana',
        tag: 'Tangy Savory Delight',
        badge: 'Popular',
        description: [
            'A classic savory favorite with rich sour cream and zesty onion.',
            'Guilt-free alternative to your favorite potato chips.',
            'Slow roasted for maximum crunch.',
            'Kids absolutely love this flavor!'
        ],
        ingredients: 'Makhana, Onion Powder, Milk Solids (Cream), Salt, Edible Oil',
        shelfLife: '6 Months',
        isFeatured: true,
        images: ['/makhanabowl.png'],
        variations: [
            { weight: '250g', price: 349, countInStock: 40 }
        ],
        badges: [
            { icon: 'Flame', label: 'Low Fat' }
        ],
        highlights: [
            { icon: 'Sparkles', label: 'Hygienically Processed' }
        ],
        nutritionalInfo: [
            { label: 'Energy', value: '385 kcal' },
            { label: 'Protein', value: '10.5 g' }
        ],
        numReviews: 210,
        rating: 4.7
    },
    {
        name: 'Chocolate Coated Makhana',
        slug: 'chocolate-coated-makhana',
        brand: 'Makhana House',
        category: 'Makhana Value Added',
        tag: 'Sweet & Crunchy',
        badge: 'Limited',
        description: [
            'Premium crunchy makhana dipped in rich, dark chocolate.',
            'The perfect guilt-free dessert or sweet snack.',
            'Made with real cocoa butter.',
            'Satisfies sweet cravings without the empty calories.'
        ],
        ingredients: 'Makhana, Dark Chocolate (Cocoa Solids, Sugar, Cocoa Butter), Glazing Agent',
        shelfLife: '4 Months',
        isFeatured: false,
        images: ['/makhanabowl.png'],
        variations: [
            { weight: '250g', price: 449, countInStock: 15 }
        ],
        badges: [
            { icon: 'Leaf', label: 'Real Chocolate' },
            { icon: 'WheatOff', label: 'Gluten Free' }
        ],
        highlights: [
            { icon: 'BadgeCheck', label: 'Artisan Crafted' }
        ],
        nutritionalInfo: [
            { label: 'Energy', value: '450 kcal' },
            { label: 'Sugar', value: '25 g' },
            { label: 'Protein', value: '7 g' }
        ],
        numReviews: 67,
        rating: 4.5
    }
];

const seedProducts = async () => {
    try {
        await connectDB();

        // Get an admin user to assign as the creator
        let adminUser = await User.findOne({ isAdmin: true });
        
        if (!adminUser) {
            console.log('No admin user found. Creating a default admin user...');
            adminUser = await User.create({
                name: 'Admin User',
                email: 'admin@makhanahouse.com',
                password: 'password123', // This won't be hashed properly if not using user model pre-save hook, but good enough for a fake reference ID
                isAdmin: true,
            });
        }

        const productsWithUser = products.map(product => {
            return { ...product, user: adminUser._id };
        });

        // Insert products
        await Product.insertMany(productsWithUser);

        console.log('5 Products Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedProducts();
