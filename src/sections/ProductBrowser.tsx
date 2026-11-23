import { useState } from 'react';
import { products, Category } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories: (Category | 'All')[] = [
  'All',
  'Bags & Purses',
  'Gowns & Dresses',
  'Sets & Swimwear',
  'Hats & Scarves',
  'Waistbeads & Jewelry',
  'Accessories',
  'Home & Nursery'
];

export default function ProductBrowser() {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const { addToCart, setIsCartOpen } = useCart();

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
    setIsCartOpen(true);
  };

  return (
    <section id="collection" className="py-24 bg-[#111217] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#7239FA] text-sm font-bold tracking-[0.2em] uppercase mb-4 block">The Collection</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4">Crafted with Intention</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Discover our handmade pieces, made with love and the finest yarns.</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-[#7239FA] text-white shadow-[0_0_15px_rgba(114,57,250,0.4)]' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#7239FA]/50 transition-all duration-500 flex flex-col"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111217] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <span className="text-xs text-[#7239FA] font-semibold mb-2">{product.category}</span>
                <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-serif text-white font-bold">₦{product.price.toLocaleString()}</span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="p-3 bg-white/10 rounded-full text-white hover:bg-[#7239FA] transition-colors duration-300"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}