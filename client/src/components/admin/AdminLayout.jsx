import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
    return (
        <div className="w-full pb-20  bg-[#080b14] min-h-[100dvh]">
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6">
                <div className="flex flex-col md:flex-row gap-5 lg:gap-6 min-h-[70vh]">

                    {/* Left Sidebar - Sticky for all admin pages */}
                    <div className="w-full md:w-[260px] shrink-0 md:sticky md:top-6 md:h-[calc(100vh-3rem)] z-10">
                        <AdminSidebar />
                    </div>

                    {/* Right Content - Dynamic based on the route */}
                    <div className="flex-1 flex flex-col min-w-0">
                        <Outlet />
                    </div>

                </div>
            </div>
        </div>
    );
}
