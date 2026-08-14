import { ShieldAlert, AlertTriangle, LogOut } from "lucide-react";

export default function SettingsSidebar() {
    return (
        <div className="flex flex-col gap-6">
            
            {/* Security Tips Box */}
            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 shadow-sm">
                <h4 className="text-[14px] font-medium text-[#f8f9fa] mb-4 flex items-center gap-2">
                    <ShieldAlert size={16} className="text-[#d4af37]" />
                    Security Tips
                </h4>
                
                <ul className="flex flex-col gap-3">
                    <li className="flex items-start gap-2.5 text-[12px] text-[var(--color-text-secondary)] leading-relaxed">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0"></div>
                        <span>Use a strong password combining letters, numbers, and symbols.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-[12px] text-[var(--color-text-secondary)] leading-relaxed">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0"></div>
                        <span>Never share your password or OTP with anyone, including our support team.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-[12px] text-[var(--color-text-secondary)] leading-relaxed">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0"></div>
                        <span>Regularly update your password every 3-6 months.</span>
                    </li>
                </ul>
            </div>

            {/* Logout Box */}
            <div className="rounded-xl border border-white/10 bg-[#0a0d14]/50 hover:bg-white/[0.02] transition-colors p-4 flex items-center gap-3 cursor-pointer group">
                <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-text-secondary)] group-hover:text-red-400 group-hover:border-red-400/20 group-hover:bg-red-400/10 transition-all">
                    <LogOut size={18} />
                </div>
                <div>
                    <h4 className="text-[14px] font-medium text-[#f8f9fa] group-hover:text-red-400 transition-colors">Sign Out</h4>
                    <p className="text-[11px] text-[var(--color-text-secondary)]">Log out of your account securely.</p>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 backdrop-blur-md p-5 shadow-sm mt-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.1)_0%,transparent_70%)] pointer-events-none"></div>
                
                <h4 className="text-[14px] font-medium text-red-400 mb-2 flex items-center gap-2 relative z-10">
                    <AlertTriangle size={16} />
                    Danger Zone
                </h4>
                <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed mb-4 relative z-10">
                    Once you delete your account, there is no going back. All your order history, saved addresses, and reward points will be permanently erased.
                </p>
                
                <button className="w-full py-2.5 rounded-md border border-red-500/30 text-red-400 text-[12px] font-medium hover:bg-red-500 hover:text-white transition-all relative z-10">
                    Delete Account
                </button>
            </div>

        </div>
    );
}
