import { Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { productsData } from "../../data/productDetailData";
import { useWishlist } from "../../context/WishlistContext";

export default function RelatedProducts({ className = "mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10", compact = false, title = "You May Also Like" }) {
    const { isInWishlist, toggleWishlist } = useWishlist();
    // Show 6 random or sequential products as related
    const relatedProducts = productsData.slice(0, 6);

    const gridCols = "grid grid-cols-4 sm:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4";

    const getVisibilityClass = (index) => {
        if (index >= 6) return "hidden";
        if (index >= 5) return "hidden xl:flex"; // 6th item visible on xl+
        if (index >= 4) return "hidden sm:flex"; // 5th item visible on sm+
        return "flex";
    };

    return (
        <section className={className}>
            <div className="flex items-center justify-center gap-4 mb-10">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]/40"></div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#f8f9fa]">{title}</h2>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]/40"></div>
            </div>

            <div className={gridCols}>
                {relatedProducts.slice(0, 6).map((product, index) => (
                    <div key={product.id} className={`${getVisibilityClass(index)} flex-col overflow-hidden rounded-xl border border-white/10 bg-[#080b14]/50 backdrop-blur-md transition hover:border-[#d4af37]/40`}>
                        <div className="relative aspect-[4/3] w-full bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] overflow-hidden group p-2 flex items-center justify-center">
                            <button 
                                onClick={() => toggleWishlist(product)}
                                className={`absolute top-2 right-2 transition-colors z-10 ${isInWishlist(product.id) ? 'text-[#d4af37]' : 'text-white/30 hover:text-[#d4af37]'}`}
                            >
                                <Heart size={14} className={isInWishlist(product.id) ? 'fill-[#d4af37]' : ''} />
                            </button>
                            <Link to={`/product/${product.slug}`} className="block w-full h-full">
                                <img 
                                    src="/makhanabowl.png" 
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
                                            className={i < Math.floor(product.rating) ? "fill-[#d4af37] text-[#d4af37]" : "text-white/20"} 
                                        />
                                    ))}
                                </div>
                                <span className="text-[10px] text-[var(--color-text-secondary)]">
                                    ({product.reviews})
                                </span>
                            </div>

                            <div className="mt-auto flex flex-col gap-3">
                                <p className="text-base font-semibold text-[#f8f9fa]">
                                    ₹{product.price}
                                    <span className="ml-1 text-[10px] font-normal text-[var(--color-text-secondary)]">
                                        / {product.weight}
                                    </span>
                                </p>
                                <button
                                    className="w-full rounded border border-[#d4af37]/40 py-2 text-[11px] font-medium text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
