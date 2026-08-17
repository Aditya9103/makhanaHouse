import { BadgeCheck, Sparkles, Tractor, Package } from "lucide-react";

const getIcon = (name) => {
    const icons = {
        BadgeCheck,
        Sparkles,
        Tractor,
        Package,
    };
    const Icon = icons[name] || BadgeCheck;
    return <Icon size={20} className="text-[#d4af37]" strokeWidth={1.5} />;
};

export default function ProductSpecs({ product }) {
    return (
        <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Product Description */}
                <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 p-6 sm:p-8 backdrop-blur-md">
                    <h3 className="font-serif text-xl text-[#d4af37] mb-6">Product Description</h3>
                    
                    <p className="text-[13px] leading-relaxed text-[#e4e4e7] mb-6">
                        {product.description?.[0] || 'No description available.'}
                    </p>
                    
                    <ul className="space-y-3">
                        {product.description?.slice(1).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4af37]"></div>
                                <span className="text-[13px] text-[#e4e4e7] leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Nutritional Information */}
                <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 p-6 sm:p-8 backdrop-blur-md">
                    <h3 className="font-serif text-xl text-[#d4af37] mb-2">Nutritional Information</h3>
                    <p className="text-xs text-[var(--color-text-secondary)] mb-6">(Per 100g)</p>
                    
                    <div className="space-y-4">
                        {product.nutritionalInfo?.map((info, idx) => (
                            <div key={idx} className="flex items-center justify-between group">
                                <span className="text-[13px] text-[#e4e4e7] group-hover:text-[#d4af37] transition-colors">{info.label}</span>
                                <div className="flex-1 mx-4 border-b border-white/5 border-dashed"></div>
                                <span className="text-[13px] font-medium text-[#f8f9fa]">{info.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Highlights */}
                <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 p-6 sm:p-8 backdrop-blur-md">
                    <h3 className="font-serif text-xl text-[#d4af37] mb-6">Highlights</h3>
                    
                    <div className="space-y-6">
                        {product.highlights?.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5">
                                    {getIcon(highlight.icon)}
                                </div>
                                <span className="text-[13px] font-medium text-[#e4e4e7]">{highlight.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
