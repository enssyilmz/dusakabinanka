'use client';

import { motion } from 'framer-motion';

export default function Catalog() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="katalog" className="relative z-50 min-h-screen w-full bg-[#376C6F] text-white">
      <div className="px-4 sm:px-6 py-12 sm:py-16 max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8"
        >
          Katalog
        </motion.h2>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.98 }}
              className="border border-white/20 rounded-lg overflow-hidden shadow-sm bg-white text-black cursor-pointer"
            >
              <div className="aspect-[4/3] bg-gray-100 grid place-items-center text-xs sm:text-sm md:text-base text-gray-400">
                Ürün Görseli
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-sm sm:text-base md:text-lg">Ürün {i + 1}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Kısa açıklama (fiyat yok).</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


