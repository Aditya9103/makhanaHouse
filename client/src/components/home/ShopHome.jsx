import { useRef } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Star,
    ShoppingCart,
    Sprout,
    ShieldCheck,
    Package,
    Truck,
} from "lucide-react";

const products = [
    {
        id: 1,
        name: "Premium Makhana",
        tag: "Super Quality | Big Size",
        price: 299,
        weight: "250g",
        rating: 5,
        reviews: 128,
        badge: null,
    },
    {
        id: 2,
        name: "Roasted Makhana",
        tag: "Lightly Salted | Crunchy",
        price: 249,
        weight: "250g",
        rating: 5,
        reviews: 96,
        badge: "Bestseller",
    },
    {
        id: 3,
        name: "Peri Peri Makhana",
        tag: "Spicy & Tasty | Roasted",
        price: 279,
        weight: "250g",
        rating: 4,
        reviews: 84,
        badge: null,
    },
    {
        id: 4,
        name: "Himalayan Pink Salt Makhana",
        tag: "Healthy & Delicious",
        price: 259,
        weight: "250g",
        rating: 4,
        reviews: 73,
        badge: null,
    },
    {
        id: 5,
        name: "Chocolate Makhana",
        tag: "Healthy Snack | Kids Favorite",
        price: 299,
        weight: "250g",
        rating: 4,
        reviews: 58,
        badge: null,
    },
];

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
    return (
        <div className="flex w-[220px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-[#d4af37]/40 sm:w-[230px]">
            <div className="relative aspect-square bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
                {product.badge && (
                    <span className="absolute left-2 top-2 rounded-md bg-[#d4af37] px-2 py-0.5 text-[10px] font-semibold text-[#080b14]">
                        {product.badge}
                    </span>
                )}
                <div className="flex h-full items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af37]/30">
                        <Sprout size={26} className="text-[#d4af37]" strokeWidth={1.3} />
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-1.5 p-3.5">
                <h3 className="text-[13.5px] font-medium leading-snug text-[#f4f4f5]">
                    {product.name}
                </h3>
                <p className="text-[11.5px] text-[var(--color-text-secondary)]">{product.tag}</p>

                <div className="flex items-center gap-1.5">
                    <StarRow rating={product.rating} />
                    <span className="text-[11px] text-[var(--color-text-secondary)]">
                        ({product.reviews})
                    </span>
                </div>

                <div className="mt-1 flex items-center justify-between">
                    <p className="text-[15px] font-semibold text-[#f4f4f5]">
                        ₹{product.price}
                        <span className="ml-1 text-[11px] font-normal text-[var(--color-text-secondary)]">
                            /{product.weight}
                        </span>
                    </p>
                    <button
                        aria-label={`Add ${product.name} to cart`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d4af37]/40 text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]"
                    >
                        <ShoppingCart size={14} />
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
        <section className=" py-16 lg:py-20">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                {/* Header row */}
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-[#d4af37]">
                            OUR PREMIUM RANGE
                        </p>
                        <h2 className="font-serif text-3xl text-[#f8f9fa] sm:text-[2.1rem]">
                            Shop Best Quality Makhana
                        </h2>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-md border border-[#d4af37]/40 px-5 py-2.5 text-sm font-medium text-[#f8f9fa] transition hover:border-[#d4af37] hover:bg-[#d4af37]/10">
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
                <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
                    {features.map(({ icon: Icon, title, subtitle }) => (
                        <div key={title} className="flex items-start gap-3">
                            <Icon size={22} className="mt-0.5 shrink-0 text-[#d4af37]" strokeWidth={1.4} />
                            <div>
                                <p className="text-sm font-medium text-[#f4f4f5]">{title}</p>
                                <p className="text-xs text-[var(--color-text-secondary)]">{subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}