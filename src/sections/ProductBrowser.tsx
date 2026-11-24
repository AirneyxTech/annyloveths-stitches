import { useState } from 'react';
import { products, type Category, type Product } from '../data/products';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductModal from '../components/ProductModal';

const categories: (Category | 'All')[] = [
  'All', 'Bags & Purses', 'Gowns & Dresses', 'Sets & Swimwear', 
  'Hats & Scarves', 'Waistbeads & Jewelry', 'Accessories', 'Home & Nursery'
];

export default function ProductBrowser() {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="collection" className="py-24 bg-[#faf5ff] relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        
        <div className="text-center mb-12">
          <span className="text-[#4c1d95] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 block">The Collection</span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#2B2B2B] font-bold mb-4">Crafted with Intention</h2>
        </div>

        {/* Scrollable categories on mobile */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-2 snap-x hide-scrollbar md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`snap-start whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-[#4c1d95] text-white shadow-md' 
                  : 'bg-white text-gray-500 hover:bg-purple-50 hover:text-[#4c1d95] border border-purple-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2 columns on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group bg-white border border-purple-100 rounded-2xl md:rounded-3xl overflow-hidden hover:border-[#4c1d95]/30 hover:shadow-lg transition-all duration-500 flex flex-col cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="p-3 md:p-5 flex-1 flex flex-col">
                <span className="text-[10px] md:text-xs text-[#4c1d95] font-semibold mb-1">{product.category}</span>
                <h3 className="text-sm md:text-lg font-bold text-[#2B2B2B] mb-1 leading-tight">{product.name}</h3>
                
                <div className="mt-auto pt-2 flex items-center justify-between">
                  <span className="text-sm md:text-xl font-serif text-[#2B2B2B] font-bold">₦{product.price.toLocaleString()}</span>
                  <div className="p-2 md:p-3 bg-purple-50 rounded-full text-[#4c1d95] group-hover:bg-[#4c1d95] group-hover:text-white transition-colors duration-300">
                    <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>

      {/* The Customization Popup */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}