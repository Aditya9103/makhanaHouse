import { Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../store/api/productApiSlice";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";

export default function RelatedProducts({ 
    className = "mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10", 
    compact = false, 
    title = "You May Also Like",
    excludeProductIds = [],
    currentCategory = null
}) {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    
    // Fetch products based on category if provided, otherwise fallback to highest rated
    const queryParams = currentCategory ? { categories: currentCategory, sort: 'rating' } : { sort: 'rating' };
    const { data: products } = useGetProductsQuery(queryParams);
    
    // Filter out excluded products and out-of-stock products, then limit to 6
    const relatedProducts = products 
        ? products.filter(p => {
            const isExcluded = excludeProductIds.includes(p._id);
            const hasStock = p.variations && p.variations.some(v => v.countInStock > 0);
            return !isExcluded && hasStock;
        }).slice(0, 6)
        : [];

    const gridCols = "grid grid-cols-4 sm:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4";

    const getVisibilityClass = (index) => {
        if (index >= 6) return "hidden";
        if (index >= 5) return "hidden xl:flex"; // 6th item visible on xl+
        if (index >= 4) return "hidden sm:flex"; // 5th item visible on sm+
        return "flex";
    };

    if (!products || products.length === 0) return null;

    return (
        <section className={className}>
            <div className="flex items-center justify-center gap-4 mb-10">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]/40"></div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#f8f9fa]">{title}</h2>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]/40"></div>
            </div>

            <div className={gridCols}>
                {relatedProducts.map((product, index) => {
                    const defaultVariation = product.variations && product.variations.length > 0 ? product.variations[0] : null;
                    const defaultPrice = defaultVariation ? defaultVariation.price : 0;
                    const defaultWeight = defaultVariation ? defaultVariation.weight : '';
                    
                    return (
                    <div key={product._id} className={`${getVisibilityClass(index)} flex-col overflow-hidden rounded-xl border border-white/10 bg-[#080b14]/50 backdrop-blur-md transition hover:border-[#d4af37]/40`}>
                        <div className="relative aspect-[4/3] w-full bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] overflow-hidden group p-2 flex items-center justify-center">
                            <button 
                                onClick={() => toggleWishlist({ ...product, id: product._id })}
                                className={`absolute top-2 right-2 transition-colors z-10 ${isInWishlist(product._id) ? 'text-[#d4af37]' : 'text-white/30 hover:text-[#d4af37]'}`}
                            >
                                <Heart size={14} className={isInWishlist(product._id) ? 'fill-[#d4af37]' : ''} />
                            </button>
                            <Link to={`/product/${product.slug}`} className="block w-full h-full">
                                <img 
                                    src={product.images && product.images.length > 0 ? product.images[0] : "/makhanabowl.png"} 
                                    alt={product.name}
                                    className="h-full w-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
                                />
                            </Link>
                        </div>

                        <div className="flex flex-col p-3 flex-1">
                            <Link to={`/product/${product.slug}`} className="text-xs sm:text-[13px] font-medium leading-snug text-[#f8f9fa] hover:text-[#d4af37] transition-colors line-clamp-2 mb-1.5">
                                {product.name}
                            </Link>

                            <div className="flex items-center gap-1.5 mb-3">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            size={10} 
                                            className={i < Math.floor(product.rating || 5) ? "fill-[#d4af37] text-[#d4af37]" : "text-white/20"} 
                                        />
                                    ))}
                                </div>
                                <span className="text-[10px] text-[var(--color-text-secondary)]">
                                    ({product.numReviews || 0})
                                </span>
                            </div>

                            <div className="mt-auto flex flex-col gap-3">
                                <p className="text-base font-semibold text-[#f8f9fa]">
                                    ₹{defaultPrice}
                                    {defaultWeight && (
                                        <span className="ml-1 text-[10px] font-normal text-[var(--color-text-secondary)]">
                                            / {defaultWeight}
                                        </span>
                                    )}
                                </p>
                                <button
                                    onClick={() => addToCart({
                                        id: product._id,
                                        name: product.name,
                                        price: defaultPrice,
                                        weight: defaultWeight,
                                        image: product.images && product.images.length > 0 ? product.images[0] : "/makhanabowl.png"
                                    }, 1, defaultWeight)}
                                    className="w-full rounded border border-[#d4af37]/40 py-2 text-[11px] font-medium text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )})}
            </div>
        </section>
    );
}
