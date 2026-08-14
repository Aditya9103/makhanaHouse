import { MapPin, Building, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function SavedAddresses() {
    const addresses = [
        {
            id: 1,
            type: "Home",
            icon: MapPin,
            isDefault: true,
            name: "Aditya Kumar",
            line1: "123, Boring Road, Patna",
            line2: "Bihar - 800001, India",
            phone: "+91 98765 43210"
        },
        {
            id: 2,
            type: "Office",
            icon: Building,
            isDefault: false,
            name: "Aditya Kumar",
            line1: "Tech Park, Tower - B, Floor 5",
            line2: "Gandhinagar, Gujarat - 382355, India",
            phone: "+91 98765 43210"
        }
    ];

    return (
        <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 lg:p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-[15px] font-serif text-[#f8f9fa]">Saved Addresses</h3>
                <Link to="/profile/addresses" className="text-xs text-[#d4af37] hover:text-[#f3e5ab] transition-colors font-medium">
                    Manage Addresses →
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 h-[calc(100%-48px)]">
                
                {/* Existing Addresses container */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((address) => {
                        const Icon = address.icon;
                        return (
                            <div key={address.id} className="relative p-4 rounded-xl border border-white/5 bg-white/[0.02] shadow-inner hover:border-white/10 hover:bg-white/[0.04] transition-all group flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-5">
                                    <Icon size={14} className="text-[#d4af37]" />
                                    <span className="text-[13px] font-semibold text-[#f8f9fa]">{address.type}</span>
                                    {address.isDefault && (
                                        <span className="text-[9px] px-1.5 py-0.5 rounded border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#d4af37] uppercase tracking-wider ml-auto">
                                            Default
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1 text-[11px] text-[var(--color-text-secondary)] leading-relaxed mb-6 flex-1">
                                    <p className="text-[#e4e4e7] font-medium text-xs mb-0.5">{address.name}</p>
                                    <p>{address.line1}</p>
                                    <p>{address.line2}</p>
                                    <p className="mt-1">{address.phone}</p>
                                </div>

                                <div className="flex items-center gap-3 text-[11px] font-medium mt-auto pt-4 border-t border-white/5">
                                    <button className="text-[#d4af37] hover:text-[#f3e5ab] transition-colors">Edit</button>
                                    <span className="text-white/10">|</span>
                                    <button className="text-[var(--color-text-secondary)] hover:text-red-400 transition-colors">Remove</button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Add New Address */}
                <button className="w-full sm:w-[35%] lg:w-[30%] flex flex-col items-center justify-center p-5 rounded-xl border border-dashed border-white/20 bg-transparent hover:border-[#d4af37] hover:bg-[#d4af37]/5 transition-all min-h-[200px] sm:min-h-0 group text-[var(--color-text-secondary)] hover:text-[#d4af37]">
                    <div className="h-10 w-10 rounded-full border border-current flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Plus size={18} />
                    </div>
                    <span className="text-xs font-medium">Add New Address</span>
                </button>

            </div>
        </div>
    );
}
