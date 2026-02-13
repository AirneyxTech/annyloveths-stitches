import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function JewelrySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const scrollToCollection = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#F6F2EA] py-20 lg:py-0 lg:flex lg:items-center"
    >
      <div className="w-full px-6 lg:px-[7vw]">
        <div className="flex flex-col gap-6 lg:gap-8 lg:h-[80vh]">
          {/* Top Wide Card */}
          <div
            className={`relative h-[40vh] lg:h-[38vh] rounded-[28px] overflow-hidden card-shadow transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
          >
            <img
  src="images/bag-tapestry.jpg" 
  alt="Handmade jewelry collection"
  className="w-full h-full object-cover"
/>
<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
<div className="absolute bottom-8 left-8 right-8">
  <h3 className="font-serif text-3xl lg:text-4xl text-white font-semibold mb-2">
    Jewelry & Small Goods
  </h3>
  <p className="text-white/80 text-sm lg:text-base max-w-lg">
    Chains, bangles, and crochet bags—designed to pair with everyday outfits.
  </p>
</div>
</div>

{/* Bottom Row */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 flex-1">
{/* Bottom Left Card */}
<div
  className={`relative h-[40vh] lg:h-full rounded-[22px] overflow-hidden card-shadow transition-all duration-1000 delay-200 ${
    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
  }`}
>
  <img
    src="images/bag-flower.jpg" 
    alt="Handmade crochet bag"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
    <span className="text-white font-medium">Shop Bags</span>
    <button
      onClick={scrollToCollection}
      className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
    >
      <ArrowRight className="w-5 h-5" />
    </button>
  </div>
</div>

{/* Bottom Right Card (Text) */}
<div
  className={`rounded-[22px] bg-white/70 backdrop-blur-sm p-8 flex flex-col justify-center card-shadow transition-all duration-1000 delay-400 ${
    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
  }`}
>
  <h3 className="font-serif text-2xl lg:text-3xl text-[#2B2B2B] font-semibold mb-3">
    Details that complete the look.
  </h3>
  <p className="text-[#6F6F6F] text-sm lg:text-base leading-relaxed mb-6">
    From delicate chains to structured mini bags, every piece is finished by hand and made to last.
  </p>
  <button
    onClick={scrollToCollection}
    className="self-start bg-[#D4A27F] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-[#c4936e] hover:shadow-lg flex items-center gap-2"
  >
    Shop Accessories
    <ArrowRight className="w-4 h-4" />
  </button>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}
