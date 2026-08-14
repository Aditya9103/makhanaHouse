import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Export from './pages/Export'
import NewExportInquiry from './pages/NewExportInquiry'
import MainLayout from './components/Layout/MainLayout'

import Quality from './pages/Quality'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

import Profile from './pages/Profile'
import Orders from './pages/Orders'
import Addresses from './pages/Addresses'
import ExportInquiries from './pages/ExportInquiries'
import Wishlist from './pages/Wishlist'
import Payments from './pages/Payments'
import Rewards from './pages/Rewards'
import Settings from './pages/Settings'

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="about" element={<About />} />
            <Route path="export" element={<Export />} />
            <Route path="export/new" element={<NewExportInquiry />} />
            <Route path="quality" element={<Quality />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product/:slug" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/orders" element={<Orders />} />
            <Route path="profile/addresses" element={<Addresses />} />
            <Route path="profile/inquiries" element={<ExportInquiries />} />
            <Route path="profile/wishlist" element={<Wishlist />} />
            <Route path="profile/payments" element={<Payments />} />
            <Route path="profile/rewards" element={<Rewards />} />
            <Route path="profile/settings" element={<Settings />} />
          </Route>
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  )
}

export default App
