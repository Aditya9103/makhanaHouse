import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { X, Heart, Share2, Volume2, VolumeX, Minus, Plus, ChevronUp, ChevronDown, Eye, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { toast } from 'react-toastify';
import { useGetProductsQuery, useIncrementProductViewMutation } from '../store/api/productApiSlice';

function ReelPlayerSlide({ product, isMuted, toggleMute, onVisible }) {
    const videoRef = useRef(null);
    const { addToCart } = useCart();
    
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(product.variations?.[0]?.weight || '');
    const [quantity, setQuantity] = useState(1);
    const [isLiked, setIsLiked] = useState(false);
    const [progress, setProgress] = useState(0);
    
    // Derived pricing logic based on selected size
    const selectedVariation = product.variations?.find(v => v.weight === selectedSize) || product.variations?.[0];
    const price = selectedVariation ? selectedVariation.price : 0;
    const discountedPrice = selectedVariation?.discountedPrice || null;
    const effectivePrice = discountedPrice || price;
    const hasDiscount = !!discountedPrice && discountedPrice < price;
    const discountPercent = hasDiscount ? Math.round(((price - discountedPrice) / price) * 100) : 0;

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {
                        console.log("Autoplay prevented by browser");
                    });
                    onVisible(product._id);
                } else {
                    video.pause();
                }
            },
            { threshold: 0.6 } // Play when at least 60% of the video is visible
        );

        observer.observe(video);
        return () => observer.unobserve(video);
    }, [product._id, onVisible]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        
        if (selectedVariation?.countInStock === 0) {
            toast.error("Item is out of stock");
            return;
        }

        addToCart({
            id: product._id,
            name: product.name,
            image: product.images?.[0],
            price: effectivePrice,
            originalPrice: hasDiscount ? price : null,
            size: selectedSize,
            quantity: 1,
            countInStock: selectedVariation?.countInStock || 0
        });

        setIsOptionsOpen(false);
    };

    const handleShare = async () => {
        const url = `${window.location.origin}/product/${product.slug}`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    url: url
                });
            } catch (err) {
                console.error("Share failed", err);
            }
        } else {
            navigator.clipboard.writeText(url);
            toast.success("Link copied to clipboard!");
        }
    };

    return (
        <div className="w-full h-[100dvh] flex-shrink-0 snap-start snap-always relative bg-black flex items-center justify-center overflow-hidden">
            
            {/* Blurred Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    src={product.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-110 blur-xl opacity-40 pointer-events-none"
                />
            </div>

            {/* Main Video Container */}
            <div className="w-full h-full sm:w-auto sm:h-[90%] sm:max-h-[850px] sm:aspect-[9/16] relative bg-black sm:rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10">
                <video
                    ref={videoRef}
                    src={product.video}
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    onClick={() => {
                        if (videoRef.current.paused) {
                            videoRef.current.play();
                        } else {
                            videoRef.current.pause();
                        }
                    }}
                    onTimeUpdate={() => {
                        if (videoRef.current) {
                            const current = videoRef.current.currentTime;
                            const duration = videoRef.current.duration;
                            if (duration) {
                                setProgress((current / duration) * 100);
                            }
                        }
                    }}
                />

                {/* Top Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-white/20 z-30">
                    <div className="h-full bg-white transition-all duration-75" style={{ width: `${progress}%` }} />
                </div>

                {/* View count at top left */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 text-white/90 text-sm font-medium drop-shadow-md">
                    <Eye size={16} />
                    <span>{product.views || 0} views</span>
                </div>

                {/* Gradient Overlay for bottom content visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 pointer-events-none" />

                {/* Right Side Action Buttons */}
                <div className={`absolute right-4 bottom-44 sm:bottom-36 flex flex-col items-center gap-6 z-20 transition-opacity duration-300 ${isOptionsOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <button onClick={() => setIsLiked(!isLiked)} className="group flex flex-col items-center gap-1 transition-transform active:scale-90">
                        <div className={`w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-colors group-hover:bg-white/20 ${isLiked ? 'text-red-500' : 'text-white'}`}>
                            <Heart size={20} className={isLiked ? 'fill-red-500 text-red-500' : ''} />
                        </div>
                        <span className="text-white font-medium text-xs text-shadow-sm shadow-black drop-shadow-md">{product.likes || 747}</span>
                    </button>
                    
                    <button onClick={toggleMute} className="group flex flex-col items-center gap-1 transition-transform active:scale-90">
                        <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-white/20">
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </div>
                        <span className="text-white font-medium text-xs text-shadow-sm shadow-black drop-shadow-md">{isMuted ? 'Muted' : 'Sound'}</span>
                    </button>

                    <button onClick={handleShare} className="group flex flex-col items-center gap-1 transition-transform active:scale-90">
                        <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-white/20">
                            <Share2 size={20} />
                        </div>
                        <span className="text-white font-medium text-xs text-shadow-sm shadow-black drop-shadow-md">Share</span>
                    </button>
                </div>

                {/* Product Card Overlay */}
                <div className={`absolute bottom-20 sm:bottom-4 left-2 right-2 sm:left-4 sm:right-4 transition-all duration-300 ease-in-out z-30 rounded-3xl border border-white/10 bg-[#2d1b2e]/90 backdrop-blur-xl shadow-2xl ${isOptionsOpen ? 'h-[auto] translate-y-0 pb-6' : 'translate-y-0'}`}>
                    
                    {/* Drag Handle when expanded */}
                    {isOptionsOpen && (
                        <div className="w-full flex justify-center pt-3 pb-1" onClick={() => setIsOptionsOpen(false)}>
                            <div className="w-10 h-1 bg-white/30 rounded-full"></div>
                        </div>
                    )}

                    {/* Header of the card */}
                    <div className="w-full p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to={`/product/${product.slug}`} className="shrink-0" onClick={e => e.stopPropagation()}>
                                <img src={product.images?.[0] || '/makhanabowl.png'} alt={product.name} className="w-14 h-14 rounded-xl object-cover bg-white/5 border border-white/10" />
                            </Link>
                            <div className="flex flex-col gap-1">
                                <Link to={`/product/${product.slug}`} className="text-[15px] font-semibold text-white tracking-wide" onClick={e => e.stopPropagation()}>
                                    {product.name}
                                </Link>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-white font-bold text-[15px]">₹{effectivePrice.toFixed(2)}</span>
                                    {hasDiscount && (
                                        <span className="text-white/60 text-xs line-through decoration-white/50">₹{price.toFixed(2)}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        {!isOptionsOpen && (
                            <button onClick={() => setIsOptionsOpen(true)} className="text-white p-2">
                                <ChevronUp size={20} />
                            </button>
                        )}
                    </div>

                    {!isOptionsOpen ? (
                        <div className="px-4 pb-4">
                            <button 
                                onClick={() => setIsOptionsOpen(true)}
                                className="w-full py-3.5 bg-white text-black font-semibold rounded-xl text-sm flex items-center justify-center gap-2"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                                Select options
                            </button>
                        </div>
                    ) : (
                        <div className="w-full px-5 pt-2 flex flex-col gap-6 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto scrollbar-none">
                            
                            {/* Size Selection */}
                            <div className="flex items-center justify-between">
                                <span className="text-[15px] font-medium text-white/90">Size</span>
                                <span className="text-sm font-semibold text-white/60">{selectedSize}</span>
                            </div>
                            <div className="flex flex-wrap gap-3 mt-1">
                                {product.variations?.map((v) => (
                                    <button
                                        key={v.weight}
                                        onClick={() => setSelectedSize(v.weight)}
                                        className={`px-5 py-2.5 text-sm font-bold rounded-xl border transition-all ${
                                            selectedSize === v.weight
                                                ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                                : 'bg-transparent border-white/20 text-white hover:border-white/50'
                                        }`}
                                    >
                                        {v.weight}
                                    </button>
                                ))}
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-[15px] font-medium text-white/90">Quantity</span>
                                <div className="flex items-center justify-between border border-white/20 rounded-xl px-2 h-11 w-28 bg-white/5">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-8 h-full flex items-center justify-center text-white hover:text-[#d4af37] transition-colors"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="text-white font-medium text-sm">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(selectedVariation?.countInStock || 10, quantity + 1))}
                                        className="w-8 h-full flex items-center justify-center text-white hover:text-[#d4af37] transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <button
                                onClick={handleAddToCart}
                                disabled={selectedVariation?.countInStock === 0}
                                className="w-full h-12 mt-2 bg-white hover:bg-gray-200 text-black font-semibold text-[15px] rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(255,255,255,0.2)]"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                                {selectedVariation?.countInStock === 0 ? 'Out of Stock' : `Add to cart · ₹${(effectivePrice * quantity).toFixed(2)}`}
                            </button>

                            {/* View Full Product Details */}
                            <div className="w-full flex justify-center mt-1">
                                <Link to={`/product/${product.slug}`} className="flex items-center gap-1.5 text-[13px] text-white/70 hover:text-white transition-colors">
                                    View full product details 
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ReelsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const { data: products, isLoading } = useGetProductsQuery();
    const [incrementView] = useIncrementProductViewMutation();
    const [viewedReels, setViewedReels] = useState(new Set());

    const reelProducts = products?.filter(p => p.video) || [];

    // Scroll to initial video on load
    useEffect(() => {
        if (!isLoading && reelProducts.length > 0 && containerRef.current) {
            const index = reelProducts.findIndex(p => p._id === id);
            if (index > 0) {
                const width = containerRef.current.offsetWidth;
                containerRef.current.scrollTo({ left: width * index, behavior: 'instant' });
            }
        }
    }, [isLoading, id, reelProducts]);

    const handleReelVisible = async (productId) => {
        if (!viewedReels.has(productId)) {
            setViewedReels(prev => new Set(prev).add(productId));
            try {
                await incrementView(productId).unwrap();
            } catch (err) {
                console.error("Failed to increment view", err);
            }
        }
    };

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -containerRef.current.offsetWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: containerRef.current.offsetWidth, behavior: 'smooth' });
        }
    };

    if (isLoading) {
        return (
            <div className="h-[100dvh] w-full bg-black flex items-center justify-center">
                <Loader2 className="animate-spin text-white" size={48} />
            </div>
        );
    }

    if (reelProducts.length === 0) {
        return (
            <div className="h-[100dvh] w-full bg-black flex items-center justify-center flex-col gap-4 text-white">
                <p>No reels found.</p>
                <button onClick={() => navigate('/')} className="px-6 py-2 bg-white/10 rounded-full hover:bg-white/20">Go Home</button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
            
            {/* Close Button */}
            <button 
                onClick={() => navigate('/')}
                className="absolute top-4 sm:top-6 right-4 sm:right-6 z-[110] w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors"
            >
                <X size={24} />
            </button>

            {/* Global Left/Right Nav Arrows (Desktop) */}
            <button onClick={scrollLeft} className="absolute left-4 sm:left-10 z-[110] w-12 h-12 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/20 hidden sm:flex items-center justify-center text-white transition-all">
                <ChevronLeft size={24} />
            </button>
            
            <button onClick={scrollRight} className="absolute right-4 sm:right-10 z-[110] w-12 h-12 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/20 hidden sm:flex items-center justify-center text-white transition-all">
                <ChevronRight size={24} />
            </button>

            {/* Horizontal Scroll Container */}
            <div 
                ref={containerRef}
                className="w-full h-[100dvh] flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
                style={{ scrollBehavior: 'smooth' }}
            >
                {reelProducts.map((product) => (
                    <ReelPlayerSlide 
                        key={product._id} 
                        product={product} 
                        isMuted={isMuted}
                        toggleMute={() => setIsMuted(!isMuted)}
                        onVisible={handleReelVisible}
                    />
                ))}
            </div>

        </div>
    );
}
