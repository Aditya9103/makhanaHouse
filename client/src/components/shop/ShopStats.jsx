import { Sprout, ShieldCheck, Package, Truck } from "lucide-react";

export default function ShopStats() {
    return (
        <section className="mx-auto max-w-[1400px] px-6 pb-16 lg:px-10">
            <div className="flex flex-col gap-8 rounded-2xl border border-[#d4af37]/20 bg-[linear-gradient(135deg,rgba(8,11,20,0.8),rgba(212,175,55,0.05))] p-8 shadow-xl backdrop-blur-md lg:flex-row lg:items-center lg:justify-between lg:p-12">
                <div className="max-w-sm">
                    <h2 className="mb-3 font-serif text-2xl text-[#f8f9fa] sm:text-3xl">
                        From the Land of Mithila to the World
                    </h2>
                    <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                        Experience the finest quality makhana, grown naturally in the pristine wetlands of Bihar.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-8 sm:gap-12 lg:gap-16">
                    {[
                        { icon: Sprout, val: "500+", lbl: "Happy Customers" },
                        { icon: Truck, val: "25+", lbl: "Countries" },
                        { icon: ShieldCheck, val: "10+", lbl: "Years of Excellence" },
                        { icon: Package, val: "100%", lbl: "Natural & Pure" },
                    ].map(({ icon: Icon, val, lbl }, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 text-center">
                            <Icon size={28} className="text-[#d4af37]" strokeWidth={1.2} />
                            <div>
                                <p className="font-serif text-2xl text-[#f8f9fa]">{val}</p>
                                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{lbl}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
