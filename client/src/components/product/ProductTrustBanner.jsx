import { Truck, ShieldCheck, RefreshCcw, Package } from "lucide-react";

const trustItems = [
    { icon: Truck, title: "Free Shipping", subtitle: "On orders above ₹999" },
    { icon: ShieldCheck, title: "Secure Payment", subtitle: "100% secure checkout" },
    { icon: RefreshCcw, title: "Easy Returns", subtitle: "7 days return policy" },
    { icon: Package, title: "Export Quality", subtitle: "Packed with care" },
];

export default function ProductTrustBanner() {
    return (
        <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 mb-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0))] p-4 sm:p-6 backdrop-blur-md">
                {trustItems.map(({ icon: Icon, title, subtitle }, idx) => (
                    <div 
                        key={idx} 
                        className={`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 ${idx !== trustItems.length - 1 ? "lg:border-r lg:border-white/5" : ""}`}
                    >
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-[#d4af37]/10 text-[#d4af37]">
                            <Icon size={22} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#f8f9fa]">{title}</p>
                            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
