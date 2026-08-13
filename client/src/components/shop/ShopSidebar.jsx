import { Plus } from "lucide-react";

const categories = [
    { label: "All Products", count: 36, active: true },
    { label: "Premium Makhana", count: 8 },
    { label: "Roasted Makhana", count: 7 },
    { label: "Flavored Makhana", count: 8 },
    { label: "Gift Packs", count: 5 },
    { label: "Bulk / Export", count: 8 },
];

export default function ShopSidebar() {
    return (
        <aside className="w-full shrink-0 lg:w-[280px]">
            {/* Categories */}
            <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="mb-6 font-serif text-lg text-[#d4af37]">Categories</h3>
                <ul className="flex flex-col gap-4">
                    {categories.map((cat, idx) => (
                        <li key={idx} className="flex items-center justify-between">
                            <button className={`flex items-center gap-3 text-sm transition ${cat.active ? 'text-[#f8f9fa] font-medium' : 'text-[var(--color-text-secondary)] hover:text-[#f8f9fa]'}`}>
                                <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${cat.active ? 'border-[#d4af37]' : 'border-white/20'}`}>
                                    {cat.active && <div className="h-2 w-2 rounded-full bg-[#d4af37]" />}
                                </div>
                                {cat.label}
                            </button>
                            <span className={`text-xs ${cat.active ? 'text-[#d4af37]' : 'text-[var(--color-text-secondary)]'}`}>{cat.count}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Filters */}
            <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="font-serif text-lg text-[#d4af37]">Filter By</h3>
                    <button className="text-xs text-[var(--color-text-secondary)] hover:text-[#f8f9fa] underline">Clear All</button>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                    <p className="mb-4 text-sm font-medium text-[#f8f9fa]">Price Range</p>
                    <div className="h-1 w-full rounded-full bg-white/10">
                        <div className="h-full w-full rounded-full bg-[#d4af37]" />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
                        <span>₹0</span>
                        <span>₹500</span>
                    </div>
                </div>

                {/* Accordions */}
                {["Type", "Flavor", "Dietary", "Pack Size", "Availability", "Rating"].map((filter) => (
                    <button key={filter} className="flex w-full items-center justify-between border-t border-white/10 py-4 text-sm text-[var(--color-text-secondary)] transition hover:text-[#f8f9fa]">
                        {filter}
                        <Plus size={16} />
                    </button>
                ))}
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
