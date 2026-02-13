import { useState, useEffect, useRef } from 'react';
import { MessageCircle, ShoppingBag, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import type { Product } from '../data/products';

type Category = 'all' | 'knitwear' | 'jewelry' | 'apparel';

export default function ProductBrowser() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const { addToCart } = useCart();

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
    
    setAddedItems(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedItems(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 2000);
  };

  const handleWhatsAppOrder = (product: Product) => {
    const phoneNumber = '2340000000000';
    const message = `Hello, I want to order: ${product.name}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filters: { value: Category; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'knitwear', label: 'Knitwear' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'apparel', label: 'Apparel' }
  ];

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative w-full min-h-screen bg-[#F6F2EA] py-20 lg:py-28"
    >
      <div className="px-6 lg:px-[7vw]">
        {/* Header */}
        <div 
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="font-serif text-4xl lg:text-5xl text-[#2B2B2B] font-semibold mb-4">
            Browse the Collection
          </h2>
          <p className="text-[#6F6F6F] text-lg mb-8">
            Filter by category, then tap to order via WhatsApp.
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {filters.map(filter => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.value
                    ? 'bg-[#D4A27F] text-white shadow-md'
                    : 'bg-white/70 text-[#2B2B2B] hover:bg-white hover:shadow-sm border border-[#2B2B2B]/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group bg-white rounded-[22px] overflow-hidden card-shadow hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              
              {/* Content */}
              <div className="p-5">
                <span className="font-mono-label text-[#6F6F6F] text-[10px]">
                  {product.category}
                </span>
                <h3 className="font-serif text-xl text-[#2B2B2B] font-semibold mt-1 mb-1">
                  {product.name}
                </h3>
                <p className="text-[#6F6F6F] text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <p className="font-serif text-xl text-[#D4A27F] font-semibold mb-4">
                  ₦{product.price.toLocaleString()}
                </p>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      addedItems.has(product.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-[#2B2B2B] text-white hover:bg-[#3B3B3B]'
                    }`}
                  >
                    {addedItems.has(product.id) ? (
                      <>
                        <Check className="w-4 h-4" />
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleWhatsAppOrder(product)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-[#D4A27F]/10 text-[#D4A27F] hover:bg-[#D4A27F]/20 transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
