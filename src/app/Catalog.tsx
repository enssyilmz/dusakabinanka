'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { getImagesFromFirestore, ImageData } from '@/lib/firestoreService';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Catalog() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Default desktop

  // Handle responsive items per page
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) { // Desktop (lg) - 4x2 = 8
        setItemsPerPage(8);
      } else if (width >= 768) { // Tablet (md) - 3x2 = 6
        setItemsPerPage(6);
      } else { // Mobile (sm and below) - 2x2 = 4
        setItemsPerPage(4);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset to first page when items per page changes
  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage]);

  // Load images from Firebase
  useEffect(() => {
    const loadImages = async () => {
      try {
        const fetchedImages = await getImagesFromFirestore();
        setImages(fetchedImages);
      } catch (error) {
        console.error('[catalog] Error loading images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  // Handle image click
  const handleImageClick = (image: ImageData, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  // Pagination functions
  const totalPages = Math.ceil(images.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentImages = images.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Navigate between images in modal
  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + images.length) % images.length
      : (currentIndex + 1) % images.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  }, [selectedImage, currentIndex, images]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'ArrowRight') navigateImage('next');
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex, images, navigateImage]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  };

  if (loading) {
    return (
      <section id="katalog" className="relative z-50 min-h-screen w-full bg-[#376C6F] text-white">
        <div className="px-4 sm:px-6 py-12 sm:py-16 max-w-7xl mx-auto flex items-center justify-center">
          <div className="text-xl">Yükleniyor...</div>
        </div>
      </section>
    );
  }

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

        {images.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl">Henüz görsel yüklenmedi.</p>
          </div>
        ) : (
          <>
            {/* Images Grid */}
            <motion.div 
              key={`page-${currentPage}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8"
            >
              {currentImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleImageClick(image, startIndex + index)}
                  className="border border-white/20 rounded-xl overflow-hidden shadow-lg bg-white text-black cursor-pointer hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={image.url}
                      alt="Katalog görseli"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 gap-4">
                {/* Previous Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goToPreviousPage}
                  disabled={currentPage === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft />
                  <span>Önceki</span>
                </motion.button>

                {/* Page Numbers */}
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => goToPage(i)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        currentPage === i
                          ? 'bg-white text-[#376C6F] font-semibold'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {i + 1}
                    </motion.button>
                  ))}
                </div>

                {/* Next Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages - 1}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Sonraki</span>
                  <FaChevronRight />
                </motion.button>
              </div>
            )}

            {/* Page Info */}
            {images.length > 0 && (
              <div className="text-center mt-4 text-white/70">
                Sayfa {currentPage + 1} / {totalPages} • Toplam {images.length} görsel
              </div>
            )}
          </>
        )}

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl max-h-[90vh] w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateImage('prev')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                      <FaChevronLeft className="text-xl" />
                    </button>
                    <button
                      onClick={() => navigateImage('next')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                      <FaChevronRight className="text-xl" />
                    </button>
                  </>
                )}

                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={selectedImage.url}
                    alt="Büyütülmüş görsel"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                    {currentIndex + 1} / {images.length}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}


