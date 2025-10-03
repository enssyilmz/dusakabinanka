'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import HeroSlider from './widgets/HeroSlider';
import InfoCard from './widgets/InfoCard';

export default function HomeHero() {
  const [infoIndex, setInfoIndex] = useState(0);
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Left side panel - desktop only */}
      <aside className="hidden sm:block fixed left-0 top-0 bottom-0 z-40 overflow-hidden w-[200px] sm:w-[220px] md:w-[280px] lg:w-[360px]">
        <Image src="/images/left-side.png" alt="Left Side" fill priority draggable={false} className="object-cover object-left -z-10" />
        <Link href="/" aria-label="Ana sayfa" className="inline-flex items-center mt-4 ml-4 sm:mt-6 sm:ml-6 md:mt-8 md:ml-8">
          <Image src="/images/logo.png" alt="Logo" width={80} height={80} className="sm:w-20 sm:h-20 md:w-24 md:h-24" />
        </Link>
        <nav className="absolute flex flex-col gap-3.5 mt-2 left-0 top-1/2 -translate-y-1/2 items-center justify-center">
          <span className="w-1 bg-white h-[160px] mt-2" />
          <Link href="#" aria-label="Instagram" className="grid place-items-center size-10 text-white">
            <FaInstagram className="size-10" />
          </Link>
          <Link href="#" aria-label="Facebook" className="grid place-items-center size-9.5 text-white border-3 border-white rounded-xl">
            <FaFacebookF className="size-5" />
          </Link>
          <Link href="#" aria-label="Twitter" className="grid place-items-center size-9.5 text-white border-3 border-white rounded-xl">
            <FaTwitter className="size-5" />
          </Link>
          <span className="w-1 bg-white h-[160px] mt-2" />
        </nav>
      </aside>

      {/* Mobile logo */}
      <Link href="/" aria-label="Ana sayfa" className="sm:hidden fixed top-4 left-4 z-40 inline-flex items-center">
        <Image src="/images/logo.png" alt="Logo" width={64} height={64} />
      </Link>

      {/* Mobile social icons */}
      <nav className="sm:hidden fixed top-4 right-4 z-40 flex gap-3 items-center">
        <Link href="#" aria-label="Instagram" className="grid place-items-center size-8 text-white">
          <FaInstagram className="size-8" />
        </Link>
        <Link href="#" aria-label="Facebook" className="grid place-items-center size-8 text-white border-2 border-white rounded-lg">
          <FaFacebookF className="size-4" />
        </Link>
        <Link href="#" aria-label="Twitter" className="grid place-items-center size-8 text-white border-2 border-white rounded-lg">
          <FaTwitter className="size-4" />
        </Link>
      </nav>

      <div className="fixed z-40 left-1/2 -translate-x-1/2 sm:left-[130px] sm:translate-x-0 md:left-[160px] lg:left-[200px] xl:left-[220px] top-1/2 -translate-y-1/2 text-white pointer-events-none select-none text-center sm:text-left px-4 sm:px-0 max-w-[90vw] sm:max-w-none">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] leading-tight">ANKA DUŞAKABİN</h1>
        <p className="mt-2 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] leading-snug">Duşakabin toptan ve perakende</p>
        <div className="mt-4 sm:mt-5 pointer-events-auto">
          <a href="#katalog" className="inline-block px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-sm sm:text-base md:text-lg font-semibold rounded-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-transform hover:scale-105" style={{ backgroundColor: '#fff', color: '#376C6F' }}>KEŞFET</a>
        </div>
      </div>

      <HeroSlider />
      <InfoCard infoIndex={infoIndex} setInfoIndex={setInfoIndex} />

      <div className="fixed bottom-6 left-6 z-50 hidden lg:flex items-center gap-3">
        <button aria-label="Önceki" onClick={() => window.dispatchEvent(new Event('hero-prev'))} className="size-11 rounded-full grid place-items-center bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60">
          <FaChevronLeft className="size-5" />
        </button>
        <button aria-label="Sonraki" onClick={() => window.dispatchEvent(new Event('hero-next'))} className="size-11 rounded-full grid place-items-center bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60">
          <FaChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}


