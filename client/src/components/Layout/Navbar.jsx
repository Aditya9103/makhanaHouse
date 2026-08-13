import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Wheat,
    Mail,
    Phone,
    Search,
    User,
    ShoppingBag,
    ChevronDown,
    Menu,
    X,
    BadgeCheck,
    Tractor,
    ClipboardCheck,
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
    { label: "Makhana", dropdown: true, href: "#" },
    { label: "About Us", href: "#" },
    { label: "Export", href: "#" },
    { label: "Quality", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

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
                            info@primemakhana.com
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Phone size={13} className="text-[#d4af37]" />
                            +91 12345 67890
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
                                PRIME
                                <span className="ml-1 text-[10px] font-sans tracking-[0.2em] text-[#d4af37] align-middle">
                                    MAKHANA
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
                        <button
                            aria-label="Account"
                            className="hidden text-[#e4e4e7] hover:text-[#d4af37] sm:block"
                        >
                            <User size={18} />
                        </button>
                        <button
                            aria-label="Cart"
                            className="relative hidden text-[#e4e4e7] hover:text-[#d4af37] sm:block"
                        >
                            <ShoppingBag size={18} />
                            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#d4af37] text-[9px] font-semibold text-[#080b14]">
                                2
                            </span>
                        </button>
                        <button className="hidden rounded-md border border-[#d4af37] bg-transparent px-5 py-2 text-sm font-semibold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14] lg:block">
                            Get in Touch
                        </button>
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
                        <button className="mt-3 rounded-md bg-[#d4af37] px-5 py-2.5 text-sm font-semibold text-[#080b14]">
                            Get in Touch
                        </button>
                    </nav>
                )}
            </header>
        </>
    );
}
