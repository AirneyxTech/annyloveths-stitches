import { useState, useEffect } from 'react';
import { MessageCircle, ShoppingBag, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import type { Product } from '../data/products';

type Category = 'all' | 'knitwear' | 'jewelry' | 'apparel';

export default function ProductBrowser() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const { addToCart } = useCart();

  // Simple, direct filtering
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
    const phoneNumber = '2348123456789'; // Your number
    const message = `Hello, I want to order: ${product.name}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const filters: { value: Category; label: string }[] = [
    { value: 'all', label: 'All Items' },
    { value: 'knitwear', label: 'Knitwear' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'apparel', label: 'Apparel' }
  ];

  return (
    <section id="collection" className="w-full bg-[#F6F2EA] py-16 lg:py-24">
      <div className="px-6 lg:px-[7vw]">
        
        {/* Simple Header - No Animations */}
        <div className="mb-12">
          <h2 className="font-serif text-3xl lg:text-5xl text-[#2B2B2B] font-semibold mb-3">
            Our Collection
          </h2>
          <p className="text-[#6F6F6F] text-base mb-8">
            Hand-crafted pieces from Ikorodu to the world.
          </p>
          
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter.value
                    ? 'bg-[#D4A27F] text-white'
                    : 'bg-white text-[#2B2B2B] border border-[#2B2B2B]/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* The Grid - Purely Static for Mobile Reliability */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/5]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              
              <div className="p-4">
                <span className="text-[10px] uppercase tracking-widest text-gray-400">{product.category}</span>
                <h3 className="font-serif text-lg font-bold text-gray-900 mt-1">{product.name}</h3>
                <p className="text-xl text-[#D4A27F] font-semibold my-2">₦{product.price.toLocaleString()}</p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
                      addedItems.has(product.id) ? 'bg-green-500 text-white' : 'bg-gray-900 text-white'
                    }`}
                  >
                    {addedItems.has(product.id) ? 'Added' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={() => handleWhatsAppOrder(product)}
                    className="p-2 rounded-lg bg-[#D4A27F]/10 text-[#D4A27F]"
                  >
                    <MessageCircle className="w-5 h-5" />
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