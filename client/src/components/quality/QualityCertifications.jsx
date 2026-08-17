import { ShieldCheck, Award, CheckCircle, FileCheck, BadgeCheck, FileBadge2, Globe } from "lucide-react";

export default function QualityCertifications() {
    const certs = [
        { icon: "/iso.png", text: "ISO", title: "ISO 22000:2018", desc: "Food Safety Management" },
        { icon: "/haccp.png", text: "HACCP", title: "HACCP & CCP", desc: "Hazard Analysis Critical Control Point" },
        { icon: "/fssai.png", text: "fssai", title: "FSSAI", desc: "Licensed & Regulated" },
        { icon: "/gmp.png", text: "GMP", title: "GMP Certified", desc: "Good Manufacturing Practices" },
        { icon: "/apeda.png", text: "APEDA", title: "APEDA Approved", desc: "Export Quality Assurance" },
        { icon: "/globe.png", text: "GLOBE", title: "Export Standard", desc: "Meets International Export Standards" },
    ];

    // If actual logo images aren't available, we fallback to Lucide icons that roughly match the style:
    const fallbackIcons = [ShieldCheck, Award, FileCheck, BadgeCheck, CheckCircle, FileBadge2, Globe];

    return (
        <section className="py-8 lg:py-12 bg-[#0a0d18] border-t border-white/5 relative overflow-hidden">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

                <div className="text-center mb-16">
                    <p className="font-script text-2xl text-[#d4af37] mb-2">Certified Quality</p>
                    <h2 className="font-serif text-3xl leading-tight text-[#f8f9fa] sm:text-4xl">
                        Globally Recognized. Trusted Worldwide.
                    </h2>

                    {/* Decorative Divider */}
                    <div className="mx-auto flex items-center justify-center gap-3 mt-6">
                        <div className="h-[1px] w-8 bg-[#d4af37]/40"></div>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#d4af37]" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C12 22 19 18 19 12C19 8 16 5 12 5C8 5 5 8 5 12C5 18 12 22 12 22Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="h-[1px] w-8 bg-[#d4af37]/40"></div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                    {certs.map((cert, idx) => {
                        return (
                            <div key={idx} className="flex flex-col items-center w-full max-w-[160px] rounded-[20px] border border-white/5 bg-[#0a0d18]/50 p-6 text-center transition hover:border-[#d4af37]/30 hover:bg-[#0a0d18] hover:-translate-y-1 duration-300">

                                <div className="mb-6 flex h-16 w-full items-center justify-center">
                                    {cert.text === "ISO" && (
                                        <div className="text-[40px] font-black text-[#1e40af] tracking-tighter leading-none" style={{ textShadow: "0 0 10px rgba(30,64,175,0.3)" }}>
                                            ISO
                                        </div>
                                    )}
                                    {cert.text === "HACCP" && (
                                        <div className="relative flex items-center justify-center text-[#d4af37]">
                                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                            <span className="absolute text-[12px] font-bold tracking-widest mt-[-2px]">HACCP</span>
                                        </div>
                                    )}
                                    {cert.text === "fssai" && (
                                        <div className="text-4xl font-script italic tracking-wider flex font-bold drop-shadow-md">
                                            <span className="text-[#ea580c]">fss</span>
                                            <span className="text-[#2563eb]">a</span>
                                            <span className="text-[#16a34a]">i</span>
                                        </div>
                                    )}
                                    {cert.text === "GMP" && (
                                        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-[#16a34a] text-[#16a34a] font-bold text-[14px] shadow-[0_0_15px_rgba(22,163,74,0.2)]">
                                            GMP
                                        </div>
                                    )}
                                    {cert.text === "HALAL" && (
                                        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#16a34a] text-[#16a34a] font-bold text-[13px] shadow-[0_0_15px_rgba(22,163,74,0.2)]">
                                            حلال<br /><span className="absolute text-[10px] tracking-widest mt-[22px]">HALAL</span>
                                        </div>
                                    )}
                                    {cert.text === "APEDA" && (
                                        <div className="text-[#16a34a]">
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C12 22 4 16 4 10C4 5.5 7.5 2 12 2C16.5 2 20 5.5 20 10C20 16 12 22 12 22ZM12 4C8.7 4 6 6.7 6 10C6 14.5 12 19.2 12 19.2C12 19.2 18 14.5 18 10C18 6.7 15.3 4 12 4Z" /><path d="M12 15C10.3 15 9 13.7 9 12C9 10.3 10.3 9 12 9C13.7 9 15 10.3 15 12C15 13.7 13.7 15 12 15ZM12 11C11.4 11 11 11.4 11 12C11 12.6 11.4 13 12 13C12.6 13 13 12.6 13 12C13 11.4 12.6 11 12 11Z" fill="#16a34a" /></svg>
                                        </div>
                                    )}
                                    {cert.text === "GLOBE" && (
                                        <div className="text-[#d4af37]">
                                            <Globe size={48} strokeWidth={1} />
                                        </div>
                                    )}
                                </div>
                                <h3 className="mb-2 text-[12px] font-bold text-[#f8f9fa] tracking-wide whitespace-nowrap">
                                    {cert.title}
                                </h3>
                                <p className="text-[11px] leading-relaxed text-[#e4e4e7]/70 px-1">
                                    {cert.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
