import { Truck, Rocket } from "lucide-react";
import { useCart } from "../../hooks/useCart";

export default function CheckoutShipping({ selectedShipping, setSelectedShipping, config }) {
    const { cartItems } = useCart();

    // Default fallback values if config is somehow missing
    const threshold = config?.freeShippingThreshold || 999;
    const stdCharge = config?.standardShippingCharge || 50;
    const expBase = config?.expressShippingChargeBase || 149;
    const expDisc = config?.expressShippingChargeDiscounted || 99;

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const standardCost = subtotal > threshold ? 0 : stdCharge;
    const expressCost = subtotal > threshold ? expDisc : expBase;

    return (
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md mt-6">

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-6 rounded-full bg-[#d4af37] text-[#080b14] font-bold flex items-center justify-center text-[12px]">
                    2
                </div>
                <h2 className="text-[16px] sm:text-[18px] font-medium text-white">Shipping Method</h2>
            </div>

            {/* Shipping Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Standard Shipping */}
                <div
                    onClick={() => setSelectedShipping("standard")}
                    className={`relative rounded-xl border p-5 cursor-pointer transition-all flex items-center justify-between ${selectedShipping === "standard"
                        ? 'bg-[#d4af37]/10 border-[#d4af37]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/30'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center w-4 h-4 rounded-full border ${selectedShipping === "standard" ? 'border-[#d4af37]' : 'border-white/30'}`}>
                            {selectedShipping === "standard" && <div className="w-2 h-2 rounded-full bg-[#d4af37]"></div>}
                        </div>
                        <div>
                            <p className={`text-[14px] font-medium ${selectedShipping === "standard" ? 'text-white' : 'text-[#e4e4e7]'}`}>Standard Shipping</p>
                            <p className="text-[12px] text-[var(--color-text-secondary)]">5-7 Business Days</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <Truck size={20} className={selectedShipping === "standard" ? 'text-[#d4af37]' : 'text-[var(--color-text-secondary)]'} />
                        <span className={`text-[11px] font-medium mt-1 ${selectedShipping === "standard" ? 'text-[#d4af37]' : 'text-[var(--color-text-secondary)]'}`}>
                            {standardCost === 0 ? 'FREE' : `₹${standardCost}`}
                        </span>
                    </div>
                </div>

                {/* Express Shipping */}
                <div
                    onClick={() => setSelectedShipping("express")}
                    className={`relative rounded-xl border p-5 cursor-pointer transition-all flex items-center justify-between ${selectedShipping === "express"
                        ? 'bg-[#d4af37]/10 border-[#d4af37]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/30'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center w-4 h-4 rounded-full border ${selectedShipping === "express" ? 'border-[#d4af37]' : 'border-white/30'}`}>
                            {selectedShipping === "express" && <div className="w-2 h-2 rounded-full bg-[#d4af37]"></div>}
                        </div>
                        <div>
                            <p className={`text-[14px] font-medium ${selectedShipping === "express" ? 'text-white' : 'text-[#e4e4e7]'}`}>Express Shipping</p>
                            <p className="text-[12px] text-[var(--color-text-secondary)]">2-3 Business Days</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <Rocket size={18} className={selectedShipping === "express" ? 'text-[#d4af37]' : 'text-[var(--color-text-secondary)]'} />
                        <span className={`text-[11px] font-medium mt-1 ${selectedShipping === "express" ? 'text-[#d4af37]' : 'text-[var(--color-text-secondary)]'}`}>
                            ₹{expressCost}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}
