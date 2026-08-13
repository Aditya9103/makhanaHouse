import { ChevronDown, LayoutGrid, List, ChevronRight, Sprout, ShoppingCart, Star } from "lucide-react";

const products = [
    {
        id: 1, name: "Premium Makhana", tag: "Super Quality | Big Size",
        price: 299, weight: "250g", rating: 5, reviews: 128, badge: "Bestseller"
    },
    {
        id: 2, name: "Roasted Makhana", tag: "Lightly Salted | Crunchy",
        price: 249, weight: "250g", rating: 5, reviews: 96, badge: null
    },
    {
        id: 3, name: "Peri Peri Makhana", tag: "Spicy & Tasty | Roasted",
        price: 279, weight: "250g", rating: 5, reviews: 84, badge: null
    },
    {
        id: 4, name: "Himalayan Pink Salt Makhana", tag: "Healthy & Delicious",
        price: 259, weight: "250g", rating: 5, reviews: 73, badge: null
    },
    {
        id: 5, name: "Chocolate Makhana", tag: "Healthy Snack | Kids Favorite",
        price: 299, weight: "250g", rating: 5, reviews: 58, badge: null
    },
    {
        id: 6, name: "Jumbo Makhana", tag: "Extra Large | Premium",
        price: 349, weight: "250g", rating: 5, reviews: 42, badge: null
    },
    {
        id: 7, name: "Masala Makhana", tag: "Indian Spices | Roasted",
        price: 249, weight: "250g", rating: 5, reviews: 39, badge: "New"
    },
    {
        id: 8, name: "Makhana Gift Pack", tag: "Premium Assorted Pack",
        price: 499, weight: "Pack", rating: 5, reviews: 31, badge: null
    },
    {
        id: 9, name: "Cream & Onion Makhana", tag: "Tangy & Flavorful",
        price: 249, weight: "250g", rating: 5, reviews: 28, badge: null
    },
    {
        id: 10, name: "Cheese Makhana", tag: "Cheesy & Crunchy",
        price: 279, weight: "250g", rating: 5, reviews: 24, badge: null
    },
    {
        id: 11, name: "Salt & Pepper Makhana", tag: "Classic & Light",
        price: 249, weight: "250g", rating: 5, reviews: 26, badge: null
    },
    {
        id: 12, name: "Bulk Makhana (5kg)", tag: "Best for Businesses",
        price: 2199, weight: "5kg", rating: 5, reviews: 18, badge: null
    },
];

function StarRow({ rating }) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={13}
                    className={
                        i < rating
                            ? "fill-[#d4af37] text-[#d4af37]"
                            : "fill-transparent text-[#4a4636]"
                    }
                />
            ))}
        </div>
    );
}

export default function ShopProductGrid() {
    return (
        <div className="flex-1">
            {/* Header */}
            <div className="mb-6">
                <h2 className="mb-2 font-serif text-2xl text-[#f8f9fa]">All Products</h2>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-[var(--color-text-secondary)]">Showing 1-12 of 36 products</p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                            Sort by:
                            <button className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-[#f8f9fa] transition hover:border-[#d4af37]/50">
                                Featured
                                <ChevronDown size={14} />
                            </button>
                        </div>
                        <div className="hidden items-center gap-2 sm:flex">
                            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-[#d4af37]/50 bg-[#d4af37]/10 text-[#d4af37]">
                                <LayoutGrid size={16} />
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[var(--color-text-secondary)] transition hover:text-[#f8f9fa]">
                                <List size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                    <div key={product.id} className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-[#d4af37]/40">
                        <div className="relative aspect-[4/3] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
                            {product.badge && (
                                <span className="absolute left-3 top-3 rounded-md bg-[#d4af37] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#080b14]">
                                    {product.badge}
                                </span>
                            )}
                            <div className="absolute inset-0 overflow-hidden group">
                                <img 
                                    src="/homehero2.png" 
                                    alt={product.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#080b14]/80 to-transparent"></div>
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col gap-1.5 p-4">
                            <h3 className="text-sm font-medium leading-snug text-[#f8f9fa]">
                                {product.name}
                            </h3>
                            <p className="text-xs text-[var(--color-text-secondary)]">{product.tag}</p>

                            <div className="flex items-center gap-1.5 mt-1">
                                <StarRow rating={product.rating} />
                                <span className="text-[11px] text-[var(--color-text-secondary)]">
                                    ({product.reviews})
                                </span>
                            </div>

                            <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                                <p className="text-lg font-semibold text-[#f8f9fa]">
                                    ₹{product.price}
                                    <span className="ml-1 text-[11px] font-normal text-[var(--color-text-secondary)]">
                                        /{product.weight}
                                    </span>
                                </p>
                                <button
                                    aria-label={`Add ${product.name} to cart`}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/40 text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]"
                                >
                                    <ShoppingCart size={15} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-md bg-[#d4af37] text-sm font-semibold text-[#080b14]">1</button>
                <button className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-sm font-medium text-[var(--color-text-secondary)] transition hover:text-[#f8f9fa]">2</button>
                <button className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-sm font-medium text-[var(--color-text-secondary)] transition hover:text-[#f8f9fa]">3</button>
                <button className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-sm font-medium text-[var(--color-text-secondary)] transition hover:text-[#f8f9fa]">
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}
