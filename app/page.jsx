'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ZodiacWidget from '../components/ZodiacWidget';
import Services from '../components/Services';
import About from '../components/About';
import FocusAreas from '../components/FocusAreas';
import Testimonials from '../components/Testimonials';
import Faq from '../components/Faq';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import Celestial3DBackground from '../components/Celestial3DBackground';

export default function Home() {
  return (
    <main className="main-wrapper">
      {/* 3D Celestial Sacred Background on Light Surface */}
      <Celestial3DBackground />

      <Navbar />
      <Hero />
      <ZodiacWidget />
      <Services />
      <About />
      <FocusAreas />
      <Testimonials />
      <Faq />
      <Newsletter />
      <Footer />
    </main>
  );
}
