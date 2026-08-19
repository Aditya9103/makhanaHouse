import { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
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
                    <span className="text-[#f8f9fa]">Privacy Policy</span>
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
                <h1 className="text-3xl md:text-5xl font-serif text-[#f8f9fa] mb-8">Privacy Policy</h1>

                <div className="prose prose-invert prose-p:text-[var(--color-text-secondary)] prose-headings:text-[#f8f9fa] prose-headings:font-serif max-w-none">
                    <p className="mb-6">
                        At MakhanaHouse, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or make a purchase.
                    </p>

                    <h2 className="text-2xl mt-10 mb-4">1. Information We Collect</h2>
                    <p className="mb-4">
                        We collect information you provide directly to us, such as when you create an account, place an order, subscribe to our newsletter, or contact our customer support. This may include your name, email address, phone number, shipping address, and payment information.
                    </p>

                    <h2 className="text-2xl mt-10 mb-4">2. How We Use Your Information</h2>
                    <p className="mb-4">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-[var(--color-text-secondary)]">
                        <li>Process and fulfill your orders</li>
                        <li>Communicate with you about your orders, products, and promotional offers</li>
                        <li>Improve our website, services, and customer experience</li>
                        <li>Prevent fraud and ensure the security of our platform</li>
                    </ul>

                    <h2 className="text-2xl mt-10 mb-4">3. Data Protection</h2>
                    <p className="mb-6">
                        We implement appropriate technical and organizational measures to maintain the safety of your personal information. We do not sell or trade your personal information to outside parties. Your payment information is encrypted and processed securely through our trusted payment gateways.
                    </p>

                    <h2 className="text-2xl mt-10 mb-4">4. Cookies</h2>
                    <p className="mb-6">
                        We use cookies to enhance your browsing experience, remember your preferences, and understand how you interact with our website. You can choose to disable cookies through your browser settings, though this may affect some functionality of our site.
                    </p>

                    <h2 className="text-2xl mt-10 mb-4">5. Contact Us</h2>
                    <p className="mb-6">
                        If you have any questions about this Privacy Policy, please contact us at info@makhanahouse.com.
                    </p>

                    <p className="text-sm mt-10 text-white/40">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
