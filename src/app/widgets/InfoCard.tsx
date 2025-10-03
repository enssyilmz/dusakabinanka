'use client';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { type Dispatch, type SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type InfoCardProps = {
  infoIndex: number;
  setInfoIndex: Dispatch<SetStateAction<number>>;
};

const infoItems = [
  {
    title: 'Yeni Yol',
    headline: 'Banyonuzu Tasarlayın',
    description:
      'Bilgisayarınızda veya tabletinizde RoomSketcher uygulamasıyla banyonuzu tasarlayın. Planınızı çizin.'
  },
  {
    title: 'Premium Cam ve Aksam',
    headline: 'Günlük Kullanıma Dayanıklı',
    description:
      'Temperli cam ve korozyona dayanıklı aksam uzun ömür ve kolay bakım sağlar.'
  },
  {
    title: 'Esnek Konfigürasyonlar',
    headline: 'Her Alana Uyar',
    description:
      'Sürgülü, menteşeli ve walk‑in sistemler arasından projenize uygun boyutlarla seçin.'
  }
];

export default function InfoCard({ infoIndex, setInfoIndex }: InfoCardProps) {
  const total = infoItems.length;
  const next = () => setInfoIndex((p) => (p + 1) % total);
  const prev = () => setInfoIndex((p) => (p - 1 + total) % total);
  const item = infoItems[infoIndex];

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ amount: 0.3 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-40 max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[380px] text-white"
    >
      <div className="relative bg-black/60 backdrop-blur-md p-2.5 sm:p-3 md:p-4 shadow-xl">
        <div className="absolute -top-7 sm:-top-8 md:-top-9 right-0 flex">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#2d5557" }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous info"
            onClick={prev}
            className="size-7 sm:size-8 md:size-9 grid place-items-center bg-[#376C6F] text-white rounded-none shadow-md transition-colors"
          >
            <FaChevronLeft className="size-[10px] sm:size-3 md:size-[14px]" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.9)" }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next info"
            onClick={next}
            className="size-7 sm:size-8 md:size-9 grid place-items-center bg-black/70 text-white rounded-none shadow-md transition-colors"
          >
            <FaChevronRight className="size-[10px] sm:size-3 md:size-[14px]" />
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={infoIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-[11px] sm:text-xs md:text-sm text-white/80">{item.title}</p>
            <h3 className="mt-1 font-semibold text-sm sm:text-base md:text-lg">{item.headline}</h3>
            <p className="mt-1.5 text-white/80 text-[11px] sm:text-xs md:text-sm">{item.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}


