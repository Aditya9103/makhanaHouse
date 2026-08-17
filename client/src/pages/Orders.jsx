import { useEffect } from "react";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import OrderListMain from "../components/profile/OrderListMain";

export default function Orders() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full pb-20">
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6">
                <div className="flex flex-col md:flex-row gap-5 lg:gap-6">
                    
                    {/* Left Sidebar */}
                    <div className="w-full md:w-[230px] shrink-0">
                        <ProfileSidebar />
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 w-full min-w-0">
                        <OrderListMain />
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
