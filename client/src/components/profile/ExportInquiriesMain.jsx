import { Plus, Calendar, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ExportInquiriesMain() {
    const [activeTab, setActiveTab] = useState("all");

    const tabs = [
        { id: "all", label: "All Inquiries (6)" },
        { id: "quotation", label: "Quotation Sent (2)" },
        { id: "discussion", label: "In Discussion (1)" },
        { id: "followup", label: "Follow Up (1)" },
        { id: "converted", label: "Converted (1)" },
        { id: "closed", label: "Closed (1)" }
    ];

    const inquiries = [
        {
            id: "#EXP-2024-1256",
            date: "15 May 2024",
            time: "10:30 AM",
            product: "Roasted Makhana (Plain)",
            quantity: "500 KG",
            country: "United States",
            flag: "🇺🇸",
            status: "Quotation Sent",
            statusColor: "text-purple-400 bg-purple-400/10 border-purple-400/20"
        },
        {
            id: "#EXP-2024-1249",
            date: "14 May 2024",
            time: "02:15 PM",
            product: "Peri Peri Makhana",
            quantity: "1,000 KG",
            country: "United Arab Emirates",
            flag: "🇦🇪",
            status: "In Discussion",
            statusColor: "text-amber-500 bg-amber-500/10 border-amber-500/20"
        },
        {
            id: "#EXP-2024-1238",
            date: "08 May 2024",
            time: "11:45 AM",
            product: "Cream & Onion Makhana",
            quantity: "750 KG",
            country: "Germany",
            flag: "🇩🇪",
            status: "Follow Up",
            statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/20"
        },
        {
            id: "#EXP-2024-1205",
            date: "02 May 2024",
            time: "09:20 AM",
            product: "Chocolate Makhana",
            quantity: "600 KG",
            country: "Australia",
            flag: "🇦🇺",
            status: "Converted",
            statusColor: "text-[#16a34a] bg-[#16a34a]/10 border-[#16a34a]/20"
        },
        {
            id: "#EXP-2024-1189",
            date: "25 Apr 2024",
            time: "04:35 PM",
            product: "Mixed Flavors Makhana",
            quantity: "1,200 KG",
            country: "Singapore",
            flag: "🇸🇬",
            status: "Closed",
            statusColor: "text-[var(--color-text-secondary)] bg-white/5 border-white/10"
        }
    ];

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
                {inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="flex flex-col lg:flex-row gap-5 p-5 rounded-xl border border-white/10 bg-[#0a0d14]/50 hover:bg-white/[0.02] hover:border-white/20 transition-all group items-start lg:items-center">
                        
                        {/* Details */}
                        <div className="flex-1 flex flex-col min-w-0 w-full">
                            
                            {/* Top row: ID, Date & Status */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                                <div>
                                    <div className="flex items-center gap-3 mb-1.5">
                                        <h3 className="text-[16px] font-semibold text-[#f8f9fa] truncate">
                                            Inquiry {inquiry.id}
                                        </h3>
                                        <span className={`inline-flex text-[10px] px-2.5 py-1 rounded-md border font-medium uppercase tracking-wider shrink-0 ${inquiry.statusColor}`}>
                                            {inquiry.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-secondary)]">
                                        <Calendar size={13} className="text-[#d4af37]" />
                                        <span className="truncate">{inquiry.date} • {inquiry.time}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Middle row: Specs */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 w-full lg:w-[90%] bg-white/[0.02] p-4 rounded-lg border border-white/5">
                                <div className="flex flex-col gap-1 min-w-0">
                                    <span className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider">Product Interest</span>
                                    <span className="text-[13px] text-[#e4e4e7] truncate">{inquiry.product}</span>
                                </div>
                                <div className="flex flex-col gap-1 min-w-0">
                                    <span className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider">Quantity</span>
                                    <span className="text-[13px] font-medium text-[#f8f9fa] truncate">{inquiry.quantity}</span>
                                </div>
                                <div className="flex flex-col gap-1 min-w-0 col-span-2 md:col-span-1">
                                    <span className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider">Country</span>
                                    <span className="text-[13px] text-[#e4e4e7] flex items-center gap-1.5 truncate">
                                        <span className="text-base leading-none">{inquiry.flag}</span> 
                                        <span className="truncate">{inquiry.country}</span>
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
                ))}
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
