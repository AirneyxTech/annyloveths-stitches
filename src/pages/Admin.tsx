import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Package, DollarSign, Clock, CheckCircle, LogOut, Printer, TrendingUp, Bell } from 'lucide-react';

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'analytics' | 'vip'>('orders');

  // Check if she is logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  // Fetch Orders
  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (data) setOrders(data);
  };

  useEffect(() => {
    if (session) fetchOrders();
  }, [session]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const handleLogout = () => supabase.auth.signOut();

  const updateStatus = async (id: string, newStatus: string) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    fetchOrders();
  };

  // Print Receipt Logic
  const printReceipt = (order: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const itemsHtml = order.items.map((i: any) => `<tr><td>${i.quantity}x ${i.name}</td><td>₦${(i.price * i.quantity).toLocaleString()}</td></tr>`).join('');
    const shortId = order.id.split('-')[0].toUpperCase();

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - AnnyLoveth's Craft Haus</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #333; }
            .header { text-align: center; border-bottom: 2px solid #4c1d95; padding-bottom: 20px; margin-bottom: 20px; }
            .header h1 { color: #4c1d95; margin: 0; }
            .details { margin-bottom: 20px; }
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
          <div class="details">
            <p><strong>Receipt For:</strong> ${order.customer_name}</p>
            <p><strong>Order ID:</strong> #${shortId}</p>
            <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
          </div>
          <table>
            <tr><th>Item</th><th>Amount</th></tr>
            ${itemsHtml}
          </table>
          <div class="total">Total: ₦${order.total_amount.toLocaleString()}</div>
          <div class="footer">
            <p>Thank you for shopping with us!</p>
            <p>WhatsApp: +234 911 800 4875</p>
            <p><em>Note: Payment of 60% deposit activates production.</em></p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // VIP Notification Logic
  const notifyVIPs = () => {
    const message = "Hello VIP! 🌸 We just dropped new crochet designs on the website. Come check them out before they sell out! https://annyloveths-stitches.vercel.app";
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  // LOGIN SCREEN
  if (!session) {
    return (
      <div className="min-h-screen bg-[#faf5ff] flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm space-y-4 border border-purple-100">
          <h2 className="text-2xl font-serif font-bold text-[#4c1d95] text-center mb-6">Admin Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 outline-none" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 outline-none" required />
          <button type="submit" className="btn-primary w-full">Log In</button>
        </form>
      </div>
    );
  }

  // DASHBOARD
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const pendingOrders = orders.filter(o => o.status === 'Received' || o.status === 'In progress').length;
  const completedOrders = orders.filter(o => o.status === 'Delivered').length;

  return (
    <div className="min-h-screen bg-[#faf5ff] flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#4c1d95] text-white p-6 flex flex-col">
        <h2 className="text-2xl font-serif font-bold mb-8">Craft Haus Admin</h2>
        <nav className="space-y-2 flex-1">
          <button onClick={() => setActiveTab('orders')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 ${activeTab === 'orders' ? 'bg-white/20' : 'hover:bg-white/10'}`}><Package className="w-5 h-5"/> Orders</button>
          <button onClick={() => setActiveTab('analytics')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 ${activeTab === 'analytics' ? 'bg-white/20' : 'hover:bg-white/10'}`}><TrendingUp className="w-5 h-5"/> Analytics</button>
          <button onClick={() => setActiveTab('vip')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 ${activeTab === 'vip' ? 'bg-white/20' : 'hover:bg-white/10'}`}><Bell className="w-5 h-5"/> Notifications</button>
        </nav>
        <button onClick={handleLogout} className="p-3 rounded-xl flex items-center gap-3 hover:bg-white/10 mt-auto"><LogOut className="w-5 h-5"/> Log Out</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#4c1d95] mb-8">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-purple-100">
                <DollarSign className="w-8 h-8 text-green-500 mb-4" />
                <p className="text-gray-500">Total Revenue</p>
                <h2 className="text-3xl font-bold text-[#2B2B2B]">₦{totalRevenue.toLocaleString()}</h2>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-purple-100">
                <Clock className="w-8 h-8 text-orange-500 mb-4" />
                <p className="text-gray-500">Pending Orders</p>
                <h2 className="text-3xl font-bold text-[#2B2B2B]">{pendingOrders}</h2>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-purple-100">
                <CheckCircle className="w-8 h-8 text-blue-500 mb-4" />
                <p className="text-gray-500">Completed Orders</p>
                <h2 className="text-3xl font-bold text-[#2B2B2B]">{completedOrders}</h2>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'vip' && (
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#4c1d95] mb-8">Customer Notifications</h1>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-purple-100 max-w-2xl">
              <Bell className="w-12 h-12 text-[#d8b4fe] mb-4" />
              <h2 className="text-xl font-bold text-[#2B2B2B] mb-2">Announce New Designs</h2>
              <p className="text-gray-500 mb-6">Click this button to generate a WhatsApp broadcast message for her VIP customers about new designs and discounts.</p>
              <button onClick={notifyVIPs} className="btn-primary flex items-center gap-2">
                <Bell className="w-5 h-5" /> Generate WhatsApp Broadcast
              </button>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#4c1d95] mb-8">Manage Orders</h1>
            <div className="space-y-4">
              {orders.length === 0 && <p className="text-gray-500">No orders yet.</p>}
              {orders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-3xl shadow-sm border border-purple-100">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 border-b border-purple-50 pb-4">
                    <div>
                      <h3 className="font-bold text-lg text-[#2B2B2B]">#{order.id.split('-')[0].toUpperCase()}</h3>
                      <p className="text-sm text-gray-500">{order.customer_name} • {order.phone_number}</p>
                      <p className="text-xs text-gray-400">{new Date(order.created_at).toLocaleString()}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <select 
                        value={order.status} 
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="px-4 py-2 rounded-lg bg-purple-50 border border-purple-100 text-sm font-medium outline-none cursor-pointer"
                      >
                        <option value="Received">Received</option>
                        <option value="In progress">In Progress</option>
                        <option value="Ready">Ready</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      <button onClick={() => printReceipt(order)} className="px-4 py-2 bg-purple-100 text-[#4c1d95] rounded-lg text-sm font-medium hover:bg-purple-200 flex items-center gap-2 transition-colors">
                        <Printer className="w-4 h-4" /> Receipt
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <p className="mb-2"><strong className="text-gray-700">Address:</strong> {order.delivery_address}</p>
                    <p className="mb-2"><strong className="text-gray-700">Total:</strong> ₦{order.total_amount.toLocaleString()}</p>
                    <div className="mt-3 bg-purple-50 p-3 rounded-xl">
                      <strong className="text-gray-700 block mb-1">Items:</strong>
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="text-gray-600 text-xs">{item.quantity}x {item.name} (₦{item.price})</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}