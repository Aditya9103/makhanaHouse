import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ShopHero() {
    return (
        <section className="relative mx-auto max-w-[1400px] px-6 py-8 lg:px-10 lg:py-12">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0))] px-8 py-16 shadow-2xl backdrop-blur-md sm:px-12 sm:py-20 lg:px-16">
                <div className="relative z-10 max-w-2xl">
                    <h1 className="mb-4 font-serif text-4xl leading-tight text-[#f8f9fa] sm:text-5xl lg:text-6xl">
                        Shop Premium
                        <br />
                        <span className="text-[#d4af37]">Makhana</span>
                    </h1>

                </div>
                {/* Placeholder for the bowl image */}
                <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block opacity-40">
                    <img src="./homehero2.png" alt="" />
                </div>
            </div>
        </section>
    );
}
