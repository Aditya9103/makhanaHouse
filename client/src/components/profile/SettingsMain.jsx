import { Save, User, Lock, Bell, Mail, Smartphone, Loader2, Shield, LogOut, AlertTriangle, Trash2, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserMutation, useDeleteUserMutation } from "../../store/api/authApiSlice";
import { useUploadFileMutation } from "../../store/api/uploadApiSlice";
import { setCredentials, logout } from "../../store/slices/authSlice";

export default function SettingsMain() {
    const [activeTab, setActiveTab] = useState("profile");
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
    const [uploadFile] = useUploadFileMutation();
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    
    const [isUploading, setIsUploading] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleteConfirmationText, setDeleteConfirmationText] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (userInfo) {
            setFormData({
                name: userInfo.name || "",
                email: userInfo.email || "",
                phone: userInfo.phone || "",
                location: userInfo.location || "",
                password: "",
                confirmPassword: "",
            });
        }
    }, [userInfo]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const uploadData = new FormData();
            uploadData.append("file", file);
            uploadData.append("folder", "avatars");

            const uploadRes = await uploadFile(uploadData).unwrap();
            
            const updatedUser = await updateUser({
                ...userInfo,
                avatar: uploadRes.url,
            }).unwrap();

            dispatch(setCredentials(updatedUser));
            alert("Profile photo updated successfully!");
        } catch (error) {
            alert(error?.data?.message || "Failed to upload image");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = async () => {
        if (activeTab === "security") {
            if (formData.password !== formData.confirmPassword) {
                return alert("Passwords do not match");
            }
        }

        try {
            const updatedUser = await updateUser({
                ...userInfo,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                location: formData.location,
                password: formData.password || undefined,
            }).unwrap();

            dispatch(setCredentials(updatedUser));
            alert("Profile updated successfully!");
        } catch (error) {
            alert(error?.data?.message || "Failed to update profile");
        }
    };

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
        <>
        <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden shadow-sm flex flex-col">
            
            {/* Header Section */}
            <div className="p-5 sm:p-6 pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-serif text-[#f8f9fa] mb-1">Account Settings</h2>
                    <p className="text-[13px] text-[var(--color-text-secondary)]">Manage your personal information and preferences.</p>
                </div>
                
                <button 
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#d4af37] text-[#080b14] text-[13px] font-medium hover:bg-[#f3e5ab] transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)] shrink-0 disabled:opacity-70"
                >
                    {isUpdating ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 px-2 sm:px-6 overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setActiveTab("profile")}
                    className={`flex items-center gap-2 px-4 py-4 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === "profile" 
                        ? "border-[#d4af37] text-[#d4af37]" 
                        : "border-transparent text-[var(--color-text-secondary)] hover:text-[#f8f9fa]"
                    }`}
                >
                    <User size={16} />
                    Personal Info
                </button>
                <button
                    onClick={() => setActiveTab("security")}
                    className={`flex items-center gap-2 px-4 py-4 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === "security" 
                        ? "border-[#d4af37] text-[#d4af37]" 
                        : "border-transparent text-[var(--color-text-secondary)] hover:text-[#f8f9fa]"
                    }`}
                >
                    <Lock size={16} />
                    Security
                </button>
                <button
                    onClick={() => setActiveTab("notifications")}
                    className={`flex items-center gap-2 px-4 py-4 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === "notifications" 
                        ? "border-[#d4af37] text-[#d4af37]" 
                        : "border-transparent text-[var(--color-text-secondary)] hover:text-[#f8f9fa]"
                    }`}
                >
                    <Bell size={16} />
                    Notifications
                </button>
            </div>

            {/* Content Area */}
            <div className="p-5 sm:p-6 lg:p-8">
                
                {activeTab === "profile" && (
                    <form className="max-w-2xl flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex items-center gap-6 mb-2">
                            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border border-white/10 bg-[#0a0d14] flex items-center justify-center text-3xl font-serif text-[#d4af37] overflow-hidden">
                                {isUploading ? (
                                    <Loader2 size={24} className="animate-spin text-[#d4af37]" />
                                ) : userInfo?.avatar ? (
                                    <img src={userInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    userInfo?.name?.charAt(0) || "U"
                                )}
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                            <button 
                                type="button" 
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className="px-4 py-2 rounded-md border border-[#d4af37]/40 text-[#d4af37] text-[12px] font-medium hover:bg-[#d4af37] hover:text-[#080b14] transition-all disabled:opacity-50"
                            >
                                Change Photo
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Full Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Phone Number</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 0000000000" className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Location</label>
                                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Bihar, India" className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                            </div>
                        </div>
                    </form>
                )}

                {activeTab === "security" && (
                    <div className="max-w-2xl flex flex-col gap-10">
                        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">New Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter new password" className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Confirm New Password</label>
                                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm new password" className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                            </div>
                        </form>
                        
                        {/* Security Tips */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[14px] font-medium text-[#f8f9fa] flex items-center gap-2">
                                <Shield size={16} className="text-[#d4af37]" />
                                Security Tips
                            </h3>
                            <ul className="list-disc list-inside text-[13px] text-[var(--color-text-secondary)] space-y-2 ml-2">
                                <li>Use a strong password combining letters, numbers, and symbols.</li>
                                <li>Never share your password or OTP with anyone, including our support team.</li>
                                <li>Regularly update your password every 3-6 months.</li>
                            </ul>
                        </div>

                        {/* Sign Out */}
                        <div className="flex flex-col gap-4 border-t border-white/10 pt-8">
                            <h3 className="text-[14px] font-medium text-[#f8f9fa] flex items-center gap-2">
                                <LogOut size={16} className="text-[#d4af37]" />
                                Sign Out
                            </h3>
                            <p className="text-[13px] text-[var(--color-text-secondary)]">Log out of your account securely.</p>
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log("Sign out clicked!");
                                    handleSignOut();
                                }}
                                className="w-fit px-6 py-2.5 rounded-md border border-white/20 text-[#f8f9fa] text-[13px] font-medium hover:bg-white/10 transition-colors relative z-50 cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </div>

                        {/* Danger Zone */}
                        <div className="flex flex-col gap-4 border-t border-red-500/20 pt-8">
                            <h3 className="text-[14px] font-medium text-red-500 flex items-center gap-2">
                                <AlertTriangle size={16} />
                                Danger Zone
                            </h3>
                            <p className="text-[13px] text-[var(--color-text-secondary)]">
                                Once you delete your account, there is no going back. All your order history, saved addresses, and reward points will be permanently erased.
                            </p>
                            <button 
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log("Delete button clicked!");
                                    setShowDeletePopup(true);
                                }}
                                className="w-fit px-6 py-2.5 rounded-md bg-red-500/10 text-red-500 border border-red-500/20 text-[13px] font-medium hover:bg-red-500 hover:text-white transition-all relative z-50 cursor-pointer"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === "notifications" && (
                    <div className="max-w-2xl flex flex-col gap-8">
                        
                        {/* Email */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[14px] font-medium text-[#f8f9fa] flex items-center gap-2">
                                <Mail size={16} className="text-[#d4af37]" />
                                Email Notifications
                            </h3>
                            <div className="space-y-4 ml-6">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" defaultChecked className="accent-[#d4af37] w-4 h-4" />
                                    <span className="text-[13px] text-[#e4e4e7] group-hover:text-[#f8f9fa] transition-colors">Order Updates & Tracking</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" defaultChecked className="accent-[#d4af37] w-4 h-4" />
                                    <span className="text-[13px] text-[#e4e4e7] group-hover:text-[#f8f9fa] transition-colors">Promotions & Offers</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="accent-[#d4af37] w-4 h-4" />
                                    <span className="text-[13px] text-[#e4e4e7] group-hover:text-[#f8f9fa] transition-colors">Newsletter & Blog Updates</span>
                                </label>
                            </div>
                        </div>

                        {/* SMS */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[14px] font-medium text-[#f8f9fa] flex items-center gap-2">
                                <Smartphone size={16} className="text-[#d4af37]" />
                                SMS Notifications
                            </h3>
                            <div className="space-y-4 ml-6">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" defaultChecked className="accent-[#d4af37] w-4 h-4" />
                                    <span className="text-[13px] text-[#e4e4e7] group-hover:text-[#f8f9fa] transition-colors">Delivery Status (Out for delivery, Delivered)</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="accent-[#d4af37] w-4 h-4" />
                                    <span className="text-[13px] text-[#e4e4e7] group-hover:text-[#f8f9fa] transition-colors">Exclusive Flash Sales</span>
                                </label>
                            </div>
                        </div>

                    </div>
                )}
                
            </div>
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
        </>
    );
}
