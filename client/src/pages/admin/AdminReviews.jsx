import { useGetAllReviewsQuery, useDeleteReviewMutation, useApproveReviewMutation } from "../../store/api/productApiSlice";
import { Loader2, Star, Trash2, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminReviews() {
    const { data: reviews, isLoading, error } = useGetAllReviewsQuery();
    const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();
    const [approveReview, { isLoading: isApproving }] = useApproveReviewMutation();

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 size={32} className="animate-spin text-[#d4af37]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-64 items-center justify-center text-red-400">
                Failed to load reviews.
            </div>
        );
    }

    const handleDelete = async (productId, reviewId) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                await deleteReview({ productId, reviewId }).unwrap();
                toast.success("Review deleted successfully");
            } catch (err) {
                toast.error(err?.data?.message || "Failed to delete review");
            }
        }
    };

    const handleApprove = async (productId, reviewId) => {
        try {
            await approveReview({ productId, reviewId }).unwrap();
            toast.success("Review approved successfully");
        } catch (err) {
            toast.error(err?.data?.message || "Failed to approve review");
        }
    };

    return (
        <div className="px-4 py-8 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-3xl text-[#f8f9fa]">Manage Reviews</h1>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                        Monitor and moderate customer product reviews.
                    </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
                    <span className="text-sm text-[var(--color-text-secondary)]">Total Reviews: </span>
                    <span className="font-bold text-[#d4af37]">{reviews?.length || 0}</span>
                </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-white/10 bg-white/5 text-[var(--color-text-secondary)]">
                            <tr>
                                <th className="p-4 font-medium">Product</th>
                                <th className="p-4 font-medium">User</th>
                                <th className="p-4 font-medium">Rating</th>
                                <th className="p-4 font-medium">Review</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {reviews?.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-[var(--color-text-secondary)]">
                                        No reviews found.
                                    </td>
                                </tr>
                            ) : (
                                reviews?.map((review) => (
                                    <tr key={review._id} className="transition-colors hover:bg-white/[0.02]">
                                        <td className="p-4">
                                            <p className="font-medium text-[#f8f9fa] line-clamp-1">{review.productName}</p>
                                        </td>
                                        <td className="p-4 text-[#e4e4e7]">{review.userName}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs font-bold text-[#d4af37]">{review.rating}</span>
                                                <Star size={12} className="fill-[#d4af37] text-[#d4af37]" />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-[#e4e4e7] line-clamp-2 max-w-md">{review.comment}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                {review.image && (
                                                    <a href={review.image} target="_blank" rel="noreferrer" className="text-xs text-[#d4af37] hover:underline block">View Image</a>
                                                )}
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${review.isApproved ? 'bg-[#16a34a]/10 text-[#16a34a] border border-[#16a34a]/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                                                    {review.isApproved ? 'Approved' : 'Pending'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {!review.isApproved && (
                                                    <button 
                                                        onClick={() => handleApprove(review.productId, review._id)}
                                                        disabled={isApproving}
                                                        title="Approve Review"
                                                        className="rounded-lg p-2 text-[#16a34a]/70 hover:bg-[#16a34a]/10 hover:text-[#16a34a] transition-colors"
                                                    >
                                                        <CheckCircle size={16} />
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleDelete(review.productId, review._id)}
                                                    disabled={isDeleting}
                                                    title="Delete Review"
                                                    className="rounded-lg p-2 text-white/40 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
