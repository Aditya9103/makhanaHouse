import { Trash2, Heart, Check, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export default function CartItemList() {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 p-12 text-center backdrop-blur-md">
                <p className="text-[#e4e4e7] mb-4">Your cart is currently empty.</p>
                <Link to="/shop" className="inline-flex items-center justify-center rounded-md bg-[#d4af37] px-6 py-2.5 text-sm font-semibold text-[#080b14] transition hover:bg-[#c19b2e]">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden">
            {/* Table Header (Hidden on small screens) */}
            <div className="hidden sm:grid grid-cols-[auto_2fr_1fr_1fr_1fr_auto] gap-4 p-4 border-b border-white/10 bg-white/5 text-xs text-[var(--color-text-secondary)] font-medium">
                <div className="w-5 flex items-center justify-center">
                    <div className="h-4 w-4 rounded border border-[#d4af37] bg-[#d4af37] flex items-center justify-center">
                        <Check size={12} className="text-[#080b14]" />
                    </div>
                </div>
                <div>Product</div>
                <div>Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Subtotal</div>
                <div className="w-16 text-center">Action</div>
            </div>

            {/* Item List */}
            <div className="divide-y divide-white/5">
                {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="p-4 sm:p-6 flex flex-col sm:grid sm:grid-cols-[auto_2fr_1fr_1fr_1fr_auto] sm:items-center gap-4 sm:gap-4 transition hover:bg-white/[0.02]">
                        {/* Checkbox (Desktop) */}
                        <div className="hidden sm:flex w-5 items-center justify-center self-start sm:self-center">
                            <div className="h-4 w-4 rounded border border-[#d4af37] bg-[#d4af37] flex items-center justify-center">
                                <Check size={12} className="text-[#080b14]" />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex items-center gap-4">
                            {/* Checkbox (Mobile) */}
                            <div className="sm:hidden flex h-4 w-4 shrink-0 rounded border border-[#d4af37] bg-[#d4af37] items-center justify-center">
                                <Check size={12} className="text-[#080b14]" />
                            </div>
                            
                            <Link to={`/product/${item.slug}`} className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] p-2">
                                <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                            </Link>
                            
                            <div className="flex flex-col flex-1">
                                <Link to={`/product/${item.slug}`} className="text-sm font-medium text-[#f8f9fa] hover:text-[#d4af37] transition-colors line-clamp-1">
                                    {item.name}
                                </Link>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-[var(--color-text-secondary)]">{item.size}</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#16a34a]/10 text-[#16a34a]">In Stock</span>
                                </div>
                                {/* Mobile Price Details */}
                                <div className="sm:hidden mt-2 flex flex-col">
                                    <span className="text-sm font-semibold text-[#f8f9fa]">₹{item.price}</span>
                                    {item.originalPrice && item.originalPrice > item.price && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-[var(--color-text-secondary)] line-through">₹{item.originalPrice}</span>
                                            <span className="text-[10px] text-green-400 font-medium">Save ₹{item.originalPrice - item.price}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Price (Desktop) */}
                        <div className="hidden sm:block text-sm font-semibold text-[#f8f9fa]">
                            ₹{item.price}
                            <span className="block text-[10px] text-[var(--color-text-secondary)] font-normal">/{item.size}</span>
                            {item.originalPrice && item.originalPrice > item.price && (
                                <div className="mt-1 flex flex-col">
                                    <span className="text-[10px] text-[var(--color-text-secondary)] line-through">₹{item.originalPrice}</span>
                                    <span className="text-[10px] text-green-400 font-medium">Save ₹{item.originalPrice - item.price}</span>
                                </div>
                            )}
                        </div>

                        {/* Quantity Stepper & Mobile Actions */}
                        <div className="flex items-center justify-between sm:justify-center mt-2 sm:mt-0">
                            <div className="flex items-center gap-4 sm:hidden">
                                <button 
                                    onClick={() => removeFromCart(item.id, item.size)}
                                    className="text-[var(--color-text-secondary)] hover:text-red-500 transition-colors p-1 rounded-md hover:bg-white/5"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="flex h-9 items-center rounded-md border border-white/10 bg-[#080b14]/50 overflow-hidden">
                                <button 
                                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                    className="flex h-full w-8 items-center justify-center text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    <Minus size={14} />
                                </button>
                                <div className="flex h-full w-8 items-center justify-center text-sm font-medium text-[#e4e4e7] border-x border-white/5">
                                    {item.quantity}
                                </div>
                                <button 
                                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                    className="flex h-full w-8 items-center justify-center text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Subtotal (Desktop) */}
                        <div className="hidden sm:flex flex-col items-end text-sm font-semibold text-[#f8f9fa]">
                            <span>₹{item.price * item.quantity}</span>
                            {item.originalPrice && item.originalPrice > item.price && (
                                <span className="text-[11px] text-[var(--color-text-secondary)] line-through decoration-white/50 decoration-[1.5px] font-normal">
                                    ₹{item.originalPrice * item.quantity}
                                </span>
                            )}
                        </div>

                        {/* Actions (Desktop) */}
                        <div className="hidden sm:flex flex-col gap-2 items-center justify-center w-16">
                            <button 
                                onClick={() => removeFromCart(item.id, item.size)}
                                className="text-[var(--color-text-secondary)] hover:text-red-500 transition-colors p-1.5 rounded-md hover:bg-white/5"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-t border-white/10 bg-white/[0.01]">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded border border-[#d4af37] bg-[#d4af37] flex items-center justify-center">
                        <Check size={12} className="text-[#080b14]" />
                    </div>
                    <span className="text-sm text-[var(--color-text-secondary)]">Select All ({cartItems.length})</span>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={clearCart} className="hidden sm:block px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors rounded-md border border-transparent hover:border-white/10">
                        Clear Cart
                    </button>
                    <button className="flex items-center gap-2 rounded-md bg-[#d4af37] px-4 py-2 text-sm font-semibold text-[#080b14] transition hover:bg-[#c19b2e]">
                        Update Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
