import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GlobalBackground from "./GlobalBackground";

export default function MainLayout() {
    return (
        <GlobalBackground>
            <Navbar />
            <main><Outlet /></main>
            <Footer />
        </GlobalBackground>
    );
}
