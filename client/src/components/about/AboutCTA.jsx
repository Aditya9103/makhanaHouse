import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutCTA() {
    return (
        <section className="pt-2 pb-8 lg:pt-6 lg:pb-12">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-[linear-gradient(to_right,rgba(8,11,20,1),rgba(212,175,55,0.05))] px-8 py-10 shadow-[0_0_40px_rgba(212,175,55,0.05)] sm:px-16 lg:flex-row lg:py-14">

                    {/* Background Art (Lotus & Bowl) */}
                    <div className="absolute -bottom-10 -right-10 opacity-30 blur-[2px] lg:opacity-60 lg:blur-none">
                        <img
                            src="/makhanabowl.png"
                            alt="Decorative Bowl"
                            className="h-[200px] object-cover lg:h-[280px]"
                        />
                    </div>

                    <div className="relative z-10 text-center lg:text-left max-w-2xl">
                        <h2 className="mb-4 font-serif text-3xl leading-tight text-[#f8f9fa] sm:text-4xl">
                            Bringing the Goodness of Mithila to Your Table
                        </h2>
                        <p className="text-[15px] text-[#d4af37]">
                            Experience the perfect blend of tradition, taste, and nutrition.
                        </p>
                        <div className="relative z-10 shrink-0 mt-6 flex justify-center lg:justify-start w-full">
                            <Link
                                to="/shop"
                                className="inline-flex w-full sm:w-auto justify-center items-center gap-3 rounded-full border border-[#d4af37]/40 px-8 py-3.5 sm:py-3 text-[15px] sm:text-[14px] font-medium tracking-wide text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]"
                            >
                                Shop Premium Makhana
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
