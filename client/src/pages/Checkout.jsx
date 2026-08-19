import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CheckoutStepper from "../components/checkout/CheckoutStepper";
import CheckoutAddress from "../components/checkout/CheckoutAddress";
import CheckoutShipping from "../components/checkout/CheckoutShipping";
import CheckoutPayment from "../components/checkout/CheckoutPayment";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import CheckoutTrust from "../components/checkout/CheckoutTrust";
import { useGetStoreConfigQuery } from "../store/api/configApiSlice";
import { Loader2 } from "lucide-react";

export default function Checkout() {
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [selectedShipping, setSelectedShipping] = useState("standard");
    
    const { data: config, isLoading: isConfigLoading } = useGetStoreConfigQuery();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isConfigLoading) {
        return (
            <div className="w-full min-h-screen bg-[#080b14] flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-[#d4af37]" />
            </div>
        );
    }

    return (
        <div className="w-full pb-10 bg-[#080b14] min-h-screen">
            {/* Header / Title */}
            <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-10 pb-6 lg:pb-8">
                
                {/* Title & Stepper row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-white/5 pb-6">
                    <div>
                        <h1 className="font-serif text-3xl sm:text-4xl text-[#f8f9fa] mb-2">
                            Checkout
                        </h1>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                            Complete your order by providing your details
                        </p>
                    </div>
                    
                    <div className="w-full md:w-auto">
                        <CheckoutStepper />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Left Column: Flow */}
                    <div className="w-full lg:w-[65%] xl:w-[70%] flex flex-col gap-6">
                        <CheckoutAddress 
                            selectedAddressId={selectedAddressId} 
                            setSelectedAddressId={setSelectedAddressId} 
                        />
                        <CheckoutShipping 
                            selectedShipping={selectedShipping}
                            setSelectedShipping={setSelectedShipping}
                            config={config}
                        />
                        <CheckoutPayment 
                            paymentMethod={paymentMethod} 
                            setPaymentMethod={setPaymentMethod} 
                        />
                    </div>

                    {/* Right Column: Summary & Trust */}
                    <div className="w-full lg:w-[35%] xl:w-[30%] flex flex-col gap-6">
                        <CheckoutSummary 
                            selectedAddressId={selectedAddressId} 
                            paymentMethod={paymentMethod} 
                            selectedShipping={selectedShipping}
                            config={config}
                        />
                        <CheckoutTrust />
                    </div>
                </div>
            </section>

            {/* Bottom Footer Trust Banner */}
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#0a0d18] border border-white/5 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="text-[#d4af37]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </div>
                        <div>
                            <p className="text-[13px] font-medium text-white">Free Shipping</p>
                            <p className="text-[11px] text-[#e4e4e7]">On orders above ₹999</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-[#d4af37]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <div>
                            <p className="text-[13px] font-medium text-white">Secure Payment</p>
                            <p className="text-[11px] text-[#e4e4e7]">100% secure checkout</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-[#d4af37]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                        </div>
                        <div>
                            <p className="text-[13px] font-medium text-white">Easy Returns</p>
                            <p className="text-[11px] text-[#e4e4e7]">7 days return policy</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-[#d4af37]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                        </div>
                        <div>
                            <p className="text-[13px] font-medium text-white">Export Quality</p>
                            <p className="text-[11px] text-[#e4e4e7]">Packed with care</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
