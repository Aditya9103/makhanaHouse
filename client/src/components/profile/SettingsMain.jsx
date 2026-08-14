import { Save, User, Lock, Bell, Mail, Smartphone } from "lucide-react";
import { useState } from "react";

export default function SettingsMain() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden shadow-sm flex flex-col">
            
            {/* Header Section */}
            <div className="p-5 sm:p-6 pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-serif text-[#f8f9fa] mb-1">Account Settings</h2>
                    <p className="text-[13px] text-[var(--color-text-secondary)]">Manage your personal information and preferences.</p>
                </div>
                
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#d4af37] text-[#080b14] text-[13px] font-medium hover:bg-[#f3e5ab] transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)] shrink-0">
                    <Save size={16} />
                    Save Changes
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
                    <form className="max-w-2xl flex flex-col gap-6">
                        <div className="flex items-center gap-6 mb-2">
                            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border border-white/10 bg-[#0a0d14] flex items-center justify-center text-3xl font-serif text-[#d4af37]">
                                AK
                            </div>
                            <button type="button" className="px-4 py-2 rounded-md border border-[#d4af37]/40 text-[#d4af37] text-[12px] font-medium hover:bg-[#d4af37] hover:text-[#080b14] transition-all">
                                Change Photo
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">First Name</label>
                                <input type="text" defaultValue="Aditya" className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Last Name</label>
                                <input type="text" defaultValue="Kumar" className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Email Address</label>
                                <input type="email" defaultValue="aditya@example.com" className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Phone Number</label>
                                <input type="tel" defaultValue="+91 9876543210" className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                            </div>
                        </div>
                    </form>
                )}

                {activeTab === "security" && (
                    <form className="max-w-2xl flex flex-col gap-6">
                        <div className="space-y-2">
                            <label className="text-[12px] font-medium text-[#f8f9fa]">Current Password</label>
                            <input type="password" placeholder="••••••••" className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[12px] font-medium text-[#f8f9fa]">New Password</label>
                            <input type="password" placeholder="Enter new password" className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[12px] font-medium text-[#f8f9fa]">Confirm New Password</label>
                            <input type="password" placeholder="Confirm new password" className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-[#d4af37]/50 focus:bg-white/10 outline-none transition-all" />
                        </div>
                        <div className="pt-2">
                            <button type="button" className="text-[13px] text-[#d4af37] hover:underline font-medium">Forgot Password?</button>
                        </div>
                    </form>
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
    );
}
