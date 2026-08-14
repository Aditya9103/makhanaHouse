import { Plus, CreditCard, Trash2, SmartphoneNfc } from "lucide-react";
import { useState } from "react";

export default function PaymentsMain() {
    const [activeTab, setActiveTab] = useState("cards");

    return (
        <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden shadow-sm flex flex-col">
            
            {/* Header Section */}
            <div className="p-5 sm:p-6 pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-serif text-[#f8f9fa] mb-1">Payment Methods</h2>
                    <p className="text-[13px] text-[var(--color-text-secondary)]">Manage your saved cards and UPI IDs for faster checkout.</p>
                </div>
                
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#d4af37] text-[#080b14] text-[13px] font-medium hover:bg-[#f3e5ab] transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)] shrink-0">
                    <Plus size={16} />
                    Add Payment Method
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 px-2 sm:px-6">
                <button
                    onClick={() => setActiveTab("cards")}
                    className={`px-4 py-4 text-[13px] font-medium border-b-2 transition-colors ${
                        activeTab === "cards" 
                        ? "border-[#d4af37] text-[#d4af37]" 
                        : "border-transparent text-[var(--color-text-secondary)] hover:text-[#f8f9fa]"
                    }`}
                >
                    Saved Cards (2)
                </button>
                <button
                    onClick={() => setActiveTab("upi")}
                    className={`px-4 py-4 text-[13px] font-medium border-b-2 transition-colors ${
                        activeTab === "upi" 
                        ? "border-[#d4af37] text-[#d4af37]" 
                        : "border-transparent text-[var(--color-text-secondary)] hover:text-[#f8f9fa]"
                    }`}
                >
                    Saved UPI (1)
                </button>
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {activeTab === "cards" ? (
                    <>
                        {/* Card 1 */}
                        <div className="rounded-xl border border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/10 to-transparent p-5 relative overflow-hidden group">
                            {/* Glassmorphic overlays */}
                            <div className="absolute top-[-50%] right-[-20%] w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none transform rotate-12"></div>
                            
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="text-[12px] font-medium text-[#f8f9fa] bg-white/10 px-2.5 py-1 rounded-md border border-white/10">Default</div>
                                <div className="text-xl font-bold italic tracking-tighter text-white">VISA</div>
                            </div>
                            
                            <div className="text-[18px] font-medium text-[#e4e4e7] tracking-widest mb-4 relative z-10 font-mono">
                                **** **** **** 4242
                            </div>
                            
                            <div className="flex justify-between items-end relative z-10">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-0.5">Card Holder</span>
                                    <span className="text-[13px] text-[#f8f9fa] font-medium">ADITYA KUMAR</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-0.5">Expires</span>
                                    <span className="text-[13px] text-[#f8f9fa] font-medium font-mono">12/28</span>
                                </div>
                            </div>
                            
                            {/* Hover Actions */}
                            <div className="absolute inset-0 bg-[#080b14]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
                                <button className="h-10 w-10 rounded-full bg-white/10 text-red-400 hover:bg-red-400/20 hover:text-red-300 flex items-center justify-center transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="rounded-xl border border-white/10 bg-[#0a0d14]/50 p-5 relative overflow-hidden group hover:border-white/20 transition-colors">
                            
                            <div className="flex justify-end items-start mb-6 relative z-10">
                                <div className="flex items-center">
                                    <div className="h-6 w-6 rounded-full bg-red-500/80 mix-blend-screen relative left-2"></div>
                                    <div className="h-6 w-6 rounded-full bg-yellow-500/80 mix-blend-screen"></div>
                                </div>
                            </div>
                            
                            <div className="text-[18px] font-medium text-[#e4e4e7] tracking-widest mb-4 relative z-10 font-mono">
                                **** **** **** 8890
                            </div>
                            
                            <div className="flex justify-between items-end relative z-10">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-0.5">Card Holder</span>
                                    <span className="text-[13px] text-[#f8f9fa] font-medium">ADITYA KUMAR</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-0.5">Expires</span>
                                    <span className="text-[13px] text-[#f8f9fa] font-medium font-mono">08/26</span>
                                </div>
                            </div>
                            
                            {/* Hover Actions */}
                            <div className="absolute inset-0 bg-[#080b14]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
                                <button className="px-4 py-2 rounded-md bg-[#d4af37] text-[#080b14] text-[12px] font-medium hover:bg-[#f3e5ab] transition-colors">
                                    Set as Default
                                </button>
                                <button className="h-9 w-9 rounded-md bg-white/10 text-red-400 hover:bg-red-400/20 hover:text-red-300 flex items-center justify-center transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* UPI 1 */}
                        <div className="rounded-xl border border-white/10 bg-[#0a0d14]/50 p-5 flex items-center justify-between group hover:border-white/20 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                    <SmartphoneNfc size={20} className="text-[#d4af37]" />
                                </div>
                                <div>
                                    <h4 className="text-[14px] font-medium text-[#f8f9fa] mb-0.5">Google Pay</h4>
                                    <p className="text-[12px] text-[var(--color-text-secondary)]">adityakumar@okhdfcbank</p>
                                </div>
                            </div>
                            <button className="h-8 w-8 rounded-md text-[var(--color-text-secondary)] hover:text-red-400 hover:bg-red-400/10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </>
                )}
                
            </div>
        </div>
    );
}
