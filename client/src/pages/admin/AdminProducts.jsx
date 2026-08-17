import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, PackageSearch, Loader2 } from "lucide-react";
import { 
    useGetProductsQuery, 
    useDeleteProductMutation 
} from "../../store/api/productApiSlice";

export default function AdminProducts() {
    const { data: products, isLoading, error, refetch } = useGetProductsQuery({});
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id).unwrap();
                alert("Product deleted successfully");
                refetch();
            } catch (err) {
                alert(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="flex flex-col gap-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif text-[#f8f9fa] mb-1">Products Management</h1>
                    <p className="text-sm text-[#e4e4e7]/70">View, edit, and manage your store inventory.</p>
                </div>
                <Link
                    to="/admin/products/new"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-cyan-400 text-[#080b14] text-[13px] font-medium hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.2)] shrink-0"
                >
                    <Plus size={16} />
                    Add Product
                </Link>
            </div>

            {/* Table Container */}
            <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md overflow-hidden shadow-sm">
                
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 size={32} className="animate-spin text-cyan-400 mb-4" />
                        <p className="text-sm text-[#e4e4e7]">Loading products...</p>
                    </div>
                ) : error ? (
                    <div className="p-6 text-center text-red-400 bg-red-500/10">
                        {error?.data?.message || "Failed to load products"}
                    </div>
                ) : products?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <PackageSearch size={48} className="text-white/20 mb-4" />
                        <h3 className="text-lg font-serif text-[#f8f9fa] mb-1">No products found</h3>
                        <p className="text-sm text-[#e4e4e7]/70">You haven't added any products yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-[#e4e4e7]">
                            <thead className="bg-white/5 text-[11px] uppercase tracking-wider text-cyan-400 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Product Name</th>
                                    <th className="px-6 py-4 font-medium">Category</th>
                                    <th className="px-6 py-4 font-medium">Base Price</th>
                                    <th className="px-6 py-4 font-medium">Variations</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {products.map((product) => (
                                    <tr key={product._id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 shrink-0 rounded-md border border-white/10 overflow-hidden bg-[#0a0d14]">
                                                    <img 
                                                        src={product.images[0] || '/placeholder.png'} 
                                                        alt={product.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="font-medium text-[#f8f9fa]">{product.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{product.category}</td>
                                        <td className="px-6 py-4 font-medium text-cyan-400">
                                            ₹{product.variations?.length > 0 ? product.variations[0].price : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center justify-center px-2 py-1 text-[11px] font-medium rounded-full bg-white/10 text-white">
                                                {product.variations?.length || 0}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.variations?.some(v => v.countInStock > 0) ? (
                                                <span className="inline-flex items-center gap-1.5 text-green-400 text-[12px] font-medium">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                                    In Stock
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-red-400 text-[12px] font-medium">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                                    Out of Stock
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link 
                                                    to={`/admin/products/${product._id}/edit`}
                                                    className="p-1.5 rounded bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400 hover:text-[#080b14] transition-colors"
                                                    title="Edit Product"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button 
                                                    onClick={() => deleteHandler(product._id)}
                                                    disabled={isDeleting}
                                                    className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                                                    title="Delete Product"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
}
