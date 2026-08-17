import { Sprout, ShieldCheck, Package, Truck } from "lucide-react";

const features = [
    { icon: Sprout, title: "Farm Fresh", subtitle: "Directly from trusted farmers" },
    { icon: ShieldCheck, title: "Hygienically Processed", subtitle: "Clean, sorted & quality checked" },
    { icon: Package, title: "Premium Packaging", subtitle: "Locks freshness & nutrition" },
    { icon: Truck, title: "Worldwide Shipping", subtitle: "Delivering across the globe" },
];

export default function ShopFeatures() {
    return (
        <section className="mx-auto max-w-[1400px] px-6 pb-8 lg:pb-12 lg:px-10">
            <div className="grid grid-cols-1 gap-6 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4 lg:p-8">
                {features.map(({ icon: Icon, title, subtitle }) => (
                    <div key={title} className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/30 bg-white/5">
                            <Icon size={24} className="text-[#d4af37]" strokeWidth={1.3} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#f8f9fa]">{title}</p>
                            <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
