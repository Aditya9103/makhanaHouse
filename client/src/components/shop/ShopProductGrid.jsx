import { ChevronDown, LayoutGrid, List, ChevronRight, ShoppingCart, Star, Heart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useGetProductsQuery } from "../../store/api/productApiSlice";

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

export default function ShopProductGrid({ appliedFilters }) {
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const [sortOption, setSortOption] = useState("newest");
    const [isSortOpen, setIsSortOpen] = useState(false);
    
    // Construct query filters
    const queryParams = { ...appliedFilters, sort: sortOption };
    const { data: products, isLoading, error } = useGetProductsQuery(queryParams);

    return (
        <div className="flex-1">
            {/* Header */}
            <div className="mb-6">
                <h2 className="mb-2 font-serif text-2xl text-[#f8f9fa]">All Products</h2>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-[var(--color-text-secondary)]">Showing 1-12 of 36 products</p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] relative">
                            Sort by:
                            <button 
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-[#f8f9fa] transition hover:border-[#d4af37]/50"
                            >
                                {sortOption === 'newest' && 'Newest'}
                                {sortOption === 'price_asc' && 'Price: Low to High'}
                                {sortOption === 'price_desc' && 'Price: High to Low'}
                                {sortOption === 'rating' && 'Highest Rated'}
                                {sortOption === 'featured' && 'Featured'}
                                <ChevronDown size={14} />
                            </button>

                            {isSortOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 rounded-md border border-white/10 bg-[#080b14] shadow-xl z-30 py-1">
                                    {[
                                        { value: 'newest', label: 'Newest' },
                                        { value: 'featured', label: 'Featured' },
                                        { value: 'price_asc', label: 'Price: Low to High' },
                                        { value: 'price_desc', label: 'Price: High to Low' },
                                        { value: 'rating', label: 'Highest Rated' },
                                    ].map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => {
                                                setSortOption(opt.value);
                                                setIsSortOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-[#d4af37]"
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
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
                {isLoading ? (
                    <div className="col-span-full flex justify-center py-20">
                        <Loader2 size={32} className="animate-spin text-[#d4af37]" />
                    </div>
                ) : error ? (
                    <div className="col-span-full py-10 text-center text-red-400 bg-red-500/10 rounded-xl">
                        Failed to load products
                    </div>
                ) : products?.length === 0 ? (
                    <div className="col-span-full py-20 text-center">
                        <h3 className="text-xl font-serif text-[#f8f9fa] mb-2">No products found</h3>
                        <p className="text-sm text-[var(--color-text-secondary)]">Try adjusting your category filter.</p>
                    </div>
                ) : products?.map((product) => {
                    const defaultVariation = product.variations && product.variations.length > 0 ? product.variations[0] : null;
                    const defaultPrice = defaultVariation ? defaultVariation.price : 0;
                    const defaultWeight = defaultVariation ? defaultVariation.weight : '';
                    
                    return (
                    <div key={product._id} className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-[#d4af37]/40">
                        <div className="relative aspect-[4/3] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
                            {product.isFeatured && (
                                <span className="absolute left-3 top-3 rounded-md bg-[#d4af37] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#080b14] z-10">
                                    Best Seller
                                </span>
                            )}
                            <button 
                                onClick={() => toggleWishlist({ ...product, id: product._id })}
                                className={`absolute top-3 right-3 transition-colors z-20 ${isInWishlist(product._id) ? 'text-[#d4af37]' : 'text-white/40 hover:text-[#d4af37]'}`}
                            >
                                <Heart size={18} className={isInWishlist(product._id) ? 'fill-[#d4af37]' : ''} />
                            </button>
                            <Link to={`/product/${product.slug}`} className="absolute inset-0 overflow-hidden group block z-0">
                                <img 
                                    src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.png"} 
                                    alt={product.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#080b14]/80 to-transparent"></div>
                            </Link>
                        </div>

                        <div className="flex flex-1 flex-col gap-1.5 p-4">
                            <Link to={`/product/${product.slug}`} className="block">
                                <h3 className="text-sm font-medium leading-snug text-[#f8f9fa] hover:text-[#d4af37] transition-colors">
                                    {product.name}
                                </h3>
                            </Link>
                            <p className="text-xs text-[var(--color-text-secondary)]">{product.category}</p>

                            <div className="flex items-center gap-1.5 mt-1">
                                <StarRow rating={product.rating || 5} />
                                <span className="text-[11px] text-[var(--color-text-secondary)]">
                                    ({product.numReviews || 0})
                                </span>
                            </div>

                            <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                                <p className="text-lg font-semibold text-[#f8f9fa]">
                                    ₹{defaultPrice}
                                    {defaultWeight && (
                                        <span className="ml-1 text-[11px] font-normal text-[var(--color-text-secondary)]">
                                            /{defaultWeight}
                                        </span>
                                    )}
                                </p>
                                <button
                                    onClick={() => addToCart({
                                        id: product._id,
                                        name: product.name,
                                        price: defaultPrice,
                                        weight: defaultWeight,
                                        image: product.images[0]
                                    }, 1, defaultWeight)}
                                    aria-label={`Add ${product.name} to cart`}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/40 text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]"
                                >
                                    <ShoppingCart size={15} />
                                </button>
                            </div>
                        </div>
                    </div>
                )})}
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
