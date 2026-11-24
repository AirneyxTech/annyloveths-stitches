import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Package, DollarSign, Clock, CheckCircle, LogOut, Printer, TrendingUp, Bell } from 'lucide-react';

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'analytics' | 'vip'>('orders');

  // 1. Check if she is already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  // 2. Fetch Orders (with error catching)
  const fetchOrders = async () => {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error("Error fetching orders:", error);
      alert("Database Error: " + error.message);
    } else if (data) {
      setOrders(data);
    }
  };

  useEffect(() => {
    if (session) fetchOrders();
  }, [session]);

  // 3. Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setErrorMsg('');

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setErrorMsg(error.message);
      setLoginLoading(false);
    } else {
      setSession(data.session);
      setLoginLoading(false);
    }
  };

  const handleLogout = () => supabase.auth.signOut();

  const updateStatus = async (id: string, newStatus: string) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    fetchOrders();
  };

  const printReceipt = (order: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const itemsHtml = order.items.map((i: any) => `<tr><td style="padding: 10px; border-bottom: 1px solid #333;">${i.quantity}x ${i.name} ${i.selectedColor ? `(${i.selectedColor})` : ''}</td><td style="padding: 10px; border-bottom: 1px solid #333;">₦${(i.price * i.quantity).toLocaleString()}</td></tr>`).join('');
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

  const notifyVIPs = () => {
    const message = "Hello VIP! 🌸 We just dropped new crochet designs on the website. Come check them out before they sell out! https://annyloveths-stitches.vercel.app";
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#111217] text-white">Loading...</div>;

  // LOGIN SCREEN
  if (!session) {
    return (
      <div className="min-h-screen bg-[#111217] flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl w-full max-w-sm space-y-4">
          <h2 className="text-2xl font-serif font-bold text-white text-center mb-6">Admin Login</h2>
          
          {errorMsg && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4">{errorMsg}</div>}

          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:border-[#7239FA] outline-none" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:border-[#7239FA] outline-none" required />
          
          <button type="submit" disabled={loginLoading} className="w-full bg-[#7239FA] text-white py-3 rounded-xl font-medium hover:bg-[#5b2ac7] transition-all disabled:opacity-50">
            {loginLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    );
  }

  // DASHBOARD
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const pendingOrders = orders.filter(o => o.status === 'Received' || o.status === 'In progress').length;
  const completedOrders = orders.filter(o => o.status === 'Delivered').length;

  return (
    <div className="min-h-screen bg-[#111217] flex flex-col md:flex-row text-[#E5E7EB]">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-black/40 border-r border-white/10 p-6 flex flex-col">
        <h2 className="text-2xl font-serif font-bold mb-8 text-white">Craft Haus Admin</h2>
        <nav className="space-y-2 flex-1">
          <button onClick={() => setActiveTab('orders')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 ${activeTab === 'orders' ? 'bg-[#7239FA] text-white' : 'hover:bg-white/5 text-gray-400'}`}><Package className="w-5 h-5"/> Orders</button>
          <button onClick={() => setActiveTab('analytics')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 ${activeTab === 'analytics' ? 'bg-[#7239FA] text-white' : 'hover:bg-white/5 text-gray-400'}`}><TrendingUp className="w-5 h-5"/> Analytics</button>
          <button onClick={() => setActiveTab('vip')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 ${activeTab === 'vip' ? 'bg-[#7239FA] text-white' : 'hover:bg-white/5 text-gray-400'}`}><Bell className="w-5 h-5"/> Notifications</button>
        </nav>
        <button onClick={handleLogout} className="p-3 rounded-xl flex items-center gap-3 text-gray-400 hover:bg-white/5 hover:text-white mt-auto"><LogOut className="w-5 h-5"/> Log Out</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <h1 className="text-3xl font-serif font-bold text-white mb-8">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card bg-white/5 border border-white/10 p-6 rounded-3xl">
                <DollarSign className="w-8 h-8 text-green-400 mb-4" />
                <p className="text-gray-400">Total Revenue</p>
                <h2 className="text-3xl font-bold text-white">₦{totalRevenue.toLocaleString()}</h2>
              </div>
              <div className="glass-card bg-white/5 border border-white/10 p-6 rounded-3xl">
                <Clock className="w-8 h-8 text-orange-400 mb-4" />
                <p className="text-gray-400">Pending Orders</p>
                <h2 className="text-3xl font-bold text-white">{pendingOrders}</h2>
              </div>
              <div className="glass-card bg-white/5 border border-white/10 p-6 rounded-3xl">
                <CheckCircle className="w-8 h-8 text-blue-400 mb-4" />
                <p className="text-gray-400">Completed Orders</p>
                <h2 className="text-3xl font-bold text-white">{completedOrders}</h2>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'vip' && (
          <div>
            <h1 className="text-3xl font-serif font-bold text-white mb-8">Customer Notifications</h1>
            <div className="glass-card bg-white/5 border border-white/10 p-8 rounded-3xl max-w-2xl">
              <Bell className="w-12 h-12 text-[#7239FA] mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Announce New Designs</h2>
              <p className="text-gray-400 mb-6">Click this button to generate a WhatsApp broadcast message for her VIP customers about new designs and discounts.</p>
              <button onClick={notifyVIPs} className="bg-[#7239FA] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#5b2ac7] flex items-center gap-2 transition-colors">
                <Bell className="w-5 h-5" /> Generate WhatsApp Broadcast
              </button>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h1 className="text-3xl font-serif font-bold text-white mb-8">Manage Orders</h1>
            <div className="space-y-4">
              {orders.length === 0 && <p className="text-gray-400">No orders yet. Place a test order on the live site to see it here!</p>}
              {orders.map(order => (
                <div key={order.id} className="glass-card bg-white/5 border border-white/10 p-6 rounded-3xl">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="font-bold text-lg text-white">#{order.id.split('-')[0].toUpperCase()}</h3>
                      <p className="text-sm text-gray-400">{order.customer_name} • {order.phone_number}</p>
                      <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleString()}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <select 
                        value={order.status} 
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-sm font-medium outline-none cursor-pointer"
                      >
                        <option value="Received">Received</option>
                        <option value="In progress">In Progress</option>
                        <option value="Ready">Ready</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      <button onClick={() => printReceipt(order)} className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 flex items-center gap-2 transition-colors">
                        <Printer className="w-4 h-4" /> Receipt
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <p className="mb-2"><strong className="text-gray-300">Address:</strong> {order.delivery_address}</p>
                    <p className="mb-2"><strong className="text-gray-300">Total:</strong> ₦{order.total_amount.toLocaleString()}</p>
                    <div className="mt-3 bg-black/30 p-3 rounded-xl border border-white/5">
                      <strong className="text-gray-300 block mb-1">Items:</strong>
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="text-gray-400 text-xs">
                          {item.quantity}x {item.name} 
                          {item.selectedColor && item.selectedColor !== 'Original' && ` (Color: ${item.selectedColor})`}
                          {item.customizationNotes && ` - Note: ${item.customizationNotes}`}
                        </div>
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