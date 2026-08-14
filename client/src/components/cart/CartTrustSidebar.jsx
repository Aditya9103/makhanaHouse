import { ShieldCheck, Package, Sprout, HandCoins } from "lucide-react";

export default function CartTrustSidebar() {
    return (
        <div className="flex flex-col gap-6">
            {/* We Accept */}
            <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 p-5 sm:p-6 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-[#e4e4e7]">We Accept</h4>
                    <div className="flex items-center gap-1.5 text-xs text-[#d4af37]">
                        <ShieldCheck size={14} />
                        <span className="font-medium text-[10px] leading-tight">100%<br />Secure Payments</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {/* Mock Payment Icons */}
                    <div className="h-8 w-12 rounded border border-white/10 bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/50">VISA</div>
                    <div className="h-8 w-12 rounded border border-white/10 bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/50">MC</div>
                    <div className="h-8 w-12 rounded border border-white/10 bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/50">RuPay</div>
                    <div className="h-8 w-12 rounded border border-white/10 bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/50">UPI</div>
                </div>
            </div>

            {/* Why Choose Makhana House? */}
            <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 p-5 sm:p-6 backdrop-blur-md">
                <h4 className="font-serif text-[17px] text-[#d4af37] mb-5">Why Choose Makhana House?</h4>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/10 text-[#d4af37]">
                            <ShieldCheck size={12} />
                        </div>
                        <div>
                            <h5 className="text-sm font-medium text-[#f8f9fa]">Premium Quality</h5>
                            <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">Carefully sourced & handpicked</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/10 text-[#d4af37]">
                            <Sprout size={12} />
                        </div>
                        <div>
                            <h5 className="text-sm font-medium text-[#f8f9fa]">Direct from Farmers</h5>
                            <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">Supporting local farmers of Bihar</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/10 text-[#d4af37]">
                            <HandCoins size={12} />
                        </div>
                        <div>
                            <h5 className="text-sm font-medium text-[#f8f9fa]">Hygienically Processed</h5>
                            <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">Clean, sorted & quality checked</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/10 text-[#d4af37]">
                            <Package size={12} />
                        </div>
                        <div>
                            <h5 className="text-sm font-medium text-[#f8f9fa]">Export Quality Packaging</h5>
                            <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">Packed with care, delivered with trust</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
