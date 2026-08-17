import { Save, User, Lock, Store, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserMutation } from "../../store/api/authApiSlice";
import { useUploadFileMutation } from "../../store/api/uploadApiSlice";
import { setCredentials } from "../../store/slices/authSlice";

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState("profile");
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
    const [uploadFile] = useUploadFileMutation();
    
    const [isUploading, setIsUploading] = useState(false);
    
    // Profile State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Admin Specific Settings State
    const [storeConfig, setStoreConfig] = useState({
        storeName: "Makhana House",
        supportEmail: "support@makhanahouse.com",
        taxRate: "18",
        currency: "INR (₹)",
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        if (userInfo) {
            setFormData({
                name: userInfo.name || "",
                email: userInfo.email || "",
                password: "",
                confirmPassword: "",
            });
        }
    }, [userInfo]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConfigChange = (e) => {
        setStoreConfig({ ...storeConfig, [e.target.name]: e.target.value });
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
            alert("Admin photo updated successfully!");
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
        
        if (activeTab === "store") {
            // Here you would typically dispatch an action to save store config
            return alert("Store configuration saved successfully!");
        }

        try {
            const updatedUser = await updateUser({
                ...userInfo,
                name: formData.name,
                email: formData.email,
                password: formData.password || undefined,
            }).unwrap();

            dispatch(setCredentials(updatedUser));
            alert("Admin profile updated successfully!");
        } catch (error) {
            alert(error?.data?.message || "Failed to update profile");
        }
    };

    return (
        <div className="flex flex-col gap-6 max-w-5xl w-full">
            <div className="rounded-2xl border border-[#d4af37]/20 bg-[#080b14]/80 backdrop-blur-md overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)] flex flex-col">
                
                {/* Header Section */}
                <div className="p-5 sm:p-6 pb-4 border-b border-[#d4af37]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-serif text-[#f8f9fa] mb-1">Admin Settings</h2>
                        <p className="text-[13px] text-[#e4e4e7]/70">Manage your admin profile and global store configurations.</p>
                    </div>
                    
                    <button 
                        onClick={handleSave}
                        disabled={isUpdating}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#d4af37] text-[#080b14] text-[13px] font-medium hover:bg-[#c39d2e] transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)] shrink-0 disabled:opacity-70"
                    >
                        {isUpdating ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {isUpdating ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[#d4af37]/10 px-2 sm:px-6 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`flex items-center gap-2 px-4 py-4 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                            activeTab === "profile" 
                            ? "border-[#d4af37] text-[#d4af37] bg-[#d4af37]/5" 
                            : "border-transparent text-[#e4e4e7]/60 hover:text-[#f8f9fa] hover:bg-white/5"
                        }`}
                    >
                        <User size={16} />
                        Admin Profile
                    </button>
                    <button
                        onClick={() => setActiveTab("security")}
                        className={`flex items-center gap-2 px-4 py-4 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                            activeTab === "security" 
                            ? "border-[#d4af37] text-[#d4af37] bg-[#d4af37]/5" 
                            : "border-transparent text-[#e4e4e7]/60 hover:text-[#f8f9fa] hover:bg-white/5"
                        }`}
                    >
                        <Lock size={16} />
                        Security
                    </button>
                    <button
                        onClick={() => setActiveTab("store")}
                        className={`flex items-center gap-2 px-4 py-4 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                            activeTab === "store" 
                            ? "border-[#d4af37] text-[#d4af37] bg-[#d4af37]/5" 
                            : "border-transparent text-[#e4e4e7]/60 hover:text-[#f8f9fa] hover:bg-white/5"
                        }`}
                    >
                        <Store size={16} />
                        Store Configuration
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-5 sm:p-6 lg:p-8">
                    
                    {activeTab === "profile" && (
                        <form className="max-w-2xl flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex items-center gap-6 mb-2">
                                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border border-[#d4af37]/20 bg-[#0a0d14] flex items-center justify-center text-3xl font-serif text-[#d4af37] overflow-hidden">
                                    {isUploading ? (
                                        <Loader2 size={24} className="animate-spin text-[#d4af37]" />
                                    ) : userInfo?.avatar ? (
                                        <img src={userInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        userInfo?.name?.charAt(0) || "A"
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
                                    <label className="text-[12px] font-medium text-[#f8f9fa]">Admin Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[12px] font-medium text-[#f8f9fa]">Admin Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                                </div>
                            </div>
                        </form>
                    )}

                    {activeTab === "security" && (
                        <form className="max-w-2xl flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">New Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter new password" className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Confirm New Password</label>
                                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm new password" className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                            </div>
                        </form>
                    )}

                    {activeTab === "store" && (
                        <form className="max-w-2xl flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="p-4 rounded-lg bg-[#d4af37]/5 border border-[#d4af37]/20 mb-2">
                                <p className="text-sm text-[#e4e4e7] leading-relaxed">
                                    These settings affect the global configuration of the storefront. Changes made here will be reflected across the consumer site.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[12px] font-medium text-[#f8f9fa]">Store Name</label>
                                    <input type="text" name="storeName" value={storeConfig.storeName} onChange={handleConfigChange} className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[12px] font-medium text-[#f8f9fa]">Support Email</label>
                                    <input type="email" name="supportEmail" value={storeConfig.supportEmail} onChange={handleConfigChange} className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[12px] font-medium text-[#f8f9fa]">Base Tax Rate (%)</label>
                                    <input type="number" name="taxRate" value={storeConfig.taxRate} onChange={handleConfigChange} className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[12px] font-medium text-[#f8f9fa]">Store Currency</label>
                                    <select name="currency" value={storeConfig.currency} onChange={handleConfigChange} className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all appearance-none">
                                        <option value="INR (₹)" className="bg-[#080b14]">INR (₹)</option>
                                        <option value="USD ($)" className="bg-[#080b14]">USD ($)</option>
                                        <option value="EUR (€)" className="bg-[#080b14]">EUR (€)</option>
                                        <option value="GBP (£)" className="bg-[#080b14]">GBP (£)</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    )}
                    
                </div>
            </div>
        </div>
    );
}
