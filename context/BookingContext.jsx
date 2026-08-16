'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeService, setActiveService] = useState('birth-chart');

  const openBooking = (serviceId = 'birth-chart') => {
    setActiveService(serviceId);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  // Close on Escape key or Android Native Back Button
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeBooking();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Native mobile back button handler
    let mobileHandler;
    const initMobileBack = async () => {
      try {
        const { App } = await import('@capacitor/app');
        mobileHandler = await App.addListener('backButton', ({ canGoBack }) => {
          if (isOpen) {
            closeBooking();
          } else if (canGoBack) {
            window.history.back();
          } else {
            App.exitApp();
          }
        });
      } catch (e) {
        // Fallback for standard web browser
      }
    };
    initMobileBack();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (mobileHandler && typeof mobileHandler.remove === 'function') {
        mobileHandler.remove();
      }
    };
  }, [isOpen]);

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        activeService,
        openBooking,
        closeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
