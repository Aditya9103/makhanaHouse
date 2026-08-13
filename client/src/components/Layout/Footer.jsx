import { Wheat, MessageCircle, Share2, Send, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-transparent pt-16">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <a href="#" className="flex items-center gap-3 mb-6">
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
                        </a>
                        <p className="mb-6 max-w-sm text-sm leading-relaxed text-[var(--color-text-secondary)]">
                            Delivering premium quality Makhana from Bihar Mithila to the world.
                            Naturally wholesome, globally trusted.
                        </p>
                        <div className="flex gap-4">
                            {[MessageCircle, Share2, Send, Globe].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#e4e4e7] transition hover:border-[#d4af37] hover:text-[#d4af37]"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-6 text-xs font-semibold tracking-[0.1em] text-[#e4e4e7]">
                            QUICK LINKS
                        </h4>
                        <ul className="flex flex-col gap-3 text-sm text-[var(--color-text-secondary)]">
                            <li><Link to="/" className="hover:text-[#d4af37]">Home</Link></li>
                            <li><Link to="/shop" className="hover:text-[#d4af37]">Shop</Link></li>
                            <li><Link to="#" className="hover:text-[#d4af37]">About Us</Link></li>
                            <li><Link to="#" className="hover:text-[#d4af37]">Blog</Link></li>
                            <li><Link to="#" className="hover:text-[#d4af37]">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Our Products */}
                    <div>
                        <h4 className="mb-6 text-xs font-semibold tracking-[0.1em] text-[#e4e4e7]">
                            OUR PRODUCTS
                        </h4>
                        <ul className="flex flex-col gap-3 text-sm text-[var(--color-text-secondary)]">
                            <li><a href="#" className="hover:text-[#d4af37]">Premium Makhana</a></li>
                            <li><a href="#" className="hover:text-[#d4af37]">Roasted Makhana</a></li>
                            <li><a href="#" className="hover:text-[#d4af37]">Flavored Makhana</a></li>
                            <li><a href="#" className="hover:text-[#d4af37]">Bulk Makhana</a></li>
                        </ul>
                    </div>

                    {/* Export */}
                    <div>
                        <h4 className="mb-6 text-xs font-semibold tracking-[0.1em] text-[#e4e4e7]">
                            EXPORT
                        </h4>
                        <ul className="flex flex-col gap-3 text-sm text-[var(--color-text-secondary)]">
                            <li><a href="#" className="hover:text-[#d4af37]">Bulk Orders</a></li>
                            <li><a href="#" className="hover:text-[#d4af37]">Private Label</a></li>
                            <li><a href="#" className="hover:text-[#d4af37]">Worldwide Shipping</a></li>
                            <li><a href="#" className="hover:text-[#d4af37]">Export Inquiry</a></li>
                        </ul>
                    </div>

                    {/* Customer Support & Newsletter */}
                    <div className="lg:col-span-1">
                        <h4 className="mb-6 text-xs font-semibold tracking-[0.1em] text-[#e4e4e7]">
                            CUSTOMER SUPPORT
                        </h4>
                        <ul className="mb-8 flex flex-col gap-3 text-sm text-[var(--color-text-secondary)]">
                            <li><a href="#" className="hover:text-[#d4af37]">FAQs</a></li>
                            <li><a href="#" className="hover:text-[#d4af37]">Shipping & Delivery</a></li>
                            <li><a href="#" className="hover:text-[#d4af37]">Returns & Refunds</a></li>
                            <li><a href="#" className="hover:text-[#d4af37]">Track Order</a></li>
                        </ul>

                        <h4 className="mb-4 text-xs font-semibold tracking-[0.1em] text-[#e4e4e7]">
                            NEWSLETTER
                        </h4>
                        <p className="mb-4 text-xs text-[var(--color-text-secondary)]">
                            Subscribe to get updates on new products, offers & more.
                        </p>
                        <form className="flex border border-white/10 rounded-md overflow-hidden focus-within:border-[#d4af37]">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white/5 px-4 py-2 text-sm text-[#f8f9fa] outline-none"
                            />
                            <button type="submit" className="bg-[#d4af37] px-4 py-2 text-[#080b14] hover:bg-[#c39d2e]">
                                <ArrowRight size={16} />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between border-t border-white/10 py-6 text-xs text-[var(--color-text-secondary)] sm:flex-row">
                    <p>© 2024 Prime Makhana. All Rights Reserved.</p>
                    <div className="mt-4 flex gap-4 sm:mt-0">
                        <a href="#" className="hover:text-[#d4af37]">Privacy Policy</a>
                        <span>|</span>
                        <a href="#" className="hover:text-[#d4af37]">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
