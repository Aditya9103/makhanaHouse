import { Filter, Calendar as CalendarIcon, ChevronDown, Check, Package, CreditCard, Clock, XCircle, CheckCircle2 } from "lucide-react";

export default function OrderFilterSidebar() {
    return (
        <>
            {/* Order Summary Block */}
            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 lg:p-6 shadow-sm">
                <h3 className="text-[15px] font-serif text-[#f8f9fa] mb-6">Order Summary</h3>
                
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between pb-4 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded flex items-center justify-center border border-[#d4af37]/30 bg-[#d4af37]/10">
                                <Package size={14} className="text-[#d4af37]" />
                            </div>
                            <span className="text-[13px] text-[#e4e4e7]">Total Orders</span>
                        </div>
                        <span className="text-[14px] font-medium text-[#f8f9fa]">12</span>
                    </div>
                    
                    <div className="flex items-center justify-between pb-4 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded flex items-center justify-center border border-[#d4af37]/30 bg-[#d4af37]/10">
                                <CreditCard size={14} className="text-[#d4af37]" />
                            </div>
                            <span className="text-[13px] text-[#e4e4e7]">Total Spent</span>
                        </div>
                        <span className="text-[14px] font-medium text-[#f8f9fa]">₹12,850</span>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded flex items-center justify-center border border-[#d4af37]/30 bg-[#d4af37]/10">
                                <CheckCircle2 size={14} className="text-[#d4af37]" />
                            </div>
                            <span className="text-[13px] text-[#e4e4e7]">Delivered Orders</span>
                        </div>
                        <span className="text-[14px] font-medium text-[#f8f9fa]">6</span>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded flex items-center justify-center border border-[#d4af37]/30 bg-[#d4af37]/10">
                                <Clock size={14} className="text-[#d4af37]" />
                            </div>
                            <span className="text-[13px] text-[#e4e4e7]">Processing</span>
                        </div>
                        <span className="text-[14px] font-medium text-[#f8f9fa]">2</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded flex items-center justify-center border border-[#d4af37]/30 bg-[#d4af37]/10">
                                <XCircle size={14} className="text-[#d4af37]" />
                            </div>
                            <span className="text-[13px] text-[#e4e4e7]">Cancelled</span>
                        </div>
                        <span className="text-[14px] font-medium text-[#f8f9fa]">1</span>
                    </div>
                </div>
            </div>

            {/* Filter Orders Block */}
            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 lg:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[15px] font-serif text-[#f8f9fa]">Filter Orders</h3>
                    <button className="text-[11px] text-[#d4af37] hover:text-[#f3e5ab] transition-colors font-medium">Clear All</button>
                </div>
                
                <div className="flex flex-col gap-6">
                    
                    {/* Order Status */}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-[12px] text-[#f8f9fa] font-medium">Order Status</h4>
                        <div className="flex flex-col gap-2.5">
                            {['All Orders', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status, idx) => (
                                <label key={status} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${idx === 0 ? 'bg-[#d4af37] border-[#d4af37]' : 'border-white/20 bg-transparent group-hover:border-[#d4af37]/50'}`}>
                                        {idx === 0 && <Check size={10} className="text-[#080b14]" />}
                                    </div>
                                    <span className={`text-[13px] ${idx === 0 ? 'text-[#f8f9fa]' : 'text-[var(--color-text-secondary)] group-hover:text-[#e4e4e7]'}`}>{status}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Date Range */}
                    <div className="flex flex-col gap-2">
                        <h4 className="text-[12px] text-[#f8f9fa] font-medium">Date Range</h4>
                        <div className="relative">
                            <CalendarIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#d4af37]" />
                            <input 
                                type="text" 
                                placeholder="Select Date Range" 
                                readOnly
                                className="w-full bg-[#0a0d14] border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-[12px] text-[var(--color-text-secondary)] focus:outline-none cursor-pointer hover:border-white/20 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Sort By */}
                    <div className="flex flex-col gap-2">
                        <h4 className="text-[12px] text-[#f8f9fa] font-medium">Sort By</h4>
                        <div className="relative">
                            <select className="w-full bg-[#0a0d14] border border-white/10 rounded-lg py-2.5 pl-3 pr-9 text-[12px] text-[#f8f9fa] focus:outline-none focus:border-[#d4af37]/50 appearance-none cursor-pointer hover:border-white/20 transition-colors">
                                <option>Newest First</option>
                                <option>Oldest First</option>
                                <option>Price: High to Low</option>
                                <option>Price: Low to High</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e4e4e7]/60 pointer-events-none" />
                        </div>
                    </div>

                    {/* Apply Button */}
                    <button className="w-full flex items-center justify-center gap-2 bg-[#d4af37] text-[#080b14] font-medium text-[13px] py-3 rounded-lg hover:bg-[#f3e5ab] transition-colors mt-2">
                        Apply Filters
                        <Filter size={14} />
                    </button>

                </div>
            </div>
        </>
    );
}
