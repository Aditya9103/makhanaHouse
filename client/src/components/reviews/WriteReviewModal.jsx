import { useState, useRef } from "react";
import { X, Star, UploadCloud, Loader2 } from "lucide-react";
import { useCreateReviewMutation } from "../../store/api/productApiSlice";
import { useUploadFileMutation } from "../../store/api/uploadApiSlice";
import { toast } from "react-toastify";

export default function WriteReviewModal({ product, isOpen, onClose }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [image, setImage] = useState("");
    
    const fileInputRef = useRef(null);
    
    const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();
    const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();

    if (!isOpen) return null;

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await uploadFile(formData).unwrap();
            setImage(res.imageUrl);
            toast.success("Image uploaded successfully");
        } catch (err) {
            toast.error(err?.data?.message || "Image upload failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        if (comment.trim().length < 10) {
            toast.error("Review must be at least 10 characters long");
            return;
        }

        try {
            await createReview({
                productId: product._id,
                rating,
                comment,
                image
            }).unwrap();
            
            toast.success("Review submitted successfully!");
            onClose();
            // Reset state
            setRating(0);
            setComment("");
            setImage("");
        } catch (err) {
            toast.error(err?.data?.message || err.error || "Failed to submit review");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#080b14]/80 backdrop-blur-sm" onClick={onClose}></div>
            
            <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0c101b] p-6 shadow-2xl">
                <button 
                    onClick={onClose}
                    className="absolute right-4 top-4 text-white/40 hover:text-white"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-serif text-[#f8f9fa] mb-2">Write a Review</h2>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                    Share your experience with {product?.name}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Rating Stars */}
                    <div>
                        <label className="block text-sm font-medium text-[#e4e4e7] mb-2">Overall Rating *</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    <Star 
                                        size={28} 
                                        className={(hover || rating) >= star ? "fill-[#d4af37] text-[#d4af37]" : "fill-transparent text-white/20"} 
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Review Text */}
                    <div>
                        <label className="block text-sm font-medium text-[#e4e4e7] mb-2">Your Review *</label>
                        <textarea
                            rows="4"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="What did you like or dislike? What is this product best used for?"
                            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-[#f8f9fa] placeholder-white/30 focus:border-[#d4af37]/50 focus:outline-none focus:ring-1 focus:ring-[#d4af37]/50 resize-none"
                        ></textarea>
                    </div>

                    {/* Optional Image */}
                    <div>
                        <label className="block text-sm font-medium text-[#e4e4e7] mb-2">Add a Photo (Optional)</label>
                        {image ? (
                            <div className="relative h-24 w-24 rounded-lg overflow-hidden border border-white/10 group">
                                <img src={image} alt="Review" className="h-full w-full object-cover" />
                                <button 
                                    type="button"
                                    onClick={() => setImage("")}
                                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={20} className="text-white" />
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className="flex h-24 w-24 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-white/5 text-[var(--color-text-secondary)] transition hover:border-[#d4af37]/50 hover:text-[#d4af37] disabled:opacity-50"
                            >
                                {isUploading ? <Loader2 size={20} className="animate-spin" /> : <UploadCloud size={20} />}
                                <span className="text-[10px] font-medium uppercase tracking-wider">{isUploading ? 'Uploading...' : 'Upload'}</span>
                            </button>
                        )}
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImageUpload} 
                            className="hidden" 
                            accept="image/*" 
                        />
                    </div>

                    <div className="mt-2 flex justify-end gap-3 pt-4 border-t border-white/5">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 rounded-lg bg-[#d4af37] px-6 py-2 text-sm font-bold text-[#080b14] transition hover:bg-[#c39d2e] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
