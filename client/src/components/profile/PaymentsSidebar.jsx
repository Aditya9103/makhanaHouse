import { ShieldCheck, Lock, CreditCard } from "lucide-react";

export default function PaymentsSidebar() {
    return (
        <div className="flex flex-col gap-6">
            
            {/* 100% Secure Box */}
            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 flex flex-col relative overflow-hidden shadow-sm">
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,rgba(22,163,74,0.1)_0%,transparent_70%)] pointer-events-none"></div>
                
                <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="h-10 w-10 rounded-full bg-[#16a34a]/10 border border-[#16a34a]/20 flex items-center justify-center text-[#16a34a]">
                        <ShieldCheck size={20} />
                    </div>
                    <h4 className="text-[15px] font-serif text-[#f8f9fa]">100% Secure</h4>
                </div>

                <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed mb-5 relative z-10">
                    We use industry-standard encryption to protect your payment details. Your card information is never stored directly on our servers.
                </p>

                <div className="flex flex-col gap-3 relative z-10">
                    <div className="flex items-center gap-2.5">
                        <Lock size={14} className="text-[#d4af37]" />
                        <span className="text-[12px] text-[#e4e4e7]">256-bit SSL Encryption</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <CreditCard size={14} className="text-[#d4af37]" />
                        <span className="text-[12px] text-[#e4e4e7]">PCI DSS Compliant</span>
                    </div>
                </div>
            </div>

            {/* Accepted Payments */}
            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 shadow-sm">
                <h4 className="text-[14px] font-medium text-[#f8f9fa] mb-4">Accepted Methods</h4>
                
                <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[11px] font-medium text-[#e4e4e7]">VISA</div>
                    <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[11px] font-medium text-[#e4e4e7]">Mastercard</div>
                    <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[11px] font-medium text-[#e4e4e7]">RuPay</div>
                    <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[11px] font-medium text-[#e4e4e7]">UPI</div>
                    <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[11px] font-medium text-[#e4e4e7]">Net Banking</div>
                </div>
            </div>

        </div>
    );
}
