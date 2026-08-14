import { User, ShoppingBag, Heart, MapPin, CreditCard, FileText, Bell, Gift, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function ProfileSidebar() {
    const location = useLocation();

    const menuItems = [
        { name: "My Profile", icon: User, path: "/profile" },
        { name: "My Orders", icon: ShoppingBag, path: "/profile/orders" },
        { name: "Wishlist", icon: Heart, path: "/profile/wishlist" },
        { name: "Addresses", icon: MapPin, path: "/profile/addresses" },
        { name: "Payment Methods", icon: CreditCard, path: "/profile/payments" },
        { name: "Export Inquiries", icon: FileText, path: "/profile/inquiries" },
        { name: "Rewards & Offers", icon: Gift, path: "/profile/rewards" },
        { name: "Account Settings", icon: Settings, path: "/profile/settings" },
    ];

    return (
        <div className="flex flex-col gap-6 h-full">
            {/* Navigation Menu */}
            <div className="rounded-xl border border-[#d4af37]/10 bg-[#0a0d14] md:overflow-hidden shadow-sm">
                <div className="hidden md:block p-6 pb-4">
                    <h3 className="text-[11px] font-bold text-[#d4af37] tracking-wider uppercase">My Account</h3>
                </div>
                
                <nav className="flex flex-row md:flex-col py-3 md:py-1 overflow-x-auto md:overflow-x-visible no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path || (item.path === "/profile" && location.pathname === "/profile");
                        
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-2 md:gap-3.5 px-4 md:px-6 py-2.5 md:py-3.5 text-[13px] md:text-[14px] font-medium transition-all duration-200 shrink-0 md:shrink-auto rounded-full md:rounded-none mx-2 md:mx-0 border md:border-0 md:border-l-[3px] ${
                                    isActive 
                                        ? "border-[#d4af37] text-[#d4af37] bg-[#d4af37]/[0.05] md:bg-[#d4af37]/[0.02]" 
                                        : "border-transparent text-[#e4e4e7] hover:text-[#f8f9fa] bg-white/[0.02] md:bg-transparent hover:bg-white/[0.05] md:hover:bg-white/[0.02]"
                                }`}
                            >
                                <Icon size={16} className={`md:w-[18px] md:h-[18px] ${isActive ? "text-[#d4af37]" : "text-[#e4e4e7]/60"}`} />
                                <span className="whitespace-nowrap">{item.name}</span>
                            </Link>
                        );
                    })}

                    <div className="hidden md:block my-2 mx-6 h-[1px] bg-white/5"></div>

                    <button className="flex items-center gap-2 md:gap-3.5 px-4 md:px-6 py-2.5 md:py-3.5 text-[13px] md:text-[14px] font-medium text-[#e4e4e7] hover:bg-white/[0.02] hover:text-red-400 transition-all duration-200 shrink-0 md:shrink-auto rounded-full md:rounded-none mx-2 md:mx-0 border md:border-0 md:border-l-[3px] border-transparent bg-white/[0.02] md:bg-transparent">
                        <LogOut size={16} className="md:w-[18px] md:h-[18px] text-[#e4e4e7]/60" />
                        <span className="whitespace-nowrap">Logout</span>
                    </button>
                </nav>
            </div>

            {/* Promotional Card - Hidden on mobile to save space, visible on md+ */}
            {location.pathname === "/profile/inquiries" ? (
                <div className="hidden md:flex rounded-xl border border-[#d4af37]/20 bg-[#0a0d14] p-5 relative overflow-hidden shadow-sm mt-auto flex-col items-center text-center">
                    
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none"></div>
                    
                    <div className="relative z-10 w-24 h-24 mb-3">
                        <img src="/makhanabowl.png" alt="Makhana Bowl" className="w-full h-full object-contain" />
                    </div>
                    
                    <h4 className="text-[#f8f9fa] font-serif font-medium text-[16px] mb-2 relative z-10">We Export Worldwide</h4>
                    <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed mb-5 relative z-10 px-2">
                        Delivering premium Makhana to 25+ countries.
                    </p>
                    
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#d4af37]/30 hover:border-[#d4af37] text-[#d4af37] transition-all text-[12px] font-medium group bg-[#d4af37]/5 hover:bg-[#d4af37]/10 relative z-10">
                        Explore Export
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                </div>
            ) : (
                <div className="hidden md:block rounded-xl border border-[#d4af37]/20 bg-[#0a0d14] p-5 relative overflow-hidden shadow-sm mt-auto">
                    
                    {/* Background Lotus Watermark */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                        <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22c0-4-3-8-3-12s3-8 3-8 3 4 3 8-3 8-3 12z" />
                            <path d="M12 22c-3-2-8-5-8-11s3-5 5-5" />
                            <path d="M12 22c3-2 8-5 8-11s-3-5-5-5" />
                            <path d="M12 22c-6-1-11-3-11-8s5-4 8-4" />
                            <path d="M12 22c6-1 11-3 11-8s-5-4-8-4" />
                        </svg>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="h-12 w-12 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                            {/* Golden Lotus Icon */}
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22c0-4-3-8-3-12s3-8 3-8 3 4 3 8-3 8-3 12z" />
                                <path d="M12 22c-3-2-8-5-8-11s3-5 5-5" />
                                <path d="M12 22c3-2 8-5 8-11s-3-5-5-5" />
                            </svg>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <h4 className="text-[#f8f9fa] font-serif font-medium text-[15px] leading-tight">Makhana Rewards</h4>
                            <p className="text-[12px] text-[#d4af37] font-medium">Gold Member</p>
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-3">
                            <div className="h-full bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] w-[65%] rounded-full"></div>
                        </div>
                        <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed mb-5">
                            You are <strong className="text-[#f8f9fa] font-medium">1,250 points</strong> away from <br />
                            <span className="text-[#d4af37] font-medium">Platinum Member</span>
                        </p>
                        <button className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-[#d4af37]/20 hover:border-[#d4af37]/40 text-[#e4e4e7] hover:text-[#d4af37] transition-colors text-[12px] font-medium group bg-transparent">
                            View Rewards
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
