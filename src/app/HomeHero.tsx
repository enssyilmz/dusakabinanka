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
    <>
      <aside className="absolute left-0 top-0 bottom-0 z-40 overflow-hidden w-[300px] md:w-[300px] lg:w-[360px]">
        <Image src="/images/left-side.png" alt="Left Side" fill priority draggable={false} className="object-cover object-left -z-10" />
        <Link href="/" aria-label="Ana sayfa" className="inline-flex items-center mt-8 ml-8 md:mt-6 md:ml-6 sm:ml-4 sm:mt-4  ">
          <Image src="/images/logo.png" alt="Logo" width={96} height={96} />
        </Link>
        <nav className="flex flex-col gap-3.5 mt-2 absolute left-0 top-1/2 -translate-y-1/2 items-center justify-center ">
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

      <div className="absolute z-50 left-[120px] sm:left-[100px] md:left-[120px] lg:left-[150px] translate-x-6  lg:top-48 md:top-40 sm:top-34 text-white pointer-events-none select-none">
        <h1 className="sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">ANKA DUŞAKABİN</h1>
        <p className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">Duşakabin toptan ve perakende</p>
        <div className="mt-5 pointer-events-auto">
          <a href="#katalog" className="inline-block px-6 py-3 font-semibold rounded-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" style={{ backgroundColor: '#fff', color: '#376C6F' }}>KEŞFET</a>
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

      {/* Scroll spacer: hero kapladığı için alttaki içerik için boşluk */}
      <div className="h-screen" />
    </>
  );
}


