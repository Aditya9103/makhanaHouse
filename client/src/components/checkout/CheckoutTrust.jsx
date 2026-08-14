import { Leaf, Truck, ShieldCheck, RefreshCw, Package, Globe2 } from "lucide-react";

export default function CheckoutTrust() {
    return (
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            
            <h3 className="text-[16px] font-medium text-white mb-6">Why Shop With Makhana House?</h3>
            
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <Leaf size={16} className="text-[#d4af37]" />
                    <span className="text-[13px] text-[#e4e4e7]">100% Natural & Premium Quality</span>
                </div>
                <div className="flex items-center gap-3">
                    <Truck size={16} className="text-[#d4af37]" />
                    <span className="text-[13px] text-[#e4e4e7]">Direct from Farmers</span>
                </div>
                <div className="flex items-center gap-3">
                    <Package size={16} className="text-[#d4af37]" />
                    <span className="text-[13px] text-[#e4e4e7]">Hygienically Processed & Packed</span>
                </div>
                <div className="flex items-center gap-3">
                    <Globe2 size={16} className="text-[#d4af37]" />
                    <span className="text-[13px] text-[#e4e4e7]">Export Worldwide</span>
                </div>
                <div className="flex items-center gap-3">
                    <ShieldCheck size={16} className="text-[#d4af37]" />
                    <span className="text-[13px] text-[#e4e4e7]">Secure Payments</span>
                </div>
                <div className="flex items-center gap-3">
                    <RefreshCw size={16} className="text-[#d4af37]" />
                    <span className="text-[13px] text-[#e4e4e7]">Easy Returns & Refunds</span>
                </div>
            </div>

        </div>
    );
}
