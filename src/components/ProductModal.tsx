import { useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../data/products';

export default function ProductModal({ product, onClose }: { product: Product | null, onClose: () => void }) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState('Original');
  const [notes, setNotes] = useState('');

  if (!product) return null;

  const colors = ['Original', 'Black', 'White', 'Pink', 'Blue', 'Brown'];

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      selectedColor,
      customizationNotes: notes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-purple-50">
          <h2 className="font-serif text-xl font-bold text-[#4c1d95]">Customize Your Piece</h2>
          <button onClick={onClose} className="p-2 bg-purple-50 rounded-full hover:bg-purple-100 transition-colors">
            <X className="w-5 h-5 text-[#4c1d95]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <div className="flex gap-4 mb-6">
            <img src={product.image} alt={product.name} className="w-24 h-32 object-cover rounded-xl shadow-sm" />
            <div>
              <h3 className="font-bold text-lg text-[#2B2B2B]">{product.name}</h3>
              <p className="text-[#4c1d95] font-semibold mt-1">₦{product.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#2B2B2B] mb-3">Select Color</label>
            <div className="flex flex-wrap gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedColor === color 
                      ? 'bg-[#4c1d95] text-white shadow-md' 
                      : 'bg-purple-50 text-gray-600 hover:bg-purple-100'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Special Requests</label>
            <textarea 
              placeholder="E.g., Remove the fringe, make it longer, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 focus:border-[#4c1d95] outline-none resize-none text-sm"
              rows={3}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-purple-50 bg-white">
          <button onClick={handleAdd} className="btn-primary w-full flex items-center justify-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Add to Cart - ₦{product.price.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
}