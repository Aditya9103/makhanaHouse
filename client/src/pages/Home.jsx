import HeroHome from "../components/home/HeroHome";
import ShopHome from "../components/home/ShopHome";
import ExportHome from "../components/home/ExportHome";
import WhyChooseHome from "../components/home/WhyChooseHome";
import StatsHome from "../components/home/StatsHome";

export default function Home() {
    return (
        <>
            <HeroHome />
            <ShopHome />
            <ExportHome />
            <WhyChooseHome />
            <StatsHome />
        </>
    );
}