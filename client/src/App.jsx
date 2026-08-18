import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Export from './pages/Export'
import NewExportInquiry from './pages/NewExportInquiry'
import MainLayout from './components/Layout/MainLayout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Quality from './pages/Quality'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'

import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/Routing/PrivateRoute'
import AdminRoute from './components/Routing/AdminRoute'

import AdminLogin from './pages/admin/AdminLogin'
import AdminRegister from './pages/admin/AdminRegister'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminSettings from './pages/admin/AdminSettings'
import AdminProducts from './pages/admin/AdminProducts'
import AdminProductEdit from './pages/admin/AdminProductEdit'
import AdminOrders from './pages/admin/AdminOrders'
import AdminOrderDetails from './pages/admin/AdminOrderDetails'
import AdminReviews from './pages/admin/AdminReviews'
import AdminInquiries from './pages/admin/AdminInquiries'
import AdminOffers from './pages/admin/AdminOffers'
import AdminMessages from './pages/admin/AdminMessages'
import AdminNewsletter from './pages/admin/AdminNewsletter'
import AdminDocuments from './pages/admin/AdminDocuments'
import AdminLayout from './components/admin/AdminLayout'

import FAQ from './pages/FAQ'
import Shipping from './pages/Shipping'
import Returns from './pages/Returns'

import Profile from './pages/Profile'
import Orders from './pages/Orders'
import UserOrderDetails from './pages/UserOrderDetails'
import Addresses from './pages/Addresses'
import ExportInquiries from './pages/ExportInquiries'
import Wishlist from './pages/Wishlist'
import Payments from './pages/Payments'
import Rewards from './pages/Rewards'
import Settings from './pages/Settings'

function App() {
  return (
        <BrowserRouter>
          <ToastContainer position="bottom-right" theme="dark" />
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="about" element={<About />} />
              <Route path="rewards" element={<Rewards />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="shipping" element={<Shipping />} />
              <Route path="returns" element={<Returns />} />
              <Route path="export" element={<Export />} />
              <Route path="export/new" element={<NewExportInquiry />} />
              <Route path="quality" element={<Quality />} />
              <Route path="contact" element={<Contact />} />
              <Route path="product/:slug" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />

              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              {/* Private Routes */}
              <Route path="" element={<PrivateRoute />}>
                <Route path="order-success/:id" element={<OrderSuccess />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/orders" element={<Orders />} />
                <Route path="profile/orders/:id" element={<UserOrderDetails />} />
                <Route path="profile/addresses" element={<Addresses />} />
                <Route path="profile/inquiries" element={<ExportInquiries />} />
                <Route path="profile/wishlist" element={<Wishlist />} />
                <Route path="profile/payments" element={<Payments />} />
                <Route path="profile/rewards" element={<Rewards />} />
                <Route path="profile/settings" element={<Settings />} />
              </Route>
            </Route>
            {/* Admin Routes - Rendered OUTSIDE MainLayout so they have full screen without consumer Navbar/Footer */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />

            <Route path="" element={<AdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/new" element={<AdminProductEdit />} />
                <Route path="products/:id/edit" element={<AdminProductEdit />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="orders/:id" element={<AdminOrderDetails />} />
                <Route path="offers" element={<AdminOffers />} />
                <Route path="reviews" element={<AdminReviews />} />
                <Route path="export-inquiries" element={<AdminInquiries />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="newsletter" element={<AdminNewsletter />} />
                <Route path="documents" element={<AdminDocuments />} />
                
                {/* Fallback route for unimplemented admin pages so sidebar remains visible */}
                <Route path="*" element={
                  <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] rounded-2xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md">
                    <h2 className="text-2xl font-serif text-[#d4af37] mb-2">Coming Soon</h2>
                    <p className="text-[14px] text-[#e4e4e7]/70">This section of the admin portal is under construction.</p>
                  </div>
                } />
              </Route>
            </Route>

          </Routes>
        </BrowserRouter>
  )
}

export default App
