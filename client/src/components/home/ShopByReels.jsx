import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Loader2, Play } from "lucide-react";
import { useGetProductsQuery } from "../../store/api/productApiSlice";

function ReelCard({ product }) {
    const variation = product.variations?.[0];
    const price = variation ? variation.price : 0;
    const discountedPrice = variation?.discountedPrice || null;
    const effectivePrice = discountedPrice || price;

    const hasDiscount = !!discountedPrice && discountedPrice < price;
    const originalPriceToShow = hasDiscount ? price : Math.round(price * 1.2); 
    const discountPercent = hasDiscount 
        ? Math.round(((price - discountedPrice) / price) * 100)
        : 20;

    const navigate = useNavigate();

    return (
        <div 
            className="relative shrink-0 snap-start w-[calc(50%-8px)] md:w-[calc(25%-12px)] xl:w-[calc(20%-12.8px)] aspect-[9/16] rounded-2xl overflow-hidden group border border-white/5 shadow-2xl bg-black cursor-pointer"
            onClick={() => navigate(`/reels/${product._id}`)}
        >
            <video
                src={product.video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

            {/* Content at Bottom */}
            <div className="absolute bottom-0 left-0 w-full p-2 sm:p-3 flex flex-col gap-1.5 sm:gap-2 z-20">
                <div className="flex items-center gap-2 sm:gap-2.5 p-1.5 sm:p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                    <img
                        src={product.images?.[0] || "/makhanabowl.png"}
                        alt={product.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover bg-white shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <h3 className="text-[10px] sm:text-xs font-semibold text-white truncate">{product.name}</h3>
                        <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 flex-wrap">
                            <span className="text-white font-bold text-[11px] sm:text-xs">₹{effectivePrice.toFixed(0)}</span>
                            <span className="text-white/60 text-[8px] sm:text-[10px] line-through">₹{hasDiscount ? price.toFixed(0) : originalPriceToShow.toFixed(0)}</span>
                            <span className="bg-red-500 text-white text-[8px] sm:text-[9px] px-1 py-0.5 rounded font-bold">-{discountPercent}%</span>
                        </div>
                    </div>
                </div>

                <Link
                    to={`/product/${product.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-1.5 sm:py-2 bg-white text-black font-bold rounded-lg text-center hover:bg-gray-100 transition shadow-lg text-[10px] sm:text-xs"
                >
                    Shop now
                </Link>
            </div>
        </div>
    );
}

export default function ShopByReels() {
    const { data: products, isLoading, error } = useGetProductsQuery();
    const scrollerRef = useRef(null);

    const scrollBy = (direction) => {
        if (scrollerRef.current) {
            const width = scrollerRef.current.offsetWidth;
            const scrollAmount = direction > 0 ? width * 0.75 : -width * 0.75;
            scrollerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const reelProducts = products?.filter(p => p.video) || [];

    if (!isLoading && reelProducts.length === 0) return null;

    return (
        <section className="py-8 lg:py-12  relative border-t border-white/10">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-[10%] w-[30%] h-[50%] bg-[#d4af37]/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
                    <div>
                        <p className="mb-2 text-[11px] sm:text-xs font-semibold tracking-[0.18em] text-[#d4af37]">
                            DISCOVER
                        </p>
                        <h2 className="font-serif text-[1.75rem] leading-tight text-[#f8f9fa] sm:text-3xl lg:text-[2.1rem]">
                            Shop By Reels
                        </h2>
                    </div>
                    <Link
                        to="/shop"
                        className="group flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-semibold text-[#f8f9fa] transition-all hover:border-[#d4af37]/30 hover:bg-[#d4af37]/10 hover:text-[#d4af37] sm:text-sm"
                    >
                        View All Products
                        <ChevronRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <button
                        onClick={() => scrollBy(-1)}
                        aria-label="Scroll left"
                        className="absolute -left-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white shadow-lg transition hover:bg-white hover:text-black sm:flex"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div
                        ref={scrollerRef}
                        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 px-4 sm:px-0"
                    >
                        {isLoading ? (
                            <div className="w-full flex justify-center py-20 text-[#d4af37]">
                                <Loader2 size={40} className="animate-spin" />
                            </div>
                        ) : error ? (
                            <div className="w-full text-center py-12 text-red-400">Failed to load reels.</div>
                        ) : (
                            reelProducts.map((p) => (
                                <ReelCard key={p._id} product={p} />
                            ))
                        )}
                    </div>

                    <button
                        onClick={() => scrollBy(1)}
                        aria-label="Scroll right"
                        className="absolute -right-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white shadow-lg transition hover:bg-white hover:text-black sm:flex"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}
