import { useEffect } from "react";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import RewardsMain from "../components/profile/RewardsMain";
import RewardsSidebar from "../components/profile/RewardsSidebar";

export default function Rewards() {
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
                    <div className="flex-1 flex flex-col xl:flex-row gap-6 w-full min-w-0">
                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                            <RewardsMain />
                        </div>

                        {/* Right Sidebar */}
                        <div className="w-full xl:w-[300px] shrink-0 flex flex-col gap-6">
                            <RewardsSidebar />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
