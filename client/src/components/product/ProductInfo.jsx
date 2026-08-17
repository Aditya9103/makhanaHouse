import { useState } from "react";
import { Star, Leaf, WheatOff, Drumstick, Flame, Sprout, Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";

const getIcon = (name) => {
    const icons = {
        Leaf,
        WheatOff,
        Drumstick,
        Flame,
        Sprout,
    };
    const Icon = icons[name] || Leaf;
    return <Icon size={14} className="text-[#d4af37]" />;
};

export default function ProductInfo({ product }) {
    // Derive data from variations
    const sizes = product.variations?.map(v => v.weight) || [];
    const [selectedSize, setSelectedSize] = useState(sizes[0] || '250g');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const { isInWishlist, toggleWishlist } = useWishlist();

    const currentVariation = product.variations?.find(v => v.weight === selectedSize) || product.variations?.[0];
    const price = currentVariation ? currentVariation.price : 0;
    const countInStock = currentVariation ? currentVariation.countInStock : 0;
    const stockStatus = countInStock > 0 ? "In Stock" : "Out of Stock";

    const handleAddToCart = () => {
        addToCart({
            id: product._id,
            name: product.name,
            price: price,
            weight: selectedSize,
            image: product.images?.[0]
        }, quantity, selectedSize);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-start justify-between gap-4 mb-3">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] leading-tight text-[#f8f9fa]">
                    {product.name}
                </h1>
                <button 
                    onClick={() => toggleWishlist(product)}
                    className={`shrink-0 p-2 rounded-full border transition-colors mt-1 ${isInWishlist(product.id) ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]' : 'border-white/10 bg-white/5 text-white/30 hover:text-[#d4af37] hover:border-white/30'}`}
                >
                    <Heart size={20} className={isInWishlist(product.id) ? 'fill-[#d4af37]' : ''} />
                </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star 
                            key={i} 
                            size={14} 
                            className={i < Math.floor(product.rating || 5) ? "fill-[#d4af37] text-[#d4af37]" : "text-white/20"} 
                        />
                    ))}
                </div>
                <span className="text-sm text-[#e4e4e7]">({product.numReviews || 0} Reviews)</span>
                <span className="text-white/20">|</span>
                <span className="text-sm text-[var(--color-text-secondary)]">{product.tag || "Premium Quality"}</span>
            </div>

            {/* Price */}
            <div className="mb-6 flex items-end gap-3">
                <span className="font-serif text-[2.5rem] leading-none text-[#d4af37]">
                    ₹{price}
                </span>
                <span className="mb-1 text-sm text-[var(--color-text-secondary)] font-medium">/{selectedSize}</span>
                <span className={`mb-1 ml-2 text-[11px] uppercase tracking-wider font-semibold px-2 py-1 rounded ${countInStock > 0 ? 'text-[#16a34a] bg-[#16a34a]/10' : 'text-red-400 bg-red-400/10'}`}>
                    {stockStatus}
                </span>
            </div>

            {/* Description list */}
            <ul className="mb-8 space-y-2.5">
                {product.description?.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4af37]" />
                        <span className="leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>

            {/* Badges */}
            <div className="flex flex-wrap gap-2.5 mb-8 pb-8 border-b border-white/10">
                {product.badges?.map((badge, index) => (
                    <div key={index} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                        {getIcon(badge.icon)}
                        <span className="text-[11px] font-medium text-[#e4e4e7] uppercase tracking-wider">{badge.label}</span>
                    </div>
                ))}
            </div>

            {/* Size & Quantity Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {/* Size Selector */}
                <div>
                    <h3 className="text-sm font-medium text-[#e4e4e7] mb-3 uppercase tracking-wider">Select Size</h3>
                    <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`flex-1 min-w-[70px] rounded-md border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                    selectedSize === size
                                        ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]"
                                        : "border-white/10 bg-white/5 text-[var(--color-text-secondary)] hover:border-white/30 hover:bg-white/10 hover:text-[#f8f9fa]"
                                }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quantity Stepper */}
                <div>
                    <h3 className="text-sm font-medium text-[#e4e4e7] mb-3 uppercase tracking-wider">Quantity</h3>
                    <div className="flex h-[42px] max-w-[140px] items-center rounded-md border border-white/10 bg-white/5">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="flex h-full w-10 items-center justify-center text-[var(--color-text-secondary)] hover:bg-white/10 hover:text-white transition-colors"
                        >
                            <Minus size={16} />
                        </button>
                        <div className="flex h-full flex-1 items-center justify-center text-sm font-medium text-[#f8f9fa] border-x border-white/10">
                            {quantity}
                        </div>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="flex h-full w-10 items-center justify-center text-[var(--color-text-secondary)] hover:bg-white/10 hover:text-white transition-colors"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button 
                    onClick={handleAddToCart} 
                    disabled={countInStock === 0}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-md border border-[#d4af37] text-[#d4af37] font-semibold transition hover:bg-[#d4af37] hover:text-[#080b14] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add to Cart
                    <ShoppingCart size={18} />
                </button>
                <button 
                    onClick={() => {
                        handleAddToCart();
                        navigate('/checkout');
                    }}
                    className="flex-1 flex items-center justify-center py-3.5 px-6 rounded-md bg-[#d4af37] text-[#080b14] font-semibold transition hover:bg-[#c29b2b]"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
}
