import { ShieldCheck, Award, CheckCircle, FileCheck, BadgeCheck, FileBadge2 } from "lucide-react";

export default function ExportCertifications() {
    const certs = [
        { icon: ShieldCheck, name: "ISO", desc: "22000:2018" },
        { icon: Award, name: "HACCP", desc: "Certified" },
        { icon: FileCheck, name: "FSSAI", desc: "Certified" },
        { icon: BadgeCheck, name: "GMP", desc: "Certified" },
        { icon: FileBadge2, name: "APEDA", desc: "Approved" },
    ];

    const flags = [
        { emoji: "🇺🇸", country: "USA" },
        { emoji: "🇨🇦", country: "Canada" },
        { emoji: "🇬🇧", country: "UK" },
        { emoji: "🇩🇪", country: "Germany" },
        { emoji: "🇦🇺", country: "Australia" },
        { emoji: "🇸🇬", country: "Singapore" }
    ];

    return (
        <section className="py-8 lg:py-12 border-b border-white/5">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">

                    {/* Quality Certifications */}
                    <div>
                        <h2 className="mb-4 font-serif text-2xl leading-tight text-[#f8f9fa] sm:text-3xl">
                            Quality Certifications
                        </h2>
                        <div className="mb-6 h-[1px] w-12 bg-[#d4af37]/40"></div>
                        <p className="mb-8 text-[14px] leading-relaxed text-[#e4e4e7]">
                            Our Makhana meets global quality & food safety standards.
                        </p>

                        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6 lg:gap-6">
                            {certs.map((cert, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center">
                                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/20 bg-[#0a0d18] text-[#d4af37]">
                                        <cert.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-[12px] font-bold text-[#f8f9fa]">{cert.name}</h4>
                                    <span className="text-[10px] text-[#e4e4e7]">{cert.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Countries Served */}
                    <div className="relative overflow-hidden rounded-2xl bg-[#0a0d18] p-8 border border-white/5">
                        {/* Map Background Placeholder */}
                        <div className="absolute inset-0 right-0 z-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-contain bg-right bg-no-repeat opacity-5 mix-blend-screen"></div>

                        <div className="relative z-10">
                            <h2 className="mb-4 font-serif text-2xl leading-tight text-[#f8f9fa] sm:text-3xl">
                                Countries Served
                            </h2>
                            <div className="mb-6 h-[1px] w-12 bg-[#d4af37]/40"></div>
                            <p className="mb-8 text-[14px] leading-relaxed text-[#e4e4e7]">
                                Proudly exporting to 25+ countries and growing.
                            </p>

                            <div className="flex flex-wrap items-center gap-3 text-3xl">
                                {flags.map((flag, idx) => (
                                    <span key={idx} title={flag.country} className="cursor-help transition hover:scale-110">
                                        {flag.emoji}
                                    </span>
                                ))}
                                <span className="text-[13px] text-[#d4af37] ml-2 font-medium">+ More</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
