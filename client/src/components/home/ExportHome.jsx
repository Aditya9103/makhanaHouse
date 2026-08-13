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
        <section className="py-10 lg:py-16">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div 
                    className="relative w-full overflow-hidden rounded-2xl border border-[#d4af37]/20 bg-cover bg-center shadow-2xl"
                    style={{ backgroundImage: 'url(/exportbg.png)' }}
                >
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#080b14] via-[#080b14]/80 to-transparent"></div>

                    <div className="relative z-10 flex flex-col justify-between p-6 sm:p-10 lg:flex-row lg:items-end lg:p-12">
                        {/* Left Content */}
                        <div className="max-w-2xl">
                            <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[#d4af37]">
                                GLOBAL REACH
                            </p>
                            <h2 className="mb-4 font-serif text-3xl leading-tight text-[#f8f9fa] sm:text-4xl lg:text-[2.6rem]">
                                Exporting Excellence
                                <br />
                                Worldwide
                            </h2>
                            <p className="mb-6 text-[14px] leading-relaxed text-[var(--color-text-secondary)] max-w-xl">
                                We supply premium quality Makhana in bulk to retailers,
                                distributors, and brands across the globe with reliable quality,
                                packaging, and timely delivery.
                            </p>

                            <div className="mb-8 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-8">
                                {benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex items-center gap-2.5">
                                        <CheckCircle2 size={16} className="text-[#d4af37]" />
                                        <span className="text-[13px] text-[#e4e4e7]">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <button className="group inline-flex items-center gap-2 rounded-md bg-[#d4af37] px-6 py-3 text-sm font-semibold text-[#080b14] transition hover:bg-[#c39d2e]">
                                    Export Inquiry
                                    <ArrowRight
                                        size={16}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </button>
                                <button className="inline-flex items-center gap-2 rounded-md border border-[#d4af37]/30 bg-[#080b14]/50 px-6 py-3 text-sm font-semibold text-[#f8f9fa] backdrop-blur-sm transition hover:bg-[#d4af37]/10">
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
