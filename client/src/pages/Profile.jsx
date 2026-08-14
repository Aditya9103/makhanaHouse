import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import RecentOrders from "../components/profile/RecentOrders";
import QuickActions from "../components/profile/QuickActions";
import SavedAddresses from "../components/profile/SavedAddresses";
import ProfilePreferences from "../components/profile/ProfilePreferences";
import ProfileHelp from "../components/profile/ProfileHelp";
import { useEffect } from "react";

export default function Profile() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full pb-20 ">
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6">
                <div className="flex flex-col md:flex-row gap-5 lg:gap-6">

                    {/* Left Sidebar */}
                    <div className="w-full md:w-[230px] shrink-0">
                        <ProfileSidebar />
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 flex flex-col gap-6">
                        <ProfileHeader />

                        <ProfileStats />

                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="w-full lg:w-[60%] xl:w-[65%]">
                                <RecentOrders />
                            </div>
                            <div className="w-full lg:w-[40%] xl:w-[35%]">
                                <QuickActions />
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="w-full lg:w-[60%] xl:w-[65%]">
                                <SavedAddresses />
                            </div>
                            <div className="w-full lg:w-[40%] xl:w-[35%] flex flex-col gap-6">
                                <ProfilePreferences />
                                <ProfileHelp />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
