import { useGetDocumentsQuery, useAddDocumentMutation, useDeleteDocumentMutation } from "../../store/api/documentApiSlice";
import { useUploadFileMutation } from "../../store/api/uploadApiSlice";
import { Loader2, Plus, Trash2, FileText, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AdminDocuments() {
    const { data: documents, isLoading, error } = useGetDocumentsQuery();
    const [addDocument, { isLoading: isAdding }] = useAddDocumentMutation();
    const [deleteDocument, { isLoading: isDeleting }] = useDeleteDocumentMutation();
    const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        type: "brochure",
        url: ""
    });

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const res = await uploadFile(file).unwrap();
            setFormData({ ...formData, url: res.url });
            toast.success("File uploaded successfully");
        } catch (err) {
            toast.error(err?.data?.message || "Failed to upload file");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.url) {
            return toast.error("Name and file are required");
        }
        try {
            await addDocument(formData).unwrap();
            toast.success("Document added");
            setFormData({ name: "", type: "brochure", url: "" });
            setIsFormOpen(false);
        } catch (err) {
            toast.error(err?.data?.message || "Failed to add document");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this document?")) {
            try {
                await deleteDocument(id).unwrap();
                toast.success("Document deleted");
            } catch (err) {
                toast.error(err?.data?.message || "Failed to delete document");
            }
        }
    };

    if (isLoading) return <div className="p-8 text-cyan-400 flex items-center gap-3"><Loader2 className="animate-spin" /> Loading Documents...</div>;
    if (error) return <div className="p-8 text-red-500">Error loading documents</div>;

    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif text-[#f8f9fa] mb-1">Document Management</h1>
                    <p className="text-sm text-[#e4e4e7]/70">Manage brochures, spec sheets, and other downloads</p>
                </div>
                <button 
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-[#d4af37] text-[#080b14] rounded-md font-medium text-sm hover:bg-[#c39d2e] transition-colors"
                >
                    <Plus size={16} />
                    {isFormOpen ? "Close Form" : "Add New Document"}
                </button>
            </div>

            {isFormOpen && (
                <div className="bg-[#080b14]/80 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-sm">
                    <h2 className="text-lg font-serif text-[#d4af37] mb-4">Add New Document</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
                        <div>
                            <label className="block text-xs text-[#e4e4e7] mb-2 font-medium">Document Name</label>
                            <input 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-sm text-[#f8f9fa] focus:outline-none focus:border-[#d4af37]"
                                placeholder="e.g. 2024 Product Brochure"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-[#e4e4e7] mb-2 font-medium">Document Type</label>
                            <select 
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full bg-[#080b14] border border-white/10 rounded-md px-4 py-2 text-sm text-[#f8f9fa] focus:outline-none focus:border-[#d4af37]"
                            >
                                <option value="brochure">Brochure</option>
                                <option value="spec_sheet">Spec Sheet</option>
                                <option value="invoice">Invoice</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-[#e4e4e7] mb-2 font-medium">File Upload (PDF)</label>
                            <div className="flex items-center gap-3">
                                <label className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-md text-sm cursor-pointer hover:bg-white/10 transition">
                                    <Upload size={16} />
                                    {isUploading ? "Uploading..." : "Choose File"}
                                    <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf" />
                                </label>
                                {formData.url && <span className="text-xs text-green-400">File attached!</span>}
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            disabled={isAdding || isUploading}
                            className="mt-2 w-full px-4 py-2 bg-[#d4af37] text-[#080b14] rounded-md text-sm font-medium hover:bg-[#c39d2e] transition disabled:opacity-50"
                        >
                            {isAdding ? "Saving..." : "Save Document"}
                        </button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {!documents || documents.length === 0 ? (
                    <div className="col-span-full p-8 text-center text-white/50 text-sm border border-white/10 rounded-xl bg-[#080b14]/80">
                        No documents found. Click "Add New Document" to upload one.
                    </div>
                ) : (
                    documents.map((doc) => (
                        <div key={doc._id} className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-6 flex flex-col gap-4 shadow-sm hover:border-[#d4af37]/30 transition-colors">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-[#f8f9fa]">{doc.name}</h3>
                                        <span className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold bg-[#d4af37]/10 px-2 py-0.5 rounded-sm inline-block mt-1">
                                            {doc.type.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDelete(doc._id)}
                                    disabled={isDeleting}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-1.5 rounded-md transition"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="text-xs text-white/50 flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                                <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                                <a href={doc.url} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                                    View File
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
