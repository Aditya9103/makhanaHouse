import { Star, Gift, ShoppingBag, Trophy, Loader2 } from "lucide-react";
import { useGetMyRewardHistoryQuery } from "../../store/api/rewardApiSlice";

export default function RewardsSidebar() {
    const { data: history = [], isLoading: loadingHistory } = useGetMyRewardHistoryQuery();

    return (
        <div className="flex flex-col gap-6">
            
            {/* How to Earn Box */}
            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 shadow-sm">
                <h4 className="text-[14px] font-serif text-[#f8f9fa] mb-5 flex items-center gap-2">
                    <Star size={16} className="text-[#d4af37] fill-[#d4af37]" />
                    How to Earn Points
                </h4>
                
                <div className="flex flex-col gap-5 relative">
                    {/* Connecting line */}
                    <div className="absolute left-[15px] top-4 bottom-4 w-[1px] bg-white/5 -z-10"></div>
                    
                    <div className="flex gap-4 items-start">
                        <div className="h-8 w-8 rounded-full bg-[#0a0d14] border border-[#d4af37]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#d4af37]">
                            <ShoppingBag size={14} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[13px] font-medium text-[#f8f9fa]">Shop & Earn</span>
                            <span className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">Earn 10 points for every ₹100 spent on our store.</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                        <div className="h-8 w-8 rounded-full bg-[#0a0d14] border border-[#d4af37]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#d4af37]">
                            <Gift size={14} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[13px] font-medium text-[#f8f9fa]">Birthday Bonus</span>
                            <span className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">Get 500 bonus points on your special day.</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 items-start">
                        <div className="h-8 w-8 rounded-full bg-[#0a0d14] border border-[#d4af37]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#d4af37]">
                            <Trophy size={14} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[13px] font-medium text-[#f8f9fa]">Tier Upgrades</span>
                            <span className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">Unlock massive point multipliers at higher tiers.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent History Box */}
            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[14px] font-medium text-[#f8f9fa]">Recent History</h4>
                    <span className="text-[11px] text-[#d4af37] cursor-pointer hover:underline">View All</span>
                </div>
                
                <div className="flex flex-col gap-3">
                    {loadingHistory ? (
                        <div className="flex justify-center py-4"><Loader2 className="animate-spin text-[#d4af37]" /></div>
                    ) : history.length === 0 ? (
                        <div className="text-[11px] text-[var(--color-text-secondary)] text-center py-4">No recent history found.</div>
                    ) : (
                        history.map((item, index) => (
                            <div key={item._id} className={`flex items-center justify-between pb-3 ${index !== history.length - 1 ? 'border-b border-white/5' : ''}`}>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[12px] text-[#e4e4e7]">{item.description}</span>
                                    <span className="text-[10px] text-[var(--color-text-secondary)]">
                                        {new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                                <span className={`text-[12px] font-medium ${item.type === 'earned' ? 'text-[#16a34a]' : 'text-red-400'}`}>
                                    {item.type === 'earned' ? '+' : '-'}{item.points} pts
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
}
