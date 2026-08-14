import { Leaf, Drumstick, WheatOff, Sprout } from "lucide-react";

export default function CartFeaturesFooter() {
    return (
        <section className="border-t border-white/10 bg-[#080b14]/50 mt-10">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/30 bg-transparent text-[#d4af37]">
                            <Leaf size={24} />
                        </div>
                        <div>
                            <h4 className="text-[15px] font-medium text-[#f8f9fa]">100% Natural</h4>
                            <p className="text-[13px] text-[var(--color-text-secondary)] mt-0.5">No additives, no preservatives</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/30 bg-transparent text-[#d4af37]">
                            <Drumstick size={24} />
                        </div>
                        <div>
                            <h4 className="text-[15px] font-medium text-[#f8f9fa]">Rich in Protein</h4>
                            <p className="text-[13px] text-[var(--color-text-secondary)] mt-0.5">Healthy & nutritious snack</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/30 bg-transparent text-[#d4af37]">
                            <WheatOff size={24} />
                        </div>
                        <div>
                            <h4 className="text-[15px] font-medium text-[#f8f9fa]">Gluten Free</h4>
                            <p className="text-[13px] text-[var(--color-text-secondary)] mt-0.5">Safe for everyone</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/30 bg-transparent text-[#d4af37]">
                            <Sprout size={24} />
                        </div>
                        <div>
                            <h4 className="text-[15px] font-medium text-[#f8f9fa]">Vegan Friendly</h4>
                            <p className="text-[13px] text-[var(--color-text-secondary)] mt-0.5">Good for you & the planet</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
