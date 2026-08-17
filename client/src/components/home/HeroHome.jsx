import { ArrowRight, Leaf, ShieldCheck, Wheat, MapPin, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";

const trustPoints = [
    { icon: Leaf, title: "100% Natural", subtitle: "No Preservatives" },
    { icon: ShieldCheck, title: "Rich in Protein", subtitle: "& Antioxidants" },
    { icon: Wheat, title: "Gluten Free", subtitle: "& Vegan" },
    { icon: MapPin, title: "Source from", subtitle: "Bihar, India" },
];

export default function HeroHome() {
    return (
        <section
            className="relative flex w-full items-center justify-center bg-[#080b14] bg-cover bg-right lg:bg-[length:100%_auto] lg:bg-center bg-no-repeat"
            style={{
                backgroundImage: 'url(/homeherobg.png)',
                minHeight: 'clamp(450px, 42vw, 750px)'
            }}
        >
            {/* Dark overlay to ensure text remains readable against the background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#080b14]/90 via-[#080b14]/70 to-transparent"></div>
            <div className="absolute inset-0 bg-[#080b14]/40 lg:hidden"></div>

            <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-8 px-6 py-2 lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:px-10 lg:pt-8 lg:pb-24 xl:grid-cols-[1.05fr_1fr]">
                {/* Left column — copy */}
                <div className="flex flex-col justify-center mt-4 lg:mt-0">
                    <p className="mb-4 flex items-center gap-2 font-serif text-sm sm:text-base italic tracking-wide text-[#d4af37]">
                        From the Heart of Mithila to the World
                    </p>

                    <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] leading-[1.15] text-[#f8f9fa]">
                        Bihar Mithila Makhana,
                        <br />
                        <span className="text-[#d4af37]">Pride of India.</span>
                        <br />
                        Trusted Worldwide.
                    </h1>

                    <p className="mt-6 max-w-md text-sm sm:text-base lg:text-[15px] leading-relaxed text-[#e4e4e7]">
                        Grown in the fertile wetlands of Bihar, nourished by tradition,
                        crafted for wellness, delivered to the world.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Link to="/shop" className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#d4af37] px-6 py-3.5 sm:py-3 text-[15px] sm:text-sm font-semibold text-[#080b14] transition hover:bg-[#c39d2e] w-full sm:w-auto shadow-lg shadow-[#d4af37]/20">
                            Shop Makhana
                            <ArrowRight
                                size={16}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>
                        <Link to="/export/new" className="inline-flex items-center justify-center gap-2 rounded-md border border-[#d4af37]/50 px-6 py-3.5 sm:py-3 text-[15px] sm:text-sm font-semibold text-[#f8f9fa] transition hover:border-[#d4af37] hover:bg-[#d4af37]/10 w-full sm:w-auto">
                            Bulk &amp; Export Inquiry
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    {/* Trust strip */}
                    <div className="mt-12 lg:mt-16 grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-4 sm:gap-x-6">
                        {trustPoints.map(({ icon: Icon, title, subtitle }) => (
                            <div key={title} className="flex flex-col items-start gap-2">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-[#d4af37]">
                                    <Icon size={18} strokeWidth={1.5} />
                                </div>
                                <div className="text-[11px] sm:text-xs leading-tight text-[#e4e4e7]">
                                    <p className="font-semibold text-white mb-0.5">{title}</p>
                                    <p className="text-[#e4e4e7]/70">{subtitle}</p>
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