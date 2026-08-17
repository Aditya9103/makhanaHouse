import { CheckCircle2, ArrowRight } from "lucide-react";

const benefits = [
    "Bulk Orders Welcome",
    "Competitive Pricing",
    "Private Label Packaging",
    "Timely Global Delivery",
    "Custom Specifications",
    "Quality Assurance",
];

export default function ExportHome() {
    return (
        <section className="py-8 lg:py-12">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div 
                    className="relative w-full overflow-hidden rounded-2xl border border-[#d4af37]/20 bg-[length:auto_100%] sm:bg-cover bg-right lg:bg-center shadow-2xl"
                    style={{ backgroundImage: 'url(/exportbg.png)' }}
                >
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#080b14]/95 via-[#080b14]/80 to-[#080b14]/30 lg:bg-gradient-to-r lg:from-[#080b14] lg:via-[#080b14]/90 lg:to-transparent"></div>

                    <div className="relative z-10 flex flex-col justify-between p-6 py-8 sm:p-10 lg:flex-row lg:items-end lg:p-12">
                        {/* Left Content */}
                        <div className="max-w-2xl">
                            <p className="mb-2 text-[11px] sm:text-xs font-semibold tracking-[0.18em] text-[#d4af37]">
                                GLOBAL REACH
                            </p>
                            <h2 className="mb-4 font-serif text-[1.75rem] leading-tight text-[#f8f9fa] sm:text-4xl lg:text-[2.6rem]">
                                Exporting Excellence Worldwide
                            </h2>
                            <p className="mb-6 text-[13px] sm:text-[14px] leading-relaxed text-[var(--color-text-secondary)] max-w-xl">
                                We supply premium quality Makhana in bulk to retailers,
                                distributors, and brands across the globe with reliable quality,
                                packaging, and timely delivery.
                            </p>

                            <div className="mb-8 grid grid-cols-1 gap-y-2.5 sm:grid-cols-2 sm:gap-x-8">
                                {benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex items-center gap-3 rounded-lg bg-[#080b14]/40 lg:bg-transparent p-3 lg:p-0 border border-white/5 lg:border-transparent backdrop-blur-sm lg:backdrop-blur-none">
                                        <CheckCircle2 size={16} className="text-[#d4af37] shrink-0" />
                                        <span className="text-[13px] text-[#e4e4e7] font-medium lg:font-normal">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <button className="group inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-md bg-[#d4af37] px-6 py-3.5 sm:py-3 text-[15px] sm:text-sm font-semibold text-[#080b14] transition hover:bg-[#c39d2e]">
                                    Export Inquiry
                                    <ArrowRight
                                        size={16}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </button>
                                <button className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-md border border-[#d4af37]/30 bg-[#080b14]/50 px-6 py-3.5 sm:py-3 text-[15px] sm:text-sm font-semibold text-[#f8f9fa] backdrop-blur-sm transition hover:bg-[#d4af37]/10">
                                    Learn More About Export
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="mt-8 lg:mt-0 lg:ml-auto">
                            <div className="flex flex-col rounded-xl border border-[#d4af37]/30 bg-[#080b14]/70 px-6 py-5 shadow-xl backdrop-blur-md">
                                <p className="text-[10px] text-[var(--color-text-secondary)] mb-1 uppercase tracking-wider">Trusted by Clients in</p>
                                <p className="text-3xl font-serif text-[#d4af37] my-0.5">25+</p>
                                <p className="text-[13px] text-[#f8f9fa]">Countries</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
