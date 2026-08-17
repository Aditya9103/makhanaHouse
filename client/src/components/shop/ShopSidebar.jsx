import { useState } from "react";
import { Plus, Minus, Filter, Star, Loader2 } from "lucide-react";
import { useGetProductFiltersQuery } from "../../store/api/productApiSlice";

export default function ShopSidebar({ appliedFilters, setAppliedFilters }) {
    const { data: filterOptions, isLoading } = useGetProductFiltersQuery();
    const [draftFilters, setDraftFilters] = useState(appliedFilters);
    const [openPanels, setOpenPanels] = useState({
        categories: true,
        flavors: true,
        dietary: false,
        packSizes: false,
        rating: false,
        availability: false
    });

    const togglePanel = (panel) => {
        setOpenPanels(prev => ({ ...prev, [panel]: !prev[panel] }));
    };

    const handleApplyFilters = () => {
        setAppliedFilters(draftFilters);
    };

    const handleClearFilters = () => {
        const defaultFilters = { 
            categories: [], 
            flavors: [], 
            dietary: [], 
            packSizes: [], 
            minPrice: 0, 
            maxPrice: 5000, 
            rating: 0, 
            availability: false,
            sort: "newest" 
        };
        setDraftFilters(defaultFilters);
        setAppliedFilters(defaultFilters);
    };

    const toggleArrayFilter = (key, value) => {
        setDraftFilters(prev => {
            const currentArray = prev[key] || [];
            if (currentArray.includes(value)) {
                return { ...prev, [key]: currentArray.filter(item => item !== value) };
            } else {
                return { ...prev, [key]: [...currentArray, value] };
            }
        });
    };

    if (isLoading) {
        return (
            <aside className="w-full shrink-0 lg:w-[280px] flex justify-center py-20">
                <Loader2 size={32} className="animate-spin text-[#d4af37]" />
            </aside>
        );
    }

    return (
        <aside className="w-full shrink-0 lg:w-[280px]">
            {/* Apply Button (Mobile/Sticky) */}
            <div className="mb-4 lg:hidden sticky top-[80px] z-20">
                <button 
                    onClick={handleApplyFilters}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#d4af37] py-3 text-sm font-bold text-[#080b14] shadow-lg shadow-[#d4af37]/20"
                >
                    <Filter size={16} /> Apply Filters
                </button>
            </div>

            <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="font-serif text-lg text-[#d4af37]">Filter By</h3>
                    <button onClick={handleClearFilters} className="text-xs text-[var(--color-text-secondary)] hover:text-[#f8f9fa] underline">Clear All</button>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium text-[#f8f9fa]">Price Range</p>
                        <span className="text-xs text-[#d4af37]">₹{draftFilters.maxPrice}</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="5000" 
                        step="100"
                        value={draftFilters.maxPrice}
                        onChange={(e) => setDraftFilters({ ...draftFilters, maxPrice: Number(e.target.value) })}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                    />
                    <div className="mt-2 flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
                        <span>₹0</span>
                        <span>₹5000</span>
                    </div>
                </div>

                {/* Type / Categories */}
                {filterOptions?.categories?.length > 0 && (
                    <div className="border-t border-white/10 py-4">
                        <button onClick={() => togglePanel('categories')} className="flex w-full items-center justify-between text-sm font-medium text-[#f8f9fa] transition">
                            Type
                            {openPanels.categories ? <Minus size={16} className="text-[var(--color-text-secondary)]" /> : <Plus size={16} className="text-[var(--color-text-secondary)]" />}
                        </button>
                        {openPanels.categories && (
                            <div className="mt-3 flex flex-col gap-2.5">
                                {filterOptions.categories.map((cat) => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <input 
                                            type="checkbox" 
                                            className="hidden"
                                            checked={draftFilters.categories?.includes(cat) || false}
                                            onChange={() => toggleArrayFilter('categories', cat)}
                                        />
                                        <div className={`flex h-4 w-4 items-center justify-center rounded border ${draftFilters.categories?.includes(cat) ? 'bg-[#d4af37] border-[#d4af37]' : 'border-white/20 bg-transparent group-hover:border-white/40'}`}>
                                            {draftFilters.categories?.includes(cat) && <span className="text-[#080b14] text-[10px]">✓</span>}
                                        </div>
                                        <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[#f8f9fa] transition-colors">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Flavors */}
                {filterOptions?.flavors?.length > 0 && (
                    <div className="border-t border-white/10 py-4">
                        <button onClick={() => togglePanel('flavors')} className="flex w-full items-center justify-between text-sm font-medium text-[#f8f9fa] transition">
                            Flavor
                            {openPanels.flavors ? <Minus size={16} className="text-[var(--color-text-secondary)]" /> : <Plus size={16} className="text-[var(--color-text-secondary)]" />}
                        </button>
                        {openPanels.flavors && (
                            <div className="mt-3 flex flex-col gap-2.5">
                                {filterOptions.flavors.map((flavor) => (
                                    <label key={flavor} className="flex items-center gap-3 cursor-pointer group">
                                        <input 
                                            type="checkbox" 
                                            className="hidden"
                                            checked={draftFilters.flavors?.includes(flavor) || false}
                                            onChange={() => toggleArrayFilter('flavors', flavor)}
                                        />
                                        <div className={`flex h-4 w-4 items-center justify-center rounded border ${draftFilters.flavors?.includes(flavor) ? 'bg-[#d4af37] border-[#d4af37]' : 'border-white/20 bg-transparent group-hover:border-white/40'}`}>
                                            {draftFilters.flavors?.includes(flavor) && <span className="text-[#080b14] text-[10px]">✓</span>}
                                        </div>
                                        <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[#f8f9fa] transition-colors">{flavor}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Dietary */}
                {filterOptions?.dietary?.length > 0 && (
                    <div className="border-t border-white/10 py-4">
                        <button onClick={() => togglePanel('dietary')} className="flex w-full items-center justify-between text-sm font-medium text-[#f8f9fa] transition">
                            Dietary
                            {openPanels.dietary ? <Minus size={16} className="text-[var(--color-text-secondary)]" /> : <Plus size={16} className="text-[var(--color-text-secondary)]" />}
                        </button>
                        {openPanels.dietary && (
                            <div className="mt-3 flex flex-col gap-2.5">
                                {filterOptions.dietary.map((diet) => (
                                    <label key={diet} className="flex items-center gap-3 cursor-pointer group">
                                        <input 
                                            type="checkbox" 
                                            className="hidden"
                                            checked={draftFilters.dietary?.includes(diet) || false}
                                            onChange={() => toggleArrayFilter('dietary', diet)}
                                        />
                                        <div className={`flex h-4 w-4 items-center justify-center rounded border ${draftFilters.dietary?.includes(diet) ? 'bg-[#d4af37] border-[#d4af37]' : 'border-white/20 bg-transparent group-hover:border-white/40'}`}>
                                            {draftFilters.dietary?.includes(diet) && <span className="text-[#080b14] text-[10px]">✓</span>}
                                        </div>
                                        <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[#f8f9fa] transition-colors">{diet}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Pack Size */}
                {filterOptions?.packSizes?.length > 0 && (
                    <div className="border-t border-white/10 py-4">
                        <button onClick={() => togglePanel('packSizes')} className="flex w-full items-center justify-between text-sm font-medium text-[#f8f9fa] transition">
                            Pack Size
                            {openPanels.packSizes ? <Minus size={16} className="text-[var(--color-text-secondary)]" /> : <Plus size={16} className="text-[var(--color-text-secondary)]" />}
                        </button>
                        {openPanels.packSizes && (
                            <div className="mt-3 flex flex-col gap-2.5">
                                {filterOptions.packSizes.map((size) => (
                                    <label key={size} className="flex items-center gap-3 cursor-pointer group">
                                        <input 
                                            type="checkbox" 
                                            className="hidden"
                                            checked={draftFilters.packSizes?.includes(size) || false}
                                            onChange={() => toggleArrayFilter('packSizes', size)}
                                        />
                                        <div className={`flex h-4 w-4 items-center justify-center rounded border ${draftFilters.packSizes?.includes(size) ? 'bg-[#d4af37] border-[#d4af37]' : 'border-white/20 bg-transparent group-hover:border-white/40'}`}>
                                            {draftFilters.packSizes?.includes(size) && <span className="text-[#080b14] text-[10px]">✓</span>}
                                        </div>
                                        <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[#f8f9fa] transition-colors">{size}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Availability */}
                <div className="border-t border-white/10 py-4">
                    <button onClick={() => togglePanel('availability')} className="flex w-full items-center justify-between text-sm font-medium text-[#f8f9fa] transition">
                        Availability
                        {openPanels.availability ? <Minus size={16} className="text-[var(--color-text-secondary)]" /> : <Plus size={16} className="text-[var(--color-text-secondary)]" />}
                    </button>
                    {openPanels.availability && (
                        <div className="mt-3 flex flex-col gap-2.5">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    className="hidden"
                                    checked={draftFilters.availability}
                                    onChange={() => setDraftFilters(prev => ({ ...prev, availability: !prev.availability }))}
                                />
                                <div className={`flex h-4 w-4 items-center justify-center rounded border ${draftFilters.availability ? 'bg-[#d4af37] border-[#d4af37]' : 'border-white/20 bg-transparent group-hover:border-white/40'}`}>
                                    {draftFilters.availability && <span className="text-[#080b14] text-[10px]">✓</span>}
                                </div>
                                <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[#f8f9fa] transition-colors">In Stock Only</span>
                            </label>
                        </div>
                    )}
                </div>

                {/* Rating */}
                <div className="border-t border-white/10 py-4">
                    <button onClick={() => togglePanel('rating')} className="flex w-full items-center justify-between text-sm font-medium text-[#f8f9fa] transition">
                        Rating
                        {openPanels.rating ? <Minus size={16} className="text-[var(--color-text-secondary)]" /> : <Plus size={16} className="text-[var(--color-text-secondary)]" />}
                    </button>
                    {openPanels.rating && (
                        <div className="mt-3 flex flex-col gap-2.5">
                            {[4, 3, 2, 1].map((num) => (
                                <label key={num} className="flex items-center gap-3 cursor-pointer group">
                                    <input 
                                        type="checkbox" 
                                        className="hidden"
                                        checked={draftFilters.rating === num}
                                        onChange={() => setDraftFilters(prev => ({ ...prev, rating: prev.rating === num ? 0 : num }))}
                                    />
                                    <div className={`flex h-4 w-4 items-center justify-center rounded border ${draftFilters.rating === num ? 'bg-[#d4af37] border-[#d4af37]' : 'border-white/20 bg-transparent group-hover:border-white/40'}`}>
                                        {draftFilters.rating === num && <span className="text-[#080b14] text-[10px]">✓</span>}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} size={14} className={i < num ? "fill-[#d4af37] text-[#d4af37]" : "fill-transparent text-[#4a4636]"} />
                                        ))}
                                        <span className="text-sm text-[var(--color-text-secondary)] ml-1">& Up</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <button 
                    onClick={handleApplyFilters}
                    className="w-full mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#d4af37] py-2.5 text-sm font-bold text-[#080b14] transition hover:bg-[#c39d2e]"
                >
                    Apply Filters
                </button>
            </div>

            {/* Bulk Ad */}
            <div className="rounded-xl border border-[#d4af37]/30 bg-[linear-gradient(135deg,rgba(8,11,20,0.9),rgba(212,175,55,0.1))] p-6 shadow-xl backdrop-blur-md">
                <h3 className="mb-3 font-serif text-xl text-[#f8f9fa]">
                    Looking for Bulk<br />or Export Orders?
                </h3>
                <p className="mb-6 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                    Get custom pricing for bulk orders and private labeling.
                </p>
                <button className="w-full rounded-md bg-[#d4af37] py-2.5 text-sm font-semibold text-[#080b14] transition hover:bg-[#c39d2e]">
                    Bulk Inquiry
                </button>
            </div>
        </aside>
    );
}
