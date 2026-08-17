import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "What makes Bihar Mithila Makhana unique?",
        answer: "Our Makhana is ethically sourced directly from the finest wetlands of Mithila, Bihar—the region globally renowned for producing the highest grade of Fox Nuts. We combine traditional harvesting methods with modern processing to ensure every bite is perfectly crunchy, nutrient-dense, and organically pure."
    },
    {
        question: "Is Makhana considered a superfood?",
        answer: "Absolutely! Makhana is a nutritional powerhouse. It is naturally gluten-free, vegan, rich in antioxidants, high in protein and fiber, and has a low glycemic index. It is the perfect guilt-free snack for everyday wellness."
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes, we proudly export our premium Makhana to over 25 countries worldwide. We use specialized, export-grade packaging that preserves freshness, crunch, and nutritional value during transit."
    },
    {
        question: "Can I place bulk or wholesale orders?",
        answer: "We strongly cater to B2B clients, wholesalers, and international distributors. We offer competitive pricing, white-label packaging solutions, and dedicated support for all our bulk export partners."
    },
    {
        question: "What is the shelf life of your products?",
        answer: "Thanks to our advanced moisture-control processing and premium vacuum-sealed packaging, our raw Makhana has a shelf life of up to 12 months when stored in a cool, dry place away from direct sunlight."
    }
];

export default function HomeFAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="relative w-full px-6 py-8 lg:px-10 lg:py-12 overflow-hidden">
            {/* Background Accents */}
            <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#d4af37]/5 blur-[120px]"></div>
            <div className="pointer-events-none absolute right-0 bottom-1/4 h-[400px] w-[400px] translate-x-1/3 rounded-full bg-white/5 blur-[100px]"></div>

            <div className="relative z-10 mx-auto max-w-[1400px]">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20 xl:gap-24 items-start">

                    {/* Left Column: Heading */}
                    <div className="flex flex-col">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/10 text-[#d4af37] shadow-[0_4px_20px_rgba(212,175,55,0.15)]">
                            <HelpCircle size={28} strokeWidth={1.5} />
                        </div>
                        <h2 className="mb-4 font-serif text-3xl text-[#f8f9fa] md:text-4xl lg:text-5xl">
                            Frequently Asked
                            <br />
                            <span className="text-[#d4af37] italic">Questions</span>
                        </h2>
                        <p className="max-w-md text-[15px] leading-relaxed text-[#e4e4e7]/80">
                            Everything you need to know about our premium Makhana, our sourcing process, and how we deliver the taste of Mithila to the world.
                        </p>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="flex flex-col gap-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={index}
                                    className={`group rounded-2xl border transition-all duration-300 ${isOpen
                                            ? "border-[#d4af37]/30 bg-[#d4af37]/[0.03] shadow-[0_8px_32px_rgba(212,175,55,0.05)]"
                                            : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
                                        }`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8 md:py-6"
                                    >
                                        <span className={`font-semibold text-sm md:text-base transition-colors ${isOpen ? "text-[#d4af37]" : "text-[#f8f9fa] group-hover:text-[#d4af37]"}`}>
                                            {faq.question}
                                        </span>
                                        <div className={`flex shrink-0 items-center justify-center h-8 w-8 rounded-full border transition-all duration-300 ${isOpen
                                                ? "border-[#d4af37] bg-[#d4af37] text-[#080b14]"
                                                : "border-white/20 text-[#e4e4e7] group-hover:border-[#d4af37]/50 group-hover:text-[#d4af37]"
                                            }`}>
                                            {isOpen ? <Minus size={16} strokeWidth={2.5} /> : <Plus size={16} />}
                                        </div>
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="px-6 pb-6 pt-0 text-[14px] leading-relaxed text-[#e4e4e7]/70 md:px-8 md:pb-8">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
