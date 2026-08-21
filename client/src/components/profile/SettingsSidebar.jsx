import { ShieldAlert, AlertTriangle, LogOut, Loader2, Trash2, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useDeleteUserMutation } from "../../store/api/authApiSlice";

export default function SettingsSidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleteConfirmationText, setDeleteConfirmationText] = useState("");

    const handleSignOut = () => {
        dispatch(logout());
        navigate("/login");
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmationText !== "deleteme") return;
        try {
            await deleteUser().unwrap();
            dispatch(logout());
            alert("Account deleted successfully.");
            navigate("/");
        } catch (error) {
            alert(error?.data?.message || "Failed to delete account");
        }
    };

    return (
        <div className="flex flex-col gap-6">
            
            {/* Security Tips Box */}
            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 shadow-sm">
                <h4 className="text-[14px] font-medium text-[#f8f9fa] mb-4 flex items-center gap-2">
                    <ShieldAlert size={16} className="text-[#d4af37]" />
                    Security Tips
                </h4>
                
                <ul className="flex flex-col gap-3">
                    <li className="flex items-start gap-2.5 text-[12px] text-[var(--color-text-secondary)] leading-relaxed">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0"></div>
                        <span>Use a strong password combining letters, numbers, and symbols.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-[12px] text-[var(--color-text-secondary)] leading-relaxed">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0"></div>
                        <span>Never share your password or OTP with anyone, including our support team.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-[12px] text-[var(--color-text-secondary)] leading-relaxed">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0"></div>
                        <span>Regularly update your password every 3-6 months.</span>
                    </li>
                </ul>
            </div>

            {/* Logout Box */}
            <div 
                onClick={handleSignOut}
                className="rounded-xl border border-white/10 bg-[#0a0d14]/50 hover:bg-white/[0.02] transition-colors p-4 flex items-center gap-3 cursor-pointer group"
            >
                <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-text-secondary)] group-hover:text-red-400 group-hover:border-red-400/20 group-hover:bg-red-400/10 transition-all">
                    <LogOut size={18} />
                </div>
                <div>
                    <h4 className="text-[14px] font-medium text-[#f8f9fa] group-hover:text-red-400 transition-colors">Sign Out</h4>
                    <p className="text-[11px] text-[var(--color-text-secondary)]">Log out of your account securely.</p>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 backdrop-blur-md p-5 shadow-sm mt-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.1)_0%,transparent_70%)] pointer-events-none"></div>
                
                <h4 className="text-[14px] font-medium text-red-400 mb-2 flex items-center gap-2 relative z-10">
                    <AlertTriangle size={16} />
                    Danger Zone
                </h4>
                <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed mb-4 relative z-10">
                    Once you delete your account, there is no going back. All your order history, saved addresses, and reward points will be permanently erased.
                </p>
                
                <button 
                    onClick={() => setShowDeletePopup(true)}
                    className="w-full py-2.5 rounded-md border border-red-500/30 text-red-400 text-[12px] font-medium hover:bg-red-500 hover:text-white transition-all relative z-10"
                >
                    Delete Account
                </button>
            </div>

            {/* Delete Account Popup */}
            {showDeletePopup && createPortal(
                <div 
                    className="fixed inset-0 flex items-center justify-center p-4"
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
                >
                    <div className="bg-[#11141b] border border-red-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
                        <button 
                            onClick={() => {
                                setShowDeletePopup(false);
                                setDeleteConfirmationText("");
                            }}
                            className="absolute top-4 right-4 text-white/50 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        
                        <div className="flex flex-col items-center text-center gap-4 mt-2">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                <AlertTriangle size={24} />
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Delete Account?</h3>
                                <p className="text-sm text-white/70">
                                    This action is permanent and irreversible. To confirm, please type <strong className="text-white">deleteme</strong> below.
                                </p>
                            </div>
                            
                            <input 
                                type="text"
                                value={deleteConfirmationText}
                                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                                placeholder="Type deleteme"
                                className="w-full mt-2 rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-white outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 text-center font-medium"
                            />
                            
                            <div className="flex gap-3 w-full mt-4">
                                <button 
                                    onClick={() => {
                                        setShowDeletePopup(false);
                                        setDeleteConfirmationText("");
                                    }}
                                    className="flex-1 py-2.5 rounded-md border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleDeleteAccount}
                                    disabled={deleteConfirmationText !== "deleteme" || isDeleting}
                                    className="flex-1 py-2.5 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
