import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import HeaderNew from './components/layout/HeaderNew';
import FooterNew from './components/layout/FooterNew';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import BijouxAfricains from './pages/BijouxAfricains';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import LegalNotice from './pages/LegalNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfSale from './pages/TermsOfSale';
import AtelierLogin from './pages/admin/AtelierLogin';
import AtelierDashboard from './pages/admin/AtelierDashboard';
import AtelierProducts from './pages/admin/AtelierProducts';
import AtelierProductNew from './pages/admin/AtelierProductNew';
import AtelierProductEdit from './pages/admin/AtelierProductEdit';
import AtelierBulkUpload from './pages/admin/AtelierBulkUpload';
import AtelierStock from './pages/admin/AtelierStock';
import AtelierOrders from './pages/admin/AtelierOrders';
import AtelierOrderNew from './pages/admin/AtelierOrderNew';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Routes Admin - Sans Header/Footer */}
            <Route path="/atelier/login" element={<AtelierLogin />} />
            <Route
              path="/atelier"
              element={
                <ProtectedRoute>
                  <AtelierDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/atelier/produits"
              element={
                <ProtectedRoute>
                  <AtelierProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/atelier/produits/nouveau"
              element={
                <ProtectedRoute>
                  <AtelierProductNew />
                </ProtectedRoute>
              }
            />
            <Route
              path="/atelier/produits/modifier/:id"
              element={
                <ProtectedRoute>
                  <AtelierProductEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/atelier/upload-masse"
              element={
                <ProtectedRoute>
                  <AtelierBulkUpload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/atelier/stock"
              element={
                <ProtectedRoute>
                  <AtelierStock />
                </ProtectedRoute>
              }
            />
            <Route
              path="/atelier/commandes"
              element={
                <ProtectedRoute>
                  <AtelierOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/atelier/commandes/nouvelle"
              element={
                <ProtectedRoute>
                  <AtelierOrderNew />
                </ProtectedRoute>
              }
            />

            {/* Routes Publiques - Avec Header/Footer */}
            <Route
              path="/*"
              element={
                <div className="flex flex-col min-h-screen bg-[#f5f3f0]">
                  <HeaderNew />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/produit/:id" element={<ProductDetail />} />
                      <Route path="/panier" element={<Cart />} />
                      <Route path="/catalogue" element={<Catalogue />} />
                      <Route path="/bijoux-africains" element={<BijouxAfricains />} />
                      <Route path="/a-propos" element={<About />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/mentions-legales" element={<LegalNotice />} />
                      <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
                      <Route path="/cgv" element={<TermsOfSale />} />
                    </Routes>
                  </main>
                  <FooterNew />
                </div>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
