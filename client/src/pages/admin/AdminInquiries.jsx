import { useState, useMemo } from "react";
import { useGetExportInquiriesQuery, useUpdateExportInquiryStatusMutation } from "../../store/api/exportApiSlice";
import { Loader2, Download, Search, Filter, X, Send, Eye } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminInquiries() {
    const { data: inquiries, isLoading, error } = useGetExportInquiriesQuery();
    const [updateStatus, { isLoading: isUpdating }] = useUpdateExportInquiryStatusMutation();
    
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // Modal state for updating status with custom message
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [customMessage, setCustomMessage] = useState("");

    // Modal state for viewing details
    const [viewingInquiry, setViewingInquiry] = useState(null);

    const openUpdateModal = (inquiry, status) => {
        // Prevent opening if the status is the same
        if (inquiry.status === status) return;
        
        setSelectedInquiry(inquiry);
        setNewStatus(status);
        setCustomMessage("");
        setIsUpdateModalOpen(true);
    };

    const handleStatusConfirm = async () => {
        if (!selectedInquiry || !newStatus) return;
        
        try {
            await updateStatus({ 
                id: selectedInquiry._id, 
                status: newStatus,
                customMessage: customMessage.trim()
            }).unwrap();
            
            toast.success("Status updated and email sent successfully");
            setIsUpdateModalOpen(false);
            setSelectedInquiry(null);
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update status");
        }
    };

    // Filter inquiries
    const filteredInquiries = useMemo(() => {
        if (!inquiries) return [];
        
        return inquiries.filter(inquiry => {
            const matchesSearch = 
                inquiry.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inquiry.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inquiry.email.toLowerCase().includes(searchTerm.toLowerCase());
                
            const matchesStatus = statusFilter === "All" || inquiry.status === statusFilter;
            
            return matchesSearch && matchesStatus;
        });
    }, [inquiries, searchTerm, statusFilter]);

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 size={32} className="animate-spin text-[#d4af37]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-64 items-center justify-center text-red-400">
                Failed to load inquiries.
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return "text-purple-400 bg-purple-400/10 border-purple-400/20";
            case 'Reviewed': return "text-blue-400 bg-blue-400/10 border-blue-400/20";
            case 'Contacted': return "text-amber-500 bg-amber-500/10 border-amber-500/20";
            case 'Closed': return "text-[var(--color-text-secondary)] bg-white/5 border-white/10";
            default: return "text-[var(--color-text-secondary)] bg-white/5 border-white/10";
        }
    };

    return (
        <div className="px-4 py-8 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
                <div>
                    <h1 className="font-serif text-3xl text-[#f8f9fa]">Export Inquiries</h1>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                        Manage global bulk orders and partnerships.
                    </p>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by company, name, or email..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/50 outline-none transition-all"
                    />
                </div>
                <div className="relative w-full sm:w-[200px]">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/50 outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="All" className="bg-[#0a0d14]">All Statuses</option>
                        <option value="Pending" className="bg-[#0a0d14]">Pending</option>
                        <option value="Reviewed" className="bg-[#0a0d14]">Reviewed</option>
                        <option value="Contacted" className="bg-[#0a0d14]">Contacted</option>
                        <option value="Closed" className="bg-[#0a0d14]">Closed</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-[#e4e4e7]">
                        <thead className="border-b border-white/10 bg-white/5 text-[11px] uppercase tracking-wider text-[var(--color-text-secondary)]">
                            <tr>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Company & Contact</th>
                                <th className="px-6 py-4 font-medium">Details</th>
                                <th className="px-6 py-4 font-medium">Country</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredInquiries.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-10 text-center text-[var(--color-text-secondary)]">
                                        No inquiries found matching your filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredInquiries.map((inquiry) => (
                                    <tr key={inquiry._id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                                                <span className="text-[11px] text-[var(--color-text-secondary)]">
                                                    {new Date(inquiry.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-[#f8f9fa]">{inquiry.companyName}</span>
                                                <span className="text-sm">{inquiry.fullName}</span>
                                                <a href={`mailto:${inquiry.email}`} className="text-[12px] text-[#d4af37] hover:underline">
                                                    {inquiry.email}
                                                </a>
                                                <span className="text-[12px] text-[var(--color-text-secondary)]">{inquiry.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium">{inquiry.estimatedQuantity}</span>
                                                <span className="text-[12px] text-[var(--color-text-secondary)]">{inquiry.productInterest}</span>
                                                {inquiry.privateLabel && (
                                                    <span className="inline-block w-fit px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 mt-1">
                                                        Private Label
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap uppercase">
                                            {inquiry.targetCountry}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select 
                                                value={inquiry.status}
                                                onChange={(e) => openUpdateModal(inquiry, e.target.value)}
                                                className={`px-3 py-1.5 rounded-lg border text-[12px] font-medium outline-none appearance-none cursor-pointer ${getStatusColor(inquiry.status)}`}
                                            >
                                                <option value="Pending" className="bg-[#0a0d14] text-white">Pending</option>
                                                <option value="Reviewed" className="bg-[#0a0d14] text-white">Reviewed</option>
                                                <option value="Contacted" className="bg-[#0a0d14] text-white">Contacted</option>
                                                <option value="Closed" className="bg-[#0a0d14] text-white">Closed</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                {inquiry.specSheetUrl ? (
                                                    <a 
                                                        href={inquiry.specSheetUrl} 
                                                        target="_blank" 
                                                        rel="noreferrer" 
                                                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#d4af37] transition-colors"
                                                        title="Download Spec Sheet"
                                                    >
                                                        <Download size={16} />
                                                    </a>
                                                ) : (
                                                    <span className="p-2 rounded-lg bg-transparent text-white/10">
                                                        <Download size={16} />
                                                    </span>
                                                )}
                                                
                                                <button 
                                                    onClick={() => setViewingInquiry(inquiry)}
                                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                                                    title="View Full Details"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Status Update Modal */}
            {isUpdateModalOpen && selectedInquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0d14] p-6 shadow-2xl relative overflow-y-auto max-h-[80vh] md:max-h-[90vh] no-scrollbar">
                        <button 
                            onClick={() => setIsUpdateModalOpen(false)}
                            className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                        
                        <h3 className="text-xl font-serif text-white mb-2">Update Status & Notify</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                            Changing status for <strong className="text-white">{selectedInquiry.companyName}</strong> to <strong className="text-[#d4af37]">{newStatus}</strong>. They will receive an email notification.
                        </p>
                        
                        <div className="mb-6">
                            <label className="block text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                                Custom Message (Optional)
                            </label>
                            <textarea 
                                value={customMessage}
                                onChange={(e) => setCustomMessage(e.target.value)}
                                placeholder="E.g. We have reviewed your specs and will be sending a quote shortly..."
                                rows={4}
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-white/20 focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/50 outline-none resize-none transition-all"
                            />
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setIsUpdateModalOpen(false)}
                                className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-white hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleStatusConfirm}
                                disabled={isUpdating}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#d4af37] text-sm font-bold text-[#080b14] hover:bg-[#f3e5ab] transition-colors disabled:opacity-70 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                            >
                                {isUpdating ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <>
                                        <Send size={16} /> Update & Send
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Details Modal */}
            {viewingInquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0a0d14] p-6 shadow-2xl relative overflow-y-auto max-h-[80vh] md:max-h-[90vh] no-scrollbar">
                        <button 
                            onClick={() => setViewingInquiry(null)}
                            className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                        
                        <h3 className="text-2xl font-serif text-[#f8f9fa] mb-6 border-b border-white/10 pb-4">
                            Inquiry Details
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h4 className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Company Information</h4>
                                <div className="space-y-1">
                                    <p className="text-white font-medium">{viewingInquiry.companyName}</p>
                                    <p className="text-[#e4e4e7] text-sm">{viewingInquiry.fullName}</p>
                                    <p className="text-[#d4af37] text-sm"><a href={`mailto:${viewingInquiry.email}`}>{viewingInquiry.email}</a></p>
                                    <p className="text-[#e4e4e7] text-sm">{viewingInquiry.phone}</p>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Order Requirements</h4>
                                <div className="space-y-1 text-sm text-[#e4e4e7]">
                                    <p><span className="text-[var(--color-text-secondary)]">Product:</span> {viewingInquiry.productInterest}</p>
                                    <p><span className="text-[var(--color-text-secondary)]">Quantity:</span> {viewingInquiry.estimatedQuantity}</p>
                                    <p><span className="text-[var(--color-text-secondary)]">Destination:</span> <span className="uppercase">{viewingInquiry.targetCountry}</span></p>
                                    <p>
                                        <span className="text-[var(--color-text-secondary)]">Private Labeling:</span> 
                                        {viewingInquiry.privateLabel ? (
                                            <span className="ml-2 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">Yes</span>
                                        ) : ' No'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {viewingInquiry.additionalRequirements && (
                            <div className="mb-8">
                                <h4 className="text-[11px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Additional Requirements</h4>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-[#e4e4e7] whitespace-pre-wrap leading-relaxed">
                                    {viewingInquiry.additionalRequirements}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                            {viewingInquiry.specSheetUrl && (
                                <a 
                                    href={viewingInquiry.specSheetUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                                >
                                    <Download size={16} />
                                    Download Spec Sheet
                                </a>
                            )}
                            <button 
                                onClick={() => setViewingInquiry(null)}
                                className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-[#080b14] text-sm font-bold hover:bg-[#f3e5ab] transition-colors ml-auto"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
