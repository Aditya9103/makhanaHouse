import { useRef } from "react";
import { Link } from "react-router-dom";
import {
    ChevronLeft,
    ChevronRight,
    Star,
    ShoppingCart,
    Sprout,
    ShieldCheck,
    Package,
    Truck,
    Heart,
} from "lucide-react";

import { productsData as products } from "../../data/productDetailData";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const features = [
    {
        icon: Sprout,
        title: "Farm Fresh",
        subtitle: "Directly from trusted farmers",
    },
    {
        icon: ShieldCheck,
        title: "Hygienically Processed",
        subtitle: "Clean, sorted & quality checked",
    },
    {
        icon: Package,
        title: "Premium Packaging",
        subtitle: "Locks freshness & nutrition",
    },
    {
        icon: Truck,
        title: "Fast Delivery",
        subtitle: "Across India & Worldwide",
    },
];

function StarRow({ rating }) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={13}
                    className={
                        i < rating
                            ? "fill-[#d4af37] text-[#d4af37]"
                            : "fill-transparent text-[#4a4636]"
                    }
                />
            ))}
        </div>
    );
}

function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

    return (
        <div className="flex w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.666rem)] lg:w-[calc(25%-0.75rem)] xl:w-[calc(20%-0.8rem)] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-[#d4af37]/40">
            <div className="relative aspect-square bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
                {product.badge && (
                    <span className="absolute left-2 top-2 rounded bg-[#d4af37] px-1.5 py-0.5 sm:px-2 sm:py-1 text-[9px] sm:text-[10px] font-semibold text-[#080b14] z-10 shadow-sm">
                        {product.badge}
                    </span>
                )}
                <button 
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-2 right-2 transition-colors z-20 ${isInWishlist(product.id) ? 'text-[#d4af37]' : 'text-white/40 hover:text-[#d4af37]'}`}
                >
                    <Heart size={16} className={isInWishlist(product.id) ? 'fill-[#d4af37]' : ''} />
                </button>
                <Link to={`/product/${product.slug}`} className="absolute inset-0 overflow-hidden group block z-0">
                    <img 
                        src="/homehero2.png" 
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Subtle gradient overlay to make it blend with the dark theme */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080b14]/80 to-transparent"></div>
                </Link>
            </div>

            <div className="flex flex-1 flex-col gap-1 sm:gap-1.5 p-3 sm:p-4">
                <Link to={`/product/${product.slug}`} className="block">
                    <h3 className="text-xs sm:text-sm lg:text-[15px] font-medium leading-snug text-[#f4f4f5] hover:text-[#d4af37] transition-colors truncate">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-[10px] sm:text-xs text-[var(--color-text-secondary)] truncate">{product.tag}</p>

                <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1">
                    <div className="scale-75 sm:scale-100 origin-left flex">
                        <StarRow rating={product.rating} />
                    </div>
                    <span className="text-[9px] sm:text-[11px] text-[var(--color-text-secondary)]">
                        ({product.reviews})
                    </span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2 sm:pt-3">
                    <p className="text-sm sm:text-base lg:text-lg font-semibold text-[#f4f4f5]">
                        ₹{product.price}
                        <span className="ml-0.5 sm:ml-1 text-[9px] sm:text-[11px] font-normal text-[var(--color-text-secondary)]">
                            /{product.weight}
                        </span>
                    </p>
                    <button
                        onClick={() => addToCart(product, 1, product.weight)}
                        aria-label={`Add ${product.name} to cart`}
                        className="flex h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full border border-[#d4af37]/40 text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]"
                    >
                        <ShoppingCart size={14} className="sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px]" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ShopHome() {
    const scrollerRef = useRef(null);

    const scrollBy = (dir) => {
        scrollerRef.current?.scrollBy({
            left: dir * 250,
            behavior: "smooth",
        });
    };

    return (
        <section className="py-8 lg:py-12">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                {/* Header row */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
                    <div>
                        <p className="mb-2 text-[11px] sm:text-xs font-semibold tracking-[0.18em] text-[#d4af37]">
                            OUR PREMIUM RANGE
                        </p>
                        <h2 className="font-serif text-[1.75rem] leading-tight text-[#f8f9fa] sm:text-3xl lg:text-[2.1rem]">
                            Shop Best Quality Makhana
                        </h2>
                    </div>
                    <button className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-[#d4af37]/40 px-5 py-3 sm:py-2.5 text-sm font-medium text-[#f8f9fa] transition hover:border-[#d4af37] hover:bg-[#d4af37]/10">
                        View All Products
                        <ChevronRight size={15} />
                    </button>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <button
                        onClick={() => scrollBy(-1)}
                        aria-label="Scroll left"
                        className="absolute -left-4 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#080b14] text-[#d4af37] shadow-lg transition hover:bg-[#d4af37] hover:text-[#080b14] sm:flex"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <div
                        ref={scrollerRef}
                        className="scrollbar-none flex snap-x gap-4 overflow-x-auto scroll-smooth pb-2"
                    >
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>

                    <button
                        onClick={() => scrollBy(1)}
                        aria-label="Scroll right"
                        className="absolute -right-4 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#080b14] text-[#d4af37] shadow-lg transition hover:bg-[#d4af37] hover:text-[#080b14] sm:flex"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* Feature strip */}
                <div className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map(({ icon: Icon, title, subtitle }) => (
                        <div key={title} className="flex items-start gap-4 sm:gap-3 rounded-lg border border-white/5 bg-[#080b14]/50 p-4 sm:border-transparent sm:bg-transparent sm:p-0">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/10 sm:h-auto sm:w-auto sm:bg-transparent">
                                <Icon size={20} className="text-[#d4af37] sm:mt-0.5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.4} />
                            </div>
                            <div>
                                <p className="text-[15px] sm:text-sm font-semibold text-[#f8f9fa] sm:font-medium sm:text-[#f4f4f5]">{title}</p>
                                <p className="mt-0.5 text-[13px] sm:mt-0 sm:text-xs text-[#e4e4e7]/80 sm:text-[var(--color-text-secondary)]">{subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}