import { LayoutDashboard, Package, ShoppingCart, ShoppingBag, Gift, BarChart3, Users, FileText, Settings, LogOut, ChevronRight, Star, Globe, Mail, FolderOpen } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

export default function AdminSidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/admin/login');
    };

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
        { name: "Products", icon: Package, path: "/admin/products" },
        { path: "/admin/orders", icon: ShoppingBag, name: "Orders" },
        { path: "/admin/offers", icon: Gift, name: "Rewards & Offers" },
        { name: "Export Inquiries", icon: Globe, path: "/admin/export-inquiries" },
        { name: "Messages", icon: FileText, path: "/admin/messages" },
        { name: "Newsletter", icon: Mail, path: "/admin/newsletter" },
        { name: "Documents", icon: FolderOpen, path: "/admin/documents" },
        { name: "Reviews", icon: Star, path: "/admin/reviews" },
        { name: "Settings", icon: Settings, path: "/admin/settings" },
    ];

    return (
        <div className="flex flex-col gap-6 h-full">
            <div className="rounded-xl border border-[#d4af37]/20 bg-white/[0.02] backdrop-blur-xl md:overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.2)] h-full flex flex-col">
                <div className="hidden md:block p-6 pb-4 border-b border-[#d4af37]/10">
                    <h3 className="text-[11px] font-bold text-[#d4af37] tracking-wider uppercase">Admin Portal</h3>
                </div>

                <nav className="flex flex-row md:flex-col py-0 md:py-2 overflow-x-auto md:overflow-x-visible no-scrollbar snap-x snap-mandatory flex-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.includes(item.path);

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1.5 md:gap-3.5 p-2 md:px-6 md:py-4 text-[10px] md:text-[14px] font-medium transition-all duration-200 shrink-0 md:shrink-auto w-1/4 md:w-auto snap-start border-transparent md:border-l-[3px] group ${isActive
                                    ? "md:border-[#d4af37] text-[#080b14] md:text-[#d4af37] bg-[#d4af37] md:bg-[#d4af37]/[0.05]"
                                    : "border-transparent text-[#e4e4e7] hover:text-[#f8f9fa] bg-transparent hover:bg-white/[0.05]"
                                    }`}
                            >
                                <Icon size={18} className={`md:w-[20px] md:h-[20px] ${isActive ? "text-[#080b14] md:text-[#d4af37]" : "text-[#e4e4e7]/60 group-hover:text-[#d4af37]"}`} />
                                <span className="whitespace-nowrap truncate w-full text-center md:text-left">{item.name}</span>
                                {isActive && <ChevronRight size={16} className="hidden md:block ml-auto text-[#d4af37]" />}
                            </Link>
                        );
                    })}

                    <div className="hidden md:block mt-auto mb-2 mx-6 h-[1px] bg-white/5"></div>

                    <button
                        onClick={logoutHandler}
                        className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-1.5 md:gap-3.5 p-2 md:px-6 md:py-4 text-[10px] md:text-[14px] font-medium text-[#e4e4e7] hover:bg-white/[0.02] hover:text-red-400 transition-all duration-200 shrink-0 md:shrink-auto w-1/4 md:w-auto snap-start border-transparent md:border-l-[3px] bg-transparent group"
                    >
                        <LogOut size={18} className="md:w-[20px] md:h-[20px] text-[#e4e4e7]/60 group-hover:text-red-400" />
                        <span className="whitespace-nowrap truncate w-full text-center md:text-left">Logout</span>
                    </button>
                </nav>
            </div>
        </div>
    );
}
