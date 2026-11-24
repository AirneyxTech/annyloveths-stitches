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
    
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .ilike('email', email.trim())
      .order('created_at', { ascending: false });

    if (error) {
      setError('Could not fetch orders. Please try again.');
    } else if (data.length === 0) {
      setError('No orders found for this email address.');
    } else {
      setOrders(data);
    }
    setIsLoading(false);
  };

  const printReceipt = (order: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const itemsHtml = order.items.map((i: any) => `<tr><td style="padding: 10px; border-bottom: 1px solid #ddd;">${i.quantity}x ${i.name} ${i.selectedColor ? `(${i.selectedColor})` : ''}</td><td style="padding: 10px; border-bottom: 1px solid #ddd;">₦${(i.price * i.quantity).toLocaleString()}</td></tr>`).join('');
    const shortId = order.id.split('-')[0].toUpperCase();

    const receiptHTML = `
      <html>
        <head>
          <title>Receipt - AnnyLoveth's Craft Haus</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #333; max-width: 600px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px solid #4c1d95; padding-bottom: 20px; margin-bottom: 20px; }
            .header h1 { color: #4c1d95; margin: 0; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { text-align: left; padding: 10px; border-bottom: 1px solid #ddd; }
            .total { text-align: right; font-size: 1.2em; font-weight: bold; color: #4c1d95; }
            .footer { text-align: center; margin-top: 40px; font-size: 0.9em; color: #666; }
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
    `;

    printWindow.document.open();
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    printWindow.onload = () => { printWindow.focus(); printWindow.print(); };
  };

  return (
    <div className="min-h-screen bg-[#faf5ff] py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => window.location.href = '/'} className="p-2 bg-purple-50 rounded-full hover:bg-purple-100 transition-colors border border-purple-100">
            <ArrowLeft className="w-5 h-5 text-[#4c1d95]" />
          </button>
          <h1 className="text-3xl font-serif font-bold text-[#4c1d95]">My Orders</h1>
        </div>

        {!orders ? (
          <div className="bg-white p-8 rounded-3xl max-w-md shadow-sm border border-purple-100">
            <Package className="w-10 h-10 text-[#4c1d95] mb-4" />
            <h2 className="text-xl font-bold text-[#2B2B2B] mb-2">Enter your Email</h2>
            <p className="text-gray-500 text-sm mb-6">Enter the email you used at checkout to see your order history.</p>
            <form onSubmit={fetchMyOrders} className="space-y-4">
              <input type="email" required placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 text-[#2B2B2B] focus:border-[#4c1d95] outline-none" />
              <button type="submit" disabled={isLoading} className="btn-primary w-full">
                {isLoading ? 'Searching...' : 'View My Orders'}
              </button>
            </form>
            {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white p-6 rounded-3xl shadow-sm border border-purple-100">
                <div className="flex justify-between items-start border-b border-purple-50 pb-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#2B2B2B]">Order #{order.id.split('-')[0].toUpperCase()}</h3>
                    <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-[#4c1d95] rounded-full text-xs font-bold uppercase tracking-wider">
                    {order.status}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total: <span className="text-[#2B2B2B] font-bold text-lg">₦{order.total_amount.toLocaleString()}</span></p>
                    <p className="text-sm text-gray-500">Payment: <span className="text-orange-500 font-medium">{order.payment_status}</span></p>
                  </div>
                  <button onClick={() => printReceipt(order)} className="flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-[#4c1d95] rounded-lg transition-colors text-sm font-medium">
                    <Printer className="w-4 h-4" /> Download Receipt
                  </button>
                </div>
              </div>
            ))}
            <button onClick={() => setOrders(null)} className="text-[#4c1d95] font-medium text-sm hover:underline mt-4">Search another email</button>
          </div>
        )}
      </div>
    </div>
  );
}