import { Globe, DollarSign, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function ProfilePreferences() {
    const [emailEnabled, setEmailEnabled] = useState(true);
    const [smsEnabled, setSmsEnabled] = useState(false);

    return (
        <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 lg:p-6 shadow-sm">
            <h3 className="text-[15px] font-serif text-[#f8f9fa] mb-5">Preferences</h3>

            <div className="flex flex-col gap-5">
                
                {/* Language */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                        <Globe size={16} />
                        <span className="text-sm">Language</span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer text-sm text-[#e4e4e7] hover:text-[#d4af37] transition-colors">
                        <span>English</span>
                        <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>

                {/* Currency */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                        <DollarSign size={16} />
                        <span className="text-sm">Currency</span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer text-sm text-[#e4e4e7] hover:text-[#d4af37] transition-colors">
                        <span>INR (₹)</span>
                        <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>

                {/* Email Notifications */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                        <Mail size={16} />
                        <span className="text-sm">Email Notifications</span>
                    </div>
                    {/* Custom Toggle Switch - Active */}
                    <button 
                        onClick={() => setEmailEnabled(!emailEnabled)}
                        className={`relative w-9 h-5 rounded-full transition-colors overflow-hidden focus:outline-none ${emailEnabled ? 'bg-[#d4af37]' : 'bg-white/20 hover:bg-white/30'}`}
                    >
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full shadow-sm transition-all ${emailEnabled ? 'left-[18px] bg-[#080b14]' : 'left-0.5 bg-white'}`}></div>
                    </button>
                </div>

                {/* SMS Notifications */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                        <MessageSquare size={16} />
                        <span className="text-sm">SMS Notifications</span>
                    </div>
                    {/* Custom Toggle Switch - Inactive */}
                    <button 
                        onClick={() => setSmsEnabled(!smsEnabled)}
                        className={`relative w-9 h-5 rounded-full transition-colors overflow-hidden focus:outline-none ${smsEnabled ? 'bg-[#d4af37]' : 'bg-white/20 hover:bg-white/30'}`}
                    >
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full shadow-sm transition-all ${smsEnabled ? 'left-[18px] bg-[#080b14]' : 'left-0.5 bg-white'}`}></div>
                    </button>
                </div>

            </div>
        </div>
    );
}
