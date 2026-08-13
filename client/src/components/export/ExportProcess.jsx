import { ClipboardList, Calculator, Handshake, FileCheck2, Factory, Ship } from "lucide-react";

export default function ExportProcess() {
    const steps = [
        { icon: ClipboardList, name: "Inquiry" },
        { icon: Calculator, name: "Quotation" },
        { icon: Handshake, name: "Negotiation" },
        { icon: FileCheck2, name: "Purchase Order" },
        { icon: Factory, name: "Export Processing" },
        { icon: Ship, name: "Shipment" }
    ];

    return (
        <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="mb-4 font-serif text-3xl leading-tight text-[#f8f9fa] sm:text-4xl">
                        Our Export Process
                    </h2>
                    <div className="mx-auto flex items-center justify-center gap-3">
                        <div className="h-[1px] w-8 bg-[#d4af37]/40"></div>
                        <div className="h-1.5 w-1.5 rotate-45 border border-[#d4af37]"></div>
                        <div className="h-[1px] w-8 bg-[#d4af37]/40"></div>
                    </div>
                </div>

                {/* Steps Container */}
                <div className="relative">
                    {/* Dotted connecting line (desktop only) */}
                    <div className="absolute top-[2.25rem] left-[10%] right-[10%] hidden items-center justify-between xl:flex">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex flex-grow items-center justify-center">
                                <div className="h-[1px] w-full border-t-2 border-dashed border-[#d4af37]/30"></div>
                                <div className="h-2 w-2 rotate-45 border-r border-t border-[#d4af37]/30"></div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 xl:grid-cols-6 xl:gap-4">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                                <div className="mb-4 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-dashed border-[#d4af37] bg-[#080b14] p-1.5 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                                    <div className="flex h-full w-full items-center justify-center rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-[#d4af37]">
                                        <step.icon size={24} strokeWidth={1.5} />
                                    </div>
                                </div>
                                <h3 className="text-[13px] font-semibold text-[#e4e4e7]">
                                    {step.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
