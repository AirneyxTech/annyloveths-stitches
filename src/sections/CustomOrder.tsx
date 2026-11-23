import { useEffect, useRef, useState } from 'react';
import { Send, Check } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Ensure you created src/lib/supabase.ts!

export default function CustomOrder() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    itemType: 'Crochet',
    details: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. Save to Database
    const { error } = await supabase.from('custom_orders').insert([{
      customer_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      item_type: formData.itemType,
      details: formData.details
    }]);

    if (error) {
      alert("Something went wrong. Please try again.");
      setIsLoading(false);
      return;
    }

    // 2. Open WhatsApp
    const text = `Hello AnnyLoveth! I'd like to make a custom order.\n\n*Name:* ${formData.name}\n*Item Type:* ${formData.itemType}\n*Details:* ${formData.details}\n\nMy email is ${formData.email} and my phone is ${formData.phone}.`;
    window.open(`https://wa.me/2349118004875?text=${encodeURIComponent(text)}`, '_blank');

    setIsLoading(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', itemType: 'Crochet', details: '' });
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
              Want a different color, size, or a small detail changed? Send a request and I'll reply within 24 hours.
            </p>

            {isSubmitted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-[#4c1d95]" />
                </div>
                <h4 className="font-serif text-2xl text-[#2B2B2B] font-semibold mb-2">Request Sent!</h4>
                <p className="text-gray-500">Check your WhatsApp to confirm.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <div className="space-y-4 flex-1">
                  <div>
                    <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Your Name</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#faf5ff] border border-purple-100 focus:border-[#d8b4fe] focus:outline-none" placeholder="Enter your name" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Email</label>
                      <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#faf5ff] border border-purple-100 focus:border-[#d8b4fe] focus:outline-none" placeholder="you@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Phone Number</label>
                      <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#faf5ff] border border-purple-100 focus:border-[#d8b4fe] focus:outline-none" placeholder="0801 234 5678" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Item Type</label>
                    <select value={formData.itemType} onChange={e => setFormData({ ...formData, itemType: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#faf5ff] border border-purple-100 focus:border-[#d8b4fe] focus:outline-none">
                      <option value="Crochet">Crochet Piece</option>
                      <option value="Jewelry">Jewelry / Waistbeads</option>
                      <option value="Bags">Bags</option>
                      <option value="Other">Something Else</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2B2B2B] mb-2">Details</label>
                    <textarea required value={formData.details} onChange={e => setFormData({ ...formData, details: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#faf5ff] border border-purple-100 focus:border-[#d8b4fe] focus:outline-none resize-none" rows={3} placeholder="Tell me about colors, sizes, or any specific details..." />
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="w-full mt-6 bg-[#4c1d95] text-white py-3.5 rounded-full font-medium transition-all duration-300 hover:bg-[#3b1475] hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70">
                  <Send className="w-4 h-4" />
                  {isLoading ? 'Sending...' : 'Send Request'}
                </button>
              </form>
            )}
          </div>

          <div className={`h-[40vh] lg:h-full rounded-[28px] overflow-hidden card-shadow relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <img src="/images/sweater-custom.jpg" alt="Annyloveths Custom Handmade Sweater" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4c1d95]/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-white/90 text-sm italic">"Every piece is made with intention and care."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}