import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ExportInquiryForm from "../components/export/ExportInquiryForm";

export default function NewExportInquiry() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-[calc(100vh-80px)] relative flex flex-col pb-20">

            <div className="mx-auto max-w-[1400px] px-6 lg:px-10 w-full mb-4 relative z-10">
                <Link
                    to="/profile/inquiries"
                    className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-text-secondary)] hover:text-[#d4af37] transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </Link>
            </div>

            {/* Re-use the existing ExportInquiryForm component but let it naturally sit inside the page */}
            <div className="relative z-10 w-full flex-1 flex flex-col justify-center -mt-8">
                <ExportInquiryForm />
            </div>

        </div>
    );
}
