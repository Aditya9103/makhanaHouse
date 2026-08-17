import { Clock, Users, ShieldCheck, Upload, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateExportInquiryMutation } from "../../store/api/exportApiSlice";
import { useUploadFileMutation } from "../../store/api/uploadApiSlice";
import { toast } from "react-toastify";

export default function ExportInquiryForm() {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const [privateLabel, setPrivateLabel] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        targetCountry: '',
        productInterest: '',
        estimatedQuantity: '',
        additionalRequirements: ''
    });
    
    const [createInquiry, { isLoading }] = useCreateExportInquiryMutation();
    const [uploadFile] = useUploadFileMutation();
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.fullName || !formData.companyName || !formData.email || !formData.phone || !formData.targetCountry || !formData.productInterest || !formData.estimatedQuantity) {
            toast.error("Please fill all required fields");
            return;
        }

        try {
            let specSheetUrl = "";
            if (file) {
                setIsUploading(true);
                const uploadData = new FormData();
                uploadData.append("file", file);
                uploadData.append("folder", "inquiries");
                const uploadRes = await uploadFile(uploadData).unwrap();
                specSheetUrl = uploadRes.url;
                setIsUploading(false);
            }

            await createInquiry({
                ...formData,
                privateLabel,
                specSheetUrl
            }).unwrap();
            
            toast.success("Inquiry submitted successfully! We will contact you soon.");
            setFormData({
                fullName: '', companyName: '', email: '', phone: '', targetCountry: '', productInterest: '', estimatedQuantity: '', additionalRequirements: ''
            });
            setPrivateLabel(false);
            setFile(null);
            
            if (userInfo) {
                navigate('/profile/inquiries');
            }
        } catch (err) {
            toast.error(err?.data?.message || "Failed to submit inquiry");
            setIsUploading(false);
        }
    };

    return (
        <section id="inquiry" className="scroll-mt-20 py-8 lg:py-12 relative overflow-hidden">
            <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
                
                {/* Main Glass Container */}
                <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-10 lg:p-14 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col lg:flex-row gap-12 lg:gap-20 overflow-hidden">
                    
                    {/* Left Column: Information */}
                    <div className="w-full lg:w-5/12 flex flex-col justify-between relative z-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                                <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
                                <span className="text-[11px] font-medium text-[#d4af37] uppercase tracking-widest">Global Reach</span>
                            </div>
                            
                            <h2 className="mb-5 font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-white">
                                Let's Build a <span className="text-[#d4af37] italic">Partnership</span>
                            </h2>
                            <p className="mb-12 text-[14px] sm:text-[15px] leading-relaxed text-[#e4e4e7]">
                                Tell us about your bulk requirement. Our export specialists will analyze your needs and provide a tailored quotation within 24 hours.
                            </p>

                            <div className="flex flex-col gap-8 mb-12">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center shrink-0">
                                        <Clock size={18} className="text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <h4 className="text-[14px] font-medium text-white mb-1">Quick Turnaround</h4>
                                        <p className="text-[12px] text-[#e4e4e7] leading-relaxed">Fast processing and detailed quotations within 1 business day.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center shrink-0">
                                        <Users size={18} className="text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <h4 className="text-[14px] font-medium text-white mb-1">Dedicated Account Manager</h4>
                                        <p className="text-[12px] text-[#e4e4e7] leading-relaxed">A single point of contact for end-to-step assistance.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center shrink-0">
                                        <ShieldCheck size={18} className="text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <h4 className="text-[14px] font-medium text-white mb-1">Secure & Confidential</h4>
                                        <p className="text-[12px] text-[#e4e4e7] leading-relaxed">Your business data and private labels are strictly protected.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Premium Form */}
                    <div className="w-full lg:w-7/12 relative z-10 lg:pt-2">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
                                
                                {/* Personal Info */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-medium text-[#e4e4e7] uppercase tracking-wider">Full Name <span className="text-[#d4af37]">*</span></label>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-[13px] text-white placeholder-white/40 hover:bg-white/[0.08] focus:bg-white/[0.1] focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/50 transition-all outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-medium text-[#e4e4e7] uppercase tracking-wider">Company Name <span className="text-[#d4af37]">*</span></label>
                                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Acme Corp LLC" className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-[13px] text-white placeholder-white/40 hover:bg-white/[0.08] focus:bg-white/[0.1] focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/50 transition-all outline-none" />
                                </div>

                                {/* Contact Details */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-medium text-[#e4e4e7] uppercase tracking-wider">Email Address <span className="text-[#d4af37]">*</span></label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-[13px] text-white placeholder-white/40 hover:bg-white/[0.08] focus:bg-white/[0.1] focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/50 transition-all outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-medium text-[#e4e4e7] uppercase tracking-wider">Phone Number <span className="text-[#d4af37]">*</span></label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-[13px] text-white placeholder-white/40 hover:bg-white/[0.08] focus:bg-white/[0.1] focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/50 transition-all outline-none" />
                                </div>

                                {/* Location & Product */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-medium text-[#e4e4e7] uppercase tracking-wider">Target Country <span className="text-[#d4af37]">*</span></label>
                                    <div className="relative">
                                        <select name="targetCountry" value={formData.targetCountry} onChange={handleChange} className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-[13px] text-white hover:bg-white/[0.08] focus:bg-white/[0.1] focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/50 transition-all outline-none appearance-none cursor-pointer">
                                            <option value="" className="bg-[#0a0d14] text-white/50">Select destination</option>
                                            <option value="us" className="bg-[#0a0d14]">United States</option>
                                            <option value="uk" className="bg-[#0a0d14]">United Kingdom</option>
                                            <option value="ae" className="bg-[#0a0d14]">UAE</option>
                                            <option value="in" className="bg-[#0a0d14]">India</option>
                                            <option value="other" className="bg-[#0a0d14]">Other</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e4e4e7]"><path d="m6 9 6 6 6-6"/></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-medium text-[#e4e4e7] uppercase tracking-wider">Product Interest <span className="text-[#d4af37]">*</span></label>
                                    <div className="relative">
                                        <select name="productInterest" value={formData.productInterest} onChange={handleChange} className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-[13px] text-white hover:bg-white/[0.08] focus:bg-white/[0.1] focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/50 transition-all outline-none appearance-none cursor-pointer">
                                            <option value="" className="bg-[#0a0d14] text-white/50">Select category</option>
                                            <option value="raw" className="bg-[#0a0d14]">Raw Fox Nuts (Phool Makhana)</option>
                                            <option value="roasted" className="bg-[#0a0d14]">Roasted & Flavored Makhana</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e4e4e7]"><path d="m6 9 6 6 6-6"/></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Order specifics */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-medium text-[#e4e4e7] uppercase tracking-wider">Est. Quantity <span className="text-[#d4af37]">*</span></label>
                                    <input type="text" name="estimatedQuantity" value={formData.estimatedQuantity} onChange={handleChange} placeholder="e.g. 1000 KG" className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-[13px] text-white placeholder-white/40 hover:bg-white/[0.08] focus:bg-white/[0.1] focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/50 transition-all outline-none" />
                                </div>
                                
                                {/* Private Label Pills */}
                                <div className="space-y-2 flex flex-col">
                                    <label className="text-[11px] font-medium text-[#e4e4e7] uppercase tracking-wider">Private Labeling?</label>
                                    <div className="flex bg-white/[0.05] border border-white/10 rounded-lg p-1 h-[46px]">
                                        <button 
                                            type="button"
                                            onClick={() => setPrivateLabel(true)}
                                            className={`flex-1 flex items-center justify-center gap-2 rounded-md text-[12px] font-medium transition-all ${privateLabel ? 'bg-[#d4af37] text-[#080b14] shadow-sm' : 'text-[#e4e4e7] hover:text-white'}`}
                                        >
                                            {privateLabel && <CheckCircle2 size={14} />} Yes
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => setPrivateLabel(false)}
                                            className={`flex-1 flex items-center justify-center gap-2 rounded-md text-[12px] font-medium transition-all ${!privateLabel ? 'bg-white/10 text-white shadow-sm' : 'text-[#e4e4e7] hover:text-white'}`}
                                        >
                                            {!privateLabel && <CheckCircle2 size={14} />} No
                                        </button>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-2 sm:col-span-2">
                                    <label className="text-[11px] font-medium text-[#e4e4e7] uppercase tracking-wider">Additional Requirements</label>
                                    <textarea 
                                        rows={3}
                                        name="additionalRequirements"
                                        value={formData.additionalRequirements}
                                        onChange={handleChange}
                                        placeholder="Tell us about specific packaging needs, certifications required, or destination port details..." 
                                        className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-[13px] text-white placeholder-white/40 hover:bg-white/[0.08] focus:bg-white/[0.1] focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/50 transition-all outline-none resize-none"
                                    ></textarea>
                                </div>

                                {/* Upload & Submit */}
                                <div className="sm:col-span-2 pt-2 border-t border-white/10 mt-2 flex flex-col sm:flex-row gap-5">
                                    
                                    {/* Upload box */}
                                    <div className="flex-1">
                                        <div className="group relative flex items-center justify-center gap-3 w-full h-[54px] rounded-lg border border-dashed border-white/20 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#d4af37]/40 transition-all cursor-pointer overflow-hidden">
                                            {isUploading ? <Loader2 size={18} className="text-[#d4af37] animate-spin" /> : <Upload size={18} className="text-[#d4af37] group-hover:-translate-y-1 transition-transform duration-300" />}
                                            <div className="flex flex-col">
                                                <span className="text-[12px] font-medium text-[#e4e4e7]">{file ? file.name : "Upload Spec Sheet"}</span>
                                                <span className="text-[10px] text-white/40">PDF, DOC up to 10MB</span>
                                            </div>
                                            <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button type="submit" disabled={isLoading || isUploading} className="group relative inline-flex h-[54px] items-center justify-center gap-2 rounded-lg bg-[#d4af37] px-8 text-[13px] font-bold text-[#080b14] transition-all hover:bg-[#f3e5ab] w-full sm:w-[220px] shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] overflow-hidden disabled:opacity-70">
                                        <span className="relative z-10 flex items-center gap-2">
                                            {isLoading ? "Submitting..." : "Submit Inquiry"}
                                            {!isLoading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                                        </span>
                                        {/* Shimmer effect */}
                                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                    </button>
                                </div>

                            </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
