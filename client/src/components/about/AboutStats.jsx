import { Users, Globe2, Leaf, Trophy, PackageCheck } from "lucide-react";

const stats = [
    { icon: Users, value: "500+", label: "Happy Customers" },
    { icon: Globe2, value: "25+", label: "Countries Exported" },
    { icon: Leaf, value: "100%", label: "Natural & Pure" },
    { icon: Trophy, value: "10+", label: "Years of Excellence" },
    { icon: PackageCheck, value: "5000+", label: "Tons Exported" },
];

export default function AboutStats() {
    return (
        <section className="pb-16 lg:pb-24">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div className="flex flex-col items-center justify-between gap-10 rounded-2xl border border-white/10 bg-white/5 px-8 py-10 shadow-lg sm:flex-row sm:flex-wrap sm:justify-around lg:flex-nowrap lg:px-16 lg:py-12">
                    {stats.map(({ icon: Icon, value, label }, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center">
                            <Icon size={32} className="mb-4 text-[#d4af37]" strokeWidth={1.2} />
                            <p className="mb-1 font-serif text-3xl text-[#f8f9fa]">{value}</p>
                            <p className="text-xs tracking-wider text-[var(--color-text-secondary)]">
                                {label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
