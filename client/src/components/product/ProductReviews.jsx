import { Star, BadgeCheck } from "lucide-react";

export default function ProductReviews({ reviews }) {
    return (
        <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 mb-16">
            <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    
                    {/* Left: Summary */}
                    <div className="w-full lg:w-[350px] p-6 sm:p-8 lg:border-r border-white/10 shrink-0">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-serif text-xl text-[#d4af37]">Customer Reviews</h3>
                            <span className="text-sm text-[var(--color-text-secondary)]">({reviews.total})</span>
                        </div>
                        
                        <div className="flex items-end gap-4 mb-2">
                            <span className="font-serif text-5xl text-[#f8f9fa] leading-none">{reviews.average}</span>
                            <div className="pb-1">
                                <div className="flex items-center gap-1 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            size={14} 
                                            className={i < Math.floor(reviews.average) ? "fill-[#d4af37] text-[#d4af37]" : "text-white/20"} 
                                        />
                                    ))}
                                </div>
                                <p className="text-[11px] text-[var(--color-text-secondary)]">Based on {reviews.total} reviews</p>
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
                                            style={{ width: `${(reviews.distribution[star] / reviews.total) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="w-6 text-right text-[11px] text-[var(--color-text-secondary)]">
                                        {reviews.distribution[star]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Review List */}
                    <div className="flex-1 p-6 sm:p-8 relative">
                        <div className="absolute top-6 sm:top-8 right-6 sm:right-8">
                            <button className="px-4 py-2 rounded border border-[#d4af37]/40 text-xs font-medium text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#080b14]">
                                Write a Review
                            </button>
                        </div>
                        
                        <div className="space-y-8 mt-12 sm:mt-0">
                            {reviews.list.map((review) => (
                                <div key={review.id} className="flex gap-4">
                                    {/* Avatar placeholder if no image */}
                                    <div className="h-10 w-10 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold text-white/50">
                                        {review.user.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-sm font-semibold text-[#f8f9fa]">{review.user}</span>
                                            {review.verified && (
                                                <span className="flex items-center gap-1 text-[10px] text-[#16a34a] font-medium">
                                                    <BadgeCheck size={12} /> Verified Buyer
                                                </span>
                                            )}
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
                                        <p className="text-[13px] text-[#e4e4e7] leading-relaxed mb-2">
                                            {review.text}
                                        </p>
                                        <div className="flex items-center justify-between mt-3 text-[11px] text-[var(--color-text-secondary)]">
                                            <span>{review.variant}</span>
                                            <span>{review.timeAgo}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
