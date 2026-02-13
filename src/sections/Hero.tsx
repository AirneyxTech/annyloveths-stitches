import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToCollection = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCustom = () => {
    document.getElementById('custom')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen bg-[#F6F2EA] flex items-center justify-center py-20"
    >
      {/* Hero Card */}
      <div
        className={`relative w-[90vw] max-w-[1100px] min-h-[70vh] max-h-[720px] rounded-[28px] overflow-hidden card-shadow-lg transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-95'
        }`}
      >
       {/* Background Image */}
<div className="absolute inset-0">
  <img
    src="/images/bikini-blue.jpg" 
    alt="Annyloveths Stiches Featured Collection"
    className="w-full h-full object-cover"
  />
  {/* The overlay below makes the text easier to read over the photo */}
  <div className="absolute inset-0 bg-black/30" /> 
</div>

        {/* Content */}
        <div className="relative h-full min-h-[70vh] flex flex-col justify-center px-8 lg:px-16 py-16">
          <span
            className={`font-mono-label text-white/80 mb-4 transition-all duration-700 delay-150 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            Handmade Boutique
          </span>
          
          <h1
            className={`font-serif text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-[0.95] tracking-tight mb-6 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            Annyloveths Stiches
          </h1>
          
          <p
            className={`text-lg md:text-xl text-white/90 max-w-md mb-8 leading-relaxed transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Crochet, jewelry, and small goods—made slowly and with care.
          </p>
          
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              onClick={scrollToCollection}
              className="bg-[#D4A27F] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-[#c4936e] hover:shadow-lg flex items-center gap-2"
            >
              Browse Collection
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={scrollToCustom}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-white/30 border border-white/30"
            >
              Request a Custom Piece
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
