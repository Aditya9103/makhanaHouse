import { Phone, Mail, MapPin, Clock, Download, ArrowRight, Users } from "lucide-react";

export default function ContactGetInTouch() {
    return (
        <section className="py-16 lg:py-24 bg-transparent border-y border-white/5">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="mb-4 font-serif text-3xl leading-tight text-[#f8f9fa] sm:text-4xl lg:text-[2.5rem]">
                        Get In Touch
                    </h2>
                    {/* Decorative Divider */}
                    <div className="mx-auto flex items-center justify-center gap-3">
                        <div className="h-[1px] w-8 bg-[#d4af37]/40"></div>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#d4af37]" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C12 22 19 18 19 12C19 8 16 5 12 5C8 5 5 8 5 12C5 18 12 22 12 22Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="h-[1px] w-8 bg-[#d4af37]/40"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
                    {/* Contact Information (1 column on lg) */}
                    <div className="rounded-2xl border border-white/10 bg-[#080b14] p-8 lg:p-10 shadow-xl flex flex-col justify-between h-full">
                        <div>
                            <h3 className="font-serif text-xl text-[#d4af37] mb-8">Contact Information</h3>
                            
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/20 text-[#d4af37]">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-medium text-[#f8f9fa] mb-1">Phone</p>
                                        <p className="text-[13px] text-[#e4e4e7] leading-relaxed">
                                            +91 98765 43210<br />
                                            +91 98765 43211
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/20 text-[#d4af37]">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-medium text-[#f8f9fa] mb-1">Email</p>
                                        <p className="text-[13px] text-[#e4e4e7] leading-relaxed">
                                            info@makhanahouse.com<br />
                                            exports@makhanahouse.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/20 text-[#d4af37]">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-medium text-[#f8f9fa] mb-1">Head Office</p>
                                        <p className="text-[13px] text-[#e4e4e7] leading-relaxed max-w-[200px]">
                                            Makhana House Pvt. Ltd.<br />
                                            Ward No. 12, Darbhanga Road,<br />
                                            Bihar, India - 847407
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/20 text-[#d4af37]">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-medium text-[#f8f9fa] mb-1">Business Hours</p>
                                        <p className="text-[13px] text-[#e4e4e7] leading-relaxed">
                                            Mon - Sat: 9:00 AM - 6:00 PM (IST)<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="mt-12 flex w-full items-center justify-between rounded-md border border-[#d4af37] bg-transparent px-6 py-3 text-[13px] font-semibold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]">
                            <div className="flex items-center gap-2">
                                <Download size={16} />
                                Download Company Profile
                            </div>
                            <Download size={16} />
                        </button>
                    </div>

                    {/* Send Us a Message (2 columns on lg) */}
                    <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#080b14] p-8 lg:p-10 shadow-xl flex flex-col justify-between h-full">
                        <div>
                            <h3 className="font-serif text-xl text-[#d4af37] mb-8">Send Us a Message</h3>
                            
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[12px] font-medium text-[#f8f9fa]">Your Name <span className="text-[#d4af37]">*</span></label>
                                        <input type="text" placeholder="Enter your full name" className="w-full rounded-md border border-white/10 bg-transparent px-4 py-3 text-[13px] text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[12px] font-medium text-[#f8f9fa]">Company Name <span className="text-[#d4af37]">*</span></label>
                                        <input type="text" placeholder="Enter your company name" className="w-full rounded-md border border-white/10 bg-transparent px-4 py-3 text-[13px] text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[12px] font-medium text-[#f8f9fa]">Email Address <span className="text-[#d4af37]">*</span></label>
                                        <input type="email" placeholder="Enter your email" className="w-full rounded-md border border-white/10 bg-transparent px-4 py-3 text-[13px] text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[12px] font-medium text-[#f8f9fa]">Phone Number <span className="text-[#d4af37]">*</span></label>
                                        <input type="tel" placeholder="Enter your phone number" className="w-full rounded-md border border-white/10 bg-transparent px-4 py-3 text-[13px] text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[12px] font-medium text-[#f8f9fa]">Subject <span className="text-[#d4af37]">*</span></label>
                                    <select className="w-full rounded-md border border-white/10 bg-[#080b14] px-4 py-3 text-[13px] text-white/30 focus:border-[#d4af37] focus:text-white focus:outline-none appearance-none">
                                        <option>Select a subject</option>
                                        <option>Bulk Inquiry</option>
                                        <option>Private Label</option>
                                        <option>General Query</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[12px] font-medium text-[#f8f9fa]">Message <span className="text-[#d4af37]">*</span></label>
                                    <textarea placeholder="Write your message here..." rows="4" className="w-full rounded-md border border-white/10 bg-transparent px-4 py-3 text-[13px] text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none resize-none"></textarea>
                                </div>
                                
                                {/* We don't have a visible send button in the screenshot right box except maybe it's cut off, wait, the form in screenshot has 4 features at the bottom. The screenshot doesn't show a send button, but usually there's one. I'll omit it to match exactly or add it gracefully. Actually, the features are below the textarea. */}
                            </form>
                        </div>

                        {/* 4 Bottom Features inside the right card */}
                        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/5 pt-8">
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="text-[#d4af37] mb-1">
                                    {/* Using Clock icon as placeholder for Quick Response icon */}
                                    <Clock size={20} strokeWidth={1.5} />
                                </div>
                                <h4 className="text-[11px] font-semibold text-[#f8f9fa]">Quick Response</h4>
                                <p className="text-[10px] text-[#e4e4e7]/70 leading-relaxed max-w-[100px]">We respond within 24 business hours.</p>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="text-[#d4af37] mb-1">
                                    {/* Using map icon or globe */}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
                                </div>
                                <h4 className="text-[11px] font-semibold text-[#f8f9fa]">Global Network</h4>
                                <p className="text-[10px] text-[#e4e4e7]/70 leading-relaxed max-w-[100px]">Serving importers in 25+ countries.</p>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="text-[#d4af37] mb-1">
                                    <Users size={20} strokeWidth={1.5} />
                                </div>
                                <h4 className="text-[11px] font-semibold text-[#f8f9fa]">Bulk Specialists</h4>
                                <p className="text-[10px] text-[#e4e4e7]/70 leading-relaxed max-w-[100px]">Custom solutions for bulk requirements.</p>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="text-[#d4af37] mb-1">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
                                </div>
                                <h4 className="text-[11px] font-semibold text-[#f8f9fa]">Quality Assured</h4>
                                <p className="text-[10px] text-[#e4e4e7]/70 leading-relaxed max-w-[100px]">100% premium quality & certifications.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Map Card */}
                    <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#080b14] p-8 lg:p-10 shadow-xl relative overflow-hidden min-h-[300px] flex items-end">
                        <div className="absolute inset-0 opacity-50 pointer-events-none flex items-center justify-center p-8">
                            <img src="/worldmap.png" alt="World Map" className="w-full h-full object-contain mix-blend-screen" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#d4af37]/5 blur-[100px] rounded-full"></div>
                        
                        <button className="relative z-10 flex w-full sm:w-auto justify-center items-center gap-3 rounded-full border border-[#d4af37] bg-[#080b14]/80 backdrop-blur-sm px-6 py-3 sm:py-2.5 text-[13px] sm:text-[12px] font-medium text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]">
                            Our Global Presence
                            <ArrowRight size={14} />
                        </button>
                    </div>

                    {/* Connect With Us */}
                    <div className="rounded-2xl border border-white/10 bg-[#080b14] p-8 lg:p-10 shadow-xl flex flex-col justify-center">
                        <h3 className="font-serif text-xl text-[#d4af37] mb-4">Connect With Us</h3>
                        <p className="text-[13px] leading-relaxed text-[#e4e4e7] mb-8">
                            Follow us on social media for the latest updates, products & export news.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/30 text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                            </a>
                            <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/30 text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                            </a>
                            <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/30 text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                            </a>
                            <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/30 text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 7.1 2.5 7.1 2.5 7.1a3 3 0 0 1 2.1-2.1C6.5 4.5 12 4.5 12 4.5s5.5 0 7.4.5a3 3 0 0 1 2.1 2.1c.5 1.9.5 5.8.5 5.8s0 3.9-.5 5.8a3 3 0 0 1-2.1 2.1c-1.9.5-7.4.5-7.4.5s-5.5 0-7.4-.5a3 3 0 0 1-2.1-2.1C2 15.2 2 11.3 2 11.3s0-3.9.5-5.8z"/><path d="m10 15 5-3-5-3z"/></svg>
                            </a>
                            <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/30 text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
