import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import CartModal from './components/CartModal';
import Hero from './sections/Hero';
import FeaturedKnits from './sections/FeaturedKnits';
import JewelrySection from './sections/JewelrySection';
import ProductBrowser from './sections/ProductBrowser';
import CustomOrder from './sections/CustomOrder';
import About from './sections/About';
import Contact from './sections/Contact';
import TrackOrder from './sections/TrackOrder';
import Admin from './pages/Admin';
import CustomerPortal from './pages/CustomerPortal';
import './App.css';

function App() {
  // Check URLs for specific pages
  const isAdmin = window.location.pathname === '/admin';
  const isCustomerPortal = window.location.pathname === '/my-orders';

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile || window.innerWidth < 768) {
      setTimeout(() => {
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);
        window.dispatchEvent(new Event('resize'));
      }, 1000);
    }
  }, []);

  // 1. Admin Dashboard Route
  if (isAdmin) {
    return <Admin />;
  }

  // 2. Customer Portal Route
  if (isCustomerPortal) {
    return <CustomerPortal />;
  }

  // 3. Normal Website Route
  return (
    <CartProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-[#111217]">
        <div className="grain-overlay pointer-events-none fixed inset-0 z-50 opacity-[0.03]" />
        <Header />
        <CartModal />
        
        <main className="relative z-10">
          <Hero />
          <FeaturedKnits />
          <JewelrySection />
          <ProductBrowser />
          <CustomOrder />
          <About />
          <TrackOrder />
          <Contact />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;