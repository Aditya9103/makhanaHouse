import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../store/api/orderApiSlice";
import { Loader2 } from "lucide-react";

export default function RecentOrders() {
    const { data: allOrders = [], isLoading } = useGetMyOrdersQuery();
    const orders = allOrders.slice(0, 3).map(order => ({
        id: order.orderId || order._id,
        date: new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        price: order.totalPrice.toLocaleString('en-IN'),
        items: order.orderItems.length,
        status: order.status || (order.isDelivered ? 'Delivered' : order.isPaid ? 'Processing' : 'Pending'),
        image: order.orderItems[0]?.image || "/makhanabowl.png"
    }));

    return (
        <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 lg:p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-[15px] font-serif text-[#f8f9fa]">Recent Orders</h3>
                <Link to="/profile/orders" className="text-xs text-[#d4af37] hover:text-[#f3e5ab] transition-colors font-medium">
                    View All Orders →
                </Link>
            </div>

            <div className="flex flex-col gap-3 flex-1 min-h-[250px]">
                {isLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-[var(--color-text-secondary)] gap-3">
                        <Loader2 size={20} className="animate-spin text-[#d4af37]" />
                        <span className="text-[12px]">Loading...</span>
                    </div>
                ) : orders.length > 0 ? (
                    orders.map((order, idx) => (
                        <div 
                            key={idx} 
                            className="flex flex-col sm:flex-row sm:items-center p-4 rounded-xl border border-white/5 bg-white/[0.02] shadow-inner hover:border-white/10 hover:bg-white/[0.04] transition-all gap-4 sm:gap-0"
                        >
                            {/* Left Side: Image and Order Info */}
                            <div className="flex items-center gap-4 flex-1">
                                {/* Image */}
                                <div className="h-[52px] w-[52px] rounded-lg bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] p-1 shrink-0 flex items-center justify-center border border-white/5">
                                    <img src={order.image} alt="Order" className="h-[40px] w-[40px] object-contain drop-shadow-md" />
                                </div>

                                {/* Order ID & Date */}
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-[13px] font-medium text-[#f8f9fa]">Order #{order.id}</p>
                                    <p className="text-[11px] text-[var(--color-text-secondary)]">{order.date}</p>
                                </div>
                            </div>

                            {/* Middle/Right Sections */}
                            <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 sm:w-[60%] shrink-0">
                                
                                {/* Price & Items */}
                                <div className="flex flex-col gap-0.5 w-16">
                                    <p className="text-[13px] font-medium text-[#f8f9fa]">₹{order.price}</p>
                                    <p className="text-[11px] text-[var(--color-text-secondary)]">{order.items} Items</p>
                                </div>

                                {/* Status */}
                                <div className="w-24 flex items-center">
                                    <div className="flex items-center gap-1.5 bg-[#080b14] px-2.5 py-1 rounded-full border border-white/5">
                                        <div className={`h-1.5 w-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-[#16a34a]' : 'bg-[#d4af37]'}`}></div>
                                        <span className="text-[10px] text-[#e4e4e7]">{order.status}</span>
                                    </div>
                                </div>

                                {/* Action */}
                                <div className="flex items-center justify-end w-24">
                                    <Link to={`/profile/orders`} className="text-[11px] text-[#e4e4e7] hover:text-[#d4af37] transition-colors font-medium flex items-center gap-1">
                                        View Details <span>→</span>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex-1 flex items-center justify-center text-[var(--color-text-secondary)] text-[12px]">
                        No recent orders.
                    </div>
                )}
            </div>
        </div>
    );
}
