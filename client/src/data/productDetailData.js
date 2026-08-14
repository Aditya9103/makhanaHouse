const baseProducts = [
    {
        id: 1, name: "Premium Makhana", tag: "Super Quality | Big Size", slug: "premium-makhana", shortDescription: "Our finest, largest makhana carefully handpicked for the ultimate snacking experience.",
        price: 299, baseWeight: "250g", weight: "250g", rating: 5, reviewsCount: 128, reviews: 128, badge: "Bestseller", soldThisMonth: 340
    },
    {
        id: 2, name: "Roasted Makhana (Plain)", tag: "Lightly Salted | Crunchy", slug: "roasted-makhana-plain", shortDescription: "Lightly roasted for a pure and natural taste.",
        price: 249, baseWeight: "250g", weight: "250g", rating: 4.8, reviewsCount: 96, reviews: 96, badge: null, soldThisMonth: 200
    },
    {
        id: 3, name: "Peri Peri Makhana", tag: "Spicy & Tasty | Roasted", slug: "peri-peri-makhana", shortDescription: "A fiery blend of peri peri spices roasted to crunchy perfection.",
        price: 279, baseWeight: "250g", weight: "250g", rating: 4.9, reviewsCount: 84, reviews: 84, badge: null, soldThisMonth: 150
    },
    {
        id: 4, name: "Himalayan Pink Salt Makhana", tag: "Healthy & Delicious", slug: "himalayan-pink-salt-makhana", shortDescription: "Seasoned with pure Himalayan pink salt for a mineral-rich healthy snack.",
        price: 259, baseWeight: "250g", weight: "250g", rating: 4.7, reviewsCount: 73, reviews: 73, badge: null, soldThisMonth: 110
    },
    {
        id: 5, name: "Chocolate Makhana", tag: "Healthy Snack | Kids Favorite", slug: "chocolate-makhana", shortDescription: "Coated in premium dark chocolate, a guilt-free sweet treat.",
        price: 299, baseWeight: "250g", weight: "250g", rating: 4.6, reviewsCount: 58, reviews: 58, badge: null, soldThisMonth: 80
    },
    {
        id: 6, name: "Jumbo Makhana", tag: "Extra Large | Premium", slug: "jumbo-makhana", shortDescription: "Extra large phool makhana selected for premium quality and size.",
        price: 349, baseWeight: "250g", weight: "250g", rating: 5.0, reviewsCount: 42, reviews: 42, badge: null, soldThisMonth: 40
    },
    {
        id: 7, name: "Masala Makhana", tag: "Indian Spices | Roasted", slug: "masala-makhana", shortDescription: "Tossed in traditional Indian spices for an authentic street-food flavor.",
        price: 249, baseWeight: "250g", weight: "250g", rating: 4.5, reviewsCount: 39, reviews: 39, badge: "New", soldThisMonth: 95
    },
    {
        id: 8, name: "Makhana Gift Pack", tag: "Premium Assorted Pack", slug: "makhana-gift-pack", shortDescription: "A beautiful assortment of our best selling flavors, perfect for gifting.",
        price: 499, baseWeight: "Pack", weight: "Pack", rating: 4.9, reviewsCount: 31, reviews: 31, badge: null, soldThisMonth: 25
    },
    {
        id: 9, name: "Cream & Onion Makhana", tag: "Tangy & Flavorful", slug: "cream-onion-makhana", shortDescription: "A classic savory favorite with rich sour cream and zesty onion.",
        price: 249, baseWeight: "250g", weight: "250g", rating: 4.7, reviewsCount: 28, reviews: 28, badge: null, soldThisMonth: 55
    },
    {
        id: 10, name: "Cheese Makhana", tag: "Cheesy & Crunchy", slug: "cheese-makhana", shortDescription: "Loaded with cheesy goodness, satisfying cravings the healthy way.",
        price: 279, baseWeight: "250g", weight: "250g", rating: 4.6, reviewsCount: 24, reviews: 24, badge: null, soldThisMonth: 60
    },
    {
        id: 11, name: "Salt & Pepper Makhana", tag: "Classic & Light", slug: "salt-pepper-makhana", shortDescription: "Simply seasoned with black pepper and salt for a subtle kick.",
        price: 249, baseWeight: "250g", weight: "250g", rating: 4.8, reviewsCount: 26, reviews: 26, badge: null, soldThisMonth: 45
    },
    {
        id: 12, name: "Bulk Makhana (5kg)", tag: "Best for Businesses", slug: "bulk-makhana-5kg", shortDescription: "Wholesale premium makhana perfect for commercial kitchens and businesses.",
        price: 2199, baseWeight: "5kg", weight: "5kg", rating: 4.9, reviewsCount: 18, reviews: 18, badge: null, soldThisMonth: 10
    }
];

