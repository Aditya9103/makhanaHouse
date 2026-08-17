import { Leaf, Smile, Globe2, Award } from "lucide-react";

const stats = [
    { icon: Leaf, value: "100%", label: "Natural" },
    { icon: Smile, value: "500+", label: "Happy Customers" },
    { icon: Globe2, value: "25+", label: "Countries" },
    { icon: Award, value: "10+", label: "Years of Excellence" },
];

export default function StatsHome() {
    return (
        <section className="border-t border-white/10 py-8 lg:py-12">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {stats.map(({ icon: Icon, value, label }, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center text-center gap-3">
                            <Icon size={28} className="text-[#d4af37]" strokeWidth={1.2} />
                            <div>
                                <p className="font-serif text-3xl text-[#f8f9fa]">{value}</p>
                                <p className="text-sm text-[var(--color-text-secondary)] mt-1">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
