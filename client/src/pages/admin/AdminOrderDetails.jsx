import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetOrderDetailsQuery, useUpdateOrderStatusMutation } from "../../store/api/orderApiSlice";
import { Package, Truck, CheckCircle, Clock, XCircle, ArrowLeft, Loader2, MapPin, CreditCard, Download } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminOrderDetails() {
    const { id: orderId } = useParams();
    const navigate = useNavigate();

    const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId);
    const [updateStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();

    const [status, setStatus] = useState("");
    const [trackingNumber, setTrackingNumber] = useState("");
    const [courierName, setCourierName] = useState("");

    useEffect(() => {
        if (order) {
            setStatus(order.status);
            setTrackingNumber(order.trackingNumber || "");
            setCourierName(order.courierName || "");
        }
    }, [order]);

    if (isLoading) {
        return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#d4af37]" size={32} /></div>;
    }

    if (error || !order) {
        return <div className="p-10 text-center text-red-400">Error loading order details.</div>;
    }

    const handleUpdate = async () => {
        try {
            await updateStatus({
                orderId,
                details: { status, trackingNumber, courierName }
            }).unwrap();
            toast.success("Order status updated successfully!");
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error || "Failed to update status");
        }
    };

    return (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <button onClick={() => navigate('/admin/orders')} className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[#d4af37] transition-colors text-sm font-medium self-start sm:self-auto">
                    <ArrowLeft size={16} />
                    Back to Orders
                </button>
                <div className="flex gap-4 items-center w-full sm:w-auto justify-between sm:justify-end">
                    <span className={`inline-flex px-3 py-1 rounded-md text-xs font-medium border ${order.isPaid ? 'text-[#16a34a] bg-[#16a34a]/10 border-[#16a34a]/20' : 'text-amber-500 bg-amber-500/10 border-amber-500/20'}`}>
                        {order.isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                    {order.status !== 'Cancelled' && (
                        <a 
                            href={`/profile/orders/${order._id}/invoice`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-3 py-1.5 bg-[#d4af37] text-[#080b14] hover:bg-[#f1c40f] font-medium rounded-lg transition-colors text-xs"
                        >
                            <Download size={14} />
                            Download Invoice
                        </a>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column - Order Info */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    
                    {/* Items List */}
                    <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-6">
                        <h2 className="text-lg font-serif text-[#f8f9fa] mb-4">Order Items (ID: {order.orderId || order._id.substring(0,8)})</h2>
                        <div className="flex flex-col gap-4">
                            {order.orderItems.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                                    <div className="h-16 w-16 rounded-lg bg-white/5 p-2 flex items-center justify-center border border-white/10">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-[#f8f9fa]">{item.name}</p>
                                        <p className="text-xs text-[var(--color-text-secondary)]">Size: {item.size} | Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-[#f8f9fa]">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-2">
                            <div className="flex justify-between text-sm text-[var(--color-text-secondary)]">
                                <span>Subtotal</span>
                                <span>₹{order.itemsPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm text-[var(--color-text-secondary)]">
                                <span>Shipping</span>
                                <span>₹{order.shippingPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm text-[var(--color-text-secondary)]">
                                <span>Tax</span>
                                <span>₹{order.taxPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-lg font-semibold text-[#f8f9fa] mt-2 pt-2 border-t border-white/5">
                                <span>Total</span>
                                <span className="text-[#d4af37]">₹{order.totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Status & Details */}
                <div className="flex flex-col gap-6">
                    
                    {/* Action Panel */}
                    <div className="rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#0a0d14] to-[#080b14] p-6 shadow-[0_0_20px_rgba(212,175,55,0.05)] relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d4af37\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
                        
                        <h3 className="text-[15px] font-serif text-[#d4af37] mb-4 relative z-10 flex items-center gap-2">
                            <Truck size={16} /> Manage Status
                        </h3>
                        
                        <div className="flex flex-col gap-4 relative z-10">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Order Status</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setStatus(s)}
                                            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all border ${
                                                status === s 
                                                    ? 'bg-[#d4af37] text-[#080b14] border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.3)]' 
                                                    : 'bg-[#080b14]/50 text-[var(--color-text-secondary)] border-white/10 hover:border-[#d4af37]/40 hover:text-[#f8f9fa]'
                                            }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {status === 'Shipped' && (
                                <>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider">Courier Name</label>
                                        <input 
                                            type="text" 
                                            value={courierName}
                                            onChange={(e) => setCourierName(e.target.value)}
                                            placeholder="e.g. FedEx, BlueDart"
                                            className="w-full bg-[#080b14]/50 border border-white/10 rounded-lg p-2.5 text-sm text-[#f8f9fa] focus:outline-none focus:border-[#d4af37]/50"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider">Tracking Number</label>
                                        <input 
                                            type="text" 
                                            value={trackingNumber}
                                            onChange={(e) => setTrackingNumber(e.target.value)}
                                            placeholder="Tracking ID"
                                            className="w-full bg-[#080b14]/50 border border-white/10 rounded-lg p-2.5 text-sm text-[#f8f9fa] focus:outline-none focus:border-[#d4af37]/50"
                                        />
                                    </div>
                                </>
                            )}

                            <button 
                                onClick={handleUpdate}
                                disabled={isUpdating}
                                className="w-full mt-2 bg-[#d4af37] hover:bg-[#f3e5ab] text-[#080b14] py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center"
                            >
                                {isUpdating ? <Loader2 size={16} className="animate-spin" /> : "Save Changes"}
                            </button>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-6">
                        <h3 className="text-[15px] font-serif text-[#f8f9fa] mb-4 flex items-center gap-2">
                            <MapPin size={16} className="text-[#d4af37]"/> Customer Details
                        </h3>
                        <div className="flex flex-col gap-3 text-sm text-[#e4e4e7]">
                            <p className="font-medium text-[#f8f9fa]">{order.user?.name}</p>
                            <p className="text-[var(--color-text-secondary)] text-xs">{order.user?.email}</p>
                            <div className="w-full h-[1px] bg-white/10 my-1"></div>
                            <p>{order.shippingAddress?.name}</p>
                            <p>{order.shippingAddress?.line1}</p>
                            {order.shippingAddress?.line2 && <p>{order.shippingAddress.line2}</p>}
                            <p>Phone: {order.shippingAddress?.phone}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
