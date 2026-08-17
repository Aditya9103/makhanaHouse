import { useEffect, useState } from "react";
import { Edit2, Plus, Loader2 } from "lucide-react";
import { useGetAddressesQuery } from "../../store/api/usersApiSlice";
import { useNavigate } from "react-router-dom";

export default function CheckoutAddress({ selectedAddressId, setSelectedAddressId }) {
    const [multipleLocations, setMultipleLocations] = useState(false);
    const { data: addresses = [], isLoading } = useGetAddressesQuery();
    const navigate = useNavigate();

    useEffect(() => {
        if (addresses.length > 0 && !selectedAddressId) {
            const defaultAddr = addresses.find(a => a.isDefault);
            if (defaultAddr) setSelectedAddressId(defaultAddr._id);
            else setSelectedAddressId(addresses[0]._id);
        }
    }, [addresses, selectedAddressId, setSelectedAddressId]);

    return (
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#d4af37] text-[#080b14] font-bold flex items-center justify-center text-[12px]">
                        1
                    </div>
                    <h2 className="text-[16px] sm:text-[18px] font-medium text-white">Delivery Address</h2>
                </div>
                
                {/* Toggle switch */}
                <div className="flex items-center gap-3">
                    <span className="text-[12px] text-[#e4e4e7]">Deliver to multiple locations</span>
                    <button 
                        type="button" 
                        onClick={() => setMultipleLocations(!multipleLocations)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${multipleLocations ? 'bg-[#d4af37]' : 'bg-white/20'}`}
                    >
                        <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-transform ${multipleLocations ? 'translate-x-[22px]' : 'translate-x-[3px]'}`}></div>
                    </button>
                </div>
            </div>

            {/* Address Cards Grid */}
            {/* Address Cards Grid */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                    <Loader2 size={24} className="animate-spin text-[#d4af37]" />
                    <span className="text-[13px] text-[var(--color-text-secondary)]">Loading addresses...</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                        <div 
                            key={address._id}
                            onClick={() => setSelectedAddressId(address._id)}
                            className={`relative rounded-xl border p-5 cursor-pointer transition-all ${
                                selectedAddressId === address._id 
                                ? 'bg-[#d4af37]/10 border-[#d4af37]' 
                                : 'bg-white/[0.02] border-white/10 hover:border-white/30'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className={`flex items-center justify-center w-4 h-4 rounded-full border ${selectedAddressId === address._id ? 'border-[#d4af37]' : 'border-white/30'}`}>
                                        {selectedAddressId === address._id && <div className="w-2 h-2 rounded-full bg-[#d4af37]"></div>}
                                    </div>
                                    <span className={`text-[14px] font-medium ${selectedAddressId === address._id ? 'text-white' : 'text-[#e4e4e7]'}`}>
                                        {address.type}
                                    </span>
                                    {address.isDefault && (
                                        <span className="text-[10px] bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded-sm">Default</span>
                                    )}
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate('/profile/addresses');
                                    }}
                                    className="text-[var(--color-text-secondary)] hover:text-[#d4af37] transition"
                                >
                                    <Edit2 size={14} />
                                </button>
                            </div>
                            
                            <div className="pl-7">
                                <p className="text-[13px] text-white font-medium mb-1">{address.name}</p>
                                <p className="text-[12px] text-[#e4e4e7] leading-relaxed">
                                    {address.line1}<br/>
                                    {address.line2 && <>{address.line2}<br/></>}
                                    {address.phone}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Add New Address */}
                    <div 
                        onClick={() => navigate('/profile/addresses')}
                        className="rounded-xl border border-dashed border-white/20 bg-white/[0.01] hover:bg-white/[0.03] transition-all p-5 flex flex-col items-center justify-center cursor-pointer min-h-[140px] gap-2"
                    >
                        <Plus size={20} className="text-[#d4af37]" />
                        <span className="text-[13px] font-medium text-[#d4af37]">Add New Address</span>
                    </div>
                </div>
            )}
        </div>
    );
}
