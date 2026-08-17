const steps = [
    {
        num: "1",
        title: "Harvesting",
        desc: "Carefully harvested from natural wetlands at the right time.",
        img: "/process1.png",
    },
    {
        num: "2",
        title: "Cleaning",
        desc: "Sun-dried and cleaned to remove impurities.",
        img: "/process2.png",
    },
    {
        num: "3",
        title: "Processing",
        desc: "Lightly roasted or flavored using traditional methods.",
        img: "/process3.png",
    },
    {
        num: "4",
        title: "Quality Check",
        desc: "Stringent quality checks ensure only the best reaches you.",
        img: "/process4.png",
    },
    {
        num: "5",
        title: "Packaging",
        desc: "Packed with care in premium, food-safe packaging.",
        img: "/process5.png",
    },
];

export default function AboutProcess() {
    return (
        <section className="py-8 lg:py-12 border-t border-white/10 bg-[linear-gradient(135deg,rgba(8,11,20,0.4),rgba(212,175,55,0.02))]">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div className="relative overflow-hidden rounded-xl border border-[#d4af37]/30 bg-[#080b14] p-8 lg:p-12 shadow-2xl">
                    <div className="flex flex-col gap-12 xl:flex-row xl:items-center">
                        
                        {/* Left - Content */}
                        <div className="flex-shrink-0 xl:w-[32%]">
                            <div className="mb-4 flex items-center gap-2 text-[#d4af37]">
                                <span className="font-serif italic text-xl">Our Process</span>
                            </div>
                            
                            <h2 className="mb-4 font-serif text-3xl leading-tight text-[#f8f9fa] sm:text-4xl lg:text-[2.5rem]">
                                Purity in Every Step
                            </h2>
                            
                            {/* Decorative Divider */}
                            <div className="mb-6 flex items-center gap-3">
                                <div className="h-[1px] w-8 bg-[#d4af37]/40"></div>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#d4af37]" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C12 22 19 18 19 12C19 8 16 5 12 5C8 5 5 8 5 12C5 18 12 22 12 22Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 15C12 15 15 12 15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 15C12 15 9 12 9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="h-[1px] w-8 bg-[#d4af37]/40"></div>
                            </div>
                            
                            <p className="mb-8 max-w-xl text-[13px] sm:text-[14px] leading-relaxed text-[#e4e4e7] text-center xl:text-left">
                                From harvesting in the pristine wetlands to hygienic processing and packaging, we ensure quality and purity at every step.
                            </p>
                            
                            <div className="flex justify-center xl:justify-start">
                                <button className="inline-flex w-full sm:w-auto justify-center items-center gap-3 rounded-md bg-[#d4af37] px-6 py-3.5 sm:py-2.5 text-[14px] sm:text-[13px] font-medium text-[#080b14] transition hover:bg-[#c39b2e]">
                                    Explore Our Quality
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Right - Steps Container */}
                        <div className="relative flex-grow xl:w-[68%] mt-8 xl:mt-0">
                            {/* Dotted connecting line (desktop only) */}
                            <div className="absolute top-[3.25rem] left-[10%] right-[10%] hidden items-center justify-between xl:flex">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="flex flex-grow items-center justify-center">
                                        <div className="h-[1px] w-full border-t border-dashed border-[#d4af37]/50"></div>
                                        <div className="h-2 w-2 rotate-45 border-r border-t border-[#d4af37]/50"></div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 xl:grid-cols-5 xl:gap-4">
                                {steps.map((step, idx) => (
                                    <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                                        {/* Circle Image with dashed border */}
                                        <div className="mb-5 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border border-dashed border-[#d4af37] bg-[#080b14] p-1.5 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                                            <div className="h-full w-full overflow-hidden rounded-full border border-[#d4af37]/20">
                                                <img
                                                    src={step.img}
                                                    alt={step.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                                />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <h3 className="mb-2 text-[14px] font-semibold text-[#d4af37]">
                                            {step.num}. {step.title}
                                        </h3>
                                        <p className="text-[12px] leading-relaxed text-[#e4e4e7] px-1">
                                            {step.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
