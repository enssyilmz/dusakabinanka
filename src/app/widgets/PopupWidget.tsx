'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import { useEffect } from 'react';

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface PopupContextType {
  showPopup: (props: Omit<PopupProps, 'isOpen' | 'onClose'>) => void;
  hidePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function PopupProvider({ children }: { children: ReactNode }) {
  const [popupConfig, setPopupConfig] = useState<Omit<PopupProps, 'isOpen' | 'onClose'> | null>(null);

  const showPopup = (props: Omit<PopupProps, 'isOpen' | 'onClose'>) => {
    setPopupConfig(props);
  };

  const hidePopup = () => {
    setPopupConfig(null);
  };

  return (
    <PopupContext.Provider value={{ showPopup, hidePopup }}>
      {children}
      {popupConfig && (
        <PopupWidgetComponent
          {...popupConfig}
          isOpen={true}
          onClose={hidePopup}
        />
      )}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
}

function PopupWidgetComponent({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type = 'info',
  duration = 5000 
}: PopupProps) {
  // Auto close after duration
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const getIconAndColor = () => {
    switch (type) {
      case 'success':
        return { 
          icon: FaCheckCircle, 
          bgColor: 'bg-green-500', 
          ringColor: 'ring-green-500/20',
          iconColor: 'text-white'
        };
      case 'error':
        return { 
          icon: FaExclamationCircle, 
          bgColor: 'bg-red-500', 
          ringColor: 'ring-red-500/20',
          iconColor: 'text-white'
        };
      case 'warning':
        return { 
          icon: FaExclamationCircle, 
          bgColor: 'bg-yellow-500', 
          ringColor: 'ring-yellow-500/20',
          iconColor: 'text-white'
        };
      default:
        return { 
          icon: FaInfoCircle, 
          bgColor: 'bg-[#376C6F]', 
          ringColor: 'ring-[#376C6F]/20',
          iconColor: 'text-white'
        };
    }
  };

  const { icon: Icon, bgColor, ringColor, iconColor } = getIconAndColor();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Popup */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            >
              {/* Header */}
              <div className={`${bgColor} px-6 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <Icon className={`${iconColor} text-xl`} />
                  <h3 className="text-white font-semibold text-lg">
                    {title || (type === 'success' ? 'Başarılı' : type === 'error' ? 'Hata' : type === 'warning' ? 'Uyarı' : 'Bilgi')}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {message}
                </p>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 flex justify-end">
                <button
                  onClick={onClose}
                  className={`${bgColor} text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${ringColor}`}
                >
                  Tamam
                </button>
              </div>

              {/* Progress bar for auto-close */}
              {duration > 0 && (
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: duration / 1000, ease: 'linear' }}
                  className={`h-1 ${bgColor} absolute bottom-0 left-0`}
                />
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Default export for backward compatibility
export default PopupWidgetComponent;