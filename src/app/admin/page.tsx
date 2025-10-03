'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useState, useEffect } from 'react';
import { saveImageToFirestore, getImagesFromFirestore, deleteImageFromFirestore, ImageData } from '@/lib/firestoreService';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaCloudUploadAlt } from 'react-icons/fa';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function ImageUploadAdmin() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
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

  // Load images on component mount
  const loadImages = async () => {
    setLoading(true);
    const fetchedImages = await getImagesFromFirestore();
    setImages(fetchedImages);
    setLoading(false);
  };

  // Handle successful upload
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
      await loadImages(); // Refresh the list
    }
    
    setUploading(false);
  };

  // Handle image deletion
  const handleDelete = async (imageId: string) => {
    if (window.confirm('Bu görseli silmek istediğinizden emin misiniz?')) {
      const response = await deleteImageFromFirestore(imageId);
      if (response.success) {
        await loadImages(); // Refresh the list
      }
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 flex-1">
              Görsel Yönetim Paneli
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
          <p className="text-gray-600 text-sm sm:text-base">
            Cloudinary üzerinden görsel yükleyin ve Firebase&apos;de yönetin
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8"
        >
          <div className="flex flex-col items-center">
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

        {/* Images Grid */}
        <AnimatePresence mode="popLayout">
          {images.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative aspect-square">
                    <Image
                      src={image.url}
                      alt="Uploaded image"
                      fill
                      className="object-cover"
                    />
                    
                    {/* Delete Button Overlay */}
                    <motion.button
                      initial={{ opacity: 0 }}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => image.id && handleDelete(image.id)}
                      className="absolute top-2 right-2 p-3 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <FaTrash />
                    </motion.button>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-xs text-gray-500 truncate mb-2">
                      {image.publicId}
                    </p>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{image.width}x{image.height}</span>
                      <span className="uppercase">{image.format}</span>
                    </div>
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
              Henüz görsel yüklenmedi. Yukarıdaki butona tıklayarak başlayın!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
