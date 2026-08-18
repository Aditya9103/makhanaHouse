import { useGetSubscribersQuery, useUpdateSubscriberStatusMutation, useDeleteSubscriberMutation } from "../../store/api/newsletterApiSlice";
import { Loader2, Search, Trash2, Mail } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "react-toastify";

export default function AdminNewsletter() {
    const { data: subscribers, isLoading, error } = useGetSubscribersQuery();
    const [updateStatus, { isLoading: isUpdating }] = useUpdateSubscriberStatusMutation();
    const [deleteSubscriber, { isLoading: isDeleting }] = useDeleteSubscriberMutation();
    
    const [searchTerm, setSearchTerm] = useState("");

    const handleStatusChange = async (id, currentStatus) => {
        const newStatus = currentStatus === 'subscribed' ? 'unsubscribed' : 'subscribed';
        try {
            await updateStatus({ id, status: newStatus }).unwrap();
            toast.success("Subscriber status updated");
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this subscriber?")) {
            try {
                await deleteSubscriber(id).unwrap();
                toast.success("Subscriber deleted");
            } catch (err) {
                toast.error(err?.data?.message || "Failed to delete subscriber");
            }
        }
    };

    const filteredSubscribers = useMemo(() => {
        if (!subscribers) return [];
        return subscribers.filter(sub => sub.email.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [subscribers, searchTerm]);

    if (isLoading) return <div className="p-8 text-cyan-400 flex items-center gap-3"><Loader2 className="animate-spin" /> Loading Subscribers...</div>;
    if (error) return <div className="p-8 text-red-500">Error loading subscribers</div>;

    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif text-[#f8f9fa] mb-1">Newsletter Subscribers</h1>
                    <p className="text-sm text-[#e4e4e7]/70">Manage email subscriptions ({filteredSubscribers.length} total)</p>
                </div>
                <button 
                    onClick={() => {
                        const csvContent = "data:text/csv;charset=utf-8," 
                            + "Email,Status,Date Subscribed\n"
                            + filteredSubscribers.map(e => `${e.email},${e.status},${new Date(e.createdAt).toLocaleDateString()}`).join("\n");
                        const encodedUri = encodeURI(csvContent);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", "newsletter_subscribers.csv");
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-400 text-[#080b14] rounded-md font-medium text-sm hover:bg-cyan-500 transition-colors"
                >
                    <Mail size={16} />
                    Export CSV
                </button>
            </div>

            <div className="flex items-center bg-[#080b14]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-sm">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search by email..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-md text-sm text-white focus:outline-none focus:border-cyan-400/50"
                    />
                </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/[0.02]">
                                <th className="p-4 text-xs font-semibold text-[#f8f9fa] uppercase tracking-wider">Email</th>
                                <th className="p-4 text-xs font-semibold text-[#f8f9fa] uppercase tracking-wider">Date Subscribed</th>
                                <th className="p-4 text-xs font-semibold text-[#f8f9fa] uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-[#f8f9fa] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {filteredSubscribers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-white/50 text-sm">
                                        No subscribers found.
                                    </td>
                                </tr>
                            ) : (
                                filteredSubscribers.map((sub) => (
                                    <tr key={sub._id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-sm text-white font-medium">
                                            {sub.email}
                                        </td>
                                        <td className="p-4 text-sm text-white/60">
                                            {new Date(sub.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <button 
                                                onClick={() => handleStatusChange(sub._id, sub.status)}
                                                disabled={isUpdating}
                                                className={`text-xs font-medium px-2.5 py-1 rounded-full outline-none border transition-colors ${
                                                    sub.status === 'subscribed' 
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' 
                                                    : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                                                }`}
                                            >
                                                {sub.status === 'subscribed' ? 'Subscribed' : 'Unsubscribed'}
                                            </button>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button 
                                                onClick={() => handleDelete(sub._id)}
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
        </div>
    );
}
