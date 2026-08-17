import HeroHome from "../components/home/HeroHome";
import ShopHome from "../components/home/ShopHome";
import ExportHome from "../components/home/ExportHome";
import WhyChooseHome from "../components/home/WhyChooseHome";
import StatsHome from "../components/home/StatsHome";
import HomeTestimonials from "../components/home/HomeTestimonials";
import HomeFAQ from "../components/home/HomeFAQ";

// Imported sections from other pages to enrich homepage content
import AboutPromise from "../components/about/AboutPromise";
import AboutProcess from "../components/about/AboutProcess";
import ExportCertifications from "../components/export/ExportCertifications";

export default function Home() {
    return (
        <>
            <HeroHome />
            <ShopHome />
            <AboutPromise />
            <WhyChooseHome />
            <AboutProcess />
            <ExportHome />
            <ExportCertifications />
            <StatsHome />
            <HomeTestimonials />
            <HomeFAQ />
        </>
    );
}