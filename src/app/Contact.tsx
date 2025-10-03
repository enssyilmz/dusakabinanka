'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="iletisim" className="relative z-50 min-h-screen w-full bg-gray-50 text-black">
      <div className="px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6"
          >
            İletişim
          </motion.h2>
          <motion.ul 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg"
          >
            {['Adres: Mağaza Konumu, Şehir/İlçe', 'Telefon: 0 (5xx) 000 00 00', 'E-posta: info@ankadusakabin.com', 'Çalışma Saatleri: 09:00 - 19:00'].map((text, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                dangerouslySetInnerHTML={{ __html: text.replace(/^(\w+):/, '<strong>$1:</strong>') }}
              />
            ))}
          </motion.ul>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm grid grid-cols-1 gap-3 sm:gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log('[page] İletişim formu gönderildi');
            alert('Talebiniz alındı. En kısa sürede dönüş yapacağız.');
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex flex-col gap-1.5 sm:gap-2"
            >
              <label htmlFor="adSoyad" className="font-medium text-sm sm:text-base">Ad Soyad</label>
              <input id="adSoyad" name="adSoyad" required className="border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:border-gray-500 transition-colors" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-col gap-1.5 sm:gap-2"
            >
              <label htmlFor="telefon" className="font-medium text-sm sm:text-base">Telefon</label>
              <input id="telefon" name="telefon" required className="border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:border-gray-500 transition-colors" />
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-col gap-1.5 sm:gap-2"
          >
            <label htmlFor="aciklama" className="font-medium text-sm sm:text-base">Açıklama</label>
            <textarea id="aciklama" name="aciklama" rows={6} required className="border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:border-gray-500 transition-colors" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(55, 108, 111, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              type="submit" 
              className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-none transition-all" 
              style={{ backgroundColor: '#376C6F', color: '#ffffff' }}
            >
              Gönder
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}


