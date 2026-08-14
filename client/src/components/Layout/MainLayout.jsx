import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GlobalBackground from "./GlobalBackground";

import MobileBottomNav from "./MobileBottomNav";

export default function MainLayout() {
    return (
        <GlobalBackground>
            <Navbar />
            <main className="pb-16 md:pb-0"><Outlet /></main>
            <Footer />
            <MobileBottomNav />
        </GlobalBackground>
    );
}
