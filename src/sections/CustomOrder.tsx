import { useEffect, useRef, useState } from 'react';
import { Send, Check, Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function CustomOrder() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', itemType: 'Crochet', details: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let imageUrl = '';

    // 1. Upload Inspiration Image if they added one
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('customer-inspo').upload(fileName, imageFile);
      
      if (!uploadError) {
        const { data } = supabase.storage.from('customer-inspo').getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }
    }

    // 2. Save to Database
    const { error } = await supabase.from('custom_orders').insert([{
      customer_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      item_type: formData.itemType,
      details: formData.details,
      inspiration_image_url: imageUrl || null
    }]);

    if (error) {
      alert("Something went wrong. Please try again.");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', itemType: 'Crochet', details: '' });
      setImageFile(null);
    }, 5000);
  };

  return (
    <section ref={sectionRef} id="custom" className="relative w-full min-h-screen bg-[#faf5ff] py-20 lg:py-0 lg:flex lg:items-center">
      <div className="w-full px-6 lg:px-[7vw]">
        <span className={`font-mono-label lg:absolute lg:left-[7vw] lg:top-[9vh] transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Custom</span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 lg:h-[72vh]">
          <div className={`rounded-[28px] bg-white/78 backdrop-blur-sm p-8 lg:p-10 flex flex-col card-shadow overflow-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h3 className="font-serif text-3xl lg:text-4xl text-[#2B2B2B] font-semibold mb-3">Made to Order</h3>
            <p className="text-gray-500 text-sm lg:text-base leading-relaxed mb-6">
              Want a different color, size, or a custom piece you didn't see? Send a request and I'll reply within 24 hours.
            </p>

            {isSubmitted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-[#4c1d95]" />
                </div>
                <h4 className="font-serif text-2xl text-[#2B2B2B] font-semibold mb-2">Request Sent!</h4>
                <p className="text-gray-500">I'll review your inspiration and get back to you.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <div className="space-y-4 flex-1">
                  <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#faf5ff] border border-purple-100 focus:border-[#4c1d95] outline-none" placeholder="Your Name" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#faf5ff] border border-purple-100 focus:border-[#4c1d95] outline-none" placeholder="Email" />
                    <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#faf5ff] border border-purple-100 focus:border-[#4c1d95] outline-none" placeholder="Phone" />
                  </div>
                  <select value={formData.itemType} onChange={e => setFormData({ ...formData, itemType: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#faf5ff] border border-purple-100 focus:border-[#4c1d95] outline-none">
                    <option value="Crochet">Crochet Piece</option>
                    <option value="Jewelry">Jewelry / Waistbeads</option>
                    <option value="Bags">Bags</option>
                    <option value="Other">Something Else</option>
                  </select>
                  <textarea required value={formData.details} onChange={e => setFormData({ ...formData, details: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#faf5ff] border border-purple-100 focus:border-[#4c1d95] outline-none resize-none" rows={2} placeholder="Describe colors, sizes, or any specific details..." />
                  
                  {/* Image Upload for Inspiration */}
                  <div className="border-2 border-dashed border-purple-200 rounded-xl p-4 text-center cursor-pointer hover:bg-purple-50 transition-colors relative">
                    <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <Upload className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">{imageFile ? imageFile.name : "Upload Inspiration Image (Optional)"}</p>
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="w-full mt-6 bg-[#4c1d95] text-white py-3.5 rounded-full font-medium transition-all hover:bg-[#3b1475] flex items-center justify-center gap-2 disabled:opacity-70">
                  <Send className="w-4 h-4" />
                  {isLoading ? 'Sending...' : 'Send Request'}
                </button>
              </form>
            )}
          </div>

          <div className={`hidden lg:block h-full rounded-[28px] overflow-hidden card-shadow relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <img src="/images/sweater-custom.jpg" alt="Custom" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4c1d95]/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}