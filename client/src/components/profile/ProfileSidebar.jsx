import { User, ShoppingBag, Heart, MapPin, CreditCard, FileText, Bell, Gift, Settings, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

export default function ProfileSidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    
    const points = userInfo?.rewardsPoints || 0;
    
    let currentTier = "SILVER";
    let nextTier = "Gold";
    let nextTierPoints = 2500;
    
    if (points >= 5000) {
        currentTier = "PLATINUM";
        nextTier = "Diamond";
        nextTierPoints = 10000;
    } else if (points >= 2500) {
        currentTier = "GOLD";
        nextTier = "Platinum";
        nextTierPoints = 5000;
    }

    const progressPercent = Math.min((points / nextTierPoints) * 100, 100);
    const pointsNeeded = nextTierPoints - points;

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };

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
        <div className="flex flex-col gap-6 md:sticky md:top-24 z-10">
            {/* Navigation Menu */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl md:overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                <div className="hidden md:block p-6 pb-4">
                    <h3 className="text-[11px] font-bold text-[#d4af37] tracking-wider uppercase">My Account</h3>
                </div>

                <nav className="flex flex-row md:flex-col py-0 md:py-1 overflow-x-auto md:overflow-x-visible no-scrollbar snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path || (item.path === "/profile" && location.pathname === "/profile");

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1.5 md:gap-3.5 p-2 md:px-6 md:py-3.5 text-[10px] md:text-[14px] font-medium transition-all duration-200 shrink-0 md:shrink-auto w-1/4 md:w-auto snap-start rounded-2xl md:rounded-none border-transparent md:border-l-[3px] ${isActive
                                        ? "md:border-[#d4af37] text-[#080b14] md:text-[#d4af37] bg-[#d4af37] md:bg-[#d4af37]/[0.02] shadow-[0_4px_12px_rgba(212,175,55,0.4)] md:shadow-none"
                                        : "border-transparent text-[#e4e4e7] hover:text-[#f8f9fa] bg-transparent hover:bg-white/[0.05] md:hover:bg-white/[0.02]"
                                    }`}
                            >
                                <Icon size={18} className={`md:w-[18px] md:h-[18px] ${isActive ? "text-[#080b14] md:text-[#d4af37]" : "text-[#e4e4e7]/60"}`} />
                                <span className="whitespace-nowrap truncate w-full text-center md:text-left">{item.name}</span>
                            </Link>
                        );
                    })}

                    <div className="hidden md:block my-2 mx-6 h-[1px] bg-white/5"></div>

                    <button 
                        onClick={logoutHandler}
                        className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-1.5 md:gap-3.5 p-2 md:px-6 md:py-3.5 text-[10px] md:text-[14px] font-medium text-[#e4e4e7] hover:bg-white/[0.02] hover:text-red-400 transition-all duration-200 shrink-0 md:shrink-auto w-1/4 md:w-auto snap-start rounded-2xl md:rounded-none border-transparent md:border-l-[3px] bg-transparent"
                    >
                        <LogOut size={18} className="md:w-[18px] md:h-[18px] text-[#e4e4e7]/60" />
                        <span className="whitespace-nowrap truncate w-full text-center md:text-left">Logout</span>
                    </button>
                </nav>
            </div>

            {/* Promotional Card - Hidden on mobile to save space, visible on md+ */}
            {location.pathname === "/profile/inquiries" ? (
                <div className="hidden md:flex rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)] mt-auto flex-col items-center text-center">

                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none"></div>

                    <div className="relative z-10 w-24 h-24 mb-3">
                        <img src="/makhanabowl.png" alt="Makhana Bowl" className="w-full h-full object-contain" />
                    </div>

                    <h4 className="text-[#f8f9fa] font-serif font-medium text-[16px] mb-2 relative z-10">We Export Worldwide</h4>
                    <p className="text-[11px] text-[#e4e4e7] leading-relaxed mb-5 relative z-10 px-2">
                        Delivering premium Makhana to 25+ countries.
                    </p>

                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#d4af37]/30 hover:border-[#d4af37] text-[#d4af37] transition-all text-[12px] font-medium group bg-[#d4af37]/5 hover:bg-[#d4af37]/10 relative z-10">
                        Explore Export
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                </div>
            ) : (
                <div className="hidden md:block rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)] mt-auto">

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
                            <p className="text-[12px] text-[#d4af37] font-medium capitalize">{currentTier.toLowerCase()} Member</p>
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-3">
                            <div className="h-full bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] rounded-full" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                        <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed mb-5">
                            You are <strong className="text-[#f8f9fa] font-medium">{pointsNeeded.toLocaleString()} points</strong> away from <br />
                            <span className="text-[#d4af37] font-medium capitalize">{nextTier} Member</span>
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
