import { Link, useLocation } from "react-router-dom";
import { Home, Store, Heart, ShoppingCart, User, ShoppingBag, MapPin, CreditCard, Gift, Settings, Info, Phone, FileText } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

export default function MobileBottomNav() {
    const location = useLocation();
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();

    const tabs = [
        // Primary 5 (Default View)
        { name: "Home", icon: Home, path: "/" },
        { name: "Shop", icon: Store, path: "/shop" },
        { name: "Wishlist", icon: Heart, path: "/profile/wishlist", badge: wishlistItems.length },
        { name: "Cart", icon: ShoppingCart, path: "/cart", badge: cartItems.reduce((total, item) => total + item.quantity, 0) },
        { name: "Profile", icon: User, path: "/profile" },
        
        // Remaining Scrollable Elements
        { name: "My Orders", icon: ShoppingBag, path: "/profile/orders" },
        { name: "Addresses", icon: MapPin, path: "/profile/addresses" },
        { name: "Payments", icon: CreditCard, path: "/profile/payments" },
        { name: "Rewards", icon: Gift, path: "/profile/rewards" },
        { name: "Settings", icon: Settings, path: "/profile/settings" },
        { name: "About Us", icon: Info, path: "/about" },
        { name: "Contact", icon: Phone, path: "/contact" },
        { name: "Export", icon: FileText, path: "/export/new" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex overflow-x-auto no-scrollbar snap-x snap-mandatory border-t border-white/10 bg-[#080b14]/80 backdrop-blur-xl px-0 py-3 shadow-[0_-8px_32px_rgba(0,0,0,0.3)] pb-safe-area [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {tabs.map((tab) => {
                // Determine if active: either exact match, or path starts with the tab path (except home)
                const isActive = tab.path === "/"
                    ? location.pathname === "/"
                    : tab.path === "/profile"
                        ? location.pathname === "/profile"
                        : location.pathname.startsWith(tab.path);

                const Icon = tab.icon;

                return (
                    <Link
                        key={tab.name}
                        to={tab.path}
                        className={`relative flex flex-col items-center justify-center gap-1 w-1/5 shrink-0 snap-start transition-all duration-300 py-1.5 ${
                            isActive ? "text-[#d4af37]" : "text-[var(--color-text-secondary)] hover:text-[#f8f9fa]"
                        }`}
                    >
                        <div className="relative">
                            <Icon 
                                size={22} 
                                className={`transition-all duration-300 ${isActive ? "drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] stroke-[2.2]" : "stroke-2"}`} 
                            />

                            {/* Notification Badge */}
                            {tab.badge > 0 && (
                                <span className={`absolute -top-1.5 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${
                                    isActive 
                                    ? "bg-[#d4af37] text-[#080b14] border border-[#080b14]" 
                                    : "bg-white text-[#080b14] border border-[#080b14]"
                                }`}>
                                    {tab.badge}
                                </span>
                            )}
                        </div>
                        <span className={`text-[10px] ${isActive ? "font-semibold" : "font-medium"} transition-all truncate w-full text-center px-1`}>
                            {tab.name}
                        </span>

                        {/* Active Indicator Dot */}
                        {isActive && (
                            <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#d4af37] drop-shadow-[0_0_4px_rgba(212,175,55,0.8)]"></div>
                        )}
                    </Link>
                );
            })}
        </div>
    );
}
