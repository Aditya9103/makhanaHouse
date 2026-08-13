export default function ExportPackaging() {
    const packagingOptions = [
        { name: "Retail Packs", desc: "25g - 500g", img: "/makhanapackaging.png" },
        { name: "Bulk Packs", desc: "5kg - 25kg", img: "/makhanapackaging.png" },
        { name: "Private Label Stand-up Pouches", desc: "", img: "/yourbrandpackage.png" },
        { name: "Vacuum & Nitrogen Packs", desc: "", img: "/makhanapackaging.png" },
        { name: "Custom Cartons", desc: "", img: "/yourbrandpackage.png" }
    ];

    return (
        <section className="bg-[#0a0d18] py-16 lg:py-24 border-y border-white/5">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
                    
                    {/* Left Text */}
                    <div className="w-full lg:w-1/4">
                        <h2 className="mb-4 font-serif text-3xl leading-tight text-[#f8f9fa] sm:text-4xl">
                            Packaging Options
                        </h2>
                        <div className="mb-6 h-[1px] w-12 bg-[#d4af37]/40"></div>
                        <p className="text-[14px] leading-relaxed text-[#e4e4e7]">
                            Custom packaging solutions to meet your market needs. Available in multiple sizes and formats.
                        </p>
                    </div>

                    {/* Right Grid */}
                    <div className="w-full lg:w-3/4">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
                            {packagingOptions.map((pack, idx) => (
                                <div key={idx} className="group flex flex-col items-center rounded-xl border border-white/5 bg-[#080b14] p-4 transition hover:border-[#d4af37]/30">
                                    <div className="mb-4 aspect-[4/5] w-full overflow-hidden rounded-lg bg-black/20 p-3 flex items-center justify-center">
                                        <img 
                                            src={pack.img} 
                                            alt={pack.name} 
                                            className="h-full w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="text-center text-[13px] font-semibold text-[#f8f9fa]">
                                        {pack.name}
                                    </h3>
                                    {pack.desc && (
                                        <p className="mt-1 text-center text-[12px] text-[#d4af37]">
                                            {pack.desc}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
