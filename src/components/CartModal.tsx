import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';

export default function CartModal() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleSingleItemOrder = (item: typeof items[0]) => {
    const phoneNumber = '2349118004875';
    const message = `Hello, I want to order: ${item.name}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

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

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-purple-200 mb-4" />
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <p className="text-gray-400 text-sm mt-2">Add some beautiful handmade pieces!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white/60 rounded-2xl p-4 shadow-sm border border-purple-50">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-[#2B2B2B]">{item.name}</h3>
                          <p className="text-sm text-gray-500">₦{item.price.toLocaleString()}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="p-1 hover:bg-purple-100/50 rounded-full transition-colors">
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 border border-purple-100">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-purple-100/50 rounded-full transition-colors">
                            <Minus className="w-4 h-4 text-[#2B2B2B]" />
                          </button>
                          <span className="w-8 text-center font-medium text-[#2B2B2B]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-purple-100/50 rounded-full transition-colors">
                            <Plus className="w-4 h-4 text-[#2B2B2B]" />
                          </button>
                        </div>
                        
                        <button onClick={() => handleSingleItemOrder(item)} className="flex items-center gap-2 text-sm text-[#4c1d95] hover:text-[#3b1475] transition-colors font-medium">
                          <MessageCircle className="w-4 h-4" />
                          Order
                        </button>
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
                <span className="font-serif text-xl font-semibold text-[#2B2B2B]">
                  ₦{totalPrice.toLocaleString()}
                </span>
              </div>
              
              <button onClick={() => setIsCheckoutOpen(true)} className="w-full btn-primary flex items-center justify-center gap-2 mb-3">
                <ShoppingBag className="w-5 h-5" />
                Proceed to Checkout
              </button>
              
              <button onClick={clearCart} className="w-full text-sm text-gray-500 hover:text-[#2B2B2B] transition-colors">
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
}