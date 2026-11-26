import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductModal from '../components/ProductModal';

export default function ProductBrowser() {
  const [products, setProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Bags & Purses', 'Gowns & Dresses', 'Sets & Swimwear', 'Hats & Scarves', 'Waistbeads & Jewelry', 'Accessories', 'Home & Nursery'];

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

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

        {/* Category Filter */}
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

        {/* Products Grid */}
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading collection...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
            {filteredProducts.map((product, index) => {
              const discountedPrice = product.discount > 0 
                ? product.price - (product.price * (product.discount / 100)) 
                : product.price;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group bg-white border border-purple-100 rounded-2xl md:rounded-3xl overflow-hidden hover:border-[#4c1d95]/30 hover:shadow-lg transition-all duration-500 flex flex-col cursor-pointer"
                  onClick={() => setSelectedProduct({ ...product, price: discountedPrice })}
                >
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 md:p-5 flex-1 flex flex-col">
                    <span className="text-[10px] md:text-xs text-[#4c1d95] font-semibold mb-1">{product.category}</span>
                    <h3 className="text-sm md:text-lg font-bold text-[#2B2B2B] mb-1 leading-tight">{product.name}</h3>
                    
                    <div className="mt-auto pt-2 flex items-center justify-between">
                      <div>
                        {product.discount > 0 && (
                          <span className="text-xs text-gray-400 line-through block">₦{product.price.toLocaleString()}</span>
                        )}
                        <span className="text-sm md:text-xl font-serif text-[#2B2B2B] font-bold">₦{discountedPrice.toLocaleString()}</span>
                      </div>
                      <div className="p-2 md:p-3 bg-purple-50 rounded-full text-[#4c1d95] group-hover:bg-[#4c1d95] group-hover:text-white transition-colors duration-300">
                        <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Modal for Customization */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}