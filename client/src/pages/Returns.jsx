export default function Returns() {
    return (
        <div className="min-h-screen bg-[#080b14] pt-24 pb-16">
            <div className="mx-auto max-w-4xl px-6 lg:px-10">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-serif text-[#f8f9fa] mb-4">Returns & Refunds</h1>
                    <p className="text-[#e4e4e7] max-w-2xl mx-auto">Our commitment to quality and customer satisfaction.</p>
                </div>
                
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-medium text-[#d4af37] mb-2">Return Policy</h3>
                        <p className="text-sm text-[#e4e4e7] leading-relaxed mb-4">
                            Due to the perishable nature of our products, we generally do not accept returns. However, if you receive a damaged or incorrect item, please contact our support team within 48 hours of delivery.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-medium text-[#d4af37] mb-2">Refund Process</h3>
                        <p className="text-sm text-[#e4e4e7] leading-relaxed">
                            Approved refunds will be processed to the original method of payment within 5-7 business days. Shipping costs are non-refundable unless the error was on our part.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-medium text-[#d4af37] mb-2">Export Returns</h3>
                        <p className="text-sm text-[#e4e4e7] leading-relaxed">
                            Export and wholesale orders are subject to the terms outlined in the specific purchase agreement and INCOTERMS. Quality disputes must be raised within 7 days of customs clearance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
