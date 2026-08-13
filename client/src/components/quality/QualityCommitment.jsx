import { Leaf, ShieldCheck, Heart, Globe2 } from "lucide-react";

export default function QualityCommitment() {
    return (
        <section className="py-16 lg:py-24 bg-[#0a0d18]">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                    
                    {/* Left: Image with Badge */}
                    <div className="w-full lg:w-1/2 relative rounded-[2rem] overflow-hidden group">
                        {/* Background Image Container */}
                        <div className="relative aspect-[4/3] w-full">
                            <img 
                                src="/makhanabowl.png" 
                                alt="Premium Makhana" 
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Dark Gradient Overlay for the text badge */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/40 to-[#0a0d18] lg:to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent hidden lg:block"></div>
                        </div>

                        {/* Gold Badge */}
                        <div className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-4 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] border border-[#d4af37] bg-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                            <div className="flex items-center gap-2 text-[#d4af37] mb-2">
                                <div className="h-[1px] w-4 bg-[#d4af37]"></div>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor"/>
                                </svg>
                                <div className="h-[1px] w-4 bg-[#d4af37]"></div>
                            </div>
                            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#d4af37] mb-4">Our Promise</p>
                            <h3 className="text-3xl lg:text-4xl font-serif text-[#f8f9fa] leading-tight text-center tracking-wide">
                                PURE<br/>SAFE<br/>PREMIUM
                            </h3>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#d4af37] mt-5" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C12 22 19 18 19 12C19 8 16 5 12 5C8 5 5 8 5 12C5 18 12 22 12 22Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    {/* Right: Content & Grid */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="mb-4 font-serif text-3xl leading-tight text-[#d4af37] sm:text-4xl">
                            Our Commitment
                        </h2>
                        <p className="mb-10 text-[14px] leading-relaxed text-[#e4e4e7] max-w-lg">
                            We are committed to delivering premium makhana that is pure, 
                            safe, nutritious and naturally delicious.
                        </p>

                        {/* 2x2 Grid */}
                        <div className="grid grid-cols-2 gap-4 lg:gap-6">
                            
                            {/* Card 1 */}
                            <div className="flex flex-col items-center rounded-2xl border border-white/5 bg-[#080b14] p-6 text-center transition hover:border-[#d4af37]/40 hover:bg-[#0a0d18] duration-300">
                                <Leaf size={28} className="text-[#d4af37] mb-4" strokeWidth={1.5} />
                                <h4 className="mb-2 text-[13px] font-semibold text-[#f8f9fa]">Pure & Natural</h4>
                                <p className="text-[11px] leading-relaxed text-[#e4e4e7]/70">
                                    100% natural makhana with no compromise
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="flex flex-col items-center rounded-2xl border border-white/5 bg-[#080b14] p-6 text-center transition hover:border-[#d4af37]/40 hover:bg-[#0a0d18] duration-300">
                                <ShieldCheck size={28} className="text-[#d4af37] mb-4" strokeWidth={1.5} />
                                <h4 className="mb-2 text-[13px] font-semibold text-[#f8f9fa]">Safe & Hygienic</h4>
                                <p className="text-[11px] leading-relaxed text-[#e4e4e7]/70">
                                    Processed in the most hygienic conditions
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="flex flex-col items-center rounded-2xl border border-white/5 bg-[#080b14] p-6 text-center transition hover:border-[#d4af37]/40 hover:bg-[#0a0d18] duration-300">
                                <Heart size={28} className="text-[#d4af37] mb-4" strokeWidth={1.5} />
                                <h4 className="mb-2 text-[13px] font-semibold text-[#f8f9fa]">Healthy Choice</h4>
                                <p className="text-[11px] leading-relaxed text-[#e4e4e7]/70">
                                    Rich in nutrients, light & wholesome
                                </p>
                            </div>

                            {/* Card 4 */}
                            <div className="flex flex-col items-center rounded-2xl border border-white/5 bg-[#080b14] p-6 text-center transition hover:border-[#d4af37]/40 hover:bg-[#0a0d18] duration-300">
                                <Globe2 size={28} className="text-[#d4af37] mb-4" strokeWidth={1.5} />
                                <h4 className="mb-2 text-[13px] font-semibold text-[#f8f9fa]">Trusted Worldwide</h4>
                                <p className="text-[11px] leading-relaxed text-[#e4e4e7]/70">
                                    Loved by customers across the globe
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
