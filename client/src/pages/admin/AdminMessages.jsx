import { useState, useMemo } from "react";
import { useGetContactMessagesQuery, useUpdateContactMessageStatusMutation, useDeleteContactMessageMutation } from "../../store/api/contactApiSlice";
import { Loader2, Search, Filter, Eye, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminMessages() {
    const { data: messages, isLoading, error } = useGetContactMessagesQuery();
    const [updateStatus, { isLoading: isUpdating }] = useUpdateContactMessageStatusMutation();
    const [deleteMessage, { isLoading: isDeleting }] = useDeleteContactMessageMutation();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [viewingMessage, setViewingMessage] = useState(null);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateStatus({ id, status: newStatus }).unwrap();
            toast.success("Message status updated");
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            try {
                await deleteMessage(id).unwrap();
                toast.success("Message deleted");
                if (viewingMessage && viewingMessage._id === id) {
                    setViewingMessage(null);
                }
            } catch (err) {
                toast.error(err?.data?.message || "Failed to delete message");
            }
        }
    };

    const filteredMessages = useMemo(() => {
        if (!messages) return [];

        return messages.filter(msg => {
            const matchesSearch =
                msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                msg.subject.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === "All" || msg.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [messages, searchTerm, statusFilter]);

    if (isLoading) return <div className="p-8 text-cyan-400 flex items-center gap-3"><Loader2 className="animate-spin" /> Loading Messages...</div>;
    if (error) return <div className="p-8 text-red-500">Error loading messages: {error?.data?.message || 'Server error'}</div>;

    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif text-[#f8f9fa] mb-1">Contact Messages</h1>
                    <p className="text-sm text-[#e4e4e7]/70">Manage messages sent via the contact form</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center bg-[#080b14]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-sm">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                    <input
                        type="text"
                        placeholder="Search by name, email, or subject..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-md text-sm text-white focus:outline-none focus:border-cyan-400/50"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                    <Filter size={16} className="text-white/40 hidden sm:block shrink-0" />
                    {['All', 'Unread', 'Read', 'Replied'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 ${statusFilter === status
                                    ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30'
                                    : 'bg-white/5 text-white/60 border border-white/5 hover:bg-white/10'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/[0.02]">
                                <th className="p-4 text-xs font-semibold text-[#f8f9fa] uppercase tracking-wider">Date</th>
                                <th className="p-4 text-xs font-semibold text-[#f8f9fa] uppercase tracking-wider">Sender</th>
                                <th className="p-4 text-xs font-semibold text-[#f8f9fa] uppercase tracking-wider">Subject</th>
                                <th className="p-4 text-xs font-semibold text-[#f8f9fa] uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-[#f8f9fa] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {filteredMessages.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-white/50 text-sm">
                                        No messages found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredMessages.map((msg) => (
                                    <tr key={msg._id} className={`hover:bg-white/5 transition-colors ${msg.status === 'Unread' ? 'bg-white/[0.03]' : ''}`}>
                                        <td className="p-4 text-sm text-[#e4e4e7] whitespace-nowrap">
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                            <div className="text-xs text-white/40">{new Date(msg.createdAt).toLocaleTimeString()}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm font-medium text-white">{msg.name}</div>
                                            <div className="text-xs text-white/60">{msg.email}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm text-white line-clamp-1">{msg.subject}</div>
                                            <div className="text-xs text-white/60 line-clamp-1">{msg.message}</div>
                                        </td>
                                        <td className="p-4">
                                            <select
                                                value={msg.status}
                                                onChange={(e) => handleStatusChange(msg._id, e.target.value)}
                                                disabled={isUpdating}
                                                className={`text-xs font-medium px-2 py-1 rounded-full outline-none appearance-none cursor-pointer border ${msg.status === 'Unread' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                        msg.status === 'Read' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                            'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                    }`}
                                            >
                                                <option value="Unread" className="bg-[#080b14] text-white">Unread</option>
                                                <option value="Read" className="bg-[#080b14] text-white">Read</option>
                                                <option value="Replied" className="bg-[#080b14] text-white">Replied</option>
                                            </select>
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <button
                                                onClick={() => setViewingMessage(msg)}
                                                className="p-1.5 rounded-md bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20 transition-colors inline-flex items-center"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(msg._id)}
                                                disabled={isDeleting}
                                                className="p-1.5 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors inline-flex items-center disabled:opacity-50"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Details Modal */}
            {viewingMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#080b14] border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h2 className="text-lg font-serif text-[#f8f9fa]">Message Details</h2>
                            <button
                                onClick={() => setViewingMessage(null)}
                                className="p-2 rounded-full hover:bg-white/10 text-white/60 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-6">
                            <div className="grid grid-cols-2 gap-6 p-4 rounded-lg bg-white/5 border border-white/10">
                                <div>
                                    <div className="text-xs text-white/50 mb-1">From</div>
                                    <div className="text-sm text-white font-medium">{viewingMessage.name}</div>
                                    <div className="text-xs text-cyan-400 mt-1">{viewingMessage.email}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-white/50 mb-1">Company</div>
                                    <div className="text-sm text-white">{viewingMessage.company}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-white/50 mb-1">Phone</div>
                                    <div className="text-sm text-white">{viewingMessage.phone}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-white/50 mb-1">Date</div>
                                    <div className="text-sm text-white">{new Date(viewingMessage.createdAt).toLocaleString()}</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-xs text-white/50">Subject</div>
                                <div className="text-sm font-medium text-white p-3 rounded-lg bg-white/5 border border-white/10">
                                    {viewingMessage.subject}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-xs text-white/50">Message</div>
                                <div className="text-sm text-white/80 p-4 rounded-lg bg-white/5 border border-white/10 whitespace-pre-wrap leading-relaxed min-h-[120px]">
                                    {viewingMessage.message}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10 bg-[#080b14]">
                            <button
                                onClick={() => {
                                    if (viewingMessage.status === 'Unread') {
                                        handleStatusChange(viewingMessage._id, 'Read');
                                    }
                                    setViewingMessage(null);
                                }}
                                className="px-5 py-2 text-sm font-medium rounded-md border border-white/10 text-white hover:bg-white/5 transition-colors"
                            >
                                Close
                            </button>
                            <a
                                href={`mailto:${viewingMessage.email}?subject=Re: ${viewingMessage.subject}`}
                                onClick={() => handleStatusChange(viewingMessage._id, 'Replied')}
                                className="px-5 py-2 text-sm font-medium rounded-md bg-cyan-400 text-[#080b14] hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                            >
                                Reply via Email
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