export const productsData = baseProducts.map(product => ({
    ...product,
    stockStatus: "In Stock",
    images: [
        "/makhanabowl.png",
        "/makhanabowl.png",
        "/makhanabowl.png",
        "/makhanabowl.png",
        "/makhanabowl.png",
    ],
    badges: [
        { icon: "Leaf", label: "100% Natural" },
        { icon: "WheatOff", label: "Gluten Free" },
        { icon: "Drumstick", label: "High in Protein" },
        { icon: "Flame", label: "Low Calorie" },
        { icon: "Sprout", label: "Vegan" },
    ],
    sizes: ["250g", "500g", "1kg", "2kg"],
    description: [
        `Our ${product.name} is carefully handpicked from the fertile fields of Bihar and lightly roasted to perfection. It is crunchy, delicious, and packed with essential nutrients, making it a perfect healthy snack for every age.`,
        "Lightly roasted, not fried",
        "No preservatives or additives",
        "Rich in protein, calcium & antioxidants",
        "Perfect for snacking or adding to recipes"
    ],
    nutritionalInfo: [
        { label: "Energy", value: "347 kcal" },
        { label: "Protein", value: "9.7 g" },
        { label: "Carbohydrates", value: "76.9 g" },
        { label: "Dietary Fiber", value: "14.5 g" },
        { label: "Total Fat", value: "0.1 g" },
        { label: "Sodium", value: "3 mg" },
        { label: "Calcium", value: "60 mg" },
        { label: "Iron", value: "1.4 mg" }
    ],
    highlights: [
        { icon: "BadgeCheck", label: "Handpicked Premium Quality" },
        { icon: "Sparkles", label: "Hygienically Processed" },
        { icon: "Tractor", label: "Direct from Farmers" },
        { icon: "Package", label: "Export Quality Packaging" }
    ],
    reviewsDetails: {
        average: product.rating,
        total: product.reviewsCount,
        distribution: { 5: Math.floor(product.reviewsCount * 0.8), 4: Math.floor(product.reviewsCount * 0.15), 3: 3, 2: 1, 1: 1 },
        list: [
            {
                id: 1,
                user: "Rahul Sharma",
                avatar: "/avatar1.png",
                verified: true,
                rating: 5,
                date: "12 Aug, 2026",
                title: "Best Makhana I've ever had!",
                comment: `The quality of this ${product.name} is unmatched. The size of the makhana is big, and they are incredibly crunchy. Packaging was also premium.`,
                helpful: 24,
                images: ["/makhanabowl.png", "/makhanabowl.png"]
            },
            {
                id: 2,
                user: "Priya Patel",
                avatar: "/avatar2.png",
                verified: true,
                rating: 4,
                date: "05 Aug, 2026",
                title: "Great taste and healthy",
                comment: "Very fresh and crisp. I use it for evening snacking instead of junk food. Will definitely order again.",
                helpful: 12,
                images: []
            }
        ]
    }
}));

export const getProductById = (id) => productsData.find(p => p.id === Number(id)) || productsData[0];
export const getProductBySlug = (slug) => productsData.find(p => p.slug === slug) || productsData[0];
