import { useEffect, useRef, useState } from 'react';
import { Mail, MessageCircle, Send, Instagram, ArrowRight } from 'lucide-react';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const handleEmailClick = () => {
    // Updated to her real email
    window.location.href = 'mailto:annylovethscrafthaus@gmail.com';
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '2349118004875';
    const message = 'Hello AnnyLoveth, I have a question about your products.';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen bg-[#faf5ff] py-20 lg:py-28"
    >
      <div className="px-6 lg:px-[7vw]">
        <div className="max-w-[720px] mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h2 className="font-serif text-4xl lg:text-5xl text-[#2B2B2B] font-semibold mb-4">
              Keep in Touch
            </h2>
            <p className="text-gray-500 text-lg">
              Questions, collaborations, or a custom idea? Reach out anytime.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <button
              onClick={handleEmailClick}
              className={`flex items-center gap-4 p-6 bg-white/70 backdrop-blur-sm rounded-2xl card-shadow hover:shadow-lg transition-all duration-500 text-left group border border-purple-50 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Mail className="w-5 h-5 text-[#4c1d95]" />
              </div>
              <div>
                <span className="block text-sm text-gray-500 mb-1">Email</span>
                <span className="font-medium text-[#2B2B2B] text-sm break-all">annylovethscrafthaus@gmail.com</span>
              </div>
            </button>

            <button
              onClick={handleWhatsAppClick}
              className={`flex items-center gap-4 p-6 bg-white/70 backdrop-blur-sm rounded-2xl card-shadow hover:shadow-lg transition-all duration-500 text-left group border border-purple-50 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <MessageCircle className="w-5 h-5 text-[#4c1d95]" />
              </div>
              <div>
                <span className="block text-sm text-gray-500 mb-1">WhatsApp</span>
                <span className="font-medium text-[#2B2B2B]">+234 911 800 4875</span>
              </div>
            </button>
          </div>

          {/* Newsletter */}
          <div
            className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 lg:p-8 card-shadow border border-purple-50 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h3 className="font-serif text-xl text-[#2B2B2B] font-semibold mb-1">
                  Join the VIP List
                </h3>
                <p className="text-gray-500 text-sm">
                  Get updates on new pieces and exclusive offers.
                </p>
              </div>
            </div>

            {isSubscribed ? (
              <div className="flex items-center gap-3 text-green-600 py-3 font-medium">
                <Send className="w-5 h-5" />
                <span>Thanks for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#faf5ff] border border-purple-100 focus:border-[#4c1d95] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#4c1d95] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-[#3b1475] hover:shadow-lg flex items-center gap-2"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-purple-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} AnnyLoveth's Craft Haus. Built with care.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/annyloveth_crochet?igsh=MWp3ZWdrZnZqOW45dg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-purple-50 hover:bg-purple-100 rounded-full transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-[#4c1d95]" />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}