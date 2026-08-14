import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function WishlistSidebar() {
    return (
        <div className="flex flex-col gap-6">
            
            {/* Recommended Product Box */}
            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden shadow-sm flex flex-col">
                <div className="p-5 border-b border-white/10 bg-white/[0.02]">
                    <h3 className="text-[15px] font-serif text-[#f8f9fa]">Recommended For You</h3>
                </div>

                <div className="p-5 flex flex-col items-center text-center">
                    <div className="w-32 h-32 mb-4 relative">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none rounded-full"></div>
                        <img src="/product-4.png" alt="Recommended" className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]" />
                    </div>
                    
                    <Link to="/product/4" className="text-[15px] font-medium text-[#f8f9fa] hover:text-[#d4af37] transition-colors mb-2">
                        Mint Makhana
                    </Link>
                    
                    <div className="flex items-center gap-1 mb-3 text-[#d4af37]">
                        <Star size={12} className="fill-current" />
                        <Star size={12} className="fill-current" />
                        <Star size={12} className="fill-current" />
                        <Star size={12} className="fill-current" />
                        <Star size={12} className="fill-current" />
                        <span className="text-[11px] text-[var(--color-text-secondary)] ml-1">(42)</span>
                    </div>

                    <div className="flex items-center gap-2 mb-5">
                        <span className="text-[15px] font-medium text-[#d4af37]">₹329</span>
                        <span className="text-[12px] text-[var(--color-text-secondary)] line-through">₹380</span>
                    </div>

                    <button className="w-full py-2.5 rounded-lg border border-[#d4af37]/40 text-[#d4af37] text-[12px] font-medium hover:bg-[#d4af37] hover:text-[#080b14] transition-all">
                        View Details
                    </button>
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
