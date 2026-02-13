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
import './App.css';

function App() {
  return (
    <CartProvider>
      {/* We use min-h-screen to ensure the background covers the whole phone.
        overflow-x-hidden prevents that annoying side-to-side wobbling on mobile.
      */}
      <div className="relative min-h-screen overflow-x-hidden bg-[#F6F2EA]">
        
        {/* The Grain Overlay is now set to 'pointer-events-none'. 
          This is the "Magic Fix"—it stops the overlay from blocking your 
          taps and scroll signals so the products can load properly.
        */}
        <div className="grain-overlay pointer-events-none fixed inset-0 z-50 opacity-[0.03]" />
        
        {/* Header and Cart are fixed/absolute, so we keep them at the top */}
        <Header />
        <CartModal />
        
        {/* The Main content is wrapped in a relative div with a z-index 
          to ensure it stays above the background but below the header.
        */}
        <main className="relative z-10">
          <Hero />
          <FeaturedKnits />
          <JewelrySection />
          <ProductBrowser />
          <CustomOrder />
          <About />
          <Contact />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;