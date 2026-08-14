import { Check } from "lucide-react";

export default function CheckoutStepper() {
    return (
        <div className="flex items-center gap-2 sm:gap-4 md:min-w-[400px]">
            {/* Step 1: Cart */}
            <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#d4af37] text-[#080b14] flex items-center justify-center">
                    <Check size={16} strokeWidth={3} />
                </div>
                <span className="text-[11px] sm:text-[12px] font-medium text-[#e4e4e7]">Cart</span>
            </div>

            {/* Line */}
            <div className="flex-1 h-[1px] bg-[#d4af37] mb-6"></div>

            {/* Step 2: Shipping (Active) */}
            <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#d4af37] text-[#080b14] font-bold flex items-center justify-center text-[13px]">
                    2
                </div>
                <span className="text-[11px] sm:text-[12px] font-medium text-[#d4af37]">Shipping</span>
            </div>

            {/* Line */}
            <div className="flex-1 h-[1px] bg-white/20 mb-6 relative">
                {/* Active line progress */}
                <div className="absolute top-0 left-0 h-full w-1/2 bg-[#d4af37]"></div>
            </div>

            {/* Step 3: Payment */}
            <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-white/20 text-[#e4e4e7] flex items-center justify-center text-[13px] bg-white/5">
                    3
                </div>
                <span className="text-[11px] sm:text-[12px] text-[var(--color-text-secondary)]">Payment</span>
            </div>

            {/* Line */}
            <div className="flex-1 h-[1px] bg-white/20 mb-6"></div>

            {/* Step 4: Review */}
            <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-white/20 text-[#e4e4e7] flex items-center justify-center text-[13px] bg-white/5">
                    4
                </div>
                <span className="text-[11px] sm:text-[12px] text-[var(--color-text-secondary)] whitespace-nowrap">Review & Place Order</span>
            </div>
        </div>
    );
}
