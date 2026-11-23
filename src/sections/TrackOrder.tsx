import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Package, Search } from 'lucide-react';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setOrder(null);

    // Fetch order matching the short ID (starts with the UUID) and phone number
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .ilike('id', `${orderId.toLowerCase()}%`) // Matches the start of the UUID
      .eq('phone_number', phone)
      .single();

    if (error || !data) {
      setError('Order not found. Please check your Order ID and Phone Number.');
    } else {
      setOrder(data);
    }
    setIsLoading(false);
  };

  return (
    <section className="min-h-screen bg-[#faf5ff] py-20 flex flex-col items-center">
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-8">
          <Package className="w-12 h-12 text-[#4c1d95] mx-auto mb-4" />
          <h1 className="text-3xl font-serif font-bold text-[#4c1d95]">Track Your Order</h1>
          <p className="text-gray-500 mt-2">Enter your details to see your order status.</p>
        </div>

        <form onSubmit={handleTrack} className="bg-white p-6 rounded-3xl shadow-xl space-y-4">
          <input type="text" required placeholder="Order ID (e.g. A1B2C3)" value={orderId} onChange={e => setOrderId(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 outline-none" />
          <input type="tel" required placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 outline-none" />
          <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            {isLoading ? 'Searching...' : 'Track Order'}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-6 font-medium">{error}</p>}

        {order && (
          <div className="bg-white p-6 rounded-3xl shadow-xl mt-6">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Order #{order.id.split('-')[0].toUpperCase()}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="font-bold text-[#4c1d95] px-3 py-1 bg-purple-100 rounded-full text-sm">{order.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment:</span>
                <span className="font-medium text-orange-500">{order.payment_status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total:</span>
                <span className="font-bold">₦{order.total_amount.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-gray-500 italic">Need help? Message us on WhatsApp with your Order ID.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}