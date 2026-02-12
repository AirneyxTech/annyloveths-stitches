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
      <div className="relative">
        {/* Grain Overlay */}
        <div className="grain-overlay" />
        
        {/* Header */}
        <Header />
        
        {/* Cart Modal */}
        <CartModal />
        
        {/* Main Content */}
        <main className="relative">
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
