import { Leaf, Hand, ShieldCheck, Box, Boxes, BadgeDollarSign } from "lucide-react";

export default function ExportWhyChoose() {
    const reasons = [
        {
            icon: Leaf,
            title: "100% Natural",
            desc: "No additives. No preservatives."
        },
        {
            icon: Hand,
            title: "Handpicked",
            desc: "Carefully selected for premium quality."
        },
        {
            icon: ShieldCheck,
            title: "Hygienically Processed",
            desc: "Clean & sorted with care."
        },
        {
            icon: Boxes,
            title: "Consistent Supply",
            desc: "Reliability you can count on."
        },
        {
            icon: BadgeDollarSign,
            title: "Competitive Pricing",
            desc: "Best value for your business."
        }
    ];

    return (
        <section className="py-8 lg:py-12">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                {/* Header */}
                <div className="mb-1 text-center">
                    <p className="mb-1 font-script text-2xl text-[#d4af37]">
                        Why Importers Choose
                    </p>
                    <h2 className="mb-4 font-serif text-3xl leading-tight text-[#f8f9fa] sm:text-4xl lg:text-[2.5rem]">
                        Prime Makhana
                    </h2>
                    {/* Decorative Divider */}
                    <div className="mx-auto flex items-center justify-center gap-3">
                        <div className="h-[1px] w-8 bg-[#d4af37]/40"></div>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#d4af37]" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C12 22 19 18 19 12C19 8 16 5 12 5C8 5 5 8 5 12C5 18 12 22 12 22Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="h-[1px] w-8 bg-[#d4af37]/40"></div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center xl:gap-10 w-full">
                    {/* Left Image */}
                    <div className="w-48 lg:w-56 xl:w-64 shrink-0">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-[#d4af37]/5 blur-3xl"></div>
                            <img
                                src="/homehero2.png"
                                alt="Premium Makhana"
                                className="relative z-10 w-full drop-shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                            />
                        </div>
                    </div>

                    {/* Right Features Row */}
                    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-nowrap xl:justify-center border-y border-white/5 py-6 lg:border-none lg:py-0">
                        {reasons.map((reason, idx) => (
                            <div key={idx} className={`flex items-start gap-3 xl:gap-4 ${idx !== 0 ? 'xl:border-l xl:border-white/10 xl:pl-6' : ''}`}>
                                <div className="flex mt-1 text-[#d4af37] shrink-0">
                                    <reason.icon size={24} strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="mb-1 text-[13px] xl:text-[14px] font-semibold text-[#f8f9fa] leading-tight">
                                        {reason.title}
                                    </h4>
                                    <p className="text-[11px] xl:text-[12px] leading-snug text-[#e4e4e7]/70 max-w-[120px]">
                                        {reason.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
