import { ArrowRight, Download, ShieldCheck, Leaf, Clock, Globe2 } from "lucide-react";

export default function ExportHero() {
    return (
        <section className="relative min-h-[100dvh] lg:min-h-[calc(100vh-80px)] w-full flex items-start lg:items-center overflow-hidden bg-[#080b14] pt-4 lg:pt-8 pb-16 lg:pb-20">
            {/* Background Image - Bottom half on mobile, Right side on desktop */}
            <div className="absolute inset-x-0 bottom-0 h-[55vh] lg:h-full lg:top-0 lg:left-[30%] z-0">
                <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#080b14] via-[#080b14]/80 to-transparent z-10 hidden lg:block"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b14] via-[#080b14]/60 to-transparent z-10 lg:hidden"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#080b14] to-transparent z-10 lg:hidden h-24"></div>
                <img
                    src="/exportbg1.png"
                    alt="Export Background"
                    className="w-full h-full object-cover object-center lg:object-center opacity-70"
                />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-10 mt-0 lg:-mt-10">
                <div className="max-w-xl lg:max-w-xl xl:max-w-2xl">
                    <p className="mb-1 font-script text-2xl text-[#d4af37]">
                        Global Export
                    </p>
                    <h1 className="mb-2 font-serif text-4xl leading-[1.1] text-[#f8f9fa] sm:text-5xl lg:text-6xl">
                        Bringing Bihar's<br />
                        <span className="text-[#d4af37]">Finest Makhana</span><br />
                        to the World
                    </h1>
                    <p className="mb-4 max-w-lg text-[14px] lg:text-[15px] leading-snug text-[#e4e4e7]">
                        From the fertile wetlands of Bihar to every corner of the globe. Premium quality Makhana, trusted by importers, retailers & brands worldwide.
                    </p>

                    {/* 4 Feature Metrics */}
                    <div className="mb-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-5">
                        <div className="flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 sm:bg-transparent sm:p-0 border border-white/5 sm:border-transparent">
                            <div className="text-[#d4af37]">
                                <ShieldCheck size={24} strokeWidth={1.5} />
                            </div>
                            <span className="text-center text-[11px] font-medium text-[#f8f9fa]">Premium<br />Quality</span>
                        </div>
                        <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>
                        <div className="flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 sm:bg-transparent sm:p-0 border border-white/5 sm:border-transparent">
                            <div className="text-[#d4af37]">
                                <Leaf size={24} strokeWidth={1.5} />
                            </div>
                            <span className="text-center text-[11px] font-medium text-[#f8f9fa]">Sustainable<br />Sourcing</span>
                        </div>
                        <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>
                        <div className="flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 sm:bg-transparent sm:p-0 border border-white/5 sm:border-transparent">
                            <div className="text-[#d4af37]">
                                <Clock size={24} strokeWidth={1.5} />
                            </div>
                            <span className="text-center text-[11px] font-medium text-[#f8f9fa]">Timely<br />Delivery</span>
                        </div>
                        <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>
                        <div className="flex flex-col items-center gap-2 rounded-lg bg-white/5 p-3 sm:bg-transparent sm:p-0 border border-white/5 sm:border-transparent">
                            <div className="text-[#d4af37]">
                                <Globe2 size={24} strokeWidth={1.5} />
                            </div>
                            <span className="text-center text-[11px] font-medium text-[#f8f9fa]">Global<br />Standards</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-1">
                        <button className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-md bg-[#d4af37] px-8 py-3 text-[14px] sm:text-[13px] font-semibold text-[#080b14] transition hover:bg-[#c39b2e]">
                            Export Inquiry
                            <ArrowRight size={16} />
                        </button>
                        <button className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-md border border-[#d4af37] bg-[#080b14]/50 sm:bg-transparent px-8 py-3 text-[14px] sm:text-[13px] font-semibold text-[#d4af37] backdrop-blur-sm sm:backdrop-blur-none transition hover:bg-[#d4af37] hover:text-[#080b14]">
                            Download Brochure
                            <Download size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
