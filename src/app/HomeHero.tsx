'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaTwitter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import HeroSlider from './widgets/HeroSlider';
import InfoCard from './widgets/InfoCard';

export default function HomeHero() {
  const [infoIndex, setInfoIndex] = useState(0);
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Left side panel - desktop only */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden sm:block fixed left-0 top-0 bottom-0 z-40 overflow-hidden w-[200px] sm:w-[220px] md:w-[280px] lg:w-[360px]"
      >
        <Image src="/images/left-side.png" alt="Left Side" fill priority draggable={false} className="object-cover object-left -z-10" />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ amount: 0.3 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <Link href="/" aria-label="Ana sayfa" className="inline-flex items-center mt-4 ml-4 sm:mt-6 sm:ml-6 md:mt-8 md:ml-8">
            <Image src="/images/logo.png" alt="Logo" width={80} height={80} className="sm:w-20 sm:h-20 md:w-24 md:h-24" />
          </Link>
        </motion.div>
        <motion.nav 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: 0.3 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute flex flex-col gap-3.5 mt-2 left-0 top-1/2 -translate-y-1/2 items-center justify-center"
        >
          <motion.span 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="w-1 bg-white h-[160px] mt-2" 
          />
          <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
            <Link href="https://www.instagram.com/dusakabinanka" aria-label="Instagram" className="grid place-items-center size-10 text-white">
              <FaInstagram className="size-10" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
            <Link href="#" aria-label="Facebook" className="grid place-items-center size-9.5 text-white border-3 border-white rounded-xl">
              <FaFacebookF className="size-5" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
            <Link href="#" aria-label="Twitter" className="grid place-items-center size-9.5 text-white border-3 border-white rounded-xl">
              <FaTwitter className="size-5" />
            </Link>
          </motion.div>
          <motion.span 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="w-1 bg-white h-[160px] mt-2" 
          />
        </motion.nav>
      </motion.aside>

      {/* Mobile logo */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Link href="/" aria-label="Ana sayfa" className="sm:hidden fixed top-4 left-4 z-40 inline-flex items-center">
          <Image src="/images/logo.png" alt="Logo" width={64} height={64} />
        </Link>
      </motion.div>

      {/* Mobile social icons */}
      <motion.nav 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.3 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="sm:hidden fixed top-4 right-4 z-40 flex gap-3 items-center"
      >
        <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
          <Link href="https://www.instagram.com/dusakabinanka" aria-label="Instagram" className="grid place-items-center size-8 text-white ">
            <FaInstagram className="size-8" />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
          <Link href="#" aria-label="Facebook" className="grid place-items-center size-8 text-white border-2 border-white rounded-lg">
            <FaFacebookF className="size-4" />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
          <Link href="#" aria-label="Twitter" className="grid place-items-center size-8 text-white border-2 border-white rounded-lg">
            <FaTwitter className="size-4" />
          </Link>
        </motion.div>
      </motion.nav>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        className="fixed z-40 left-1/2 -translate-x-1/2 sm:left-[130px] sm:translate-x-0 md:left-[160px] lg:left-[200px] xl:left-[220px] top-1/2 -translate-y-1/2 text-white pointer-events-none select-none text-center sm:text-left px-4 sm:px-0 max-w-[90vw] sm:max-w-none"
      >
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] leading-tight"
        >
          ANKA DUŞAKABİN
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-2 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] leading-snug"
        >
          Duşakabin toptan ve perakende
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.3 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-4 sm:mt-5 pointer-events-auto"
        >
          <motion.a 
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            href="#katalog" 
            className="inline-block px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-sm sm:text-base md:text-lg font-semibold rounded-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" 
            style={{ backgroundColor: '#fff', color: '#376C6F' }}
          >
            KEŞFET
          </motion.a>
        </motion.div>
      </motion.div>

      <HeroSlider />
      <InfoCard infoIndex={infoIndex} setInfoIndex={setInfoIndex} />

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ amount: 0.3 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="fixed bottom-6 left-6 z-40 hidden lg:flex items-center gap-3"
      >
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
          whileTap={{ scale: 0.9 }}
          aria-label="Önceki" 
          onClick={() => window.dispatchEvent(new Event('hero-prev'))} 
          className="size-11 rounded-full grid place-items-center bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
        >
          <FaChevronLeft className="size-5" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
          whileTap={{ scale: 0.9 }}
          aria-label="Sonraki" 
          onClick={() => window.dispatchEvent(new Event('hero-next'))} 
          className="size-11 rounded-full grid place-items-center bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
        >
          <FaChevronRight className="size-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}


