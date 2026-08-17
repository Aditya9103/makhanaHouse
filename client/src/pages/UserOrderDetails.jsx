import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../store/api/orderApiSlice";
import { Package, Truck, CheckCircle, Clock, MapPin, ArrowLeft, Loader2, Star } from "lucide-react";
import { useState } from "react";
import WriteReviewModal from "../components/reviews/WriteReviewModal";

export default function UserOrderDetails() {
    const { id: orderId } = useParams();
    const navigate = useNavigate();
    const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);
    
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [selectedProductToReview, setSelectedProductToReview] = useState(null);

    const openReviewModal = (item) => {
        setSelectedProductToReview({ _id: item.product, name: item.name });
        setReviewModalOpen(true);
    };

    if (isLoading) {
        return (
            <div className="w-full pb-20">
                <div className="mx-auto max-w-4xl px-4 pt-10 flex justify-center">
                    <Loader2 className="animate-spin text-[#d4af37]" size={32} />
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="w-full pb-20">
                <div className="mx-auto max-w-4xl px-4 pt-10 text-center text-red-400">
                    Error loading order details.
                </div>
            </div>
        );
    }

    const getStatusStep = (status) => {
        switch(status) {
            case 'Processing': return 1;
            case 'Shipped': return 2;
            case 'Delivered': return 3;
            case 'Cancelled': return -1;
            default: return 0;
        }
    };

    const currentStep = getStatusStep(order.status);

    return (
        <div className="w-full pb-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-4 lg:pt-8">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => navigate('/profile/orders')} className="p-2 bg-white/5 hover:bg-[#d4af37]/20 text-[var(--color-text-secondary)] hover:text-[#d4af37] rounded-lg transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-serif text-[#f8f9fa]">Order Details</h1>
                        <p className="text-sm text-[var(--color-text-secondary)]">#{order.orderId || order._id.substring(0,8)} • Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    
                    {/* Status Tracker */}
                    <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-6 sm:p-8">
                        <h3 className="text-[15px] font-serif text-[#f8f9fa] mb-8">Order Status: <span className="text-[#d4af37]">{order.status}</span></h3>
                        
                        {currentStep === -1 ? (
                            <div className="flex items-center gap-3 text-red-500 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                                <XCircle />
                                <span>This order has been cancelled.</span>
                            </div>
                        ) : (
                            <div className="relative">
                                {/* Track Line */}
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full hidden sm:block">
                                    <div 
                                        className="h-full bg-[#d4af37] rounded-full transition-all duration-500" 
                                        style={{ width: `${currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'}` }}
                                    ></div>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 relative z-10">
                                    {/* Step 1: Processing */}
                                    <div className="flex sm:flex-col items-center gap-4 sm:gap-2 text-center">
                                        <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center border-4 border-[#080b14] transition-colors ${currentStep >= 1 ? 'bg-[#d4af37] text-[#080b14]' : 'bg-white/10 text-white/40'}`}>
                                            <Package size={20} />
                                        </div>
                                        <div className="text-left sm:text-center">
                                            <p className={`text-sm font-medium ${currentStep >= 1 ? 'text-[#f8f9fa]' : 'text-white/40'}`}>Processing</p>
                                        </div>
                                    </div>

                                    {/* Step 2: Shipped */}
                                    <div className="flex sm:flex-col items-center gap-4 sm:gap-2 text-center">
                                        <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center border-4 border-[#080b14] transition-colors ${currentStep >= 2 ? 'bg-[#d4af37] text-[#080b14]' : 'bg-white/10 text-white/40'}`}>
                                            <Truck size={20} />
                                        </div>
                                        <div className="text-left sm:text-center">
                                            <p className={`text-sm font-medium ${currentStep >= 2 ? 'text-[#f8f9fa]' : 'text-white/40'}`}>Shipped</p>
                                            {currentStep >= 2 && order.trackingNumber && (
                                                <p className="text-xs text-[var(--color-text-secondary)] mt-1">{order.courierName}: {order.trackingNumber}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Step 3: Delivered */}
                                    <div className="flex sm:flex-col items-center gap-4 sm:gap-2 text-center">
                                        <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center border-4 border-[#080b14] transition-colors ${currentStep >= 3 ? 'bg-[#16a34a] text-[#080b14]' : 'bg-white/10 text-white/40'}`}>
                                            <CheckCircle size={20} />
                                        </div>
                                        <div className="text-left sm:text-center">
                                            <p className={`text-sm font-medium ${currentStep >= 3 ? 'text-[#f8f9fa]' : 'text-white/40'}`}>Delivered</p>
                                            {currentStep >= 3 && order.deliveredAt && (
                                                <p className="text-xs text-[var(--color-text-secondary)] mt-1">{new Date(order.deliveredAt).toLocaleDateString()}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Order Items */}
                        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-6">
                            <h3 className="text-[15px] font-serif text-[#f8f9fa] mb-4">Items in your order</h3>
                            <div className="flex flex-col gap-4">
                                {order.orderItems.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                                        <div className="h-16 w-16 rounded-lg bg-white/5 p-2 flex items-center justify-center border border-white/10">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <Link to={`/product/${item.product}`} className="text-sm font-medium text-[#f8f9fa] hover:text-[#d4af37] transition-colors">{item.name}</Link>
                                            <p className="text-xs text-[var(--color-text-secondary)] mt-1">Size: {item.size} | Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right flex flex-col items-end gap-2">
                                            <p className="text-sm font-semibold text-[#f8f9fa]">₹{(item.price * item.quantity).toLocaleString()}</p>
                                            {order.status === 'Delivered' && (
                                                <button 
                                                    onClick={() => openReviewModal(item)}
                                                    className="flex items-center gap-1 text-[10px] uppercase font-bold text-[#d4af37] hover:text-[#f8f9fa] transition-colors"
                                                >
                                                    <Star size={12} className="fill-current" />
                                                    Review Product
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary & Shipping Info */}
                        <div className="flex flex-col gap-6">
                            <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-6">
                                <h3 className="text-[15px] font-serif text-[#f8f9fa] mb-4">Order Summary</h3>
                                <div className="flex flex-col gap-2">
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
                                    <div className="w-full h-[1px] bg-white/10 my-2"></div>
                                    <div className="flex justify-between text-lg font-semibold text-[#f8f9fa]">
                                        <span>Total</span>
                                        <span className="text-[#d4af37]">₹{order.totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-sm">
                                        <span className="text-[var(--color-text-secondary)]">Payment</span>
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-medium border uppercase tracking-wider ${order.isPaid ? 'text-[#16a34a] bg-[#16a34a]/10 border-[#16a34a]/20' : 'text-amber-500 bg-amber-500/10 border-amber-500/20'}`}>
                                            {order.isPaid ? 'Paid' : 'Unpaid'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-6">
                                <h3 className="text-[15px] font-serif text-[#f8f9fa] mb-4 flex items-center gap-2">
                                    <MapPin size={16} className="text-[#d4af37]"/> Shipping Address
                                </h3>
                                <div className="flex flex-col gap-1 text-sm text-[#e4e4e7]">
                                    <p className="font-medium text-[#f8f9fa] mb-1">{order.shippingAddress?.name}</p>
                                    <p>{order.shippingAddress?.line1}</p>
                                    {order.shippingAddress?.line2 && <p>{order.shippingAddress.line2}</p>}
                                    <p className="mt-2 text-xs text-[var(--color-text-secondary)]">Phone: {order.shippingAddress?.phone}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            
            <WriteReviewModal 
                product={selectedProductToReview} 
                isOpen={reviewModalOpen} 
                onClose={() => setReviewModalOpen(false)} 
            />
        </div>
    );
}
