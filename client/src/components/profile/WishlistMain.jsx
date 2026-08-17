import { Trash2, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";

export default function WishlistMain() {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    return (
        <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden shadow-sm flex flex-col">
            
            {/* Header Section */}
            <div className="p-5 sm:p-6 pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-serif text-[#f8f9fa] mb-1">My Wishlist</h2>
                    <p className="text-[13px] text-[var(--color-text-secondary)]">Save your favorite products for later.</p>
                </div>
                
                <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#d4af37] bg-[#d4af37]/10 px-3 py-1.5 rounded-full border border-[#d4af37]/20">
                    <Heart size={14} className="fill-current" />
                    {wishlistItems.length} Items Saved
                </div>
            </div>

            {/* Wishlist Items */}
            <div className="flex flex-col p-4 sm:p-6 gap-4">
                {wishlistItems.length > 0 ? (
                    wishlistItems.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row gap-5 p-4 rounded-xl border border-white/10 bg-[#0a0d14]/50 hover:bg-white/[0.02] hover:border-white/20 transition-all group relative overflow-hidden">
                            
                            {/* Image */}
                            <Link to={`/product/${item.slug}`} className="w-full sm:w-[130px] h-[130px] shrink-0 rounded-lg overflow-hidden bg-[#080b14] flex items-center justify-center border border-white/5 relative">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none"></div>
                                <img src={item.image} alt={item.name} className="w-[85%] h-[85%] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-transform duration-500 group-hover:scale-110" />
                            </Link>

                            {/* Details */}
                            <div className="flex-1 flex flex-col justify-center min-w-0">
                                
                                <div className="flex flex-col gap-1 mb-3">
                                    <Link to={`/product/${item.slug}`}>
                                        <h3 className="text-[16px] font-serif transition-colors truncate text-[#f8f9fa] group-hover:text-[#d4af37]">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    <span className="text-[12px] text-[var(--color-text-secondary)]">{item.subtitle}</span>
                                </div>

                                <div className="flex items-center gap-2.5 mb-4 sm:mb-0">
                                    <span className="text-[16px] font-medium text-[#d4af37]">
                                        ₹{item.price}
                                    </span>
                                </div>
                                
                                {/* Mobile Action Buttons */}
                                <div className="flex sm:hidden items-center gap-3 pt-4 border-t border-white/5">
                                    <button 
                                        onClick={() => addToCart(item, 1, "250g")}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[12px] font-medium transition-all bg-[#d4af37] text-[#080b14] hover:bg-[#f3e5ab] shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                                    >
                                        <ShoppingCart size={14} />
                                        Add to Cart
                                    </button>
                                    <button 
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="h-9 w-9 flex items-center justify-center rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Desktop Actions */}
                            <div className="hidden sm:flex flex-col items-end justify-between border-l border-white/10 pl-5 ml-2 py-1 shrink-0 w-[160px]">
                                <button 
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="h-8 w-8 flex items-center justify-center rounded-md text-[var(--color-text-secondary)] hover:text-red-400 hover:bg-red-400/10 transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                                
                                <button 
                                    onClick={() => addToCart(item, 1, "250g")}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[12px] font-medium transition-all bg-[#d4af37] text-[#080b14] hover:bg-[#f3e5ab] shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                                >
                                    <ShoppingCart size={15} />
                                    Add
                                </button>
                            </div>

                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white/20">
                            <Heart size={28} />
                        </div>
                        <h3 className="text-[16px] font-serif text-[#f8f9fa] mb-2">Your wishlist is empty</h3>
                        <p className="text-[13px] text-[var(--color-text-secondary)] mb-6 max-w-[280px]">
                            Looks like you haven't saved any items yet. Start exploring our premium makhana collection!
                        </p>
                        <Link to="/shop" className="px-6 py-2.5 rounded-lg bg-[#d4af37] text-[#080b14] text-[13px] font-medium hover:bg-[#f3e5ab] transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                            Explore Shop
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
