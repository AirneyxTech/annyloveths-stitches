import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';

export default function CartModal() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100]">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
        
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#faf5ff] shadow-2xl flex flex-col animate-slide-in-right">
          <div className="flex items-center justify-between p-6 border-b border-purple-100">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-[#4c1d95]" />
              <h2 className="font-serif text-2xl font-semibold text-[#2B2B2B]">Your Cart</h2>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-purple-100/50 rounded-full transition-colors">
              <X className="w-5 h-5 text-[#2B2B2B]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-purple-200 mb-4" />
                <p className="text-gray-500 text-lg">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedColor}-${item.customizationNotes}`} className="flex gap-4 bg-white/60 rounded-2xl p-4 shadow-sm border border-purple-50">
                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-xl" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-[#2B2B2B] leading-tight">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">₦{item.price.toLocaleString()}</p>
                          {item.selectedColor && item.selectedColor !== 'Original' && (
                            <p className="text-xs text-[#4c1d95] mt-1 font-medium bg-purple-50 inline-block px-2 py-0.5 rounded-md">Color: {item.selectedColor}</p>
                          )}
                          {item.customizationNotes && (
                            <p className="text-xs text-gray-500 mt-1 italic">"{item.customizationNotes}"</p>
                          )}
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="p-1 hover:bg-purple-100/50 rounded-full transition-colors">
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 border border-purple-100 mt-3 w-fit">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1"><Minus className="w-4 h-4" /></button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1"><Plus className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-purple-100 bg-white/30">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-serif text-xl font-semibold text-[#2B2B2B]">₦{totalPrice.toLocaleString()}</span>
              </div>
              <button onClick={() => setIsCheckoutOpen(true)} className="w-full btn-primary flex items-center justify-center gap-2 mb-3">
                <ShoppingBag className="w-5 h-5" /> Proceed to Checkout
              </button>
              <button onClick={clearCart} className="w-full text-sm text-gray-500 hover:text-[#2B2B2B] transition-colors">Clear Cart</button>
            </div>
          )}
        </div>
      </div>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
}