import { ArrowRight, Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { productsData } from "../../data/productDetailData";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";

export default function WishlistSidebar() {
    const { wishlistItems } = useWishlist();
    const { addToCart } = useCart();
    
    // Get up to 2 products that are not in the wishlist
    const recommendedProducts = productsData
        .filter(p => !wishlistItems.some(w => w.id === p.id))
        .slice(0, 2);

    return (
        <div className="flex flex-col gap-6">
            
            {/* Recommended Products */}
            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden shadow-sm flex flex-col">
                <div className="p-5 border-b border-white/10 bg-white/[0.02]">
                    <h3 className="text-[15px] font-serif text-[#f8f9fa]">Recommended For You</h3>
                </div>

                <div className="flex flex-col">
                    {recommendedProducts.map((product, index) => (
                        <div key={product.id} className={`p-5 flex flex-col items-center text-center ${index !== 0 ? 'border-t border-white/5' : ''}`}>
                            <Link to={`/product/${product.slug}`} className="w-24 h-24 mb-4 relative block group">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none rounded-full"></div>
                                <img src="/homehero2.png" alt={product.name} className="w-full h-full object-cover relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-transform duration-500 group-hover:scale-110" />
                            </Link>
                            
                            <Link to={`/product/${product.slug}`} className="text-[14px] font-medium text-[#f8f9fa] hover:text-[#d4af37] transition-colors mb-1 truncate w-full">
                                {product.name}
                            </Link>
                            
                            <div className="flex items-center gap-1 mb-2 text-[#d4af37]">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={12} 
                                        className={i < Math.floor(product.rating) ? "fill-current" : "text-white/20"} 
                                    />
                                ))}
                                <span className="text-[11px] text-[var(--color-text-secondary)] ml-1">({product.reviews})</span>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-[14px] font-medium text-[#d4af37]">₹{product.price}</span>
                            </div>

                            <button 
                                onClick={() => addToCart(product, 1, product.weight)}
                                className="w-full py-2 rounded-lg border border-[#d4af37]/40 text-[#d4af37] text-[12px] font-medium hover:bg-[#d4af37] hover:text-[#080b14] transition-all flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={14} />
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Support Box */}
            <div className="rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5 backdrop-blur-md p-5 flex items-center justify-between shadow-sm group cursor-pointer hover:bg-[#d4af37]/10 transition-colors">
                <div className="flex flex-col">
                    <h4 className="text-[14px] font-medium text-[#f8f9fa] mb-1">Explore Shop</h4>
                    <p className="text-[11px] text-[var(--color-text-secondary)]">Discover our premium range</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-[#080b14] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform">
                    <ArrowRight size={16} />
                </div>
            </div>

        </div>
    );
}
