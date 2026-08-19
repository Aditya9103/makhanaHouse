import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../store/api/orderApiSlice";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function Invoice() {
    const { id: orderId } = useParams();
    const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

    useEffect(() => {
        if (order && !isLoading && !error) {
            // Wait slightly for images to load, then trigger print
            const timer = setTimeout(() => {
                window.print();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [order, isLoading, error]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-white">
                <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-white text-red-500">
                Failed to load invoice.
            </div>
        );
    }

    const formatCurrency = (amount) => `₹${amount.toLocaleString()}`;
    const invoiceDate = new Date(order.createdAt).toLocaleDateString();
    
    return (
        <div className="min-h-screen bg-gray-100 py-10 print:py-0 print:bg-white">
            <div className="mx-auto max-w-[21cm] bg-white p-[2cm] shadow-lg print:shadow-none print:p-0 print:m-0">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-12 border-b border-gray-200 pb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <h1 className="text-3xl font-serif text-gray-900 tracking-wide">MAKHANA <span className="text-gray-500 font-sans tracking-widest text-lg">HOUSE</span></h1>
                        </div>
                        <p className="text-sm text-gray-500">Premium Makhana Direct from Mithila</p>
                        <div className="mt-4 text-sm text-gray-600">
                            <p>Makhana House Export Ltd.</p>
                            <p>Darbhanga, Bihar, India - 846004</p>
                            <p>Email: info@makhanahouse.in</p>
                            <p>Phone: +91 98010 17333</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className="text-4xl font-bold text-gray-200 uppercase tracking-wider mb-2">Invoice</h2>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p><span className="font-semibold">Invoice No:</span> #{order._id.substring(0, 8).toUpperCase()}</p>
                            <p><span className="font-semibold">Date:</span> {invoiceDate}</p>
                            <p><span className="font-semibold">Order ID:</span> {order.orderId || order._id}</p>
                            <p><span className="font-semibold">Status:</span> {order.isPaid ? 'PAID' : 'UNPAID'}</p>
                        </div>
                    </div>
                </div>

                {/* Addresses */}
                <div className="flex justify-between mb-12 gap-8">
                    <div className="flex-1">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-200 pb-2">Billed To</h3>
                        <div className="text-sm text-gray-700 space-y-1">
                            <p className="font-medium text-gray-900">{order.user?.name || "Customer"}</p>
                            <p>{order.user?.email}</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-200 pb-2">Shipped To</h3>
                        <div className="text-sm text-gray-700 space-y-1">
                            <p className="font-medium text-gray-900">{order.shippingAddress?.name}</p>
                            <p>{order.shippingAddress?.line1}</p>
                            {order.shippingAddress?.line2 && <p>{order.shippingAddress?.line2}</p>}
                            <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}</p>
                            <p>{order.shippingAddress?.country}</p>
                            <p className="mt-2 text-gray-500">Phone: {order.shippingAddress?.phone}</p>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <div className="mb-12">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-gray-900">
                                <th className="py-3 px-2 text-sm font-bold text-gray-900 uppercase tracking-wider w-16">Image</th>
                                <th className="py-3 px-2 text-sm font-bold text-gray-900 uppercase tracking-wider">Item Description</th>
                                <th className="py-3 px-2 text-sm font-bold text-gray-900 uppercase tracking-wider text-center">Qty</th>
                                <th className="py-3 px-2 text-sm font-bold text-gray-900 uppercase tracking-wider text-right">Price</th>
                                <th className="py-3 px-2 text-sm font-bold text-gray-900 uppercase tracking-wider text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.orderItems.map((item, idx) => (
                                <tr key={idx} className="border-b border-gray-200">
                                    <td className="py-4 px-2">
                                        <div className="h-12 w-12 rounded border border-gray-200 p-1 bg-white">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                    </td>
                                    <td className="py-4 px-2">
                                        <p className="font-medium text-gray-900">{item.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                                    </td>
                                    <td className="py-4 px-2 text-center text-gray-700">{item.quantity}</td>
                                    <td className="py-4 px-2 text-right text-gray-700">{formatCurrency(item.price)}</td>
                                    <td className="py-4 px-2 text-right text-gray-900 font-medium">{formatCurrency(item.price * item.quantity)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end mb-12">
                    <div className="w-1/2 md:w-1/3">
                        <div className="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-100">
                            <span>Subtotal</span>
                            <span className="font-medium text-gray-900">{formatCurrency(order.itemsPrice)}</span>
                        </div>
                        <div className="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-100">
                            <span>Shipping</span>
                            <span className="font-medium text-gray-900">{formatCurrency(order.shippingPrice)}</span>
                        </div>
                        <div className="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-900">
                            <span>Tax (Included)</span>
                            <span className="font-medium text-gray-900">{formatCurrency(order.taxPrice)}</span>
                        </div>
                        {order.discountAmount > 0 && (
                            <div className="flex justify-between py-2 text-sm text-green-600 border-b border-gray-900">
                                <span>Discount {order.promoCode ? `(${order.promoCode})` : ''}</span>
                                <span className="font-medium">-{formatCurrency(order.discountAmount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between py-4 text-lg font-bold text-gray-900">
                            <span>Total</span>
                            <span>{formatCurrency(order.totalPrice)}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500 pt-12 border-t border-gray-200">
                    <p className="mb-2 font-serif italic">Thank you for choosing Makhana House!</p>
                    <p>This is a computer generated invoice and does not require a physical signature.</p>
                </div>
                
                {/* Print Hint (Hidden when printing) */}
                <div className="mt-8 text-center print:hidden">
                    <button 
                        onClick={() => window.print()} 
                        className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                        Print / Save as PDF
                    </button>
                    <p className="text-xs text-gray-400 mt-2">Press Ctrl+P (or Cmd+P) to print manually</p>
                </div>
            </div>
        </div>
    );
}
