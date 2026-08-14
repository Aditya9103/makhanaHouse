import { Package, Download, RefreshCcw, FileText, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuickActions() {
    const actions = [
        { name: "Track Your Order", icon: Package, path: "/profile/orders" },
        { name: "Download Invoices", icon: Download, path: "/profile/orders" },
        { name: "Return / Replace Items", icon: RefreshCcw, path: "/profile/returns" },
        { name: "Export Inquiries", icon: FileText, path: "/profile/inquiries" },
    ];

    return (
        <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 lg:p-6 h-full flex flex-col">
            <h3 className="text-[15px] font-serif text-[#f8f9fa] mb-5">Quick Actions</h3>

            <div className="flex flex-col gap-2">
                {actions.map((action, idx) => {
                    const Icon = action.icon;
                    return (
                        <Link 
                            key={idx}
                            to={action.path}
                            className="flex items-center justify-between p-3.5 rounded-xl border border-transparent hover:border-[#d4af37]/20 hover:bg-white/[0.04] text-[var(--color-text-secondary)] hover:text-[#d4af37] transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                <Icon size={16} />
                                <span className="text-xs sm:text-sm font-medium">{action.name}</span>
                            </div>
                            <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
