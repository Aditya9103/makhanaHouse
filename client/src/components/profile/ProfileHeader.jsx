import { Pencil, BadgeCheck, Calendar, Phone, Loader2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { useUpdateUserMutation } from "../../store/api/authApiSlice";
import { useUploadFileMutation } from "../../store/api/uploadApiSlice";
import { setCredentials } from "../../store/slices/authSlice";
import { Link } from "react-router-dom";

export default function ProfileHeader() {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const [updateUser] = useUpdateUserMutation();
    const [uploadFile] = useUploadFileMutation();
    const [isUploading, setIsUploading] = useState(false);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "avatars");

            // Upload to S3
            const uploadRes = await uploadFile(formData).unwrap();

            // Update user profile in DB
            const updatedUser = await updateUser({
                ...userInfo,
                avatar: uploadRes.url,
            }).unwrap();

            // Update local Redux state
            dispatch(setCredentials(updatedUser));
            
        } catch (error) {
            console.error("Failed to upload avatar", error);
            alert(error?.data?.message || "Failed to upload image");
        } finally {
            setIsUploading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-6 sm:p-8 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">

            {/* Left side: Avatar & Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 relative z-10">
                {/* Avatar */}
                <div className="relative shrink-0">
                    <div className="h-24 w-24 sm:h-[110px] sm:w-[110px] rounded-full border-2 border-[#d4af37] p-1 flex items-center justify-center bg-[#0a0d14] overflow-hidden">
                        {isUploading ? (
                            <Loader2 size={24} className="text-[#d4af37] animate-spin" />
                        ) : userInfo?.avatar ? (
                            <img
                                src={userInfo.avatar}
                                alt={userInfo.name}
                                className="h-full w-full rounded-full object-cover"
                            />
                        ) : (
                            <span className="text-[#d4af37] font-serif text-3xl font-medium">
                                {userInfo?.name?.charAt(0)}
                            </span>
                        )}
                    </div>
                    
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageChange} 
                        accept="image/jpeg, image/png, image/webp" 
                        className="hidden" 
                    />
                    
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="absolute bottom-1 right-1 h-7 w-7 rounded-full bg-[#d4af37] flex items-center justify-center text-[#080b14] hover:bg-[#f3e5ab] transition-colors border-2 border-[#0a0d14] disabled:opacity-50"
                    >
                        <Pencil size={12} fill="currentColor" />
                    </button>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl sm:text-[26px] font-serif text-[#f8f9fa] leading-none">Hello, {userInfo?.name?.split(' ')[0]}</h2>
                        <BadgeCheck size={20} className="text-[#d4af37] fill-[#d4af37] text-[#0a0d14]" />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-[14px] text-[var(--color-text-secondary)] mb-2">
                        <span>{userInfo?.email}</span>
                        <span className="hidden sm:block text-white/10">|</span>
                        <span className="flex items-center gap-2">
                            <Phone size={14} className="text-[#d4af37]" />
                            {userInfo?.phone || 'Add Phone Number'}
                        </span>
                    </div>

                    <p className="text-[14px] text-[var(--color-text-secondary)] mb-5">
                        {userInfo?.location || 'Add Location'}
                    </p>

                    <div>
                        {/* We will route this to Settings page or just have it visual if we're on the settings page */}
                        <Link to="/profile/settings" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-[#d4af37]/40 hover:border-[#d4af37] text-[#d4af37] transition-colors text-[13px] font-medium bg-transparent">
                            Edit Profile <Pencil size={14} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px bg-white/10 self-stretch mx-4"></div>
            <div className="block sm:hidden h-px w-full bg-white/10 my-4"></div>

            {/* Right side: Meta Info & Image */}
            <div className="flex flex-row items-center gap-8 sm:gap-16 relative z-10 w-full sm:w-auto justify-between sm:justify-start">

                {/* Text Info */}
                <div className="flex flex-col gap-6 text-left">
                    <div className="flex flex-col gap-1.5">
                        <p className="text-[13px] font-medium text-[#f8f9fa]">Account Member Since</p>
                        <p className="text-[14px] text-[var(--color-text-secondary)] flex items-center gap-2">
                            <Calendar size={16} className="text-[#d4af37]" />
                            {formatDate(userInfo?.createdAt)}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1.5 mt-2">
                        <p className="text-[13px] font-medium text-[#f8f9fa]">Customer ID</p>
                        <p className="text-[14px] font-medium text-[#d4af37]">{userInfo?.customerId || 'Pending'}</p>
                    </div>
                </div>

                {/* Small Makhana Bowl Image replacing Lotus */}
                <div className="shrink-0">
                    <img
                        src="/makhanabowl.png"
                        alt="Makhana Bowl"
                        className="w-20 h-20 sm:w-28 sm:h-28 object-contain drop-shadow-xl"
                    />
                </div>

            </div>

        </div>
    );
}
