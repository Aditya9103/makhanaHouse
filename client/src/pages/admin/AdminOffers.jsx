import { useState } from "react";
import { Gift, Plus, Trash2, Loader2, Coins } from "lucide-react";
import { 
    useGetAllOffersQuery, 
    useCreateOfferMutation, 
    useUpdateOfferMutation,
    useDeleteOfferMutation,
    useAssignPointsMutation 
} from "../../store/api/rewardApiSlice";
import { useGetUsersQuery } from "../../store/api/usersApiSlice";
import { toast } from "react-toastify";

export default function AdminOffers() {
    const { data: offers = [], isLoading: loadingOffers, refetch: refetchOffers } = useGetAllOffersQuery();
    const { data: users = [], isLoading: loadingUsers } = useGetUsersQuery();
    
    const [createOffer, { isLoading: creatingOffer }] = useCreateOfferMutation();
    const [updateOffer, { isLoading: updatingOffer }] = useUpdateOfferMutation();
    const [deleteOffer] = useDeleteOfferMutation();
    const [assignPoints, { isLoading: assigningPoints }] = useAssignPointsMutation();

    // Offer Form State
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const [editingOfferId, setEditingOfferId] = useState(null);
    const [offerForm, setOfferForm] = useState({
        code: "",
        title: "",
        expiryDate: "",
        minOrderValue: "",
        discountType: "percentage",
        discountValue: "",
        colorTheme: "Gold"
    });

    // Points Form State
    const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
    const [pointsForm, setPointsForm] = useState({
        userId: "",
        points: "",
        description: "",
        type: "earned"
    });

    const handleCreateOrUpdateOffer = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...offerForm,
                minOrderValue: Number(offerForm.minOrderValue),
                discountValue: Number(offerForm.discountValue),
                isActive: true
            };
            
            if (editingOfferId) {
                await updateOffer({ id: editingOfferId, ...payload }).unwrap();
                toast.success("Offer updated successfully");
            } else {
                await createOffer(payload).unwrap();
                toast.success("Offer created successfully");
            }
            
            setIsOfferModalOpen(false);
            setEditingOfferId(null);
            setOfferForm({
                code: "",
                title: "",
                expiryDate: "",
                minOrderValue: "",
                discountType: "percentage",
                discountValue: "",
                colorTheme: "Gold"
            });
            refetchOffers();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const handleEditClick = (offer) => {
        setEditingOfferId(offer._id);
        setOfferForm({
            code: offer.code,
            title: offer.title,
            expiryDate: offer.expiryDate,
            minOrderValue: offer.minOrderValue || "",
            discountType: offer.discountType || "percentage",
            discountValue: offer.discountValue || "",
            colorTheme: offer.colorTheme
        });
        setIsOfferModalOpen(true);
    };

    const handleDeleteOffer = async (id) => {
        if (window.confirm("Are you sure you want to delete this offer?")) {
            try {
                await deleteOffer(id).unwrap();
                toast.success("Offer deleted");
                refetchOffers();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const handleAssignPoints = async (e) => {
        e.preventDefault();
        try {
            await assignPoints(pointsForm).unwrap();
            toast.success("Points assigned successfully");
            setIsPointsModalOpen(false);
            setPointsForm({ userId: "", points: "", description: "", type: "earned" });
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                <div>
                    <h1 className="text-3xl font-serif text-[#f8f9fa] mb-1">Rewards & Offers</h1>
                    <p className="text-[13px] text-[var(--color-text-secondary)]">Manage promotional coupons and manually assign points.</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button 
                        onClick={() => setIsPointsModalOpen(true)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#080b14] border border-[#d4af37]/40 text-[#d4af37] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/[0.02] transition-colors"
                    >
                        <Coins size={16} />
                        Assign Points
                    </button>
                    <button 
                        onClick={() => setIsOfferModalOpen(true)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#d4af37] text-[#080b14] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#f3e5ab] transition-colors"
                    >
                        <Plus size={16} />
                        New Offer
                    </button>
                </div>
            </div>

            {/* Offers Grid */}
            {loadingOffers ? (
                <div className="flex justify-center p-10"><Loader2 className="animate-spin text-[#d4af37]" /></div>
            ) : offers.length === 0 ? (
                <div className="bg-[#080b14]/50 border border-white/10 rounded-xl p-10 text-center flex flex-col items-center">
                    <Gift size={40} className="text-[#d4af37]/50 mb-3" />
                    <h3 className="text-[#f8f9fa] font-medium mb-1">No Offers Found</h3>
                    <p className="text-[13px] text-[var(--color-text-secondary)]">Create your first promotional offer to show to users.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {offers.map(offer => {
                        const bgGradient = offer.colorTheme === 'Gold' ? 'from-[#d4af37]/20 to-[#080b14]' : 
                                           offer.colorTheme === 'Purple' ? 'from-purple-500/20 to-[#080b14]' : 
                                           'from-emerald-500/20 to-[#080b14]';
                        
                        return (
                            <div key={offer._id} className={`rounded-xl border border-white/10 bg-gradient-to-br ${bgGradient} p-5 relative overflow-hidden flex flex-col`}>
                                <div className="absolute top-0 bottom-0 right-[30%] w-[1px] border-r-2 border-dashed border-white/10"></div>
                                
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex flex-col pr-4 z-10 w-[65%]">
                                        <h4 className="text-[16px] font-medium text-[#f8f9fa] mb-1 leading-tight">{offer.title}</h4>
                                        <span className="text-[11px] text-[var(--color-text-secondary)]">Min. Order ₹{offer.minOrderValue}</span>
                                    </div>
                                    <div className="z-10 w-[30%] flex flex-col items-center">
                                        <span className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-widest mb-1.5 text-center">Use Code</span>
                                        <div className="bg-[#080b14]/50 border border-white/10 rounded px-2.5 py-1.5 text-[13px] font-bold text-[#f8f9fa] tracking-wider text-center w-full truncate">
                                            {offer.code}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between z-10">
                                    <span className="text-[11px] text-[#e4e4e7]">{offer.expiryDate}</span>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleEditClick(offer)}
                                            className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                                            title="Edit Offer"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteOffer(offer._id)}
                                            className="text-red-400 hover:text-red-300 transition-colors p-1"
                                            title="Delete Offer"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Modals */}
            {isOfferModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#0a0d14] border border-white/10 rounded-xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh] md:max-h-[90vh]">
                        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-[#080b14] shrink-0">
                            <h3 className="text-[#f8f9fa] font-serif text-lg">{editingOfferId ? 'Edit Offer' : 'Create New Offer'}</h3>
                            <button onClick={() => { setIsOfferModalOpen(false); setEditingOfferId(null); }} className="text-[var(--color-text-secondary)] hover:text-white">&times;</button>
                        </div>
                        <form onSubmit={handleCreateOrUpdateOffer} className="p-5 flex flex-col gap-4 overflow-y-auto no-scrollbar">
                            <div>
                                <label className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1 block">Offer Title</label>
                                <input required value={offerForm.title} onChange={e => setOfferForm({...offerForm, title: e.target.value})} type="text" placeholder="e.g. 10% Off on First Order" className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#d4af37]/50" />
                            </div>
                            <div>
                                <label className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1 block">Offer Code</label>
                                <input required value={offerForm.code} onChange={e => setOfferForm({...offerForm, code: e.target.value})} type="text" placeholder="e.g. WELCOME10" className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#d4af37]/50 uppercase" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1 block">Expiry Text</label>
                                    <input required value={offerForm.expiryDate} onChange={e => setOfferForm({...offerForm, expiryDate: e.target.value})} type="text" placeholder="e.g. Valid till 31 Dec" className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#d4af37]/50" />
                                </div>
                                <div>
                                    <label className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1 block">Min. Order (₹)</label>
                                    <input required value={offerForm.minOrderValue} onChange={e => setOfferForm({...offerForm, minOrderValue: e.target.value})} type="number" min="0" placeholder="e.g. 999" className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#d4af37]/50" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1 block">Discount Type</label>
                                    <select value={offerForm.discountType} onChange={e => setOfferForm({...offerForm, discountType: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#d4af37]/50 appearance-none">
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="flat">Flat Amount (₹)</option>
                                        <option value="fixed">Fixed Amount (₹)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1 block">Discount Value</label>
                                    <input required value={offerForm.discountValue} onChange={e => setOfferForm({...offerForm, discountValue: e.target.value})} type="number" min="1" placeholder="e.g. 20" className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#d4af37]/50" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1 block">Color Theme</label>
                                <select value={offerForm.colorTheme} onChange={e => setOfferForm({...offerForm, colorTheme: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#d4af37]/50 appearance-none">
                                    <option value="Gold">Gold Theme</option>
                                    <option value="Purple">Purple Theme</option>
                                    <option value="Emerald">Emerald Theme</option>
                                </select>
                            </div>
                            <button type="submit" disabled={creatingOffer || updatingOffer} className="w-full bg-[#d4af37] text-[#080b14] font-medium py-2.5 rounded-lg mt-2 flex items-center justify-center">
                                {(creatingOffer || updatingOffer) ? <Loader2 className="animate-spin" size={16} /> : (editingOfferId ? "Update Offer" : "Create Offer")}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isPointsModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#0a0d14] border border-white/10 rounded-xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh] md:max-h-[90vh]">
                        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-[#080b14] shrink-0">
                            <h3 className="text-[#f8f9fa] font-serif text-lg">Assign Points to User</h3>
                            <button onClick={() => setIsPointsModalOpen(false)} className="text-[var(--color-text-secondary)] hover:text-white">&times;</button>
                        </div>
                        <form onSubmit={handleAssignPoints} className="p-5 flex flex-col gap-4 overflow-y-auto no-scrollbar">
                            <div>
                                <label className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1 block">Select User</label>
                                <select required value={pointsForm.userId} onChange={e => setPointsForm({...pointsForm, userId: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#d4af37]/50">
                                    <option value="">Select a user...</option>
                                    {users.map(u => (
                                        <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1 block">Type</label>
                                    <select value={pointsForm.type} onChange={e => setPointsForm({...pointsForm, type: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#d4af37]/50">
                                        <option value="earned">Add Points</option>
                                        <option value="redeemed">Deduct Points</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1 block">Amount</label>
                                    <input required value={pointsForm.points} onChange={e => setPointsForm({...pointsForm, points: e.target.value})} type="number" min="1" placeholder="e.g. 500" className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#d4af37]/50" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-1 block">Reason / Description</label>
                                <input required value={pointsForm.description} onChange={e => setPointsForm({...pointsForm, description: e.target.value})} type="text" placeholder="e.g. Review Bonus" className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-[13px] text-white focus:outline-none focus:border-[#d4af37]/50" />
                            </div>
                            <button type="submit" disabled={assigningPoints} className="w-full bg-[#d4af37] text-[#080b14] font-medium py-2.5 rounded-lg mt-2 flex items-center justify-center">
                                {assigningPoints ? <Loader2 className="animate-spin" size={16} /> : "Assign Points"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
