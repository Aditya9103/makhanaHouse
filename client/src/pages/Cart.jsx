import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useCart } from "../hooks/useCart";
import CartItemList from "../components/cart/CartItemList";
import CartSummary from "../components/cart/CartSummary";
import CartTrustSidebar from "../components/cart/CartTrustSidebar";
import CartFeaturesFooter from "../components/cart/CartFeaturesFooter";
import RelatedProducts from "../components/product/RelatedProducts";

export default function Cart() {
    const { cartItems } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full pb-10">
            {/* Header / Title */}
            <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-10 pb-6 lg:pb-8">
                <div className="mb-8">
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#f8f9fa] mb-2">
                        Your Cart ({cartItems.length})
                    </h1>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                        Review your items and proceed to secure checkout
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Left Column: Items & Related */}
                    <div className="w-full lg:w-[65%] xl:w-[70%] flex flex-col gap-10">
                        <CartItemList />
                        
                        {/* Related Products */}
                        <div>
                            <RelatedProducts className="w-full" compact={true} />
                        </div>
                    </div>

                    {/* Right Column: Summary & Trust */}
                    <div className="w-full lg:w-[35%] xl:w-[30%] flex flex-col gap-6">
                        <CartSummary />
                        <CartTrustSidebar />
                    </div>
                </div>
            </section>

            {/* Features Footer */}
            <CartFeaturesFooter />
        </div>
    );
}
