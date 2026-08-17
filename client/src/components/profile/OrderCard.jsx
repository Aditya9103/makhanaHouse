import { Download } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderCard({ order }) {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "delivered": return "bg-[#16a34a]";
            case "shipped": return "bg-[#d4af37]";
            case "processing": return "bg-[#3b82f6]";
            case "cancelled": return "bg-[#ef4444]";
            default: return "bg-gray-500";
        }
    };

    return (
        <div className="flex flex-col xl:flex-row p-5 hover:bg-white/[0.02] transition-colors gap-5 xl:gap-8 group">
            
            {/* Left Block: Image & Order Info */}
            <div className="flex gap-3 sm:gap-4 flex-[1.2] items-center min-w-0">
                {/* Main product image container */}
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] p-1 shrink-0 flex items-center justify-center border border-white/5">
                    <img src={order.image} alt="Order Main" className="h-12 w-12 sm:h-16 sm:w-16 object-contain drop-shadow-md" />
                </div>

                {/* Info & Thumbnails */}
                <div className="flex flex-col gap-2 min-w-0">
                    <div className="flex flex-col">
                        <h4 className="text-[13px] sm:text-[14px] font-medium text-[#f8f9fa] truncate">Order #{order.id}</h4>
                        <p className="text-[11px] text-[var(--color-text-secondary)] truncate">Placed on {order.date} <span className="mx-1">|</span> {order.itemsCount} Items</p>
                    </div>

                    {/* Small Thumbnails */}
                    <div className="flex items-center gap-1.5">
                        {order.thumbnails.slice(0, 3).map((thumb, idx) => (
                            <div key={idx} className="h-7 w-7 rounded bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] flex items-center justify-center border border-white/5">
                                <img src={thumb} alt={`item ${idx}`} className="h-5 w-5 object-contain" />
                            </div>
                        ))}
                        {order.itemsCount > 3 && (
                            <div className="h-7 w-7 rounded bg-white/[0.03] flex items-center justify-center border border-white/5 text-[#f8f9fa] text-[9px] font-medium">
                                +{order.itemsCount - 3}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Middle/Right Blocks Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 xl:gap-4 flex-[2] items-center">
                
                {/* Amount & Payment */}
                <div className="flex flex-col gap-2.5">
                    <div>
                        <p className="text-[10px] text-[var(--color-text-secondary)] mb-0.5">Total Amount</p>
                        <p className="text-[14px] font-medium text-[#f8f9fa]">₹{order.price}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-[var(--color-text-secondary)] mb-0.5">Payment Method</p>
                        <p className="text-[11px] text-[#f8f9fa]">{order.paymentMethod}</p>
                    </div>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-1.5 bg-[#080b14] w-max px-2.5 py-1 rounded-full border border-white/5 shadow-inner">
                        <div className={`h-1 w-1 rounded-full ${getStatusColor(order.status)}`}></div>
                        <span className="text-[10px] text-[#e4e4e7] font-medium">{order.status}</span>
                    </div>
                    <div>
                        <p className="text-[10px] text-[var(--color-text-secondary)] mb-0.5">
                            {order.status.toLowerCase() === 'delivered' ? 'Delivered on' : 'Expected Delivery'}
                        </p>
                        <p className="text-[11px] text-[#f8f9fa] whitespace-nowrap">{order.statusDate}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 items-start sm:items-end col-span-2 sm:col-span-1 mt-2 sm:mt-0">
                    <Link to={`/profile/orders/${order.id}`} className="w-full sm:w-auto px-4 py-1.5 rounded-md border border-[#d4af37]/40 text-[#d4af37] text-[11px] font-medium hover:bg-[#d4af37] hover:text-[#080b14] transition-all text-center whitespace-nowrap block">
                        View Details
                    </Link>
                    <button className="w-full sm:w-auto flex items-center justify-center sm:justify-end gap-1.5 text-[var(--color-text-secondary)] text-[11px] hover:text-[#f8f9fa] transition-colors group whitespace-nowrap">
                        <Download size={12} className="text-[#d4af37] group-hover:text-[#f3e5ab] transition-colors" />
                        Download Invoice
                    </button>
                </div>
            </div>

        </div>
    );
}
