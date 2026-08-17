import { ShoppingBag, CreditCard, Heart, Gift, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../../store/api/orderApiSlice";
import { useGetMyExportInquiriesQuery } from "../../store/api/exportApiSlice";

export default function ProfileStats() {
    const { userInfo } = useSelector(state => state.auth);
    const { data: orders = [] } = useGetMyOrdersQuery();
    const { data: inquiries = [] } = useGetMyExportInquiriesQuery();

    const totalSpent = orders.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0);
    const wishlistCount = userInfo?.wishlist?.length || 0;

    const stats = [
        { label: "Total Orders", value: orders.length.toString(), subtext: "View all orders →", icon: ShoppingBag, link: "/profile/orders" },
        { label: "Total Spent", value: `₹${totalSpent.toLocaleString('en-IN')}`, subtext: "All time", icon: CreditCard, link: null },
        { label: "Wishlist Items", value: wishlistCount.toString(), subtext: "View wishlist →", icon: Heart, link: "/profile/wishlist" },
        { label: "Export Inquiries", value: inquiries.length.toString(), subtext: "View inquiries →", icon: FileText, link: "/profile/inquiries" },
    ];

    return (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
            {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                    <div key={i} className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-5 lg:p-6 flex flex-col gap-3 hover:border-[#d4af37]/40 transition-colors group cursor-pointer relative">
                        {stat.link && <Link to={stat.link} className="absolute inset-0 z-10" />}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-lg border border-[#d4af37]/30 bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                                <Icon size={18} className="text-[#d4af37]" />
                            </div>
                            <h3 className="text-[13px] text-[var(--color-text-secondary)] font-medium">{stat.label}</h3>
                        </div>
                        <div>
                            <p className="text-2xl sm:text-[26px] font-serif text-[#f8f9fa] leading-tight mb-1">{stat.value}</p>
                            <p className={`text-[11px] font-medium transition-transform group-hover:translate-x-1 ${stat.link ? 'text-[#d4af37]' : 'text-[var(--color-text-secondary)]'}`}>{stat.subtext}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
