import { Plus, Calendar, Eye, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetMyExportInquiriesQuery } from "../../store/api/exportApiSlice";

export default function ExportInquiriesMain() {
    const [activeTab, setActiveTab] = useState("all");
    const { data: inquiriesData, isLoading, error } = useGetMyExportInquiriesQuery();

    const inquiries = inquiriesData || [];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return "text-purple-400 bg-purple-400/10 border-purple-400/20";
            case 'Reviewed': return "text-blue-400 bg-blue-400/10 border-blue-400/20";
            case 'Contacted': return "text-amber-500 bg-amber-500/10 border-amber-500/20";
            case 'Closed': return "text-[var(--color-text-secondary)] bg-white/5 border-white/10";
            default: return "text-[var(--color-text-secondary)] bg-white/5 border-white/10";
        }
    };

    const tabs = [
        { id: "all", label: `All Inquiries (${inquiries.length})` },
        { id: "Pending", label: `Pending (${inquiries.filter(i => i.status === 'Pending').length})` },
        { id: "Reviewed", label: `Reviewed (${inquiries.filter(i => i.status === 'Reviewed').length})` },
        { id: "Contacted", label: `Contacted (${inquiries.filter(i => i.status === 'Contacted').length})` },
        { id: "Closed", label: `Closed (${inquiries.filter(i => i.status === 'Closed').length})` }
    ];

    const filteredInquiries = activeTab === "all" ? inquiries : inquiries.filter(i => i.status === activeTab);


    return (
        <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden shadow-sm flex flex-col">
            
            {/* Header Section */}
            <div className="p-5 sm:p-6 pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-serif text-[#f8f9fa] mb-1">My Export Inquiries</h2>
                    <p className="text-[13px] text-[var(--color-text-secondary)]">Track the status and details of all your export inquiries.</p>
                </div>
                
                <Link to="/export/new" className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#d4af37] text-[#080b14] text-[13px] font-medium hover:bg-[#f3e5ab] transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)] shrink-0">
                    <Plus size={16} />
                    New Inquiry
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto no-scrollbar border-b border-white/10 px-2 sm:px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-4 text-[13px] font-medium whitespace-nowrap border-b-2 transition-colors ${
                            activeTab === tab.id 
                            ? "border-[#d4af37] text-[#d4af37]" 
                            : "border-transparent text-[var(--color-text-secondary)] hover:text-[#f8f9fa]"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Inquiries List */}
            <div className="flex flex-col p-4 sm:p-6 gap-4">
                {isLoading ? (
                    <div className="flex justify-center p-10"><Loader2 className="animate-spin text-[#d4af37]" /></div>
                ) : filteredInquiries.length === 0 ? (
                    <div className="text-center p-10 text-[var(--color-text-secondary)]">No inquiries found.</div>
                ) : (
                    filteredInquiries.map((inquiry) => {
                        const createdAt = new Date(inquiry.createdAt);
                        const date = createdAt.toLocaleDateString();
                        const time = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        
                        return (
                        <div key={inquiry._id} className="flex flex-col lg:flex-row gap-5 p-5 rounded-xl border border-white/10 bg-[#0a0d14]/50 hover:bg-white/[0.02] hover:border-white/20 transition-all group items-start lg:items-center">
                            
                            {/* Details */}
                            <div className="flex-1 flex flex-col min-w-0 w-full">
                                
                                {/* Top row: ID, Date & Status */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1.5">
                                            <h3 className="text-[16px] font-semibold text-[#f8f9fa] truncate uppercase">
                                                Inquiry #{inquiry._id.substring(18)}
                                            </h3>
                                            <span className={`inline-flex text-[10px] px-2.5 py-1 rounded-md border font-medium uppercase tracking-wider shrink-0 ${getStatusColor(inquiry.status)}`}>
                                                {inquiry.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-secondary)]">
                                            <Calendar size={13} className="text-[#d4af37]" />
                                            <span className="truncate">{date} • {time}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Middle row: Specs */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 w-full lg:w-[90%] bg-white/[0.02] p-4 rounded-lg border border-white/5">
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <span className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider">Product Interest</span>
                                        <span className="text-[13px] text-[#e4e4e7] truncate">{inquiry.productInterest}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <span className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider">Quantity</span>
                                        <span className="text-[13px] font-medium text-[#f8f9fa] truncate">{inquiry.estimatedQuantity}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 min-w-0 col-span-2 md:col-span-1">
                                        <span className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider">Country</span>
                                        <span className="text-[13px] text-[#e4e4e7] flex items-center gap-1.5 truncate">
                                            <span className="truncate uppercase">{inquiry.targetCountry}</span>
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Mobile View Details Button */}
                                <div className="flex items-center justify-end mt-4 pt-4 border-t border-white/5 lg:hidden">
                                    <button className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-[#d4af37]/40 text-[#d4af37] text-[12px] font-medium hover:bg-[#d4af37] hover:text-[#080b14] transition-all whitespace-nowrap">
                                        <Eye size={14} />
                                        View Details
                                    </button>
                                </div>
                            </div>

                            {/* Right side Desktop Actions */}
                            <div className="hidden lg:flex shrink-0 w-[140px] pl-6 border-l border-white/10 h-full items-center justify-center">
                                <button className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#d4af37]/40 text-[#d4af37] text-[12px] font-medium hover:bg-[#d4af37] hover:text-[#080b14] transition-all">
                                    <Eye size={14} />
                                    View Details
                                </button>
                            </div>

                        </div>
                    )})
                )}
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-center py-5 border-t border-white/10 bg-white/[0.01]">
                <div className="flex items-center gap-1.5">
                    <button className="h-8 w-8 rounded flex items-center justify-center bg-white/5 border border-white/10 text-white/40 cursor-not-allowed">
                        <ChevronLeft size={16} />
                    </button>
                    <button className="h-8 w-8 rounded flex items-center justify-center bg-[#d4af37] text-[#080b14] font-medium text-[13px]">
                        1
                    </button>
                    <button className="h-8 w-8 rounded flex items-center justify-center bg-white/5 border border-white/10 text-[#e4e4e7] hover:bg-white/10 transition-colors text-[13px]">
                        2
                    </button>
                    <button className="h-8 w-8 rounded flex items-center justify-center bg-white/5 border border-white/10 text-[#e4e4e7] hover:bg-white/10 transition-colors">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

        </div>
    );
}
