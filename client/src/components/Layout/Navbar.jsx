import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { useGetProductsQuery } from "../../store/api/productApiSlice";
import {
    Wheat,
    Mail,
    Phone,
    Search,
    User,
    ShoppingBag,
    ShoppingCart,
    ChevronDown,
    Menu,
    X,
    BadgeCheck,
    Tractor,
    ClipboardCheck,
    Heart,
} from "lucide-react";

const utilityItems = [
    { icon: Wheat, label: "100% Natural" },
    { icon: BadgeCheck, label: "Premium Quality" },
    { icon: Tractor, label: "Direct from Farmers" },
    { icon: ClipboardCheck, label: "Export Worldwide" },
];

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Export", href: "/export" },
    { label: "Quality", href: "/quality" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    // Search state
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { data: searchResults, isLoading: isSearching } = useGetProductsQuery(
        { keyword: searchQuery },
        { skip: !isSearchOpen || searchQuery.length < 2 }
    );

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsSearchOpen(false);
            navigate(`/shop?keyword=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <>
            {/* Utility bar */}
            <div className="hidden border-b border-white/10 bg-transparent lg:block">
                <div className="mx-auto flex max-w-[1400px] items-center justify-between px-10 py-2.5 text-xs text-[var(--color-text-secondary)]">
                    <div className="flex items-center gap-6">
                        {utilityItems.map(({ icon: Icon, label }) => (
                            <span key={label} className="flex items-center gap-1.5">
                                <Icon size={13} className="text-[#d4af37]" />
                                {label}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1.5">
                            <Mail size={13} className="text-[#d4af37]" />
                            info@makhanahouse.in
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Phone size={13} className="text-[#d4af37]" />
                            9801017333 / 8873405595
                        </span>
                        <span className="flex items-center gap-1.5">
                            🇮🇳 EN <ChevronDown size={12} />
                        </span>
                    </div>
                </div>
            </div>

            {/* Main nav */}
            <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080b14]/80 backdrop-blur-md">
                {/* Full Screen Backdrop when Search is Open */}
                {isSearchOpen && (
                    <div className="fixed inset-0 top-full bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsSearchOpen(false)} />
                )}

                {/* Search Dropdown Overlay */}
                {isSearchOpen && (
                    <div className="absolute top-full left-0 w-full bg-[#0d111a] border-b border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.7)] z-50 animate-in slide-in-from-top-2">
                        <div className="mx-auto max-w-[800px] p-6 relative">
                            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                                <Search className="absolute left-4 text-[var(--color-text-secondary)]" size={20} />
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="Search for premium makhana, flavors, or categories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-[#f8f9fa] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/50 transition-all text-lg"
                                />
                                <button type="button" onClick={() => setIsSearchOpen(false)} className="absolute right-4 text-[var(--color-text-secondary)] hover:text-[#d4af37]">
                                    <X size={20} />
                                </button>
                            </form>

                            {/* Search Results */}
                            {searchQuery.length >= 2 && (
                                <div className="mt-6 max-h-[60vh] overflow-y-auto no-scrollbar">
                                    {isSearching ? (
                                        <div className="flex justify-center p-8">
                                            <div className="animate-spin text-[#d4af37] h-6 w-6 border-2 border-current border-t-transparent rounded-full" />
                                        </div>
                                    ) : searchResults?.length > 0 ? (
                                        <div className="flex flex-col gap-2">
                                            <p className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Products</p>
                                            {searchResults.slice(0, 5).map(product => (
                                                <Link 
                                                    key={product._id} 
                                                    to={`/product/${product._id}`}
                                                    onClick={() => setIsSearchOpen(false)}
                                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5 group"
                                                >
                                                    <div className="h-14 w-14 rounded-lg bg-white/5 overflow-hidden shrink-0 border border-white/5">
                                                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    </div>
                                                    <div className="flex flex-col min-w-0 flex-1">
                                                        <h4 className="text-[14px] font-medium text-[#f8f9fa] truncate group-hover:text-[#d4af37] transition-colors">{product.name}</h4>
                                                        <span className="text-[12px] text-[var(--color-text-secondary)] truncate">{product.category}</span>
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <span className="text-[14px] font-bold text-[#f8f9fa]">₹{product.price}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                            {searchResults.length > 5 && (
                                                <button onClick={handleSearchSubmit} className="mt-2 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[13px] font-medium text-[#d4af37] transition-colors">
                                                    View all {searchResults.length} results
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center p-8 text-[var(--color-text-secondary)] text-[14px]">
                                            No products found matching "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/50">
                            <Wheat size={22} className="text-[#d4af37]" strokeWidth={1.4} />
                        </div>
                        <div className="leading-none">
                            <p className="font-serif text-xl tracking-wide text-[#f8f9fa]">
                                MAKHANA
                                <span className="ml-1 text-[10px] font-sans tracking-[0.2em] text-[#d4af37] align-middle">
                                    HOUSE
                                </span>
                            </p>
                            <p className="mt-0.5 text-[9px] tracking-[0.25em] text-[var(--color-text-secondary)]">
                                BIHAR · MITHILA · INDIA
                            </p>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-8 lg:flex">
                        {navLinks.map(({ label, href, dropdown }) => {
                            const active = location.pathname === href;
                            return (
                                <Link
                                    key={label}
                                    to={href}
                                    className={`flex items-center gap-1 text-sm transition ${active
                                        ? "text-[#d4af37] border-b border-[#d4af37] pb-1"
                                        : "text-[#e4e4e7] hover:text-[#d4af37] pb-1"
                                        }`}
                                >
                                    {label}
                                    {dropdown && <ChevronDown size={13} />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            aria-label="Search"
                            onClick={() => setIsSearchOpen(true)}
                            className="text-[#e4e4e7] hover:text-[#d4af37] transition-colors"
                        >
                            <Search size={18} />
                        </button>
                        {userInfo ? (
                            <Link
                                to="/profile"
                                aria-label="Account"
                                className="hidden text-[#e4e4e7] hover:text-[#d4af37] sm:block relative group"
                            >
                                {userInfo.avatar ? (
                                    <img src={userInfo.avatar} alt={userInfo.name} className="w-6 h-6 rounded-full border border-[#d4af37]/50" />
                                ) : (
                                    <User size={18} />
                                )}
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="hidden text-[13px] font-medium whitespace-nowrap text-[#e4e4e7] hover:text-[#d4af37] sm:block"
                            >
                                Sign In
                            </Link>
                        )}
                        <Link
                            to="/profile/wishlist"
                            aria-label="Wishlist"
                            className="relative hidden text-[#e4e4e7] hover:text-[#d4af37] sm:block"
                        >
                            <Heart size={18} />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#d4af37] text-[9px] font-semibold text-[#080b14]">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>
                        <Link
                            to="/cart"
                            aria-label="Cart"
                            className="relative hidden text-[#e4e4e7] hover:text-[#d4af37] sm:block"
                        >
                            <ShoppingCart size={18} />
                            {cartItems.length > 0 && (
                                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#d4af37] text-[9px] font-semibold text-[#080b14]">
                                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                                </span>
                            )}
                        </Link>
                        <Link to="/export/new" className="hidden rounded-md border border-[#d4af37] bg-transparent px-5 py-2 text-sm font-semibold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14] lg:block">
                            Export Inquiry
                        </Link>
                        <button
                            className="text-[#e4e4e7] lg:hidden"
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile nav */}
                {menuOpen && (
                    <nav className="flex flex-col gap-1 border-t border-white/10 px-6 py-4 lg:hidden">
                        {navLinks.map(({ label, href }) => (
                            <Link
                                key={label}
                                to={href}
                                className="py-2 text-sm text-[#e4e4e7] hover:text-[#d4af37]"
                                onClick={() => setMenuOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}

                        {/* Mobile Actions */}
                        <div className="mt-2 flex items-center justify-around border-t border-white/10 pt-4">
                            {userInfo ? (
                                <Link
                                    to="/profile"
                                    className="flex flex-col items-center gap-1 text-[#e4e4e7] hover:text-[#d4af37]"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {userInfo.avatar ? (
                                        <img src={userInfo.avatar} alt={userInfo.name} className="w-5 h-5 rounded-full" />
                                    ) : (
                                        <User size={20} />
                                    )}
                                    <span className="text-[10px]">Profile</span>
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex flex-col items-center gap-1 text-[#e4e4e7] hover:text-[#d4af37]"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <User size={20} />
                                    <span className="text-[10px]">Sign In</span>
                                </Link>
                            )}
                            <Link
                                to="/profile/wishlist"
                                className="relative flex flex-col items-center gap-1 text-[#e4e4e7] hover:text-[#d4af37]"
                                onClick={() => setMenuOpen(false)}
                            >
                                <Heart size={20} />
                                {wishlistItems.length > 0 && (
                                    <span className="absolute -top-1 right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#d4af37] text-[8px] font-bold text-[#080b14]">
                                        {wishlistItems.length}
                                    </span>
                                )}
                                <span className="text-[10px]">Wishlist</span>
                            </Link>
                            <Link
                                to="/cart"
                                className="relative flex flex-col items-center gap-1 text-[#e4e4e7] hover:text-[#d4af37]"
                                onClick={() => setMenuOpen(false)}
                            >
                                <ShoppingCart size={20} />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#d4af37] text-[8px] font-bold text-[#080b14]">
                                        {cartItems.reduce((total, item) => total + item.quantity, 0)}
                                    </span>
                                )}
                                <span className="text-[10px]">Cart</span>
                            </Link>
                        </div>

                        <Link to="/export/new" onClick={() => setMenuOpen(false)} className="mt-4 block w-full text-center rounded-md bg-[#d4af37] px-5 py-3 text-sm font-semibold text-[#080b14]">
                            Export Inquiry
                        </Link>
                    </nav>
                )}
            </header>
        </>
    );
}
