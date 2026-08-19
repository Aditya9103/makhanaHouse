import { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function TermsConditions() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full pb-20 pt-8">
            {/* Breadcrumb */}
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 mb-8">
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] font-medium">
                    <Link to="/" className="hover:text-[#d4af37] transition-colors">Home</Link>
                    <ChevronRight size={14} className="text-white/30" />
                    <span className="text-[#f8f9fa]">Terms & Conditions</span>
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
                <h1 className="text-3xl md:text-5xl font-serif text-[#f8f9fa] mb-8">Terms & Conditions</h1>

                <div className="prose prose-invert prose-p:text-[var(--color-text-secondary)] prose-headings:text-[#f8f9fa] prose-headings:font-serif max-w-none">
                    <p className="mb-6">
                        Welcome to MakhanaHouse. By accessing and using our website, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>

                    <h2 className="text-2xl mt-10 mb-4">1. Use of the Site</h2>
                    <p className="mb-4">
                        You may use our site and services only for lawful purposes and in accordance with these Terms. You agree not to use our site in any way that violates any applicable local or international law or regulation.
                    </p>

                    <h2 className="text-2xl mt-10 mb-4">2. Products and Pricing</h2>
                    <p className="mb-6">
                        We strive to display our products and their colors as accurately as possible. However, the actual colors you see will depend on your monitor. All prices are subject to change without notice. We reserve the right to modify or discontinue any product without notice.
                    </p>

                    <h2 className="text-2xl mt-10 mb-4">3. Shipping and Delivery</h2>
                    <p className="mb-6">
                        Shipping times and costs are estimates and may vary based on your location and external factors. We are not responsible for delays caused by shipping carriers or customs clearance processes.
                    </p>

                    <h2 className="text-2xl mt-10 mb-4">4. Intellectual Property</h2>
                    <p className="mb-6">
                        All content on this site, including but not limited to text, graphics, logos, images, and software, is the property of MakhanaHouse and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                    </p>

                    <h2 className="text-2xl mt-10 mb-4">5. Limitation of Liability</h2>
                    <p className="mb-6">
                        MakhanaHouse shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our site or products.
                    </p>

                    <h2 className="text-2xl mt-10 mb-4">6. Changes to Terms</h2>
                    <p className="mb-6">
                        We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Your continued use of the site following any changes constitutes your acceptance of the new Terms.
                    </p>

                    <p className="text-sm mt-10 text-white/40">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
