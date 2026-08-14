import { useState } from "react";
import { Smartphone, CreditCard, Landmark, Wallet, Banknote, ShieldCheck, Lock } from "lucide-react";

export default function CheckoutPayment() {
    // Default to Cash on Delivery based on user instructions
    const [activeTab, setActiveTab] = useState("cod");

    const tabs = [
        { id: "upi", icon: Smartphone, title: "UPI", desc: "Pay using any UPI app" },
        { id: "card", icon: CreditCard, title: "Credit / Debit Card", desc: "Visa, Mastercard, Rupay" },
        { id: "netbanking", icon: Landmark, title: "Net Banking", desc: "All major banks supported" },
        { id: "wallets", icon: Wallet, title: "Wallets", desc: "Paytm, PhonePe, Amazon Pay" },
        { id: "cod", icon: Banknote, title: "Cash on Delivery", desc: "Pay when you receive" },
    ];

    return (
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md mt-6">
            
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-6 rounded-full bg-[#d4af37] text-[#080b14] font-bold flex items-center justify-center text-[12px]">
                    3
                </div>
                <h2 className="text-[16px] sm:text-[18px] font-medium text-white">Payment Method</h2>
            </div>

            {/* Payment Container */}
            <div className="flex flex-col md:flex-row gap-6 border border-white/10 rounded-xl overflow-hidden bg-white/[0.01]">
                
                {/* Left: Vertical Tabs */}
                <div className="w-full md:w-[35%] lg:w-[30%] border-r border-white/10 bg-white/[0.02]">
                    <div className="flex flex-col">
                        {tabs.map((tab) => (
                            <div 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 p-4 border-l-2 cursor-pointer transition-all ${
                                    activeTab === tab.id 
                                    ? 'border-[#d4af37] bg-white/5' 
                                    : 'border-transparent hover:bg-white/[0.02]'
                                }`}
                            >
                                <div className={`flex items-center justify-center w-4 h-4 rounded-full border ${activeTab === tab.id ? 'border-[#d4af37]' : 'border-white/30'}`}>
                                    {activeTab === tab.id && <div className="w-2 h-2 rounded-full bg-[#d4af37]"></div>}
                                </div>
                                <div className="flex items-center gap-3 w-full">
                                    <tab.icon size={18} className={activeTab === tab.id ? 'text-[#d4af37]' : 'text-[var(--color-text-secondary)]'} />
                                    <div>
                                        <p className={`text-[13px] font-medium ${activeTab === tab.id ? 'text-white' : 'text-[#e4e4e7]'}`}>{tab.title}</p>
                                        <p className="text-[10px] text-[var(--color-text-secondary)]">{tab.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Tab Content */}
                <div className="w-full md:w-[65%] lg:w-[70%] p-6 md:p-8 flex flex-col items-center justify-center min-h-[300px]">
                    
                    {activeTab === "cod" ? (
                        <div className="flex flex-col items-center text-center w-full max-w-md">
                            <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center mb-6">
                                <Banknote size={32} className="text-[#d4af37]" />
                            </div>
                            <h3 className="text-[18px] font-medium text-white mb-2">Cash on Delivery selected</h3>
                            <p className="text-[13px] text-[var(--color-text-secondary)] mb-8">
                                You can pay securely with cash or UPI when your order is delivered to your doorstep.
                            </p>
                            
                            <div className="bg-[#1b251b]/40 border border-[#2e522e] rounded-lg p-3 w-full flex items-center justify-center gap-2">
                                <ShieldCheck size={16} className="text-green-500" />
                                <span className="text-[12px] text-green-400 font-medium">Safe & secure delivery</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-center w-full max-w-md opacity-70">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                <Lock size={28} className="text-[#e4e4e7]" />
                            </div>
                            <h3 className="text-[18px] font-medium text-white mb-2">Currently under construction</h3>
                            <p className="text-[13px] text-[var(--color-text-secondary)]">
                                This payment method is being integrated and will be available soon. Please use Cash on Delivery for now.
                            </p>
                        </div>
                    )}
                    
                </div>
            </div>

            {/* Bottom secure tag */}
            <div className="mt-4 flex items-center gap-2 text-green-500 justify-end md:mr-4">
                <ShieldCheck size={14} />
                <span className="text-[11px] font-medium text-green-500">Payments are secure and encrypted</span>
            </div>
            
        </div>
    );
}
