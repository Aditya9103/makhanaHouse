import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
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
    { label: "Shop", dropdown: true, href: "/shop" },
    { label: "About Us", href: "/about" },
    { label: "Export", href: "/export" },
    { label: "Quality", href: "/quality" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const { userInfo } = useSelector((state) => state.auth);

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
                            className="hidden text-[#e4e4e7] hover:text-[#d4af37] sm:block"
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
                                className="hidden text-[13px] font-medium text-[#e4e4e7] hover:text-[#d4af37] sm:block"
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
