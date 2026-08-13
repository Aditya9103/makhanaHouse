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
        <section className="py-16 lg:py-24 bg-transparent">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div 
                    className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-[#d4af37]/20 bg-[#080b14] bg-cover bg-bottom lg:bg-contain lg:bg-right bg-no-repeat shadow-2xl lg:flex-row lg:items-stretch lg:p-0"
                    style={{ backgroundImage: 'url(/mithilavillage.png)' }}
                >
                    {/* Gradient overlay to make text readable on all screens */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#080b14] via-[#080b14]/95 to-[#080b14]/40 lg:bg-gradient-to-r lg:from-[#080b14] lg:via-[#080b14]/90 lg:to-[#080b14]/10"></div>

                    {/* Left - Bowl Image */}
                    <div className="relative z-10 flex w-full justify-center pt-8 pb-2 px-6 lg:w-[25%] lg:items-center lg:p-8 lg:pr-0">
                        <img 
                            src="/makhanabowl.png" 
                            alt="Makhana Bowl" 
                            className="relative z-10 w-full max-w-[280px] object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                        />
                    </div>

                    {/* Middle - Main Content */}
                    <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-6 lg:px-12 lg:py-16 text-center lg:text-left items-center lg:items-start">
                        <p className="mb-2 text-[11px] font-semibold tracking-[0.18em] text-[#d4af37]">
                            WHY CHOOSE MAKHANA HOUSE
                        </p>
                        <h2 className="mb-4 font-serif text-2xl leading-tight text-[#f8f9fa] sm:text-3xl lg:text-4xl">
                            Good for You, Good for Life.
                        </h2>
                        <p className="mb-10 max-w-2xl text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                            Makhana is a superfood loaded with essential nutrients and
                            crafted to bring health and happiness in every bite.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-5 w-full">
                            {features.map(({ icon: Icon, title, subtitle }, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-left">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/40 text-[#d4af37] bg-black/20 backdrop-blur-sm">
                                        <Icon size={18} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-medium text-[#f4f4f5]">{title}</p>
                                        <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">{subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right - Mithila Text */}
                    <div className="relative z-10 flex w-full flex-col justify-center px-6 pb-8 pt-4 lg:w-[22%] lg:p-0 lg:py-16 lg:pr-8 text-center lg:text-left">
                        <div className="rounded-xl bg-[#080b14]/70 lg:bg-[#080b14]/40 p-6 backdrop-blur-md border border-white/5">
                            <h3 className="mb-3 font-serif text-xl sm:text-2xl text-[#d4af37]">
                                From the Land<br />of Mithila
                            </h3>
                            <p className="text-[12px] leading-relaxed text-[#e4e4e7]">
                                Our Makhana is grown by local farmers in the pristine wetlands
                                of Bihar, using traditional methods passed down through
                                generations.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
