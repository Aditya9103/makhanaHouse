import { MapPin, Building, Plus, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAddressesQuery } from "../../store/api/usersApiSlice";

export default function SavedAddresses() {
    const { userInfo } = useSelector((state) => state.auth);
    const { data: addresses = [] } = useGetAddressesQuery(undefined, {
        skip: !userInfo,
    });

    // Only show top 2 addresses on the dashboard
    const displayAddresses = addresses.slice(0, 2);

    const getIcon = (type) => {
        switch(type?.toLowerCase()) {
            case 'home': return Home;
            case 'office': return Building;
            default: return MapPin;
        }
    };

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
                    {displayAddresses.length > 0 ? (
                        displayAddresses.map((address) => {
                            const Icon = getIcon(address.addressType);
                            return (
                                <div key={address._id} className="relative p-4 rounded-xl border border-white/5 bg-white/[0.02] shadow-inner hover:border-white/10 hover:bg-white/[0.04] transition-all group flex flex-col h-full">
                                    <div className="flex items-center gap-3 mb-5">
                                        <Icon size={14} className="text-[#d4af37]" />
                                        <span className="text-[13px] font-semibold text-[#f8f9fa] capitalize">{address.addressType || 'Other'}</span>
                                        {address.isDefault && (
                                            <span className="text-[9px] px-1.5 py-0.5 rounded border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#d4af37] uppercase tracking-wider ml-auto">
                                                Default
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-1 text-[11px] text-[var(--color-text-secondary)] leading-relaxed mb-6 flex-1">
                                        <p className="text-[#e4e4e7] font-medium text-xs mb-0.5">{address.name || userInfo?.name}</p>
                                        <p>{address.addressLine}</p>
                                        <p>{address.city}, {address.state} - {address.pinCode}</p>
                                        <p className="mt-1">{address.phone || userInfo?.phone}</p>
                                    </div>

                                    <div className="flex items-center justify-between text-[11px] font-medium mt-auto pt-4 border-t border-white/5">
                                        <Link to="/profile/addresses" className="text-[#d4af37] hover:text-[#f3e5ab] transition-colors">Manage</Link>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-1 sm:col-span-2 flex items-center justify-center p-5 text-[12px] text-[var(--color-text-secondary)] border border-dashed border-white/10 rounded-xl h-full">
                            No saved addresses found.
                        </div>
                    )}
                </div>

                {/* Add New Address */}
                <Link to="/profile/addresses" className="w-full sm:w-[35%] lg:w-[30%] flex flex-col items-center justify-center p-5 rounded-xl border border-dashed border-white/20 bg-transparent hover:border-[#d4af37] hover:bg-[#d4af37]/5 transition-all min-h-[200px] sm:min-h-0 group text-[var(--color-text-secondary)] hover:text-[#d4af37]">
                    <div className="h-10 w-10 rounded-full border border-current flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Plus size={18} />
                    </div>
                    <span className="text-xs font-medium">Add New Address</span>
                </Link>

            </div>
        </div>
    );
}
