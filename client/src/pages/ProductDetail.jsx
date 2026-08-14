import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getProductBySlug } from "../data/productDetailData";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductTrustBanner from "../components/product/ProductTrustBanner";
import ProductSpecs from "../components/product/ProductSpecs";
import ProductReviews from "../components/product/ProductReviews";
import RelatedProducts from "../components/product/RelatedProducts";

export default function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const data = getProductBySlug(slug);
        setProduct(data);
    }, [slug]);

    if (!product) return <div className="min-h-screen pt-32 text-center text-white">Loading...</div>;

    return (
        <div className="w-full pb-20">
            {/* Breadcrumb */}
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-10 pb-6 lg:pb-8">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium">
                    <Link to="/" className="hover:text-[#d4af37] transition-colors">Home</Link>
                    <ChevronRight size={14} className="text-white/30" />
                    <Link to="/shop" className="hover:text-[#d4af37] transition-colors">Shop</Link>
                    <ChevronRight size={14} className="text-white/30" />
                    <span className="text-[#f8f9fa] truncate max-w-[150px] sm:max-w-none">{product.name}</span>
                </div>
            </div>

            {/* Top Hero Section */}
            <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 mb-8 lg:mb-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    {/* Left: Gallery */}
                    <div className="w-full lg:w-1/2">
                        <ProductGallery images={product.images} />
                    </div>

                    {/* Right: Info */}
                    <div className="w-full lg:w-1/2">
                        <ProductInfo product={product} />
                    </div>
                </div>
            </section>

            {/* Trust Banner */}
            <ProductTrustBanner />

            {/* Product Specs Grid */}
            <ProductSpecs product={product} />

            {/* Customer Reviews */}
            <ProductReviews reviews={product.reviewsDetails} />

            {/* Related Products */}
            <RelatedProducts />
        </div>
    );
}
