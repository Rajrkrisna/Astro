'use client';

import React, { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Celestial3DBackground from '../../components/Celestial3DBackground';
import { useBooking } from '../../context/BookingContext';
import BookingSection from '../../components/BookingSection';

function BookingPageContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');
  const { closeBooking } = useBooking();

  useEffect(() => {
    // Ensure overlay drawer is closed so the dedicated page form renders stably
    closeBooking();
  }, []);

  return (
    <main className="booking-page-wrapper">
      <Celestial3DBackground />
      <Navbar />

      <div className="booking-page-content-container">
        <BookingSection initialService={serviceParam || 'birth-chart'} isDedicatedPage={true} />
      </div>

      <Footer />
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="loading-spinner-gold" style={{ margin: '8rem auto' }}></div>}>
      <BookingPageContent />
    </Suspense>
  );
}
