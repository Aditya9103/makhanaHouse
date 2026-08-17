import { useCart } from "../../hooks/useCart";
import { Lock, Tag, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../store/api/orderApiSlice";
import { useGetAddressesQuery } from "../../store/api/usersApiSlice";
import { toast } from "react-toastify";

export default function CheckoutSummary({ selectedAddressId, paymentMethod }) {
    const { cartItems } = useCart();
    const { data: addresses = [] } = useGetAddressesQuery();
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const navigate = useNavigate();
    
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = subtotal > 0 ? 50 : 0; // Mock discount like the image
    const shipping = subtotal > 999 ? 0 : (subtotal > 0 ? 99 : 0);
    const total = subtotal - discount + shipping;

    const placeOrderHandler = async () => {
        if (!selectedAddressId) {
            toast.error("Please select a shipping address.");
            return;
        }

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
            }).unwrap();
            
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
                        <div className="flex justify-between items-center text-[13px]">
                            <span className="text-[var(--color-text-secondary)]">Shipping</span>
                            {shipping === 0 ? (
                                <span className="text-green-500 font-medium">Free</span>
                            ) : (
                                <span className="text-white">₹{shipping}</span>
                            )}
                        </div>
                        <div className="flex justify-between items-center text-[13px]">
                            <span className="text-[var(--color-text-secondary)]">Discount</span>
                            <span className="text-green-500 font-medium">- ₹{discount}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-end py-4 border-t border-white/5 mb-4">
                        <div>
                            <span className="block text-[16px] font-medium text-white mb-1">Total Amount</span>
                            <span className="block text-[10px] text-[var(--color-text-secondary)]">(Inclusive of all taxes)</span>
                        </div>
                        <span className="text-[24px] font-bold text-white leading-none">₹{total}</span>
                    </div>

                    {discount > 0 && (
                        <div className="bg-[#1b251b]/40 border border-[#2e522e] rounded-lg p-3 flex items-center gap-2 mb-6">
                            <Tag size={14} className="text-green-500" />
                            <span className="text-[12px] text-green-400 font-medium">You will save ₹{discount} on this order</span>
                        </div>
                    )}
                </>
            )}

            {/* Place Order Button */}
            <button 
                onClick={placeOrderHandler}
                disabled={cartItems.length === 0 || isLoading}
                className="w-full h-[52px] rounded-xl bg-[#d4af37] text-[#080b14] font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#f3e5ab] transition shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
                {isLoading ? "Processing..." : "Place Order"}
            </button>
            <p className="text-center text-[10px] text-[var(--color-text-secondary)] mt-4 leading-relaxed px-4">
                By placing this order, you agree to our <br/>
                <a href="#" className="text-[#d4af37] hover:underline">Terms & Conditions</a> and <a href="#" className="text-[#d4af37] hover:underline">Privacy Policy</a>
            </p>

        </div>
    );
}
