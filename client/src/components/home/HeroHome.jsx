import { ArrowRight, Leaf, ShieldCheck, Wheat, MapPin, Globe2 } from "lucide-react";

const trustPoints = [
    { icon: Leaf, title: "100% Natural", subtitle: "No Preservatives" },
    { icon: ShieldCheck, title: "Rich in Protein", subtitle: "& Antioxidants" },
    { icon: Wheat, title: "Gluten Free", subtitle: "& Vegan" },
    { icon: MapPin, title: "Source from", subtitle: "Bihar, India" },
];

export default function HeroHome() {
    return (
        <section
            className="relative overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: 'url(/homeherobg.png)' }}
        >
            {/* Dark overlay to ensure text remains readable against the background */}
            <div className="absolute inset-0 bg-[#080b14]/60"></div>

            <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 pb-16 pt-8 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:px-10 lg:pb-24 lg:pt-12">
                {/* Left column — copy */}
                <div className="flex flex-col justify-center">
                    <p className="mb-4 flex items-center gap-2 font-serif text-sm italic tracking-wide text-[#d4af37]">
                        From the Heart of Mithila to the World
                    </p>

                    <h1 className="font-serif text-4xl leading-[1.15] text-[#f8f9fa] sm:text-5xl lg:text-[3.4rem]">
                        Bihar Mithila Makhana,
                        <br />
                        <span className="text-[#d4af37]">Pride of India.</span>
                        <br />
                        Trusted Worldwide.
                    </h1>

                    <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                        Grown in the fertile wetlands of Bihar, nourished by tradition,
                        crafted for wellness, delivered to the world.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <button className="group inline-flex items-center gap-2 rounded-md bg-[#d4af37] px-6 py-3 text-sm font-semibold text-[#080b14] transition hover:bg-[#c39d2e]">
                            Shop Makhana
                            <ArrowRight
                                size={16}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-md border border-[#d4af37]/50 px-6 py-3 text-sm font-semibold text-[#f8f9fa] transition hover:border-[#d4af37] hover:bg-[#d4af37]/10">
                            Bulk &amp; Export Inquiry
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    {/* Trust strip */}
                    <div className="mt-12 grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-x-4">
                        {trustPoints.map(({ icon: Icon, title, subtitle }) => (
                            <div key={title} className="flex flex-col items-start gap-2">
                                <Icon size={22} className="text-[#d4af37]" strokeWidth={1.5} />
                                <div className="text-xs leading-tight text-[#e4e4e7]">
                                    <p className="font-medium">{title}</p>
                                    <p className="text-[var(--color-text-secondary)]">{subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right column — visual */}
                <div className="relative flex items-center justify-center">
                    {/* India map marker chip */}
                    <div className="absolute left-2 top-2 hidden items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#080b14]/60 px-3 py-1.5 backdrop-blur-md sm:flex">
                        <MapPin size={14} className="text-[#d4af37]" />
                        <span className="text-xs tracking-wide text-[#d4af37]">
                            MITHILA · BIHAR
                        </span>
                    </div>

                    {/* Product / bowl visual */}
                    {/* <div className="relative aspect-[4/3] w-full max-w-xl overflow-hidden  shadow-2xl flex items-center justify-center">
                        <img
                            src="/homehero2.png"
                            alt="Bihar Mithila Makhana"
                            className="h-full w-full object-cover object-center"
                        />
                    </div> */}

                    {/* Exporting badge */}
                    <div className="absolute -bottom-2 right-2 flex items-center gap-3 rounded-xl border border-[#d4af37]/30 bg-[#080b14]/80 px-4 py-3 shadow-xl backdrop-blur-md sm:-bottom-4 sm:right-0">
                        <Globe2 size={28} className="text-[#d4af37]" strokeWidth={1.3} />
                        <div className="text-left">
                            <p className="text-lg font-semibold leading-none text-[#f8f9fa]">
                                25+
                            </p>
                            <p className="text-[11px] text-[var(--color-text-secondary)]">Countries</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}