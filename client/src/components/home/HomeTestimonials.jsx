import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Aarti Sharma",
        role: "Nutritionist, Mumbai",
        content: "Makhana House has completely changed my view on healthy snacking. Their fox nuts are perfectly roasted and incredibly fresh. I recommend them to all my clients looking for a guilt-free, protein-rich snack.",
        rating: 5
    },
    {
        name: "David Chen",
        role: "Importer, Singapore",
        content: "We've been sourcing Makhana in bulk for our retail stores from Makhana House for over a year. The quality consistency, packaging, and export standard are unmatched. Truly a premium product from Bihar.",
        rating: 5
    },
    {
        name: "Priya Patel",
        role: "Fitness Enthusiast, London",
        content: "Finding high-quality, authentic Indian superfoods abroad is tough. The crunch, the flavor, and the fact that it's 100% natural makes this my go-to post-workout snack. Absolutely love it!",
        rating: 5
    },
    {
        name: "Priya Patel",
        role: "Fitness Enthusiast, London",
        content: "Finding high-quality, authentic Indian superfoods abroad is tough. The crunch, the flavor, and the fact that it's 100% natural makes this my go-to post-workout snack. Absolutely love it!",
        rating: 5
    }
];

export default function HomeTestimonials() {
    return (
        <section className="relative w-full  px-6 py-8 lg:px-10 lg:py-12 overflow-hidden border-t border-white/5">
            {/* Background Glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#d4af37]/5 blur-[120px]"></div>

            <div className="relative z-10 mx-auto max-w-[1400px]">
                {/* Header */}
                <div className="mb-16 flex flex-col items-center text-center">
                    <h2 className="mb-4 font-serif text-3xl text-[#f8f9fa] md:text-4xl lg:text-5xl">
                        Loved by <span className="text-[#d4af37] italic">Customers</span>
                        <br />
                        Worldwide
                    </h2>
                    <p className="max-w-2xl text-[15px] leading-relaxed text-[#e4e4e7]/80">
                        Don't just take our word for it. Hear what nutritionists, global partners, and healthy snackers have to say about the finest Makhana from Mithila.
                    </p>
                </div>

                {/* Testimonial Cards */}
                <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:border-[#d4af37]/30 hover:bg-white/[0.04] hover:shadow-[0_8px_32px_rgba(212,175,55,0.05)] w-full shrink-0 snap-start md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                        >
                            <Quote className="absolute right-6 top-6 text-white/5 transition-colors duration-300 group-hover:text-[#d4af37]/10" size={40} />

                            <div className="relative z-10">
                                <div className="mb-6 flex gap-1">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-[#d4af37] text-[#d4af37]" />
                                    ))}
                                </div>
                                <p className="mb-8 text-[15px] leading-relaxed text-[#e4e4e7]/90 italic">
                                    "{testimonial.content}"
                                </p>
                            </div>

                            <div className="relative z-10 mt-auto">
                                <div className="h-px w-12 bg-[#d4af37]/50 mb-4"></div>
                                <h4 className="font-semibold text-[#f8f9fa]">{testimonial.name}</h4>
                                <p className="text-sm text-[#d4af37]">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
