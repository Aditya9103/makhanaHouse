const promises = [
    {
        title: "100% Natural",
        desc: "No preservatives, no additives. Just pure Makhana.",
        img: "/promise1.png",
    },
    {
        title: "Premium Quality",
        desc: "Carefully selected and processed to deliver the best.",
        img: "/promise2.png",
    },
    {
        title: "Direct from Farmers",
        desc: "Sourced directly from trusted farmers in Mithila, Bihar.",
        img: "/promise3.png",
    },
    {
        title: "Rich in Nutrition",
        desc: "High in protein, low in calories and packed with nutrients.",
        img: "/promise4.png",
    },
    {
        title: "Export Worldwide",
        desc: "Delivering the taste of Mithila to your kitchen across the globe.",
        img: "/promise5.png",
    },
    {
        title: "Sustainable Practices",
        desc: "Eco-friendly packaging and responsible sourcing.",
        img: "/promise6.png",
    },
];

export default function AboutPromise() {
    return (
        <section className="pt-4 pb-8 lg:pt-8 lg:pb-12">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                
                {/* Header */}
                <div className="mb-16 text-center">
                    <p className="mb-3 font-script text-2xl text-[#d4af37]">
                        Why Choose Makhana House
                    </p>
                    <h2 className="mb-4 font-serif text-3xl leading-tight text-[#f8f9fa] sm:text-4xl lg:text-5xl">
                        Our Promise to You
                    </h2>
                    <div className="mx-auto mt-6 flex max-w-xs items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-[#d4af37]/30"></div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#d4af37]">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="h-[1px] w-12 bg-[#d4af37]/30"></div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                    {promises.map((item, idx) => (
                        <div 
                            key={idx} 
                            className="group flex flex-col items-center rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center transition hover:border-[#d4af37]/30 hover:bg-white/[0.04]"
                        >
                            <div className="relative mb-6 h-48 w-48 overflow-hidden rounded-full border-2 border-[#d4af37]/40 p-1 shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-transform duration-500 group-hover:scale-105">
                                <div className="h-full w-full overflow-hidden rounded-full">
                                    <img 
                                        src={item.img} 
                                        alt={item.title} 
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <h3 className="mb-3 text-[17px] font-semibold text-[#d4af37]">
                                {item.title}
                            </h3>
                            <p className="text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
