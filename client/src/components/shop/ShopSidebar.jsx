import { useState } from "react";
import { Plus, Filter } from "lucide-react";

const categories = [
    { label: "All Products", count: 36 },
    { label: "Premium Makhana", count: 8 },
    { label: "Roasted Makhana", count: 7 },
    { label: "Flavored Makhana", count: 8 },
    { label: "Makhana Value Added", count: 5 },
];

export default function ShopSidebar({ appliedFilters, setAppliedFilters }) {
    const [draftFilters, setDraftFilters] = useState(appliedFilters);

    const handleApplyFilters = () => {
        setAppliedFilters(draftFilters);
    };

    const handleClearFilters = () => {
        const defaultFilters = { category: "All Products", minPrice: 0, maxPrice: 5000 };
        setDraftFilters(defaultFilters);
        setAppliedFilters(defaultFilters);
    };

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

            {/* Categories */}
            <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="mb-6 font-serif text-lg text-[#d4af37]">Categories</h3>
                <ul className="flex flex-col gap-4">
                    {categories.map((cat, idx) => {
                        const isActive = draftFilters.category === cat.label;
                        return (
                        <li key={idx} className="flex items-center justify-between">
                            <button 
                                onClick={() => setDraftFilters({ ...draftFilters, category: cat.label })}
                                className={`flex items-center gap-3 text-sm transition ${isActive ? 'text-[#f8f9fa] font-medium' : 'text-[var(--color-text-secondary)] hover:text-[#f8f9fa]'}`}
                            >
                                <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${isActive ? 'border-[#d4af37]' : 'border-white/20'}`}>
                                    {isActive && <div className="h-2 w-2 rounded-full bg-[#d4af37]" />}
                                </div>
                                {cat.label}
                            </button>
                        </li>
                        );
                    })}
                </ul>
            </div>

            {/* Filters */}
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
                        onChange={(e) => setDraftFilters({ ...draftFilters, maxPrice: e.target.value })}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                    />
                    <div className="mt-2 flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
                        <span>₹0</span>
                        <span>₹5000</span>
                    </div>
                </div>

                {/* Accordions */}
                {["Type", "Flavor", "Dietary", "Pack Size", "Availability", "Rating"].map((filter) => (
                    <button key={filter} className="flex w-full items-center justify-between border-t border-white/10 py-4 text-sm text-[var(--color-text-secondary)] transition hover:text-[#f8f9fa]">
                        {filter}
                        <Plus size={16} />
                    </button>
                ))}

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
