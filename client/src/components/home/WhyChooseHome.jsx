import { Activity, ShieldPlus, Heart, Leaf, Zap } from "lucide-react";

const features = [
    {
        icon: Activity,
        title: "Low in Calories",
        subtitle: "Perfect for weight management",
    },
    {
        icon: ShieldPlus,
        title: "Good Source of Protein",
        subtitle: "Builds strength & supports growth",
    },
    {
        icon: Zap,
        title: "Rich in Antioxidants",
        subtitle: "Helps fight oxidative stress",
    },
    {
        icon: Heart,
        title: "Supports Heart Health",
        subtitle: "Helps in maintaining a healthy heart",
    },
    {
        icon: Leaf,
        title: "Improves Digestion",
        subtitle: "Light & easy to digest",
    },
];

export default function WhyChooseHome() {
    return (
        <section className="py-16 lg:py-24 border-t border-white/10 bg-transparent">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
                    {/* Left - Bowl Image Placeholder */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="relative aspect-square w-full rounded-full border border-[#d4af37]/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[0_0_40px_rgba(212,175,55,0.05)]">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-center text-[10px] text-[var(--color-text-secondary)] max-w-[120px]">
                                    Makhana Bowl Placeholder
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Middle - Content */}
                    <div className="lg:col-span-6 flex flex-col justify-center px-0 lg:px-8">
                        <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[#d4af37]">
                            WHY CHOOSE PRIME MAKHANA
                        </p>
                        <h2 className="mb-4 font-serif text-3xl leading-tight text-[#f8f9fa] sm:text-4xl">
                            Good for You, Good for Life.
                        </h2>
                        <p className="mb-10 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                            Makhana is a superfood loaded with essential nutrients and
                            crafted to bring health and happiness in every bite.
                        </p>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                            {features.map(({ icon: Icon, title, subtitle }, idx) => (
                                <div key={idx} className="flex flex-col items-start gap-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/30 bg-white/5">
                                        <Icon size={18} className="text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[#f4f4f5]">{title}</p>
                                        <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">{subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right - Mithila Text */}
                    <div className="lg:col-span-3 lg:border-l lg:border-[#1e2432] lg:pl-10">
                        <h3 className="mb-4 font-serif text-2xl text-[#f4efe4]">
                            From the Land<br />of Mithila
                        </h3>
                        <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                            Our Makhana is grown by local farmers in the pristine wetlands
                            of Bihar, using traditional methods passed down through
                            generations.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
