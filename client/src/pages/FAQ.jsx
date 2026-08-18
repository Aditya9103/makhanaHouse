import { Link } from "react-router-dom";

export default function FAQ() {
    return (
        <div className="min-h-screen bg-[#080b14] pt-24 pb-16">
            <div className="mx-auto max-w-4xl px-6 lg:px-10">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-serif text-[#f8f9fa] mb-4">Frequently Asked Questions</h1>
                    <p className="text-[#e4e4e7] max-w-2xl mx-auto">Find answers to common questions about our products, shipping, and more.</p>
                </div>
                
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-medium text-[#d4af37] mb-2">What is Makhana?</h3>
                        <p className="text-sm text-[#e4e4e7] leading-relaxed">
                            Makhana, also known as Fox Nuts or Gorgon Nuts, are the seeds of the Euryale ferox plant. They are highly nutritious, gluten-free, and a rich source of protein and antioxidants.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-medium text-[#d4af37] mb-2">Do you ship internationally?</h3>
                        <p className="text-sm text-[#e4e4e7] leading-relaxed">
                            Yes, we export our premium Makhana globally. Please visit our <Link to="/export" className="text-cyan-400 hover:underline">Export Page</Link> for wholesale inquiries or international shipping rates.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-medium text-[#d4af37] mb-2">How should I store Makhana?</h3>
                        <p className="text-sm text-[#e4e4e7] leading-relaxed">
                            Store Makhana in an airtight container in a cool, dry place away from direct sunlight to maintain its crunchiness.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
