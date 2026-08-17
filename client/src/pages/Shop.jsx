import { useState } from "react";
import ShopHero from "../components/shop/ShopHero";
import ShopFeatures from "../components/shop/ShopFeatures";
import ShopSidebar from "../components/shop/ShopSidebar";
import ShopProductGrid from "../components/shop/ShopProductGrid";
import ShopStats from "../components/shop/ShopStats";

export default function Shop() {
    const [appliedFilters, setAppliedFilters] = useState({
        category: "All Products",
        minPrice: 0,
        maxPrice: 5000,
    });

    return (
        <div className="w-full">
            {/* Hero Section */}
            <ShopHero />

            {/* Feature Strip */}
            <ShopFeatures />

            {/* Main Shop Layout */}
            <section className="mx-auto max-w-[1400px] px-6 pb-20 lg:px-10">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
                    {/* Sidebar */}
                    <ShopSidebar appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters} />

                    {/* Main Products Area */}
                    <ShopProductGrid appliedFilters={appliedFilters} />
                </div>
            </section>

            {/* Bottom Stats Banner */}
            <ShopStats />
        </div>
    );
}
