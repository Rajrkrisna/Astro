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
  const { openBooking } = useBooking();

  useEffect(() => {
    openBooking(serviceParam || 'birth-chart');
  }, [serviceParam]);

  return (
    <main className="booking-page-wrapper">
      <Celestial3DBackground />
      <Navbar />

      <section className="booking-dedicated-side-wrapper">
        <BookingSection initialService={serviceParam || 'birth-chart'} />
      </section>

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
