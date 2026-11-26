import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { X, CheckCircle } from 'lucide-react';
import { usePaystackPayment } from 'react-paystack';

export default function CheckoutModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { items, totalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

  const paystackConfig = {
    reference: (new Date()).getTime().toString(),
    email: formData.email,
    amount: totalPrice * 100, // Paystack uses kobo (Naira * 100)
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_placeholder', 
    metadata: {
      custom_fields: [
        { display_name: "Customer Name", variable_name: "customer_name", value: formData.name },
        { display_name: "Phone Number", variable_name: "phone_number", value: formData.phone },
      ]
    }
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  if (!isOpen) return null;

  const saveOrderToDatabase = async (paymentRef: string) => {
    const { data, error } = await supabase.from('orders').insert([{
      customer_name: formData.name,
      phone_number: formData.phone,
      email: formData.email,
      delivery_address: formData.address,
      items: items,
      total_amount: totalPrice,
      payment_status: 'Paid',
      paystack_reference: paymentRef
    }]).select('id').single();

    if (!error && data) {
      setOrderId(data.id.split('-')[0].toUpperCase());
      clearCart();
    }
    setIsLoading(false);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    initializePayment({
      onSuccess: (reference: any) => {
        saveOrderToDatabase(reference.reference);
      },
      onClose: () => {
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-purple-50 rounded-full hover:bg-purple-100">
          <X className="w-5 h-5 text-[#4c1d95]" />
        </button>
        
        {orderId ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-[#4c1d95] mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">Your Order ID is: <strong className="text-xl text-[#4c1d95]">#{orderId}</strong></p>
            <p className="text-sm text-gray-500 mb-6">She has received your order and will start production soon.</p>
            <button onClick={onClose} className="btn-primary w-full">Done</button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-serif font-bold text-[#4c1d95] mb-6">Checkout</h2>
            <form onSubmit={handleCheckout} className="space-y-4">
              <input type="text" required placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 outline-none" />
              <input type="email" required placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 outline-none" />
              <input type="tel" required placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 outline-none" />
              <textarea required placeholder="Delivery Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 outline-none" rows={2} />
              
              <div className="border-t border-purple-50 pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg mb-4 text-[#2B2B2B]">
                  <span>Total:</span>
                  <span>₦{totalPrice.toLocaleString()}</span>
                </div>
                <button type="submit" disabled={isLoading} className="btn-primary w-full py-4 text-lg">
                  {isLoading ? 'Processing...' : 'Pay Securely with Paystack'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}