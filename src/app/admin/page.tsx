'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { saveImageToFirestore, getImagesFromFirestore, deleteImageFromFirestore, deleteMultipleImagesFromFirestore, ImageData } from '@/lib/firestoreService';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaCloudUploadAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function ImageUploadAdmin() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const router = useRouter();

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        router.push('/login');
      }
      setChecking(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Load images on component mount
  const loadImages = async () => {
    setLoading(true);
    const fetchedImages = await getImagesFromFirestore();
    setImages(fetchedImages);
    setLoading(false);
  };

  // Load images when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      loadImages();
    }
  }, [isAuthenticated]);

  // Show loading while checking auth
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#376C6F' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-xl"
        >
          Yükleniyor...
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Handle successful upload
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadSuccess = async (result: any) => {
    setUploading(true);
    
    const imageData = {
      url: result.info.secure_url,
      publicId: result.info.public_id,
      width: result.info.width,
      height: result.info.height,
      format: result.info.format,
    };

    const response = await saveImageToFirestore(imageData);
    
    if (response.success) {
      console.log('[admin] Fotoğraf başarıyla yüklendi');
      await loadImages(); // Refresh the list
    }
    
    setUploading(false);
  };

  // Handle image deletion
  const handleDelete = async (imageId: string) => {
    if (window.confirm('Bu görseli silmek istediğinizden emin misiniz?')) {
      const response = await deleteImageFromFirestore(imageId);
      if (response.success) {
        console.log('[admin] Fotoğraf silindi');
        await loadImages(); // Refresh the list
      }
    }
  };

  // Handle multiple image deletion
  const handleDeleteMultiple = async () => {
    if (selectedImages.length === 0) return;
    
    if (window.confirm(`${selectedImages.length} görseli silmek istediğinizden emin misiniz?`)) {
      const response = await deleteMultipleImagesFromFirestore(selectedImages);
      if (response.success) {
        console.log('[admin] Fotoğraflar toplu olarak silindi');
        setSelectedImages([]);
        setIsSelectionMode(false);
        await loadImages();
      }
    }
  };

  // Toggle selection mode
  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedImages([]);
  };

  // Toggle image selection
  const toggleImageSelection = (imageId: string) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  // Select all images
  const selectAllImages = () => {
    setSelectedImages(images.map(img => img.id!).filter(Boolean));
  };

  // Clear selection
  const clearSelection = () => {
    setSelectedImages([]);
  };

  // Handle logout
  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 flex-1">
              Admin Paneli
            </h1>
            <div className="flex-1 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
              >
                Çıkış
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Görsel Yükleme</h2>
            <div className="flex flex-col items-center justify-center h-full">
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default'}
                onSuccess={handleUploadSuccess}
              >
                {({ open }) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => open()}
                    disabled={uploading}
                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaCloudUploadAlt className="text-2xl" />
                    <span>{uploading ? 'Yükleniyor...' : 'Görsel Yükle'}</span>
                  </motion.button>
                )}
              </CldUploadWidget>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadImages}
                disabled={loading}
                className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                {loading ? 'Yükleniyor...' : 'Görselleri Yenile'}
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - Image Management */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Mevcut Görseller</h2>
              <div className="flex gap-2">
                {!isSelectionMode ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleSelectionMode}
                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Seç
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={selectAllImages}
                      className="px-3 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Tümünü Seç
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearSelection}
                      className="px-3 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Temizle
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDeleteMultiple}
                      disabled={selectedImages.length === 0}
                      className="px-3 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                      Sil ({selectedImages.length})
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleSelectionMode}
                      className="px-3 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <FaTimes />
                    </motion.button>
                  </>
                )}
              </div>
            </div>

            {/* Images Grid */}
            <AnimatePresence mode="popLayout">
              {images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-96 overflow-y-auto"
                >
                  {images.map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                      className={`relative rounded-xl shadow-lg overflow-hidden group cursor-pointer ${
                        isSelectionMode && selectedImages.includes(image.id!) ? 'ring-4 ring-blue-500' : ''
                      }`}
                      onClick={() => {
                        if (isSelectionMode && image.id) {
                          toggleImageSelection(image.id);
                        }
                      }}
                    >
                      {/* Selection Checkbox */}
                      {isSelectionMode && (
                        <div className="absolute top-2 left-2 z-10">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedImages.includes(image.id!) 
                              ? 'bg-blue-500 border-blue-500' 
                              : 'bg-white border-gray-300'
                          }`}>
                            {selectedImages.includes(image.id!) && (
                              <FaCheck className="text-white text-xs" />
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Image */}
                      <div className="relative aspect-square">
                        <Image
                          src={image.url}
                          alt="Uploaded image"
                          fill
                          className="object-cover"
                        />
                        
                        {/* Delete Button Overlay - Always visible in top-right */}
                        <motion.button
                          initial={{ opacity: 0 }}
                          whileHover={{ scale: 1.1 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (image.id) handleDelete(image.id);
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity shadow-lg z-10"
                        >
                          <FaTrash className="text-xs" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State */}
            {!loading && images.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-gray-400 text-lg">
                  Henüz görsel yüklenmedi. Sol taraftaki butona tıklayarak başlayın!
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
