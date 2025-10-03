'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';

const slides = [
  { src: '/images/slide-1.jpg', alt: 'Slide 1' },
  { src: '/images/slide-2.jpg', alt: 'Slide 2' },
  { src: '/images/slide-3.jpg', alt: 'Slide 3' },
  { src: '/images/slide-4.jpg', alt: 'Slide 4' },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const go = useCallback((dir: 'left' | 'right') => {
    setIndex((prev) => {
      if (dir === 'left') return (prev - 1 + slides.length) % slides.length;
      return (prev + 1) % slides.length;
    });
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(() => setIndex((p) => (p + 1) % slides.length), 6000);
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onPrev = () => go('left');
    const onNext = () => go('right');
    window.addEventListener('hero-prev', onPrev as EventListener);
    window.addEventListener('hero-next', onNext as EventListener);
    return () => {
      window.removeEventListener('hero-prev', onPrev as EventListener);
      window.removeEventListener('hero-next', onNext as EventListener);
    };
  }, [go]);

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 z-10">
      {slides.map((s, i) => (
        <div key={s.src} className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}>
          <Image src={s.src} alt={s.alt} fill priority className="object-cover" sizes="100vw" />
        </div>
      ))}

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex gap-3 z-50 px-2 pointer-events-auto">
        {slides
          .map((s, i) => ({ ...s, i }))
          .filter(({ i }) => i !== index)
          .map(({ src, alt, i }) => (
            <button
              key={src}
              onClick={() => setIndex(i)}
              className="relative min-w-[80px] h-[66px] lg:min-w-[100px] lg:h-[78px] xl:min-w-[150px] xl:h-[90px] rounded-xl overflow-hidden bg-black shadow-lg focus:outline-none focus:ring-2 focus:ring-white/70"
              aria-label={`Go to ${alt}`}
            >
              <Image src={src} alt={alt} fill className="object-cover" sizes="150px" />
            </button>
          ))}
      </div>

      <div className="fixed right-3 top-1/2 -translate-y-1/2 flex lg:hidden flex-col items-center gap-3 z-50">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/60'} focus:outline-none focus:ring-2 focus:ring-white/70`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}


