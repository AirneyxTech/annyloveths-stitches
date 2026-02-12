import { useEffect, useRef, useState } from 'react';
import { Heart, Package, Leaf } from 'lucide-react';

export default function About() {
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

  const stats = [
    { icon: Heart, label: '100% Handmade' },
    { icon: Package, label: 'Small Batches' },
    { icon: Leaf, label: 'Natural Fibers' }
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen bg-[#F6F2EA] py-20 lg:py-28"
    >
      <div className="px-6 lg:px-[7vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={`w-full lg:w-1/2 aspect-[4/5] max-w-[500px] rounded-[28px] overflow-hidden card-shadow transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <img
              src="/images/about-portrait.jpg"
              alt="The maker in her studio"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div
            className={`w-full lg:w-1/2 lg:max-w-[500px] transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <span className="font-mono-label text-[#D4A27F] mb-4 block">
              Our Story
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-[#2B2B2B] font-semibold mb-6">
              About the Maker
            </h2>
            <p className="text-[#6F6F6F] text-lg leading-relaxed mb-8">
              I'm a self-taught maker working from a small studio. Every piece is cut, stitched, or woven slowly—meant to be worn often and kept for years.
            </p>
            <p className="text-[#6F6F6F] leading-relaxed mb-10">
              What started as a hobby has grown into a small business fueled by a love for slow fashion and sustainable practices. Each item is made to order or in small batches to minimize waste and ensure quality.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center p-4 bg-white/50 rounded-2xl transition-all duration-700`}
                  style={{ transitionDelay: `${(index + 3) * 100}ms` }}
                >
                  <stat.icon className="w-6 h-6 text-[#D4A27F] mb-2" />
                  <span className="text-sm font-medium text-[#2B2B2B]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
