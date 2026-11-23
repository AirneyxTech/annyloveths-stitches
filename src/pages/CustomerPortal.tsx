import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Package, Printer, ArrowLeft } from 'lucide-react';

export default function CustomerPortal() {
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState<any[] | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchMyOrders = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // For simplicity, we fetch by email. (In a real app, you'd use Supabase Auth)
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false });

    if (error) {
      setError('Could not fetch orders.');
    } else if (data.length === 0) {
      setError('No orders found for this email address.');
    } else {
      setOrders(data);
    }
    setIsLoading(false);
  };

  // Customer Receipt Generator
  const printReceipt = (order: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const itemsHtml = order.items.map((i: any) => `<tr><td style="padding: 10px; border-bottom: 1px solid #333;">${i.quantity}x ${i.name}</td><td style="padding: 10px; border-bottom: 1px solid #333;">₦${(i.price * i.quantity).toLocaleString()}</td></tr>`).join('');
    const shortId = order.id.split('-')[0].toUpperCase();

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - AnnyLoveth's Craft Haus</title>
          <style>
            body { font-family: sans-serif; background: #111217; color: #E5E7EB; padding: 40px; }
            .header { text-align: center; border-bottom: 2px solid #7239FA; padding-bottom: 20px; margin-bottom: 30px; }
            .header h1 { color: #7239FA; margin: 0; font-size: 28px; }
            .header p { color: #888; margin-top: 5px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th { text-align: left; padding: 10px; border-bottom: 2px solid #333; color: #888; }
            .total { text-align: right; font-size: 1.5em; font-weight: bold; color: #7239FA; margin-top: 20px; }
            .footer { text-align: center; margin-top: 50px; font-size: 0.9em; color: #666; border-top: 1px solid #333; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>AnnyLoveth's Craft Haus</h1>
            <p>Crochet • Knit • Slay</p>
          </div>
          <p><strong>Customer:</strong> ${order.customer_name}</p>
          <p><strong>Order ID:</strong> #${shortId}</p>
          <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
          <table>
            <tr><th>Item</th><th>Amount</th></tr>
            ${itemsHtml}
          </table>
          <div class="total">Total: ₦${order.total_amount.toLocaleString()}</div>
          <div class="footer">
            <p>Thank you for shopping with us!</p>
            <p>WhatsApp: +234 911 800 4875</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-[#111217] py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => window.location.href = '/'} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-3xl font-serif font-bold text-white">My Orders</h1>
        </div>

        {!orders ? (
          <div className="glass-card p-8 rounded-3xl max-w-md">
            <Package className="w-10 h-10 text-[#7239FA] mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Enter your Email</h2>
            <p className="text-gray-400 text-sm mb-6">Enter the email you used at checkout to see your order history and receipts.</p>
            <form onSubmit={fetchMyOrders} className="space-y-4">
              <input type="email" required placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:border-[#7239FA] outline-none" />
              <button type="submit" disabled={isLoading} className="btn-primary w-full">
                {isLoading ? 'Searching...' : 'View My Orders'}
              </button>
            </form>
            {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="glass-card p-6 rounded-3xl">
                <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Order #{order.id.split('-')[0].toUpperCase()}</h3>
                    <p className="text-sm text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className="px-3 py-1 bg-[#7239FA]/20 text-[#7239FA] rounded-full text-xs font-bold uppercase tracking-wider">
                    {order.status}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total: <span className="text-white font-bold text-lg">₦{order.total_amount.toLocaleString()}</span></p>
                    <p className="text-sm text-gray-400">Payment: <span className="text-yellow-400">{order.payment_status}</span></p>
                  </div>
                  <button onClick={() => printReceipt(order)} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm">
                    <Printer className="w-4 h-4" /> Download Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}