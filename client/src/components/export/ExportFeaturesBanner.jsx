import { PackageOpen, BadgeCheck, Globe2, ClipboardList } from "lucide-react";

export default function ExportFeaturesBanner() {
    const features = [
        {
            icon: PackageOpen,
            title: "Bulk Orders",
            desc: "Large quantity orders with best pricing"
        },
        {
            icon: BadgeCheck,
            title: "Private Label",
            desc: "Custom branding & packaging"
        },
        {
            icon: Globe2,
            title: "Worldwide Shipping",
            desc: "Safe & timely delivery across the globe"
        },
        {
            icon: ClipboardList,
            title: "Export Inquiry",
            desc: "Get a quick quote from our team"
        }
    ];

    return (
        <section className="border-y border-white/5 bg-[#0a0d18] py-8 lg:py-12">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-5 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
                    {features.map((feature, idx) => (
                        <div key={idx} className={`flex items-center gap-5 ${idx !== 0 ? 'lg:pl-10' : ''}`}>
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-[#d4af37]/20 bg-[#d4af37]/5 text-[#d4af37]">
                                <feature.icon size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="mb-1 text-sm font-semibold text-[#f8f9fa]">
                                    {feature.title}
                                </h4>
                                <p className="text-[12px] leading-snug text-[#e4e4e7]">
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
