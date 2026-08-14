import { Plus, MoreVertical, Home, Building, Users, Map } from "lucide-react";
import { useState } from "react";
import AddressModal from "./AddressModal";

export default function AddressesMain() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addresses = [
        {
            id: 1,
            type: "Home",
            icon: Home,
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
        },
        {
            id: 3,
            type: "Parents House",
            icon: Users,
            isDefault: false,
            name: "Aditya Kumar",
            line1: "Vill - Ekdanga, P.O - Bhagwanpur",
            line2: "Siwan - 841226, Bihar, India",
            phone: "+91 98765 43210"
        },
        {
            id: 4,
            type: "Farm Location",
            icon: Map,
            isDefault: false,
            name: "Makhana House Farms",
            line1: "Near Makhana Lake, Darbhanga Road",
            line2: "Madhubani - 847211, Bihar, India",
            phone: "+91 98765 43210"
        }
    ];

    return (
        <div className="flex flex-col gap-6">
            
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-serif text-[#f8f9fa] mb-1">My Addresses</h2>
                    <p className="text-[13px] text-[var(--color-text-secondary)]">Add, edit or remove your delivery addresses</p>
                </div>
                
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#d4af37] text-[#080b14] text-[13px] font-medium hover:bg-[#f3e5ab] transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)] shrink-0"
                >
                    <Plus size={16} />
                    Add New Address
                </button>
            </div>

            <p className="text-[14px] text-[#f8f9fa] font-medium -mb-2">Saved Addresses ({addresses.length})</p>

            {/* Address Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {addresses.map((address) => {
                    const Icon = address.icon;
                    return (
                        <div key={address.id} className="relative p-5 rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md shadow-sm hover:border-[#d4af37]/30 transition-all flex flex-col h-full group">
                            
                            {/* Top row: Pill & Menu */}
                            <div className="flex items-start justify-between mb-2">
                                {address.isDefault ? (
                                    <span className="text-[10px] px-2 py-1 rounded bg-[#16a34a]/10 text-[#16a34a] font-medium border border-[#16a34a]/20">
                                        Default Address
                                    </span>
                                ) : (
                                    <div className="h-6"></div> // spacer
                                )}
                                <button className="text-[var(--color-text-secondary)] hover:text-[#f8f9fa] transition-colors -mr-1">
                                    <MoreVertical size={16} />
                                </button>
                            </div>

                            {/* Icon & Title */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-lg bg-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center">
                                    <Icon size={18} className="text-[#d4af37]" />
                                </div>
                                <h3 className="text-[15px] font-medium text-[#f8f9fa]">{address.type}</h3>
                            </div>

                            {/* Address Details */}
                            <div className="flex flex-col gap-1 text-[12px] text-[var(--color-text-secondary)] leading-relaxed mb-6 flex-1 pl-13">
                                <p className="text-[#e4e4e7]">{address.name}</p>
                                <p>{address.line1}</p>
                                <p>{address.line2}</p>
                                <p className="mt-1">{address.phone}</p>
                            </div>

                            {/* Actions Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[11px] sm:text-[12px] gap-2">
                                {address.isDefault ? (
                                    <div className="flex items-center gap-1.5 text-[#16a34a] shrink-0">
                                        <div className="h-3.5 w-3.5 rounded-full border border-current flex items-center justify-center shrink-0">
                                            <div className="h-1.5 w-1.5 bg-current rounded-full"></div>
                                        </div>
                                        <span className="font-medium whitespace-nowrap">Default</span>
                                    </div>
                                ) : (
                                    <button className="flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[#f8f9fa] transition-colors shrink-0">
                                        <div className="h-3.5 w-3.5 rounded-full border border-current shrink-0"></div>
                                        <span className="whitespace-nowrap">Set as Default</span>
                                    </button>
                                )}
                                
                                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                                    <button 
                                        onClick={() => setIsModalOpen(true)}
                                        className="text-[#d4af37] flex items-center gap-1 hover:text-[#f3e5ab] transition-colors font-medium whitespace-nowrap"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                        Edit
                                    </button>
                                    <button className="text-red-400 flex items-center gap-1 hover:text-red-300 transition-colors font-medium whitespace-nowrap">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Promotional Banner */}
            <div className="relative overflow-hidden rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/5 p-5 sm:p-6 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-6 backdrop-blur-md">
                
                {/* Background Decoration */}
                <div className="absolute -right-10 -bottom-10 opacity-[0.15] pointer-events-none mix-blend-screen w-40 h-40">
                    <img src="/makhanabowl.png" alt="Decoration" className="w-full h-full object-cover" />
                </div>

                <div className="flex items-start gap-3 relative z-10 sm:max-w-[250px]">
                    <div className="h-8 w-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center shrink-0 border border-[#d4af37]/40 text-[#d4af37]">
                        <Map size={14} />
                    </div>
                    <p className="text-[13px] text-[#e4e4e7] font-medium leading-relaxed">
                        Add multiple addresses and save time while checkout
                    </p>
                </div>

                <div className="flex flex-col gap-2.5 relative z-10">
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-[#16a34a]/20 flex items-center justify-center text-[#16a34a]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <span className="text-[12px] text-[var(--color-text-secondary)]">Deliver to multiple locations</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-[#16a34a]/20 flex items-center justify-center text-[#16a34a]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <span className="text-[12px] text-[var(--color-text-secondary)]">Easily manage your addresses</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-[#16a34a]/20 flex items-center justify-center text-[#16a34a]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <span className="text-[12px] text-[var(--color-text-secondary)]">Safe & secure delivery</span>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <AddressModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
