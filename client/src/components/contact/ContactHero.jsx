import { Globe2, Clock, Users, BadgeCheck, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactHero() {
    return (
        <section className="relative min-h-[400px] lg:min-h-[500px] w-full pt-5 pb-12 lg:pt-8 lg:pb-16 px-6 lg:px-10 flex items-center overflow-hidden bg-transparent">
            {/* World Map Image - Right side */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-0 hidden lg:block w-[55%] opacity-50 pointer-events-none mix-blend-screen">
                <img
                    src="/worldmap.webp"
                    alt="World Map"
                    fetchPriority="high"
                    className="w-full h-auto object-contain"
                />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1400px]">
                <div className="max-w-lg mt-1 lg:mt-2">
                    <h1 className="mb-4 font-serif text-3xl leading-tight text-[#f8f9fa] sm:text-4xl lg:text-[3.5rem]">
                        <span className="font-script text-[#d4af37] text-4xl sm:text-5xl lg:text-[4.5rem] block mb-1">Let's Connect &</span>
                        Grow Together
                    </h1>

                    <p className="mb-8 text-sm leading-relaxed text-[#e4e4e7] max-w-sm">
                        Have questions, bulk requirements, or partnership proposals?
                        We're here to help you with the finest Makhana,
                        delivered anywhere in the world.
                    </p>

                    {/* 4 Features */}
                    <div className="mb-8 grid grid-cols-2 gap-6 sm:flex sm:flex-wrap lg:gap-10">
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/30 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                                <Globe2 size={22} strokeWidth={1.5} />
                            </div>
                            <span className="text-center text-[12px] font-medium text-[#f8f9fa] leading-tight">Global<br />Presence</span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/30 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                                <Clock size={22} strokeWidth={1.5} />
                            </div>
                            <span className="text-center text-[12px] font-medium text-[#f8f9fa] leading-tight">Timely<br />Response</span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/30 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                                <Users size={22} strokeWidth={1.5} />
                            </div>
                            <span className="text-center text-[12px] font-medium text-[#f8f9fa] leading-tight">Trusted by<br />Importers</span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/30 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                                <BadgeCheck size={22} strokeWidth={1.5} />
                            </div>
                            <span className="text-center text-[12px] font-medium text-[#f8f9fa] leading-tight">Premium<br />Quality</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
