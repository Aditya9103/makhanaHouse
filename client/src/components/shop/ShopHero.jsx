import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ShopHero() {
    return (
        <section className="relative mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-12">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0))] px-6 py-12 shadow-2xl backdrop-blur-md sm:px-12 sm:py-20 lg:px-16 flex flex-col md:flex-row items-center justify-between min-h-[300px]">
                <div className="relative z-10 w-full text-center md:text-left md:max-w-xl">
                    <h1 className="mb-2 font-serif text-4xl leading-tight text-[#f8f9fa] sm:text-5xl lg:text-6xl">
                        Shop Premium
                        <br />
                        <span className="text-[#d4af37]">Makhana</span>
                    </h1>
                </div>
                
                {/* Bowl image */}
                <div className="relative z-0 mt-8 md:mt-0 md:absolute md:right-4 lg:right-10 md:top-1/2 md:-translate-y-1/2 w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] opacity-90 transition-transform duration-500 hover:scale-105">
                    <img src="/makhanabowl.png" alt="Premium Makhana" className="w-full h-auto object-contain drop-shadow-2xl" />
                </div>
            </div>
        </section>
    );
}
