import { useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { TrendingUp, Users, Package, FileText } from "lucide-react";

export default function AdminDashboard() {
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const stats = [
        { label: "Total Revenue", value: "₹45,200", trend: "+12.5%", icon: TrendingUp },
        { label: "Active Users", value: "128", trend: "+5.2%", icon: Users },
        { label: "Total Products", value: "24", trend: "0%", icon: Package },
        { label: "Pending Inquiries", value: "7", trend: "+2", icon: FileText },
    ];

    return (
        <div className="flex-1 flex flex-col gap-6 min-w-0">
                        {/* Header */}
                        <div className="rounded-xl border border-cyan-400/20 bg-white/[0.02] backdrop-blur-md p-6 sm:p-8 relative overflow-hidden shadow-sm flex items-center justify-between">
                            <div className="absolute top-0 right-0 w-[40%] h-[200%] bg-cyan-400/5 blur-[80px] rounded-full pointer-events-none"></div>
                            <div className="relative z-10">
                                <h1 className="text-2xl sm:text-3xl font-serif text-[#f8f9fa] mb-2">
                                    Welcome back, {userInfo?.name?.split(' ')[0]}
                                </h1>
                                <p className="text-sm text-[#e4e4e7]">
                                    Here's what's happening with your store today.
                                </p>
                            </div>
                            <div className="hidden sm:flex h-16 w-16 rounded-full border-2 border-cyan-400/50 items-center justify-center bg-[#0a0d14] relative z-10 text-cyan-400 font-serif text-2xl">
                                {userInfo?.name?.charAt(0)}
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((stat, i) => {
                                const Icon = stat.icon;
                                const isPositive = stat.trend.startsWith('+');
                                return (
                                    <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-5 flex flex-col gap-3 relative overflow-hidden">
                                        <div className="flex items-center justify-between">
                                            <div className="h-10 w-10 rounded-lg border border-cyan-400/20 bg-cyan-400/10 flex items-center justify-center shrink-0">
                                                <Icon size={18} className="text-cyan-400" />
                                            </div>
                                            <span className={`text-[12px] font-medium px-2 py-1 rounded-md ${isPositive ? 'bg-green-500/10 text-green-400' : 'bg-white/10 text-[#e4e4e7]'}`}>
                                                {stat.trend}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-[13px] text-[var(--color-text-secondary)] font-medium mb-1">{stat.label}</h3>
                                            <p className="text-2xl font-serif text-[#f8f9fa]">{stat.value}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Main Panels */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
                            {/* Recent Activity */}
                            <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6">
                                <h3 className="text-lg font-serif text-[#f8f9fa] mb-4">Recent Inquiries</h3>
                                <div className="flex flex-col items-center justify-center h-[200px] text-center border border-dashed border-white/10 rounded-lg bg-white/[0.01]">
                                    <FileText size={32} className="text-white/20 mb-3" />
                                    <p className="text-sm text-[var(--color-text-secondary)]">No recent inquiries to display.</p>
                                </div>
                            </div>
                            
                            {/* Quick Actions */}
                            <div className="rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6">
                                <h3 className="text-lg font-serif text-[#f8f9fa] mb-4">System Status</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-sm text-[#e4e4e7]">Database</span>
                                        </div>
                                        <span className="text-xs text-green-500 font-medium">Online</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            <span className="text-sm text-[#e4e4e7]">API Services</span>
                                        </div>
                                        <span className="text-xs text-green-500 font-medium">Online</span>
                                    </div>
                                </div>
                            </div>
                        </div>

        </div>
    );
}
