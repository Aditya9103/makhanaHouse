import { Gift, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function RewardsMain() {
    const [copiedId, setCopiedId] = useState(null);

    const coupons = [
        {
            id: 1,
            code: "WELCOME10",
            title: "10% Off on First Order",
            expiry: "Valid till 31 Dec 2024",
            minOrder: "₹999",
            bg: "from-[#d4af37]/20 to-[#080b14]"
        },
        {
            id: 2,
            code: "FESTIVE20",
            title: "Flat ₹200 Off",
            expiry: "Valid till 30 Nov 2024",
            minOrder: "₹1,499",
            bg: "from-purple-500/20 to-[#080b14]"
        },
        {
            id: 3,
            code: "FREESHIP",
            title: "Free Express Shipping",
            expiry: "Valid for next 7 days",
            minOrder: "₹500",
            bg: "from-emerald-500/20 to-[#080b14]"
        }
    ];

    const copyToClipboard = (code, id) => {
        navigator.clipboard.writeText(code);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="flex flex-col gap-6">
            
            {/* Hero Tier Card */}
            <div className="rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#0a0d14] to-[#080b14] p-6 sm:p-8 relative overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.05)]">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d4af37\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
                <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none rounded-full blur-2xl"></div>

                <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center relative z-10">
                    
                    {/* Left: Badge */}
                    <div className="flex flex-col items-center justify-center shrink-0">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-[#d4af37]/40 bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 flex items-center justify-center relative shadow-[0_0_30px_rgba(212,175,55,0.2)] mb-3">
                            <div className="absolute inset-2 rounded-full border border-dashed border-[#d4af37]/30"></div>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg">
                                <path d="M12 22c0-4-3-8-3-12s3-8 3-8 3 4 3 8-3 8-3 12z" />
                                <path d="M12 22c-3-2-8-5-8-11s3-5 5-5" />
                                <path d="M12 22c3-2 8-5 8-11s-3-5-5-5" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-serif text-[#d4af37] tracking-wider">GOLD TIER</h2>
                    </div>

                    {/* Right: Progress */}
                    <div className="flex-1 w-full flex flex-col justify-center">
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <p className="text-[12px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Current Points</p>
                                <p className="text-3xl font-serif text-[#f8f9fa] leading-none">3,750 <span className="text-[14px] text-[#d4af37] font-sans font-medium">pts</span></p>
                            </div>
                            <div className="text-right">
                                <p className="text-[12px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Next Tier</p>
                                <p className="text-[14px] font-medium text-[#f8f9fa]">Platinum (5,000 pts)</p>
                            </div>
                        </div>

                        <div className="relative mt-4">
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] w-[75%] rounded-full relative">
                                    <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/30 animate-pulse"></div>
                                </div>
                            </div>
                            
                            {/* Milestone markers */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-3 rounded-full bg-[#d4af37] border-2 border-[#080b14]"></div>
                            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-3 h-3 rounded-full bg-white/20 border-2 border-[#080b14]"></div>
                        </div>
                        
                        <p className="text-[12px] text-[var(--color-text-secondary)] mt-4 leading-relaxed">
                            You need <strong className="text-[#f8f9fa] font-medium">1,250 more points</strong> to unlock Platinum tier and get 15% off all orders.
                        </p>
                    </div>

                </div>
            </div>

            {/* Coupons Section */}
            <div>
                <h3 className="text-xl font-serif text-[#f8f9fa] mb-4 flex items-center gap-2">
                    <Gift size={20} className="text-[#d4af37]" />
                    Available Offers
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {coupons.map((coupon) => (
                        <div key={coupon.id} className={`rounded-xl border border-white/10 bg-gradient-to-br ${coupon.bg} p-5 relative overflow-hidden flex flex-col`}>
                            
                            {/* Decorative dashed line */}
                            <div className="absolute top-0 bottom-0 right-[30%] w-[1px] border-r-2 border-dashed border-white/10"></div>
                            
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex flex-col pr-4 z-10 w-[65%]">
                                    <h4 className="text-[16px] font-medium text-[#f8f9fa] mb-1 leading-tight">{coupon.title}</h4>
                                    <span className="text-[11px] text-[var(--color-text-secondary)]">Min. Order {coupon.minOrder}</span>
                                </div>
                                <div className="z-10 w-[30%] flex flex-col items-center">
                                    <span className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-widest mb-1.5 text-center">Use Code</span>
                                    <div className="bg-[#080b14]/50 border border-white/10 rounded px-2.5 py-1.5 text-[13px] font-bold text-[#f8f9fa] tracking-wider text-center w-full truncate">
                                        {coupon.code}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between z-10">
                                <span className="text-[11px] text-[#e4e4e7]">{coupon.expiry}</span>
                                <button 
                                    onClick={() => copyToClipboard(coupon.code, coupon.id)}
                                    className={`flex items-center gap-1.5 text-[12px] font-medium transition-colors ${copiedId === coupon.id ? 'text-[#16a34a]' : 'text-[#d4af37] hover:text-[#f8f9fa]'}`}
                                >
                                    {copiedId === coupon.id ? (
                                        <>
                                            <CheckCircle2 size={14} />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={14} />
                                            Copy Code
                                        </>
                                    )}
                                </button>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
}
