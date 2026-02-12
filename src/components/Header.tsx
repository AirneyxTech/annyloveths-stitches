import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#F6F2EA]/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="font-serif text-xl lg:text-2xl font-semibold text-[#2B2B2B] hover:text-[#D4A27F] transition-colors"
          >
            Annyloveths
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('collection')}
              className="text-sm font-medium text-[#2B2B2B] hover:text-[#D4A27F] transition-colors"
            >
              Collections
            </button>
            <button
              onClick={() => scrollToSection('custom')}
              className="text-sm font-medium text-[#2B2B2B] hover:text-[#D4A27F] transition-colors"
            >
              Custom
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium text-[#2B2B2B] hover:text-[#D4A27F] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium text-[#2B2B2B] hover:text-[#D4A27F] transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-[#2B2B2B]/5 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-[#2B2B2B]" />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-[#2B2B2B]/5 rounded-full transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#2B2B2B]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4A27F] text-white text-xs font-medium rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-[#2B2B2B]/5 rounded-full transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#2B2B2B]" />
              ) : (
                <Menu className="w-5 h-5 text-[#2B2B2B]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#F6F2EA]/95 backdrop-blur-md border-t border-[#2B2B2B]/10">
          <nav className="flex flex-col p-6 gap-4">
            <button
              onClick={() => scrollToSection('collection')}
              className="text-left text-lg font-medium text-[#2B2B2B] hover:text-[#D4A27F] transition-colors py-2"
            >
              Collection
            </button>
            <button
              onClick={() => scrollToSection('custom')}
              className="text-left text-lg font-medium text-[#2B2B2B] hover:text-[#D4A27F] transition-colors py-2"
            >
              Custom
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left text-lg font-medium text-[#2B2B2B] hover:text-[#D4A27F] transition-colors py-2"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left text-lg font-medium text-[#2B2B2B] hover:text-[#D4A27F] transition-colors py-2"
            >
              Contact
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
