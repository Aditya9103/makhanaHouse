import { useState } from "react";
import { useGetOrdersQuery } from "../../store/api/orderApiSlice";
import { Package, Search, Eye, Filter, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminOrders() {
    const { data: orders = [], isLoading, error } = useGetOrdersQuery();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

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

    const filteredOrders = orders.filter((order) => {
        const matchesSearch = (order.orderId || order._id).toLowerCase().includes(searchTerm.toLowerCase()) || 
                              order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#080b14]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center shrink-0">
                        <Package className="text-[#d4af37]" size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-serif text-[#f8f9fa] mb-1">Orders Management</h1>
                        <p className="text-[13px] text-[var(--color-text-secondary)]">View and manage all customer orders.</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search by Order ID or Customer Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#080b14]/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#f8f9fa] placeholder-[var(--color-text-secondary)] focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/[0.02] transition-all"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0 shrink-0">
                    <Filter size={16} className="text-[#d4af37] mr-1 hidden sm:block" />
                    {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap border ${statusFilter === status ? 'bg-[#d4af37] text-[#080b14] border-[#d4af37]' : 'bg-[#080b14]/50 text-[var(--color-text-secondary)] border-white/10 hover:border-[#d4af37]/30 hover:text-[#f8f9fa]'}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders Table */}
            <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/[0.02]">
                                <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Order ID</th>
                                <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Date</th>
                                <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Customer</th>
                                <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Total</th>
                                <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Payment</th>
                                <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="7" className="p-10 text-center">
                                        <Loader2 className="animate-spin text-[#d4af37] mx-auto mb-3" size={24} />
                                        <p className="text-sm text-[var(--color-text-secondary)]">Loading orders...</p>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="7" className="p-10 text-center text-red-400 text-sm">
                                        Error loading orders.
                                    </td>
                                </tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-10 text-center text-[var(--color-text-secondary)] text-sm">
                                        No orders found matching your filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-4">
                                            <span className="text-sm font-medium text-[#f8f9fa]">{order.orderId || order._id.substring(0, 8)}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm text-[#e4e4e7]">{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm text-[#f8f9fa]">{order.user?.name || "Unknown"}</span>
                                                <span className="text-xs text-[var(--color-text-secondary)]">{order.user?.email || ""}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm font-medium text-[#f8f9fa]">₹{order.totalPrice.toLocaleString()}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex text-[10px] px-2 py-0.5 rounded border font-medium uppercase tracking-wider ${order.isPaid ? 'text-[#16a34a] bg-[#16a34a]/10 border-[#16a34a]/20' : 'text-amber-500 bg-amber-500/10 border-amber-500/20'}`}>
                                                {order.isPaid ? 'Paid' : 'Unpaid'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex px-2.5 py-1 rounded-md text-[11px] font-medium border ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center">
                                                <Link to={`/admin/orders/${order._id}`} className="p-2 rounded-lg bg-white/5 hover:bg-[#d4af37]/20 text-[var(--color-text-secondary)] hover:text-[#d4af37] transition-all">
                                                    <Eye size={16} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
