import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function ExportProducts() {
    const products = [
        { name: "Raw Makhana", img: "/makhanabowl.png" },
        { name: "Roasted Makhana (Plain)", img: "/homehero2.png" },
        { name: "Roasted Makhana (Flavored)", img: "/process2.png" },
        { name: "Salted Makhana", img: "/makhanabowl.png" },
        { name: "Organic Makhana", img: "/homehero2.png" },
        { name: "Private Label Makhana", img: "/process2.png" }
    ];

    return (
        <section className="bg-[#0a0d18] py-16 lg:py-24 border-y border-white/5">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="mb-4 font-serif text-3xl leading-tight text-[#f8f9fa] sm:text-4xl">
                        Products Available
                    </h2>
                    {/* Decorative Divider */}
                    <div className="mx-auto flex items-center justify-center gap-3">
                        <div className="h-[1px] w-8 bg-[#d4af37]/40"></div>
                        <div className="h-1.5 w-1.5 rotate-45 border border-[#d4af37]"></div>
                        <div className="h-[1px] w-8 bg-[#d4af37]/40"></div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="relative mb-12">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
                        {products.map((product, idx) => (
                            <div key={idx} className="group flex flex-col items-center rounded-xl border border-white/5 bg-[#080b14] p-4 transition hover:border-[#d4af37]/30">
                                <div className="mb-4 aspect-square w-full overflow-hidden rounded-lg bg-black/20 p-2">
                                    <img 
                                        src={product.img} 
                                        alt={product.name} 
                                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-center text-[13px] font-medium text-[#e4e4e7] group-hover:text-[#d4af37]">
                                    {product.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                    
                    {/* Navigation Arrows (desktop only placeholder) */}
                    <button className="absolute -left-5 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#080b14] p-2 text-white/50 transition hover:border-[#d4af37] hover:text-[#d4af37] xl:flex">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="absolute -right-5 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#080b14] p-2 text-white/50 transition hover:border-[#d4af37] hover:text-[#d4af37] xl:flex">
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* View All Button */}
                <div className="flex justify-center">
                    <button className="inline-flex items-center gap-2 rounded-md border border-[#d4af37] bg-transparent px-8 py-2.5 text-[13px] font-semibold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]">
                        View All Products
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
}
