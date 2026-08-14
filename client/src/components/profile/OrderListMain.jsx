import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import OrderCard from "./OrderCard";
import { useState } from "react";

export default function OrderListMain() {
    const [activeTab, setActiveTab] = useState("All Orders");

    const tabs = [
        { name: "All Orders", count: 12 },
        { name: "Processing", count: 2 },
        { name: "Shipped", count: 3 },
        { name: "Delivered", count: 6 },
        { name: "Cancelled", count: 1 },
    ];

    const mockOrders = [
        {
            id: "MH100245",
            date: "12 May 2024",
            itemsCount: 3,
            price: "1,249",
            paymentMethod: "UPI",
            status: "Delivered",
            statusDate: "16 May 2024",
            image: "/makhanabowl.png",
            thumbnails: ["/makhanabowl.png", "/makhanabowl.png", "/makhanabowl.png"]
        },
        {
            id: "MH100221",
            date: "02 May 2024",
            itemsCount: 5,
            price: "2,699",
            paymentMethod: "Razorpay",
            status: "Shipped",
            statusDate: "08 May 2024",
            image: "/makhanabowl.png",
            thumbnails: ["/makhanabowl.png", "/makhanabowl.png", "/makhanabowl.png", "/makhanabowl.png", "/makhanabowl.png"]
        },
        {
            id: "MH100198",
            date: "20 Apr 2024",
            itemsCount: 2,
            price: "899",
            paymentMethod: "UPI",
            status: "Delivered",
            statusDate: "23 Apr 2024",
            image: "/makhanabowl.png",
            thumbnails: ["/makhanabowl.png", "/makhanabowl.png"]
        },
        {
            id: "MH100156",
            date: "10 Apr 2024",
            itemsCount: 4,
            price: "1,598",
            paymentMethod: "Credit Card",
            status: "Cancelled",
            statusDate: "11 Apr 2024",
            image: "/makhanabowl.png",
            thumbnails: ["/makhanabowl.png", "/makhanabowl.png", "/makhanabowl.png", "/makhanabowl.png"]
        }
    ];

    return (
        <div className="flex flex-col gap-6">
            
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-serif text-[#f8f9fa] mb-1">My Orders</h2>
                    <p className="text-[13px] text-[var(--color-text-secondary)]">Track, view and manage all your orders</p>
                </div>
                
                {/* Search */}
                <div className="relative w-full sm:w-[280px]">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#e4e4e7]/50" />
                    <input 
                        type="text" 
                        placeholder="Search by Order ID, Product..." 
                        className="w-full bg-[#0a0d14] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-[13px] text-[#f8f9fa] placeholder:text-[#e4e4e7]/40 focus:outline-none focus:border-[#d4af37]/50 transition-colors shadow-sm"
                    />
                </div>
            </div>

            {/* Tabs & Order List Container */}
            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden flex flex-col shadow-sm mt-2">
                
                {/* Tabs */}
                <div className="flex overflow-x-auto no-scrollbar border-b border-white/10 px-2 sm:px-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex items-center gap-1.5 px-4 py-4 text-[13px] font-medium border-b-2 whitespace-nowrap transition-colors -mb-px ${
                                activeTab === tab.name 
                                    ? "border-[#d4af37] text-[#d4af37]" 
                                    : "border-transparent text-[var(--color-text-secondary)] hover:text-[#f8f9fa]"
                            }`}
                        >
                            {tab.name} <span className="opacity-70">({tab.count})</span>
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                <div className="flex flex-col divide-y divide-white/10">
                    {mockOrders.map((order, idx) => (
                        <OrderCard key={idx} order={order} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-t border-white/10 bg-white/[0.01] gap-4">
                    <p className="text-[12px] text-[var(--color-text-secondary)] text-center sm:text-left">
                        Showing 1 to 4 of 12 orders
                    </p>
                    <div className="flex items-center justify-center sm:justify-end gap-2">
                        <button className="h-8 w-8 rounded flex items-center justify-center border border-white/10 bg-[#0a0d14] text-[var(--color-text-secondary)] hover:text-[#f8f9fa] hover:border-white/20 transition-all">
                            <ChevronLeft size={14} />
                        </button>
                        <button className="h-8 w-8 rounded flex items-center justify-center border border-[#d4af37]/50 bg-[#d4af37] text-[#080b14] font-medium text-[13px]">
                            1
                        </button>
                        <button className="h-8 w-8 rounded flex items-center justify-center border border-white/10 bg-[#0a0d14] text-[var(--color-text-secondary)] hover:text-[#f8f9fa] hover:border-white/20 transition-all text-[13px]">
                            2
                        </button>
                        <button className="h-8 w-8 rounded flex items-center justify-center border border-white/10 bg-[#0a0d14] text-[var(--color-text-secondary)] hover:text-[#f8f9fa] hover:border-white/20 transition-all text-[13px]">
                            3
                        </button>
                        <span className="text-[var(--color-text-secondary)] text-[12px] mx-1">...</span>
                        <button className="h-8 w-8 rounded flex items-center justify-center border border-white/10 bg-[#0a0d14] text-[var(--color-text-secondary)] hover:text-[#f8f9fa] hover:border-white/20 transition-all">
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
