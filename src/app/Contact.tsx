'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { saveContactToFirestore } from '@/lib/firestoreService';
import MapComponent from './components/MapComponent';
import { FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const contactData = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await saveContactToFirestore(contactData);
      if (response.success) {
        alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        e.currentTarget.reset();
      } else {
        alert('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="iletisim" className="relative z-40 h-full w-full text-white" style={{ backgroundColor: '#376C6F' }}>
      <div className="px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 h-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 max-w-7xl mx-auto">
        {/* Left Side - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-4 md:mb-6"
          >
            İletişim
          </motion.h2>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4 sm:mb-6 md:mb-8 bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6"
          >
            <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 rounded-lg overflow-hidden shadow-lg">
              <MapComponent />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-2 sm:space-y-3 md:space-y-4"
          >
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                <FaMapMarkerAlt className="text-white text-xs sm:text-sm" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">Adres</h3>
                <p className="text-white/80 text-xs sm:text-sm md:text-base">Şahincili, Polatlı Şehitleri Cd. No:17/A, 52800 Altınordu/Ordu</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                <FaPhone className="text-white text-xs sm:text-sm" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">Telefon</h3>
                <p className="text-white/80 text-xs sm:text-sm md:text-base">0553 977 96 23</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                <FaClock className="text-white text-xs sm:text-sm" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">Çalışma Saatleri</h3>
                <p className="text-white/80 text-xs sm:text-sm md:text-base">08:00 - 19:00</p>
                <p className="text-white/60 text-xs sm:text-sm mt-0.5 sm:mt-1">Haftanın her günü (Pazar hariç)</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6"
          >
          </motion.h3>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-xl space-y-3 sm:space-y-4 md:space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                Ad Soyad
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:border-[#376C6F] focus:ring-2 focus:ring-[#376C6F]/20 outline-none transition-colors text-black"
                placeholder="Adınız ve soyadınız"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                Telefon
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:border-[#376C6F] focus:ring-2 focus:ring-[#376C6F]/20 outline-none transition-colors text-black"
                placeholder="Telefon numaranız"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                Konu
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:border-[#376C6F] focus:ring-2 focus:ring-[#376C6F]/20 outline-none transition-colors text-black"
                placeholder="Mesaj konusu"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                Mesaj
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:border-[#376C6F] focus:ring-2 focus:ring-[#376C6F]/20 outline-none transition-colors resize-none text-black"
                placeholder="Mesajınızı buraya yazın..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-[#376C6F] text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-[#2a5558] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}


