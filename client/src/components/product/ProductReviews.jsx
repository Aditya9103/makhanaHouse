import { useState } from "react";
import { Star, BadgeCheck, Image as ImageIcon } from "lucide-react";
import WriteReviewModal from "../reviews/WriteReviewModal";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";

export default function ProductReviews({ product }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);

    // Only show approved reviews on the frontend
    const reviews = product?.reviews?.filter(r => r.isApproved) || [];
    const total = reviews.length;
    const average = product?.rating || 0;

    // Calculate distribution
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
        if (distribution[review.rating] !== undefined) {
            distribution[review.rating]++;
        }
    });

    return (
        <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 mb-16">
            <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    
                    {/* Left: Summary */}
                    <div className="w-full lg:w-[350px] p-6 sm:p-8 lg:border-r border-white/10 shrink-0">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-serif text-xl text-[#d4af37]">Customer Reviews</h3>
                            <span className="text-sm text-[var(--color-text-secondary)]">({total})</span>
                        </div>
                        
                        <div className="flex items-end gap-4 mb-2">
                            <span className="font-serif text-5xl text-[#f8f9fa] leading-none">{average.toFixed(1)}</span>
                            <div className="pb-1">
                                <div className="flex items-center gap-1 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            size={14} 
                                            className={i < Math.floor(average) ? "fill-[#d4af37] text-[#d4af37]" : "text-white/20"} 
                                        />
                                    ))}
                                </div>
                                <p className="text-[11px] text-[var(--color-text-secondary)]">Based on {total} reviews</p>
                            </div>
                        </div>

                        <div className="mt-8 space-y-2.5">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <div key={star} className="flex items-center gap-3">
                                    <span className="flex items-center justify-end w-4 gap-1 text-[11px] text-[#e4e4e7]">
                                        {star} <Star size={10} className="fill-[#d4af37] text-[#d4af37]" />
                                    </span>
                                    <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                                        <div 
                                            className="h-full bg-[#d4af37] rounded-full" 
                                            style={{ width: total > 0 ? `${(distribution[star] / total) * 100}%` : '0%' }}
                                        ></div>
                                    </div>
                                    <span className="w-6 text-right text-[11px] text-[var(--color-text-secondary)]">
                                        {distribution[star]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Review List */}
                    <div className="flex-1 p-6 sm:p-8 relative">
                        <div className="absolute top-6 sm:top-8 right-6 sm:right-8">
                            {userInfo ? (
                                <button 
                                    onClick={() => setIsModalOpen(true)}
                                    className="px-4 py-2 rounded border border-[#d4af37]/40 text-xs font-medium text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]"
                                >
                                    Write a Review
                                </button>
                            ) : (
                                <p className="text-xs text-[var(--color-text-secondary)] border border-white/10 px-4 py-2 rounded">
                                    Log in to review
                                </p>
                            )}
                        </div>
                        
                        <div className="space-y-8 mt-12 sm:mt-0">
                            {reviews.length === 0 ? (
                                <p className="text-sm text-[var(--color-text-secondary)] pt-4">No reviews yet. Be the first to review!</p>
                            ) : (
                                reviews.map((review) => (
                                    <div key={review._id} className="flex gap-4">
                                        <div className="h-10 w-10 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold text-white/50">
                                            {review.name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-sm font-semibold text-[#f8f9fa]">{review.name}</span>
                                                <span className="flex items-center gap-1 text-[10px] text-[#16a34a] font-medium">
                                                    <BadgeCheck size={12} /> Verified Buyer
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 mb-3">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        size={10} 
                                                        className={i < review.rating ? "fill-[#d4af37] text-[#d4af37]" : "text-white/20"} 
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-[13px] text-[#e4e4e7] leading-relaxed mb-4">
                                                {review.comment}
                                            </p>
                                            {review.image && (
                                                <div className="mb-4">
                                                    <img src={review.image} alt="Review attachment" className="h-24 w-24 rounded-lg object-cover border border-white/10" />
                                                </div>
                                            )}
                                            <div className="flex items-center justify-between text-[11px] text-[var(--color-text-secondary)]">
                                                <span>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Write Review Modal */}
            <WriteReviewModal 
                product={product} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </section>
    );
}
