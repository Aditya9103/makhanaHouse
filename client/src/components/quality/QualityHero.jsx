import { Leaf, Sprout, ShieldCheck, Award } from "lucide-react";

export default function QualityHero() {
    return (
        <section className="relative min-h-[100dvh] lg:min-h-[calc(100vh-80px)] w-full flex items-start lg:items-center overflow-hidden bg-[#080b14] pt-4 lg:pt-8 pb-16 lg:pb-20">
            {/* Background Image - Bottom half on mobile, Right side on desktop */}
            <div className="absolute inset-x-0 bottom-0 h-[55vh] lg:h-full lg:top-0 lg:left-[20%] z-0">
                <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#080b14] via-[#080b14]/80 to-transparent z-10 hidden lg:block"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b14] via-[#080b14]/60 to-transparent z-10 lg:hidden"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#080b14] to-transparent z-10 lg:hidden h-24"></div>
                <img
                    src="/exportbg1.webp"
                    alt="World Map and Premium Makhana"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-center lg:object-center opacity-70"
                />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10 mt-0 lg:-mt-10">
                <div className="max-w-xl lg:max-w-xl xl:max-w-2xl">
                    <p className="mb-1 font-script text-2xl sm:text-3xl lg:text-3xl text-[#d4af37]">
                        Quality is Our Promise
                    </p>
                    <h1 className="mb-2 font-serif text-4xl leading-[1.1] text-[#f8f9fa] sm:text-5xl lg:text-6xl">
                        Premium Quality<br />
                        <span className="text-[#d4af37]">You Can Trust</span>
                    </h1>

                    <p className="mb-4 max-w-lg text-[14px] lg:text-[15px] leading-snug text-[#e4e4e7]">
                        At Makhana House, quality is at the heart of everything we do.
                        From handpicked sourcing to advanced processing and
                        stringent quality checks, we deliver makhana that meets
                        global standards.
                    </p>

                    {/* 4 Features */}
                    <div className="mb-2 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap lg:gap-8">
                        <div className="flex flex-col gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/30 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                                <Leaf size={22} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-semibold text-[#f8f9fa] mb-1">100% Natural</h4>
                                <p className="text-[11px] text-[#e4e4e7]/70 leading-relaxed max-w-[100px]">No additives<br />No preservatives</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/30 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                                <Sprout size={22} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-semibold text-[#f8f9fa] mb-1">Carefully Sourced</h4>
                                <p className="text-[11px] text-[#e4e4e7]/70 leading-relaxed max-w-[100px]">From the fertile<br />fields of Bihar</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/30 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                                <ShieldCheck size={22} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-semibold text-[#f8f9fa] mb-1">Hygienically<br />Processed</h4>
                                <p className="text-[11px] text-[#e4e4e7]/70 leading-relaxed max-w-[110px]">Advanced technology<br />& clean environment</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/30 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                                <Award size={22} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-semibold text-[#f8f9fa] mb-1">Consistent<br />Excellence</h4>
                                <p className="text-[11px] text-[#e4e4e7]/70 leading-relaxed max-w-[110px]">Every batch meets<br />global standards</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
