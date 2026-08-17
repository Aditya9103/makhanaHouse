import { X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useUpdateAddressesMutation } from "../../store/api/usersApiSlice";
import { toast } from "react-toastify";

export default function AddressModal({ isOpen, onClose, existingAddress, addresses = [] }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        pincode: "",
        city: "",
        line1: "",
        line2: "",
        type: "Home",
        isDefault: false
    });
    const [updateAddresses, { isLoading }] = useUpdateAddressesMutation();

    useEffect(() => {
        if (existingAddress) {
            setFormData({
                name: existingAddress.name || "",
                phone: existingAddress.phone || "",
                pincode: "", // Mocking as line2 contains it usually or adjust model
                city: "",
                line1: existingAddress.line1 || "",
                line2: existingAddress.line2 || "",
                type: existingAddress.type || "Home",
                isDefault: existingAddress.isDefault || false
            });
        } else {
            setFormData({
                name: "", phone: "", pincode: "", city: "", line1: "", line2: "", type: "Home", isDefault: false
            });
        }
    }, [existingAddress, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = async () => {
        if (!formData.name || !formData.phone || !formData.line1) {
            toast.error("Please fill all required fields");
            return;
        }

        let newAddresses = [...addresses];
        
        const addressToSave = {
            name: formData.name,
            phone: formData.phone,
            line1: formData.line1,
            line2: formData.line2 || `${formData.city} - ${formData.pincode}`,
            type: formData.type,
            isDefault: formData.isDefault
        };

        if (formData.isDefault) {
            newAddresses = newAddresses.map(a => ({ ...a, isDefault: false }));
        }

        if (existingAddress) {
            newAddresses = newAddresses.map(a => 
                a._id === existingAddress._id ? { ...addressToSave, _id: a._id } : a
            );
        } else {
            // New addresses won't have _id until backend returns, backend usually merges but 
            // since the backend user controller sets the entire array:
            newAddresses.push(addressToSave);
        }

        try {
            await updateAddresses(newAddresses).unwrap();
            toast.success("Address saved successfully");
            onClose();
        } catch (err) {
            toast.error("Failed to save address");
        }
    };

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
                        <h2 className="text-[16px] font-serif text-[#f8f9fa]">{existingAddress ? "Edit Address" : "Add New Address"}</h2>
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
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full bg-[#080b14] border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-[#f8f9fa] placeholder:text-white/20 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-medium text-[var(--color-text-secondary)]">Phone Number *</label>
                            <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
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
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                placeholder="800001"
                                className="w-full bg-[#080b14] border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-[#f8f9fa] placeholder:text-white/20 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-medium text-[var(--color-text-secondary)]">City</label>
                            <input 
                                type="text" 
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Patna"
                                className="w-full bg-[#080b14] border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-[#f8f9fa] placeholder:text-white/20 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Full Address */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-medium text-[var(--color-text-secondary)]">House No., Building, Company *</label>
                        <input 
                            type="text" 
                            name="line1"
                            value={formData.line1}
                            onChange={handleChange}
                            placeholder="123, Boring Road"
                            className="w-full bg-[#080b14] border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-[#f8f9fa] placeholder:text-white/20 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-medium text-[var(--color-text-secondary)]">Area, Street, Sector, Village</label>
                        <input 
                            type="text" 
                            name="line2"
                            value={formData.line2}
                            onChange={handleChange}
                            placeholder="Near City Center"
                            className="w-full bg-[#080b14] border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-[#f8f9fa] placeholder:text-white/20 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                        />
                    </div>

                    {/* Address Type */}
                    <div className="flex flex-col gap-2 mt-2">
                        <label className="text-[11px] font-medium text-[var(--color-text-secondary)]">Address Type</label>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setFormData({ ...formData, type: 'Home' })}
                                className={`flex-1 py-2.5 rounded-lg border transition-all text-[12px] font-medium flex items-center justify-center gap-2 ${
                                    formData.type === 'Home' 
                                    ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]' 
                                    : 'border-white/10 bg-[#080b14] text-[var(--color-text-secondary)] hover:border-white/20 hover:text-[#f8f9fa]'
                                }`}
                            >
                                Home
                            </button>
                            <button 
                                onClick={() => setFormData({ ...formData, type: 'Office' })}
                                className={`flex-1 py-2.5 rounded-lg border transition-all text-[12px] font-medium flex items-center justify-center gap-2 ${
                                    formData.type === 'Office' 
                                    ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]' 
                                    : 'border-white/10 bg-[#080b14] text-[var(--color-text-secondary)] hover:border-white/20 hover:text-[#f8f9fa]'
                                }`}
                            >
                                Office
                            </button>
                            <button 
                                onClick={() => setFormData({ ...formData, type: 'Other' })}
                                className={`flex-1 py-2.5 rounded-lg border transition-all text-[12px] font-medium flex items-center justify-center gap-2 ${
                                    formData.type === 'Other' 
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
                        <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} id="default-address" className="accent-[#d4af37] w-3.5 h-3.5" />
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
                    <button 
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex-1 py-2 rounded-lg bg-[#d4af37] text-[#080b14] text-[12px] font-medium flex items-center justify-center gap-2 hover:bg-[#f3e5ab] transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)] disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Save Address"}
                    </button>
                </div>
                
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
