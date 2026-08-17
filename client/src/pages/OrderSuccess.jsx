import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { useGetOrderDetailsQuery } from "../store/api/orderApiSlice";
import { useCart } from "../hooks/useCart";

export default function OrderSuccess() {
    const { id } = useParams();
    const { data: order, isLoading, error } = useGetOrderDetailsQuery(id);
    const { clearCart } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
        // Clear cart on successful order
        if (order && !isLoading) {
            clearCart();
        }
    }, [order, isLoading, clearCart]);

    return (
        <div className="w-full min-h-screen bg-[#080b14] flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-6">
            {isLoading ? (
                <div className="text-[#d4af37] flex flex-col items-center gap-4">
                    <Package size={48} className="animate-bounce" />
                    <p className="text-[14px]">Fetching order details...</p>
                </div>
            ) : error ? (
                <div className="text-center bg-white/[0.03] border border-white/10 rounded-2xl p-8 max-w-lg w-full">
                    <h2 className="text-2xl font-serif text-white mb-2">Order Confirmed</h2>
                    <p className="text-[13px] text-[var(--color-text-secondary)]">We couldn't fetch the details for order #{id}, but it has been placed successfully.</p>
                    <div className="mt-8 flex gap-4 justify-center">
                        <Link to="/profile/orders" className="px-6 py-2.5 rounded-lg bg-[#d4af37] text-[#080b14] font-medium text-[13px] hover:bg-[#f3e5ab] transition-colors">
                            View My Orders
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="text-center bg-white/[0.03] border border-white/10 rounded-2xl p-8 max-w-xl w-full backdrop-blur-md relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] h-[200px] bg-[#d4af37]/20 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle size={40} className="text-green-500" />
                        </div>
                        
                        <h1 className="text-3xl sm:text-4xl font-serif text-white mb-2">Order Successful!</h1>
                        <p className="text-[14px] text-[var(--color-text-secondary)] max-w-md mx-auto mb-8 leading-relaxed">
                            Thank you for your purchase. Your order <strong className="text-white">#{order.orderId || order._id}</strong> has been received and is currently being processed.
                        </p>

                        <div className="w-full bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-left grid grid-cols-2 gap-4">
                            <div>
                                <span className="block text-[11px] text-[var(--color-text-secondary)] mb-1">Date</span>
                                <span className="text-[13px] font-medium text-white">
                                    {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                            </div>
                            <div>
                                <span className="block text-[11px] text-[var(--color-text-secondary)] mb-1">Total</span>
                                <span className="text-[13px] font-medium text-white">
                                    ₹{order.totalPrice.toLocaleString('en-IN')}
                                </span>
                            </div>
                            <div>
                                <span className="block text-[11px] text-[var(--color-text-secondary)] mb-1">Payment Method</span>
                                <span className="text-[13px] font-medium text-white uppercase">
                                    {order.paymentMethod}
                                </span>
                            </div>
                            <div>
                                <span className="block text-[11px] text-[var(--color-text-secondary)] mb-1">Items</span>
                                <span className="text-[13px] font-medium text-white">
                                    {order.orderItems.length}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <Link 
                                to="/profile/orders" 
                                className="flex-1 px-6 py-3.5 rounded-xl border border-white/20 bg-transparent text-white font-medium text-[13px] flex items-center justify-center hover:bg-white/5 transition-colors"
                            >
                                Track Order
                            </Link>
                            <Link 
                                to="/shop" 
                                className="flex-1 px-6 py-3.5 rounded-xl bg-[#d4af37] text-[#080b14] font-medium text-[13px] flex items-center justify-center gap-2 hover:bg-[#f3e5ab] transition-colors shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                            >
                                Continue Shopping
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
