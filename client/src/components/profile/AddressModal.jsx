import { X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function AddressModal({ isOpen, onClose }) {
    const [addressType, setAddressType] = useState('home');

    if (!isOpen) return null;

    const modalContent = (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#080b14]/90 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-[500px] bg-[#0a0d14] rounded-2xl border border-[#d4af37]/20 shadow-2xl flex flex-col overflow-hidden">
                
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#080b14]/80">
                    <div>
                        <h2 className="text-[16px] font-serif text-[#f8f9fa]">Add New Address</h2>
                        <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">Please fill in your delivery details</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[#f8f9fa] hover:bg-white/10 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto max-h-[55vh] no-scrollbar">
                    
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-medium text-[var(--color-text-secondary)]">Full Name</label>
                            <input 
                                type="text" 
                                placeholder="John Doe"
                                className="w-full bg-[#080b14] border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-[#f8f9fa] placeholder:text-white/20 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-medium text-[var(--color-text-secondary)]">Phone Number</label>
                            <input 
                                type="tel" 
                                placeholder="+91 98765 43210"
                                className="w-full bg-[#080b14] border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-[#f8f9fa] placeholder:text-white/20 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Pincode & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-medium text-[var(--color-text-secondary)]">Pincode</label>
                            <input 
                                type="text" 
                                placeholder="800001"
                                className="w-full bg-[#080b14] border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-[#f8f9fa] placeholder:text-white/20 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-medium text-[var(--color-text-secondary)]">City</label>
                            <input 
                                type="text" 
                                placeholder="Patna"
                                className="w-full bg-[#080b14] border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-[#f8f9fa] placeholder:text-white/20 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Full Address */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-medium text-[var(--color-text-secondary)]">House No., Building, Company</label>
                        <input 
                            type="text" 
                            placeholder="123, Boring Road"
                            className="w-full bg-[#080b14] border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-[#f8f9fa] placeholder:text-white/20 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-medium text-[var(--color-text-secondary)]">Area, Street, Sector, Village</label>
                        <input 
                            type="text" 
                            placeholder="Near City Center"
                            className="w-full bg-[#080b14] border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-[#f8f9fa] placeholder:text-white/20 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                        />
                    </div>

                    {/* Address Type */}
                    <div className="flex flex-col gap-2 mt-2">
                        <label className="text-[11px] font-medium text-[var(--color-text-secondary)]">Address Type</label>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setAddressType('home')}
                                className={`flex-1 py-2.5 rounded-lg border transition-all text-[12px] font-medium flex items-center justify-center gap-2 ${
                                    addressType === 'home' 
                                    ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]' 
                                    : 'border-white/10 bg-[#080b14] text-[var(--color-text-secondary)] hover:border-white/20 hover:text-[#f8f9fa]'
                                }`}
                            >
                                Home
                            </button>
                            <button 
                                onClick={() => setAddressType('office')}
                                className={`flex-1 py-2.5 rounded-lg border transition-all text-[12px] font-medium flex items-center justify-center gap-2 ${
                                    addressType === 'office' 
                                    ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]' 
                                    : 'border-white/10 bg-[#080b14] text-[var(--color-text-secondary)] hover:border-white/20 hover:text-[#f8f9fa]'
                                }`}
                            >
                                Office
                            </button>
                            <button 
                                onClick={() => setAddressType('other')}
                                className={`flex-1 py-2.5 rounded-lg border transition-all text-[12px] font-medium flex items-center justify-center gap-2 ${
                                    addressType === 'other' 
                                    ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]' 
                                    : 'border-white/10 bg-[#080b14] text-[var(--color-text-secondary)] hover:border-white/20 hover:text-[#f8f9fa]'
                                }`}
                            >
                                Other
                            </button>
                        </div>
                    </div>

                    {/* Make Default Checkbox */}
                    <div className="flex items-center gap-2 mt-2">
                        <input type="checkbox" id="default-address" className="accent-[#d4af37] w-3.5 h-3.5" />
                        <label htmlFor="default-address" className="text-[12px] text-[#e4e4e7] cursor-pointer">Make this my default address</label>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 sm:p-5 border-t border-white/10 bg-[#080b14]/80 flex items-center gap-3">
                    <button 
                        onClick={onClose}
                        className="flex-1 py-2 rounded-lg border border-white/10 text-[var(--color-text-secondary)] text-[12px] font-medium hover:text-[#f8f9fa] hover:border-white/20 hover:bg-white/5 transition-all"
                    >
                        Cancel
                    </button>
                    <button className="flex-1 py-2 rounded-lg bg-[#d4af37] text-[#080b14] text-[12px] font-medium hover:bg-[#f3e5ab] transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                        Save Address
                    </button>
                </div>
                
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
