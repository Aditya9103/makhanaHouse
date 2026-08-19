import { useCart } from "../../hooks/useCart";
import { Lock, Tag, Loader2, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../store/api/orderApiSlice";
import { useGetAddressesQuery } from "../../store/api/usersApiSlice";
import { toast } from "react-toastify";
import { usePromoCode } from "../../hooks/usePromoCode";

export default function CheckoutSummary({ selectedAddressId, paymentMethod, selectedShipping, config }) {
    const { cartItems } = useCart();
    const { data: addresses = [] } = useGetAddressesQuery();
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const { promoCode, removePromo } = usePromoCode();
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Dynamic Shipping
    const threshold = config?.freeShippingThreshold || 999;
    const stdCharge = config?.standardShippingCharge || 50;
    const expBase = config?.expressShippingChargeBase || 149;
    const expDisc = config?.expressShippingChargeDiscounted || 99;

    let shipping = 0;
    if (selectedShipping === "express") {
        shipping = subtotal > threshold ? expDisc : expBase;
    } else {
        shipping = subtotal > threshold ? 0 : stdCharge;
    }
    
    let appliedDiscount = 0;
    if (promoCode) {
        if (promoCode.discountType === 'flat') {
            appliedDiscount = promoCode.discountValue;
        } else if (promoCode.discountType === 'percentage') {
            appliedDiscount = Math.round((subtotal * promoCode.discountValue) / 100);
        }
        if (appliedDiscount > subtotal) appliedDiscount = subtotal;
    }
    
    const total = subtotal - appliedDiscount + shipping;

    const handleConfirmClick = () => {
        if (!selectedAddressId) {
            toast.error("Please select a shipping address.");
            return;
        }
        setShowConfirm(true);
    };

    const placeOrderHandler = async () => {
        setShowConfirm(false);
        const address = addresses.find(a => a._id === selectedAddressId);
        
        try {
            const res = await createOrder({
                orderItems: cartItems.map(item => ({
                    product: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    quantity: item.quantity,
                    size: item.size
                })),
                shippingAddress: {
                    type: address.type,
                    name: address.name,
                    line1: address.line1,
                    line2: address.line2,
                    phone: address.phone
                },
                paymentMethod,
                itemsPrice: subtotal,
                taxPrice: 0,
                shippingPrice: shipping,
                totalPrice: total,
                discountAmount: appliedDiscount,
                promoCode: promoCode ? promoCode.code : '',
            }).unwrap();
            
            // Clear promo code upon successful order
            removePromo();
            
            navigate(`/order-success/${res.orderId || res._id}`);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <h2 className="text-[18px] font-medium text-white">Order Summary</h2>
                <span className="text-[13px] text-[var(--color-text-secondary)]">{cartItems.length} Items</span>
            </div>

            {/* Item List */}
            <div className="flex flex-col gap-5 mb-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={`${item.id}-${item.size}-${index}`} className="flex gap-4">
                            <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-2 shrink-0">
                                <img src={item.image || "/makhanabowl.png"} alt={item.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-[13px] font-medium text-[#f8f9fa] line-clamp-1 pr-2">{item.name}</h4>
                                    <span className="text-[13px] font-medium text-white whitespace-nowrap">₹{item.price}</span>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-[11px] text-[var(--color-text-secondary)]">{item.size || "250g"}</span>
                                    <span className="text-[11px] text-[var(--color-text-secondary)]">Qty: {item.quantity}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-8 text-center text-[var(--color-text-secondary)] text-[13px]">
                        Your cart is empty. <Link to="/shop" className="text-[#d4af37] hover:underline">Continue shopping</Link>
                    </div>
                )}
            </div>

            {/* Calculations */}
            {cartItems.length > 0 && (
                <>
                    <div className="flex flex-col gap-3 py-5 border-t border-white/5">
                        <div className="flex justify-between items-center text-[13px]">
                            <span className="text-[var(--color-text-secondary)]">Subtotal ({cartItems.length} items)</span>
                            <span className="text-white">₹{subtotal}</span>
                        </div>
                        
                        {promoCode && (
                            <div className="flex justify-between items-center text-[13px]">
                                <span className="text-[#16a34a] flex items-center gap-1">
                                    <Tag size={12} />
                                    Discount ({promoCode.code})
                                </span>
                                <span className="text-[#16a34a]">-₹{appliedDiscount}</span>
                            </div>
                        )}

                        <div className="flex justify-between items-center text-[13px]">
                            <span className="text-[var(--color-text-secondary)]">Shipping ({selectedShipping === 'express' ? 'Express' : 'Standard'})</span>
                            <span className="text-white">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-end py-4 border-t border-white/5 mb-4">
                        <div>
                            <span className="block text-[16px] font-medium text-white mb-1">Total Amount</span>
                            <span className="block text-[10px] text-[var(--color-text-secondary)]">(Inclusive of all taxes)</span>
                        </div>
                        <span className="text-[24px] font-bold text-white leading-none">₹{total}</span>
                    </div>

                    {appliedDiscount > 0 && (
                        <div className="bg-[#1b251b]/40 border border-[#2e522e] rounded-lg p-3 flex items-center gap-2 mb-6">
                            <Tag size={14} className="text-green-500" />
                            <span className="text-[12px] text-green-400 font-medium">You will save ₹{appliedDiscount} on this order</span>
                        </div>
                    )}
                </>
            )}

            {/* Place Order Button */}
            <button 
                onClick={handleConfirmClick}
                disabled={cartItems.length === 0 || isLoading}
                className="w-full h-[52px] rounded-xl bg-[#d4af37] text-[#080b14] font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#f3e5ab] transition shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
                {isLoading ? "Processing..." : "Place Order"}
            </button>
            <p className="mt-6 text-center text-[10px] text-[var(--color-text-secondary)]">
                By placing your order, you agree to our <br />
                <Link to="/terms" className="text-[#d4af37] hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-[#d4af37] hover:underline">Privacy Policy</Link>
            </p>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#0a0d14] border border-white/10 rounded-2xl p-6 w-full max-w-sm relative shadow-2xl animate-fade-in-up">
                        <button 
                            onClick={() => setShowConfirm(false)}
                            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                        
                        <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] mb-4 mx-auto border border-[#d4af37]/30">
                            <Lock size={24} />
                        </div>
                        
                        <h3 className="text-lg font-medium text-white text-center mb-2">Confirm Your Order</h3>
                        <p className="text-[13px] text-[var(--color-text-secondary)] text-center mb-6">
                            You are about to place an order for <strong className="text-white">₹{total}</strong> using <strong className="text-white">{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Prepaid'}</strong>. Do you want to proceed?
                        </p>
                        
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-white text-[13px] font-medium hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={placeOrderHandler}
                                className="flex-1 px-4 py-2.5 rounded-lg bg-[#d4af37] text-[#080b14] text-[13px] font-bold hover:bg-[#f1c40f] transition-colors"
                            >
                                Confirm & Pay
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
