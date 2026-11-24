import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { X, CheckCircle } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { items, totalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

  if (!isOpen) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. Save to Database
    const { data, error } = await supabase.from('orders').insert([{
      customer_name: formData.name,
      phone_number: formData.phone,
      email: formData.email.trim(),
      delivery_address: formData.address,
      items: items,
      total_amount: totalPrice,
    }]).select('id').single();

    // If there is a database error, SHOW IT LOUDLY
    if (error || !data) {
      alert("DATABASE ERROR: " + (error?.message || "Unknown error"));
      setIsLoading(false);
      return;
    }

    const generatedId = data.id.split('-')[0].toUpperCase();
    setOrderId(generatedId);

    // 2. Build WhatsApp Message
    const itemList = items.map(i => `- ${i.quantity}x ${i.name} ${i.selectedColor ? `(${i.selectedColor})` : ''} ${i.customizationNotes ? `[Note: ${i.customizationNotes}]` : ''}`).join('\n');
    const text = `Hello AnnyLoveth! I just placed an order on your website.\n\n*Order ID:* #${generatedId}\n\n*Items:*\n${itemList}\n\n*Total:* ₦${totalPrice.toLocaleString()}\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Address:* ${formData.address}`;
    
    // 3. Open WhatsApp & Clear Cart
    window.open(`https://wa.me/2349118004875?text=${encodeURIComponent(text)}`, '_blank');
    clearCart();
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-purple-50 rounded-full hover:bg-purple-100 transition-colors">
          <X className="w-5 h-5 text-[#4c1d95]" />
        </button>
        
        {orderId ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-[#4c1d95] mb-2">Order Placed!</h2>
            <p className="text-gray-600 mb-4">Your Order ID is: <strong className="text-xl text-[#4c1d95]">#{orderId}</strong></p>
            <p className="text-sm text-gray-500 mb-6">We've opened WhatsApp for you to confirm the order. If it didn't open, <a href={`https://wa.me/2349118004875`} className="text-[#4c1d95] underline font-bold">click here</a>.</p>
            <p className="text-sm text-[#4c1d95] bg-purple-50 p-3 rounded-xl mb-4">Save this Order ID! You can track it or view it in the "My Orders" page using your email.</p>
            <button onClick={onClose} className="btn-primary w-full">Done</button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-serif font-bold text-[#4c1d95] mb-6">Checkout</h2>
            <form onSubmit={handleCheckout} className="space-y-4">
              <input type="text" required placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 text-[#2B2B2B] focus:border-[#4c1d95] outline-none" />
              <input type="email" required placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 text-[#2B2B2B] focus:border-[#4c1d95] outline-none" />
              <input type="tel" required placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 text-[#2B2B2B] focus:border-[#4c1d95] outline-none" />
              <textarea required placeholder="Delivery Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 text-[#2B2B2B] focus:border-[#4c1d95] outline-none" rows={2} />
              
              <div className="border-t border-purple-50 pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg mb-4 text-[#2B2B2B]">
                  <span>Total:</span>
                  <span>₦{totalPrice.toLocaleString()}</span>
                </div>
                <button type="submit" disabled={isLoading} className="btn-primary w-full py-4 text-lg">
                  {isLoading ? 'Processing...' : 'Complete Order via WhatsApp'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}