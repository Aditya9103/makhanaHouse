import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutHero() {
    return (
        <section
            className="relative flex w-full items-center justify-center bg-[#080b14] bg-cover bg-right lg:bg-[length:100%_auto] lg:bg-center bg-no-repeat"
            style={{
                backgroundImage: 'url(/homeherobg.png)',
                minHeight: 'clamp(500px, 45vw, 800px)'
            }}
        >
            {/* Dark gradient overlay for text readability, fading completely to transparent on the right */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#080b14]/90 via-[#080b14]/80 to-[#080b14]/30 lg:bg-gradient-to-r lg:from-[#080b14] lg:via-[#080b14]/80 lg:via-40% lg:to-transparent"></div>

            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-12 pb-20 lg:px-10 lg:pt-20 lg:pb-32">
                <div className="max-w-2xl">
                    <h2 className="mb-4 font-serif italic text-3xl text-[#d4af37] md:text-4xl lg:text-5xl">
                        About Us
                    </h2>

                    <h1 className="mb-6 font-serif text-4xl leading-[1.15] text-[#f8f9fa] md:text-5xl lg:text-[4rem]">
                        From the Heart of Mithila,<br />
                        <span className="text-[#d4af37]">To the World.</span>
                    </h1>

                    <p className="mb-10 text-[15px] leading-relaxed text-[#e4e4e7] lg:text-[17px]">
                        Makhana House is born from the rich heritage of Mithila, Bihar –
                        the land of tradition, purity, and natural abundance. We bring you
                        the finest quality Makhana, carefully sourced, naturally processed,
                        and packed with love and care.
                    </p>

                    <Link
                        to="#our-story"
                        className="inline-flex items-center gap-4 rounded-lg border border-[#d4af37] px-6 py-2.5 text-sm font-medium tracking-wide text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]"
                    >
                        Our Story
                        <ArrowRight size={16} strokeWidth={1.5} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
