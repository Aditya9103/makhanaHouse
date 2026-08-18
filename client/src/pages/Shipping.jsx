export default function Shipping() {
    return (
        <div className="min-h-screen bg-[#080b14] pt-24 pb-16">
            <div className="mx-auto max-w-4xl px-6 lg:px-10">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-serif text-[#f8f9fa] mb-4">Shipping Policy</h1>
                    <p className="text-[#e4e4e7] max-w-2xl mx-auto">Information regarding domestic and international shipments.</p>
                </div>
                
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-medium text-[#d4af37] mb-2">Domestic Shipping</h3>
                        <p className="text-sm text-[#e4e4e7] leading-relaxed mb-4">
                            We offer standard and express shipping options within India. Orders are typically processed within 1-2 business days.
                        </p>
                        <ul className="list-disc list-inside text-sm text-[#e4e4e7] space-y-1">
                            <li>Standard Shipping: 3-5 Business Days</li>
                            <li>Express Shipping: 1-2 Business Days</li>
                            <li>Free shipping on orders over ₹1000</li>
                        </ul>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-medium text-[#d4af37] mb-2">International Export</h3>
                        <p className="text-sm text-[#e4e4e7] leading-relaxed">
                            For international bulk orders, shipping timelines and costs vary based on the destination country, order volume, and freight method (Air/Sea). Our export team will provide a comprehensive timeline during the quotation process.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
