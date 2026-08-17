import { Calendar, Download, HeadphonesIcon } from "lucide-react";

export default function ExportInquiriesSidebar({ selectedInquiry }) {
    if (!selectedInquiry) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px] rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md text-[var(--color-text-secondary)]">
                Select an inquiry to view details
            </div>
        );
    }

    const createdAt = new Date(selectedInquiry.createdAt);
    const dateStr = createdAt.toLocaleDateString();
    const timeStr = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const getStatusIndex = (status) => {
        switch (status) {
            case 'Pending': return 0;
            case 'Reviewed': return 1;
            case 'Contacted': return 2;
            case 'Closed': return 3;
            default: return 0;
        }
    };

    const currentStatusIndex = getStatusIndex(selectedInquiry.status);

    const timeline = [
        {
            status: "Inquiry Submitted",
            date: dateStr,
            time: timeStr,
            isCompleted: currentStatusIndex >= 0,
            isLast: false,
        },
        {
            status: "Reviewed",
            date: currentStatusIndex >= 1 ? new Date(selectedInquiry.updatedAt).toLocaleDateString() : "--",
            time: currentStatusIndex >= 1 ? new Date(selectedInquiry.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--",
            isCompleted: currentStatusIndex >= 1,
            isLast: false,
        },
        {
            status: "Contacted",
            date: currentStatusIndex >= 2 ? new Date(selectedInquiry.updatedAt).toLocaleDateString() : "--",
            time: currentStatusIndex >= 2 ? new Date(selectedInquiry.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--",
            isCompleted: currentStatusIndex >= 2,
            isLast: false,
        },
        {
            status: "Closed",
            date: currentStatusIndex >= 3 ? new Date(selectedInquiry.updatedAt).toLocaleDateString() : "--",
            time: currentStatusIndex >= 3 ? new Date(selectedInquiry.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--",
            isCompleted: currentStatusIndex >= 3,
            isLast: true,
        },
    ];

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
        <div className="flex flex-col gap-6">
            
            {/* Inquiry Details Tracking Card */}
            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden shadow-sm flex flex-col">
                
                <div className="p-5 border-b border-white/10">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-[15px] font-serif text-[#f8f9fa]">Inquiry Details</h3>
                        <span className={`text-[10px] px-2.5 py-1 rounded-md border font-medium uppercase tracking-wider ${getStatusColor(selectedInquiry.status)}`}>
                            {selectedInquiry.status}
                        </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[var(--color-text-secondary)]">Inquiry ID</span>
                            <span className="text-[13px] font-medium text-[#d4af37]">#{selectedInquiry._id.substring(18)}</span>
                        </div>
                        <div className="flex flex-col gap-1 text-right">
                            <span className="text-[11px] text-[var(--color-text-secondary)]">Inquiry Date</span>
                            <div className="flex items-center justify-end gap-1.5 text-[12px] text-[#e4e4e7]">
                                <Calendar size={12} className="text-[#d4af37]" />
                                {dateStr} • {timeStr}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-5 flex flex-col gap-5 border-b border-white/10">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[var(--color-text-secondary)]">Product Interest</span>
                            <span className="text-[13px] text-[#e4e4e7]">{selectedInquiry.productInterest}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[var(--color-text-secondary)]">Quantity</span>
                            <span className="text-[13px] text-[#e4e4e7]">{selectedInquiry.estimatedQuantity}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[var(--color-text-secondary)]">Private Labeling</span>
                            <span className="text-[13px] text-[#e4e4e7]">{selectedInquiry.privateLabel ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[var(--color-text-secondary)]">Country</span>
                            <span className="text-[13px] text-[#e4e4e7] uppercase">{selectedInquiry.targetCountry}</span>
                        </div>
                    </div>

                    {selectedInquiry.additionalRequirements && (
                        <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[var(--color-text-secondary)]">Additional Requirements</span>
                            <p className="text-[12px] text-[#e4e4e7] leading-relaxed">
                                {selectedInquiry.additionalRequirements}
                            </p>
                        </div>
                    )}

                    {selectedInquiry.specSheetUrl && (
                        <div className="flex flex-col gap-2 pt-2">
                            <span className="text-[11px] text-[var(--color-text-secondary)]">Attachment</span>
                            <a href={selectedInquiry.specSheetUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/20 text-[#d4af37]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    </div>
                                    <span className="text-[12px] text-[#e4e4e7] font-medium group-hover:text-[#d4af37] transition-colors truncate max-w-[120px]">
                                        Specification Sheet
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Download size={14} className="text-[#d4af37]" />
                                </div>
                            </a>
                        </div>
                    )}
                </div>

                {/* Timeline Tracker */}
                <div className="p-5 border-b border-white/10">
                    <div className="flex flex-col relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[11px] top-3 bottom-5 w-[2px] bg-white/10 -z-10"></div>
                        <div className="absolute left-[11px] top-3 bottom-5 w-[2px] bg-[#16a34a] -z-10" style={{height: '100%'}}></div>

                        {timeline.map((step, index) => (
                            <div key={index} className={`flex gap-4 ${step.isLast ? '' : 'mb-6'}`}>
                                <div className="mt-0.5 shrink-0 relative z-10 bg-[#080b14]">
                                    {step.isCompleted ? (
                                        <div className="h-6 w-6 rounded-full bg-[#16a34a]/10 border border-[#16a34a] flex items-center justify-center text-[#16a34a]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                    ) : (
                                        <div className="h-6 w-6 rounded-full bg-white/5 border border-white/20 flex items-center justify-center">
                                            <div className="h-2 w-2 rounded-full bg-white/20"></div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className={`text-[13px] font-medium ${step.isCompleted ? 'text-[#f8f9fa]' : 'text-[var(--color-text-secondary)]'}`}>
                                        {step.status}
                                    </span>
                                    <span className="text-[11px] text-[var(--color-text-secondary)]">
                                        {step.date} • {step.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-5">
                    {selectedInquiry.specSheetUrl && (
                        <a href={selectedInquiry.specSheetUrl} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#d4af37] text-[#080b14] text-[13px] font-medium hover:bg-[#f3e5ab] transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                            <Download size={16} />
                            Download Spec Sheet
                        </a>
                    )}
                </div>
            </div>

            {/* Need Help? Box */}
            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 flex flex-col relative overflow-hidden shadow-sm">
                
                {/* Background Decoration */}
                <div className="absolute -right-6 -bottom-6 opacity-[0.4] pointer-events-none mix-blend-screen w-24 h-24 z-0">
                    <img src="/makhanabowl.png" alt="Decoration" className="w-full h-full object-contain" />
                </div>
                
                <h4 className="text-[15px] font-serif text-[#f8f9fa] mb-2 relative z-10">Need Help?</h4>
                <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed mb-5 relative z-10 pr-6">
                    Our export team is ready to assist you with any questions.
                </p>
                <button className="w-full sm:w-auto self-start flex items-center gap-2 py-2 px-4 rounded-md border border-[#d4af37]/40 text-[#d4af37] text-[12px] font-medium hover:bg-[#d4af37] hover:text-[#080b14] transition-all relative z-10">
                    <HeadphonesIcon size={14} />
                    Contact Export Team
                </button>
            </div>

        </div>
    );
}
