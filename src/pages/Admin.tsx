import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Package, DollarSign, LogOut, Printer, Upload, Plus, Tag } from 'lucide-react';

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', description: '', discount: '0' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (session) {
      fetchOrders();
      fetchProducts();
    }
  }, [session]);

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (data) setOrders(data);
  };

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const updateOrderStatus = async (id: string, newStatus: string) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    fetchOrders();
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    let imageUrl = '';

    // 1. Upload Image to Supabase Storage
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, imageFile);
      
      if (!uploadError) {
        const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }
    }

    // 2. Save Product to Database
    if (imageUrl) {
      await supabase.from('products').insert([{
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        category: newProduct.category,
        description: newProduct.description,
        discount: parseFloat(newProduct.discount || '0'),
        image_url: imageUrl
      }]);
      setNewProduct({ name: '', price: '', category: '', description: '', discount: '0' });
      setImageFile(null);
      fetchProducts();
    }
    setIsUploading(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

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

  return (
    <div className="min-h-screen bg-[#faf5ff] flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#4c1d95] text-white p-6 flex flex-col">
        <h2 className="text-2xl font-serif font-bold mb-8">Craft Haus Admin</h2>
        <nav className="space-y-2 flex-1">
          <button onClick={() => setActiveTab('orders')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 ${activeTab === 'orders' ? 'bg-white/20' : 'hover:bg-white/10'}`}><Package className="w-5 h-5"/> Orders</button>
          <button onClick={() => setActiveTab('products')} className={`w-full text-left p-3 rounded-xl flex items-center gap-3 ${activeTab === 'products' ? 'bg-white/20' : 'hover:bg-white/10'}`}><Tag className="w-5 h-5"/> Products</button>
        </nav>
        <button onClick={() => supabase.auth.signOut()} className="p-3 rounded-xl flex items-center gap-3 hover:bg-white/10 mt-auto"><LogOut className="w-5 h-5"/> Log Out</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#4c1d95] mb-8">Manage Orders</h1>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-3xl shadow-sm border border-purple-100">
                  <div className="flex justify-between items-center border-b border-purple-50 pb-4 mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-[#2B2B2B]">#{order.id.split('-')[0].toUpperCase()}</h3>
                      <p className="text-sm text-gray-500">{order.customer_name} • {order.phone_number}</p>
                    </div>
                    <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)} className="px-4 py-2 rounded-lg bg-purple-50 border border-purple-100 text-sm font-medium outline-none">
                      <option value="Received">Received</option>
                      <option value="In progress">In Progress</option>
                      <option value="Ready">Ready</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                  <p><strong>Total:</strong> ₦{order.total_amount.toLocaleString()} ({order.payment_status})</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#4c1d95] mb-8">Manage Products</h1>
            
            {/* Add New Product Form */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-purple-100 mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Add New Product</h2>
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Product Name" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="p-3 rounded-xl bg-purple-50 border border-purple-100 outline-none" />
                <input type="number" placeholder="Price (₦)" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="p-3 rounded-xl bg-purple-50 border border-purple-100 outline-none" />
                <input type="text" placeholder="Category (e.g., Bags & Purses)" required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="p-3 rounded-xl bg-purple-50 border border-purple-100 outline-none" />
                <input type="number" placeholder="Discount % (Optional)" value={newProduct.discount} onChange={e => setNewProduct({...newProduct, discount: e.target.value})} className="p-3 rounded-xl bg-purple-50 border border-purple-100 outline-none" />
                <textarea placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="p-3 rounded-xl bg-purple-50 border border-purple-100 outline-none md:col-span-2" />
                
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-500 mb-2">Upload Image</label>
                  <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="w-full p-2 border border-purple-100 rounded-xl" required />
                </div>

                <button type="submit" disabled={isUploading} className="btn-primary md:col-span-2 flex items-center justify-center gap-2">
                  <Upload className="w-5 h-5" /> {isUploading ? 'Uploading...' : 'Add Product to Store'}
                </button>
              </form>
            </div>

            {/* Product List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.map(p => (
                <div key={p.id} className="bg-white p-4 rounded-2xl border border-purple-100 flex gap-4">
                  <img src={p.image_url} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-bold">{p.name}</h3>
                    <p className="text-sm text-gray-500">₦{p.price.toLocaleString()}</p>
                    <p className="text-xs text-purple-600">{p.category}</p>
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