import AboutHero from "../components/about/AboutHero";
import AboutHeritage from "../components/about/AboutHeritage";
import AboutStats from "../components/about/AboutStats";
import AboutPromise from "../components/about/AboutPromise";
import AboutProcess from "../components/about/AboutProcess";
import AboutCTA from "../components/about/AboutCTA";

export default function About() {
    return (
        <div className="w-full">
            <AboutHero />
            <AboutHeritage />
            <AboutStats />
            <AboutPromise />
            <AboutProcess />
            <AboutCTA />
        </div>
    );
}
