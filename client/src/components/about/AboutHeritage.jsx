import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutHeritage() {
    return (
        <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div className="relative overflow-hidden rounded-xl border border-[#d4af37]/30 bg-[#080b14] p-6 sm:p-10 lg:p-12 shadow-2xl">
                    {/* Right-side lotus background art */}
                    <div className="absolute inset-y-0 right-0 w-full lg:w-[70%] pointer-events-none opacity-50 mix-blend-screen">
                        <img
                            src="/ourstorybg1.png"
                            alt=""
                            className="h-full w-full object-cover object-right"
                        />
                    </div>

                    <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-[3fr_7fr] lg:items-center lg:gap-16">

                        {/* Left - Image */}
                        <div className="relative overflow-hidden rounded-xl w-full h-full">
                            <img
                                src="/farermer.png"
                                alt="Farming in Mithila"
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>

                        {/* Right - Content */}
                        <div className="flex flex-col justify-center py-4">
                            <div className="mb-4 flex items-center gap-2 text-[#d4af37]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C12 22 19 18 19 12C19 8 16 5 12 5C8 5 5 8 5 12C5 18 12 22 12 22Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 15C12 15 15 12 15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 15C12 15 9 12 9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="font-serif italic text-xl">Our Story</span>
                            </div>

                            <h2 className="mb-4 font-serif text-3xl leading-tight text-[#f8f9fa] sm:text-4xl lg:text-[2.75rem]">
                                A Heritage of<br /><span className="text-[#d4af37]">Purity and Trust</span>
                            </h2>
                            
                            {/* Decorative Divider */}
                            <div className="mb-8 flex items-center gap-3">
                                <div className="h-[1px] w-10 bg-[#d4af37]/40"></div>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#d4af37]" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C12 22 19 18 19 12C19 8 16 5 12 5C8 5 5 8 5 12C5 18 12 22 12 22Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 15C12 15 15 12 15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 15C12 15 9 12 9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="h-[1px] w-10 bg-[#d4af37]/40"></div>
                            </div>
                            
                            <div className="space-y-5 text-[15px] leading-relaxed text-[#e4e4e7]">
                                <p>
                                    Rooted in the fertile wetlands of Bihar, Makhana (Fox Nut) has been a
                                    staple of health and wellness for centuries. At Makhana House, we
                                    honor this legacy by delivering premium quality Makhana that reflects
                                    the purity of nature and the trust of our customers.
                                </p>
                                <p>
                                    We work closely with local farmers, supporting their traditional
                                    farming methods and ensuring sustainable livelihoods for generations
                                    to come.
                                </p>
                            </div>

                            <div className="mt-10">
                                <Link
                                    to="#know-more"
                                    className="inline-flex items-center gap-4 rounded-md border border-[#d4af37] px-6 py-2.5 text-[13px] font-medium text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]"
                                >
                                    Know More About Us
                                    <ArrowRight size={16} strokeWidth={1.5} />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
