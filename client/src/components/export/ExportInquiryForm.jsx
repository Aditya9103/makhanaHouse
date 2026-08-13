import { Clock, Users, ShieldCheck, Upload, ArrowRight } from "lucide-react";

export default function ExportInquiryForm() {
    return (
        <section id="inquiry" className="scroll-mt-20 py-16 lg:py-24 bg-[#0a0d18] border-y border-white/5 relative overflow-hidden">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div className="relative rounded-2xl border border-white/10 bg-[#080b14] p-8 lg:p-12 shadow-2xl flex flex-col lg:flex-row gap-12">
                    
                    {/* Left Column */}
                    <div className="w-full lg:w-1/3 flex flex-col justify-between">
                        <div>
                            <h2 className="mb-4 font-serif text-3xl leading-tight text-[#f8f9fa] sm:text-4xl">
                                Export Inquiry
                            </h2>
                            <p className="mb-10 text-[14px] leading-relaxed text-[#e4e4e7]">
                                Tell us your requirement and our sales team will get back to you with the best quotation.
                            </p>

                            <div className="flex gap-6 mb-12">
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="text-[#d4af37]"><Clock size={24} strokeWidth={1.5} /></div>
                                    <span className="text-[11px] text-[#e4e4e7]">Quick<br/>Response</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="text-[#d4af37]"><Users size={24} strokeWidth={1.5} /></div>
                                    <span className="text-[11px] text-[#e4e4e7]">Dedicated<br/>Support</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="text-[#d4af37]"><ShieldCheck size={24} strokeWidth={1.5} /></div>
                                    <span className="text-[11px] text-[#e4e4e7]">Secure &<br/>Confidential</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom decorative image */}
                        <div className="relative mt-auto pt-8">
                            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#d4af37]/10 blur-3xl"></div>
                            <img src="/makhanabowl.png" alt="Makhana" className="relative z-10 w-48 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.15)]" />
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="w-full lg:w-2/3">
                        <form className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* Name & Company */}
                            <div className="space-y-1.5">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Name <span className="text-[#d4af37]">*</span></label>
                                <input type="text" placeholder="Enter your name" className="w-full rounded-md border border-white/10 bg-transparent px-4 py-2.5 text-[13px] text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Company <span className="text-[#d4af37]">*</span></label>
                                <input type="text" placeholder="Enter company name" className="w-full rounded-md border border-white/10 bg-transparent px-4 py-2.5 text-[13px] text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none" />
                            </div>

                            {/* Email & Phone */}
                            <div className="space-y-1.5">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Email <span className="text-[#d4af37]">*</span></label>
                                <input type="email" placeholder="Enter email" className="w-full rounded-md border border-white/10 bg-transparent px-4 py-2.5 text-[13px] text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Phone <span className="text-[#d4af37]">*</span></label>
                                <input type="tel" placeholder="Enter phone number" className="w-full rounded-md border border-white/10 bg-transparent px-4 py-2.5 text-[13px] text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none" />
                            </div>

                            {/* Country & Product */}
                            <div className="space-y-1.5">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Country <span className="text-[#d4af37]">*</span></label>
                                <select className="w-full rounded-md border border-white/10 bg-[#080b14] px-4 py-2.5 text-[13px] text-white focus:border-[#d4af37] focus:outline-none appearance-none">
                                    <option>Select country</option>
                                    <option>USA</option>
                                    <option>UK</option>
                                    <option>Canada</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Product <span className="text-[#d4af37]">*</span></label>
                                <select className="w-full rounded-md border border-white/10 bg-[#080b14] px-4 py-2.5 text-[13px] text-white focus:border-[#d4af37] focus:outline-none appearance-none">
                                    <option>Select product</option>
                                    <option>Raw Makhana</option>
                                    <option>Roasted Makhana</option>
                                </select>
                            </div>

                            {/* Quantity & Packaging */}
                            <div className="space-y-1.5">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Quantity <span className="text-[#d4af37]">*</span></label>
                                <input type="text" placeholder="Enter quantity" className="w-full rounded-md border border-white/10 bg-transparent px-4 py-2.5 text-[13px] text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Packaging <span className="text-[#d4af37]">*</span></label>
                                <select className="w-full rounded-md border border-white/10 bg-[#080b14] px-4 py-2.5 text-[13px] text-white focus:border-[#d4af37] focus:outline-none appearance-none">
                                    <option>Select packaging</option>
                                    <option>Retail Packs</option>
                                    <option>Bulk Packs</option>
                                </select>
                            </div>

                            {/* Private Label & Destination Port */}
                            <div className="space-y-1.5">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Private Label? <span className="text-[#d4af37]">*</span></label>
                                <div className="flex gap-6 pt-2">
                                    <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#e4e4e7]">
                                        <input type="radio" name="privateLabel" className="accent-[#d4af37]" /> Yes
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#e4e4e7]">
                                        <input type="radio" name="privateLabel" className="accent-[#d4af37]" defaultChecked /> No
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Destination Port</label>
                                <input type="text" placeholder="Enter destination port" className="w-full rounded-md border border-white/10 bg-transparent px-4 py-2.5 text-[13px] text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none" />
                            </div>

                            {/* Message */}
                            <div className="space-y-1.5 sm:col-span-2">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Message</label>
                                <input type="text" placeholder="Enter your message" className="w-full rounded-md border border-white/10 bg-transparent px-4 py-2.5 text-[13px] text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none" />
                            </div>

                            {/* File Upload & Submit button row */}
                            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-6 mt-2">
                                <div className="flex-1 space-y-1.5">
                                    <label className="text-[12px] font-medium text-[#f8f9fa]">Upload Requirement</label>
                                    <div className="flex items-center gap-4 rounded-md border border-dashed border-white/20 bg-white/5 px-4 py-3 cursor-pointer hover:border-[#d4af37]/50 transition">
                                        <Upload size={20} className="text-[#d4af37]" />
                                        <span className="text-[11px] text-[#e4e4e7]">Click to upload or drag & drop<br/><span className="text-white/40">(PDF, DOC, JPG, PNG)</span></span>
                                    </div>
                                </div>
                                <div className="flex items-end">
                                    <button type="button" className="inline-flex h-[52px] items-center justify-center gap-2 rounded-md bg-[#d4af37] px-8 text-[13px] font-semibold text-[#080b14] transition hover:bg-[#c39b2e] w-full sm:w-auto">
                                        Submit Inquiry
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
