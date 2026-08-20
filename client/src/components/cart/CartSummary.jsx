import { ArrowRight, ChevronDown, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useState } from "react";
import { useValidateOfferMutation } from "../../store/api/rewardApiSlice";
import { usePromoCode } from "../../hooks/usePromoCode";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function CartSummary() {
    const { cartItems } = useCart();
    const { promoCode, applyPromo, removePromo } = usePromoCode();
    const [validateOffer, { isLoading: validatingPromo }] = useValidateOfferMutation();
    const [promoInput, setPromoInput] = useState("");
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const itemSavings = cartItems.reduce((total, item) => {
        if (item.originalPrice && item.originalPrice > item.price) {
            return total + ((item.originalPrice - item.price) * item.quantity);
        }
        return total;
    }, 0);
    const isFreeShipping = subtotal > 999;
    const shippingCost = isFreeShipping ? 0 : 50; // Flat ₹50 if not free
    const tax = Math.round(subtotal * 0.05); // 5% GST
    
    // Check if applied promo code is still valid (e.g. if items were removed from cart and subtotal dropped below minOrderValue)
    let appliedDiscount = 0;
    if (promoCode) {
        if (promoCode.discountType === 'flat') {
            appliedDiscount = promoCode.discountValue;
        } else if (promoCode.discountType === 'percentage') {
            appliedDiscount = Math.round((subtotal * promoCode.discountValue) / 100);
        }
        if (appliedDiscount > subtotal) appliedDiscount = subtotal;
    }

    const total = subtotal + shippingCost + tax - appliedDiscount;

    const handleApplyPromo = async () => {
        if (!promoInput.trim()) return;
        try {
            const res = await validateOffer({ code: promoInput, orderAmount: subtotal }).unwrap();
            applyPromo(res);
            toast.success(res.message);
            setPromoInput("");
            setIsAccordionOpen(false);
        } catch (err) {
            toast.error(err?.data?.message || err.error || "Failed to apply promo code");
        }
    };

    if (cartItems.length === 0) return null;

    return (
        <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 p-6 sm:p-8 backdrop-blur-md">
                <h3 className="font-serif text-xl text-[#f8f9fa] mb-6">Order Summary</h3>

                <div className="space-y-4 text-sm mb-6 pb-6 border-b border-white/10">
                    <div className="flex justify-between items-center text-[#e4e4e7]">
                        <span>Subtotal ({cartItems.length} items)</span>
                        <div className="flex flex-col items-end">
                            <span className="font-medium text-[#f8f9fa]">₹{subtotal}</span>
                            {itemSavings > 0 && (
                                <span className="text-[11px] text-[var(--color-text-secondary)] line-through decoration-white/50 decoration-[1.5px] mt-0.5">
                                    ₹{subtotal + itemSavings}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between text-[#e4e4e7]">
                        <span>Shipping</span>
                        <span className={`font-medium ${isFreeShipping ? 'text-[#16a34a]' : 'text-[#f8f9fa]'}`}>
                            {isFreeShipping ? 'FREE' : `₹${shippingCost}`}
                        </span>
                    </div>
                    {isFreeShipping && (
                        <div className="flex items-center gap-1.5 text-xs text-[#16a34a]">
                            <Package size={14} />
                            <span>You are eligible for free shipping!</span>
                        </div>
                    )}

                    <div className="flex justify-between text-[#e4e4e7]">
                        <span>Tax (GST 5%)</span>
                        <span className="font-medium text-[#f8f9fa]">₹{tax}</span>
                    </div>

                    {promoCode && (
                        <div className="flex justify-between text-[#16a34a]">
                            <span>Discount ({promoCode.code})</span>
                            <span className="font-medium">-₹{appliedDiscount}</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-end mb-2">
                    <span className="text-lg font-medium text-[#f8f9fa]">Total</span>
                    <span className="font-serif text-3xl text-[#d4af37] leading-none">₹{total}</span>
                </div>
                
                {(appliedDiscount > 0 || isFreeShipping || itemSavings > 0) && (
                    <div className="flex flex-col gap-1.5 mb-6">
                        {itemSavings > 0 && (
                            <div className="flex items-center gap-1.5 text-xs text-[#16a34a]">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                                <span>You saved ₹{itemSavings} on items!</span>
                            </div>
                        )}
                        {appliedDiscount > 0 && (
                            <div className="flex items-center gap-1.5 text-xs text-[#16a34a]">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                                <span>Promo code {promoCode.code} applied. You saved ₹{appliedDiscount}.</span>
                            </div>
                        )}
                        {isFreeShipping && !appliedDiscount && (
                            <div className="flex items-center gap-1.5 text-xs text-[#d4af37]">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                                <span>You save ₹50 on shipping</span>
                            </div>
                        )}
                    </div>
                )}

                <Link to="/checkout" className="flex w-full items-center justify-center gap-2 rounded-md bg-[#d4af37] px-4 py-3.5 text-sm font-semibold text-[#080b14] transition hover:bg-[#c19b2e]">
                    Proceed to Checkout
                    <ArrowRight size={16} />
                </Link>
                
                <Link to="/shop" className="flex w-full items-center justify-center gap-2 rounded-md border border-[#d4af37]/30 bg-transparent px-4 py-3 text-sm font-medium text-[#d4af37] transition hover:bg-[#d4af37]/10 mt-3">
                    Continue Shopping
                </Link>
            </div>

            {/* Promo Code Accordion */}
            <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 p-5 sm:p-6 backdrop-blur-md transition-all duration-300">
                {promoCode ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#16a34a]/10 flex items-center justify-center text-[#16a34a]">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-white">{promoCode.code} Applied</div>
                                <div className="text-xs text-[#16a34a]">You saved ₹{appliedDiscount}</div>
                            </div>
                        </div>
                        <button onClick={removePromo} className="text-xs text-red-400 hover:text-red-300 transition-colors font-medium">Remove</button>
                    </div>
                ) : (
                    <>
                        <div 
                            onClick={() => setIsAccordionOpen(!isAccordionOpen)} 
                            className="flex items-center justify-between cursor-pointer group"
                        >
                            <div className="flex items-center gap-2 text-[#e4e4e7] group-hover:text-[#d4af37] transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                                <span className="text-sm font-medium">Have a promo code?</span>
                            </div>
                            <ChevronDown size={16} className={`text-[#e4e4e7] transition-transform duration-300 ${isAccordionOpen ? 'rotate-180' : ''}`} />
                        </div>
                        
                        {isAccordionOpen && (
                            <div className="mt-4 flex gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                <input 
                                    type="text" 
                                    value={promoInput}
                                    onChange={(e) => setPromoInput(e.target.value)}
                                    placeholder="Enter code" 
                                    className="flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-[#f8f9fa] placeholder:text-white/30 focus:border-[#d4af37]/50 focus:outline-none focus:ring-1 focus:ring-[#d4af37]/50 transition-all uppercase"
                                />
                                <button 
                                    onClick={handleApplyPromo}
                                    disabled={validatingPromo || !promoInput.trim()}
                                    className="rounded-md bg-[#d4af37] px-5 py-2.5 text-sm font-semibold text-[#080b14] transition hover:bg-[#c19b2e] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[80px]"
                                >
                                    {validatingPromo ? <Loader2 size={16} className="animate-spin" /> : "Apply"}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
