import { useEffect, useRef, useState } from 'react';
import { Send, Check } from 'lucide-react';

export default function CustomOrder() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    itemType: 'crochet',
    details: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        itemType: 'crochet',
        details: ''
      });
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="custom"
      className="relative w-full min-h-screen bg-[#F6F2EA] py-20 lg:py-0 lg:flex lg:items-center"
    >
      <div className="w-full px-6 lg:px-[7vw]">
        {/* Micro Label */}
        <span
          className={`font-mono-label text-[#6F6F6F] lg:absolute lg:left-[7vw] lg:top-[9vh] transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Custom
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 lg:h-[72vh]">
          {/* Left Form Card */}
          <div
            className={`rounded-[28px] bg-white/78 backdrop-blur-sm p-8 lg:p-10 flex flex-col card-shadow overflow-auto transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <h3 className="font-serif text-3xl lg:text-4xl text-[#2B2B2B] font-semibold mb-3">
              Made to Order
            </h3>
            <p className="text-[#6F6F6F] text-sm lg:text-base leading-relaxed mb-6">
              Want a different color, size, or a small detail changed? Send a request and I'll reply within 24 hours.
            </p>

            {isSubmitted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-serif text-2xl text-[#2B2B2B] font-semibold mb-2">
                  Request Sent!
                </h4>
                <p className="text-[#6F6F6F]">
                  I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <div className="space-y-4 flex-1">
                  <div>
                    <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F6F2EA] border border-transparent focus:border-[#D4A27F] focus:outline-none transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F6F2EA] border border-transparent focus:border-[#D4A27F] focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                      Item Type
                    </label>
                    <select
                      value={formData.itemType}
                      onChange={e => setFormData({ ...formData, itemType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F6F2EA] border border-transparent focus:border-[#D4A27F] focus:outline-none transition-colors"
                    >
                      <option value="crochet">Crochet Piece</option>
                      <option value="jewelry">Jewelry</option>
                      <option value="accessories">Accessories</option>
                      <option value="other">Something Else</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                      Details
                    </label>
                    <textarea
                      required
                      value={formData.details}
                      onChange={e => setFormData({ ...formData, details: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F6F2EA] border border-transparent focus:border-[#D4A27F] focus:outline-none transition-colors resize-none"
                      rows={3}
                      placeholder="Tell me about colors, sizes, or any specific details..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-[#D4A27F] text-white py-3.5 rounded-full font-medium transition-all duration-300 hover:bg-[#c4936e] hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Request
                </button>
              </form>
            )}
          </div>

          {/* Right Image Card */}
          <div
            className={`h-[40vh] lg:h-full rounded-[28px] overflow-hidden card-shadow relative transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
          >
            <img
  src="/images/sweater-custom.jpg"
  alt="Annyloveths Custom Handmade Sweater"
  className="w-full h-full object-cover"
/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-white/90 text-sm italic">
                "Every piece is made with intention and care."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
