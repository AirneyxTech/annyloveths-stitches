import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function FeaturedKnits() {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 lg:h-[72vh]">
          {/* Micro Label */}
          <span
            className={`font-mono-label text-[#6F6F6F] lg:absolute lg:left-[7vw] lg:top-[9vh] transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Featured
          </span>

          {/* Left Feature Card */}
          <div
            className={`relative h-[50vh] lg:h-full rounded-[28px] overflow-hidden card-shadow transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
           {/* Left Column - Large Image */}
<img
  src="images/sweater-custom.jpg" 
  alt="Annyloveths Custom Sweater"
  className="w-full h-full object-cover"
/>
<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
{/* I changed bottom-8 to pb-10 to lift the text higher so it doesn't cut off */}
<div className="absolute bottom-0 left-8 right-8 pb-10">
  <h3 className="font-serif text-3xl lg:text-4xl text-white font-semibold mb-2">
    Signature Sweaters
  </h3>
  <p className="text-white/80 text-sm lg:text-base">
    Premium handmade sweaters and cardigans crafted for comfort.
  </p>
</div>
</div>

{/* Right Column */}
<div className="flex flex-col gap-6 lg:gap-8 h-full">
  {/* Right Top Card (Text) */}
  <div
    className={`flex-1 rounded-[22px] bg-white/70 backdrop-blur-sm p-8 flex flex-col justify-center card-shadow transition-all duration-1000 delay-200 ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
    }`}
  >
    <h3 className="font-serif text-2xl lg:text-3xl text-[#2B2B2B] font-semibold mb-3">
      Crafted with Love.
    </h3>
    <p className="text-[#6F6F6F] text-sm lg:text-base leading-relaxed">
      Each stitch at Annyloveths is made by hand, ensuring your piece is as unique as you are.
    </p>
  </div>

  {/* Right Bottom Card (Image) */}
  <div
    className={`flex-1 rounded-[22px] overflow-hidden card-shadow relative transition-all duration-1000 delay-400 ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
    }`}
  >
    <img
      src="images/hat-granny.jpg" 
      alt="Handmade Accessories Collection"
      className="w-full h-full object-cover"
    />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <span className="text-white font-medium">Explore Knitwear</span>
                <button
                  onClick={scrollToCollection}
                  className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
