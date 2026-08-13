import { Leaf, Sprout, ShieldCheck, Award } from "lucide-react";

export default function QualityHero() {
    return (
        <section className="relative min-h-[600px] lg:min-h-[700px] w-full pt-20 pb-16 lg:pt-32 lg:pb-24 px-6 lg:px-10 flex items-center overflow-hidden bg-[#080b14]">
            {/* Background Image - Absolute Positioning to mimic the screenshot */}
            <div className="absolute inset-0 lg:left-[20%] z-0">
                <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#080b14] via-[#080b14]/80 to-transparent z-10 hidden lg:block"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b14] via-[#080b14]/80 to-transparent z-10 lg:hidden"></div>
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#080b14] to-transparent z-10"></div>
                <img
                    src="/exportbg1.png"
                    alt="World Map and Premium Makhana"
                    className="w-full h-full object-cover object-left lg:object-center opacity-70"
                />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1400px]">
                <div className="max-w-2xl">
                    <p className="mb-3 font-script text-2xl sm:text-3xl lg:text-4xl text-[#d4af37]">
                        Quality is Our Promise
                    </p>
                    <h1 className="mb-6 font-serif text-4xl leading-tight text-[#f8f9fa] sm:text-5xl lg:text-[4.5rem]">
                        Premium Quality<br />
                        <span className="text-[#d4af37]">You Can Trust</span>
                    </h1>

                    <p className="mb-12 text-[15px] leading-relaxed text-[#e4e4e7] max-w-lg">
                        At Makhana House, quality is at the heart of everything we do.
                        From handpicked sourcing to advanced processing and
                        stringent quality checks, we deliver makhana that meets
                        global standards.
                    </p>

                    {/* 4 Features */}
                    <div className="mb-16 flex flex-wrap gap-8 lg:gap-12">
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
