import { CheckCircle2, PackageOpen, BadgeCheck } from "lucide-react";

export default function ExportServices() {
    return (
        <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                    
                    {/* Bulk Orders Card */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0))] p-8 sm:p-10">
                        <div className="flex flex-col h-full lg:flex-row lg:items-center gap-8">
                            <div className="flex-1">
                                <div className="mb-4 flex items-center gap-3 text-[#d4af37]">
                                    <PackageOpen size={28} strokeWidth={1.5} />
                                    <h3 className="font-serif text-2xl">Bulk Orders</h3>
                                </div>
                                <p className="mb-6 text-[14px] leading-relaxed text-[#e4e4e7]">
                                    We cater to importers, wholesalers, distributors & retailers with customized bulk solutions.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-[13px] text-[#e4e4e7]">
                                        <CheckCircle2 size={16} className="text-[#d4af37]" />
                                        <span>Flexible Quantities</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-[13px] text-[#e4e4e7]">
                                        <CheckCircle2 size={16} className="text-[#d4af37]" />
                                        <span>Best Wholesale Pricing</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-[13px] text-[#e4e4e7]">
                                        <CheckCircle2 size={16} className="text-[#d4af37]" />
                                        <span>On-time Global Delivery</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full lg:w-2/5">
                                <div className="aspect-square w-full rounded-xl bg-black/20 p-4">
                                    {/* Placeholder for bulk boxes */}
                                    <img src="/makhanapackaging.png" alt="Bulk Orders" className="h-full w-full object-contain drop-shadow-xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Private Label Card */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0))] p-8 sm:p-10">
                        <div className="flex flex-col h-full lg:flex-row lg:items-center gap-8">
                            <div className="flex-1">
                                <div className="mb-4 flex items-center gap-3 text-[#d4af37]">
                                    <BadgeCheck size={28} strokeWidth={1.5} />
                                    <h3 className="font-serif text-2xl">Private Label</h3>
                                </div>
                                <p className="mb-6 text-[14px] leading-relaxed text-[#e4e4e7]">
                                    Build your brand with our custom private label solutions.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-[13px] text-[#e4e4e7]">
                                        <CheckCircle2 size={16} className="text-[#d4af37]" />
                                        <span>Custom Branding</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-[13px] text-[#e4e4e7]">
                                        <CheckCircle2 size={16} className="text-[#d4af37]" />
                                        <span>Custom Packaging</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-[13px] text-[#e4e4e7]">
                                        <CheckCircle2 size={16} className="text-[#d4af37]" />
                                        <span>Your Brand, Our Quality</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full lg:w-2/5">
                                <div className="aspect-square w-full rounded-xl bg-black/20 p-4">
                                    {/* Placeholder for Private Label Pouch */}
                                    <img src="/yourbrandpackage.png" alt="Private Label" className="h-full w-full object-contain drop-shadow-xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
