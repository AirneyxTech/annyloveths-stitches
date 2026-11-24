import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Collections', id: 'collection' },
    { name: 'Custom', id: 'custom' },
    { name: 'Track Order', id: 'track' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#faf5ff]/90 backdrop-blur-md border-b border-purple-100 shadow-sm' : 'bg-transparent'}`}>
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          <button onClick={() => scrollToSection('hero')} className="flex flex-col items-start group">
            <span className="font-serif text-2xl font-bold text-[#4c1d95] group-hover:text-[#3b1475] transition-colors duration-300">
              AnnyLoveth's
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-gray-500 font-medium">
              Craft Haus
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-sm font-medium text-gray-600 hover:text-[#4c1d95] transition-colors group"
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#4c1d95] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            {/* MY ORDERS BUTTON */}
            <a href="/my-orders" className="p-2 hover:bg-purple-100/50 rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-[#4c1d95]">
              <User className="w-5 h-5" />
              <span className="hidden md:inline">My Orders</span>
            </a>

            <button onClick={() => alert('Search coming soon!')} className="p-2 hover:bg-purple-100/50 rounded-full transition-colors hidden md:block">
              <Search className="w-5 h-5 text-[#4c1d95]" />
            </button>
            <button onClick={() => setIsCartOpen(true)} className="p-2 hover:bg-purple-100/50 rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5 text-[#4c1d95]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#4c1d95] text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 hover:bg-purple-100/50 rounded-full transition-colors">
              {isMobileMenuOpen ? <X className="w-5 h-5 text-[#4c1d95]" /> : <Menu className="w-5 h-5 text-[#4c1d95]" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden bg-[#faf5ff]/95 backdrop-blur-xl border-t border-purple-100">
          <nav className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-left text-lg font-medium text-gray-700 hover:text-[#4c1d95] transition-colors py-2 border-b border-purple-50">
                {item.name}
              </button>
            ))}
            <a href="/my-orders" className="text-left text-lg font-medium text-[#4c1d95] py-2 flex items-center gap-2">
              <User className="w-5 h-5" /> My Orders & Receipts
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
}