import { HeadphonesIcon, MapPin, Target, Phone, ShieldCheck, Shield } from "lucide-react";

export default function AddressesSidebar() {
    return (
        <div className="flex flex-col gap-6">
            
            {/* Need Help? Box */}
            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 flex flex-col items-center text-center shadow-sm">
                <div className="h-10 w-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center mb-3">
                    <HeadphonesIcon size={18} className="text-[#d4af37]" />
                </div>
                <h4 className="text-[14px] font-medium text-[#f8f9fa] mb-1">Need Help?</h4>
                <p className="text-[12px] text-[var(--color-text-secondary)] mb-4">We are here to help you</p>
                <button className="w-full py-2 rounded-md border border-[#d4af37]/40 text-[#d4af37] text-[12px] font-medium hover:bg-[#d4af37] hover:text-[#080b14] transition-all">
                    Contact Support
                </button>
            </div>

            {/* Address Tips Box */}
            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 shadow-sm">
                <h4 className="text-[14px] font-serif text-[#f8f9fa] mb-4">Address Tips</h4>
                
                <div className="flex flex-col gap-4">
                    <div className="flex gap-3">
                        <MapPin size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
                        <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                            Ensure your PIN code is correct for smooth delivery
                        </p>
                    </div>
                    
                    <div className="flex gap-3">
                        <Target size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
                        <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                            Add nearby landmark for easy location
                        </p>
                    </div>
                    
                    <div className="flex gap-3">
                        <Phone size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
                        <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                            Use a working mobile number for delivery updates
                        </p>
                    </div>
                    
                    <div className="flex gap-3">
                        <ShieldCheck size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
                        <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                            Make Home address your default for faster checkout
                        </p>
                    </div>
                </div>
            </div>

            {/* 100% Secure Box */}
            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 flex items-center gap-4 relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] opacity-50 pointer-events-none"></div>
                
                <div className="relative z-10 h-12 w-12 shrink-0 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 flex items-center justify-center">
                    <Shield size={22} className="text-[#d4af37]" />
                </div>
                
                <div className="relative z-10 flex flex-col">
                    <h4 className="text-[13px] font-medium text-[#f8f9fa] mb-1">100% Secure</h4>
                    <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                        Your addresses are safe with us
                    </p>
                </div>
            </div>

        </div>
    );
}
