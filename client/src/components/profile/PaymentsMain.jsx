import { CreditCard, Calendar, Eye, Loader2, ArrowRight } from "lucide-react";
import { useGetMyOrdersQuery } from "../../store/api/orderApiSlice";
import { Link } from "react-router-dom";

export default function PaymentsMain() {
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return "text-amber-500 bg-amber-500/10 border-amber-500/20";
            case 'Processing': return "text-blue-400 bg-blue-400/10 border-blue-400/20";
            case 'Shipped': return "text-purple-400 bg-purple-400/10 border-purple-400/20";
            case 'Delivered': return "text-[#16a34a] bg-[#16a34a]/10 border-[#16a34a]/20";
            case 'Cancelled': return "text-red-500 bg-red-500/10 border-red-500/20";
            default: return "text-[var(--color-text-secondary)] bg-white/5 border-white/10";
        }
    };

    return (
        <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden shadow-sm flex flex-col">
            
            {/* Header Section */}
            <div className="p-5 sm:p-6 pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-serif text-[#f8f9fa] mb-1">Payment History</h2>
                    <p className="text-[13px] text-[var(--color-text-secondary)]">Review your recent transactions and payment status.</p>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-col p-4 sm:p-6 gap-4">
                {isLoading ? (
                    <div className="flex justify-center p-10"><Loader2 className="animate-spin text-[#d4af37]" /></div>
                ) : !orders || orders.length === 0 ? (
                    <div className="text-center p-10 text-[var(--color-text-secondary)] flex flex-col items-center gap-4">
                        <CreditCard size={48} className="opacity-20 mb-2" />
                        <p>No payment history found.</p>
                        <Link to="/products" className="text-[#d4af37] text-sm hover:underline">Start Shopping</Link>
                    </div>
                ) : (
                    orders.map((order) => {
                        const createdAt = new Date(order.createdAt);
                        const date = createdAt.toLocaleDateString();
                        
                        return (
                        <div key={order._id} className="flex flex-col lg:flex-row gap-5 p-5 rounded-xl border border-white/10 bg-[#0a0d14]/50 hover:bg-white/[0.02] hover:border-white/20 transition-all group items-start lg:items-center">
                            
                            {/* Details */}
                            <div className="flex-1 flex flex-col min-w-0 w-full">
                                
                                {/* Top row: ID, Date & Status */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1.5">
                                            <h3 className="text-[16px] font-semibold text-[#f8f9fa] truncate uppercase">
                                                Order {order.orderId}
                                            </h3>
                                            <span className={`inline-flex text-[10px] px-2.5 py-1 rounded-md border font-medium uppercase tracking-wider shrink-0 ${order.isPaid ? 'text-[#16a34a] bg-[#16a34a]/10 border-[#16a34a]/20' : 'text-amber-500 bg-amber-500/10 border-amber-500/20'}`}>
                                                {order.isPaid ? 'Paid' : 'Unpaid'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-secondary)]">
                                            <Calendar size={13} className="text-[#d4af37]" />
                                            <span className="truncate">{date}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Middle row: Specs */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 w-full lg:w-[90%] bg-white/[0.02] p-4 rounded-lg border border-white/5">
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <span className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider">Amount</span>
                                        <span className="text-[14px] font-bold text-[#f8f9fa] truncate">₹{order.totalPrice}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <span className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider">Payment Method</span>
                                        <span className="text-[13px] text-[#e4e4e7] truncate">{order.paymentMethod}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 min-w-0 col-span-2 md:col-span-1">
                                        <span className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider">Order Status</span>
                                        <span className="text-[13px] text-[#e4e4e7] flex items-center gap-1.5 truncate">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${getStatusColor(order.status)}`}>{order.status}</span>
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Mobile View Details Button */}
                                <div className="flex items-center justify-end mt-4 pt-4 border-t border-white/5 lg:hidden">
                                    <Link to={`/order/${order._id}`} className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-[#d4af37]/40 text-[#d4af37] text-[12px] font-medium hover:bg-[#d4af37] hover:text-[#080b14] transition-all whitespace-nowrap">
                                        <Eye size={14} />
                                        View Order
                                    </Link>
                                </div>
                            </div>

                            {/* Right side Desktop Actions */}
                            <div className="hidden lg:flex shrink-0 w-[140px] pl-6 border-l border-white/10 h-full items-center justify-center">
                                <Link to={`/order/${order._id}`} className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#d4af37]/40 text-[#d4af37] text-[12px] font-medium hover:bg-[#d4af37] hover:text-[#080b14] transition-all">
                                    <Eye size={14} />
                                    View Order
                                </Link>
                            </div>

                        </div>
                    )})
                )}
            </div>
        </div>
    );
}
