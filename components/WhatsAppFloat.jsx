'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';

export default function WhatsAppFloat() {
  const { lang, t } = useLanguage();
  const { openBooking } = useBooking();

  const getWaText = () => {
    switch (lang) {
      case 'ta':
        return 'வாட்ஸ்அப்';
      case 'hi':
        return 'व्हाट्सएप';
      default:
        return 'WhatsApp';
    }
  };

  const getBookText = () => {
    switch (lang) {
      case 'ta':
        return 'முன்பதிவு';
      case 'hi':
        return 'परामर्श बुक करें';
      default:
        return 'Book Now';
    }
  };

  const getWaMsg = () => {
    switch (lang) {
      case 'ta':
        return encodeURIComponent('வணக்கம் ஜோதிடர் பார்த்தசாரதி ஐயா, நான் ஜோதிட ஆலோசனை பெற விரும்புகிறேன்.');
      case 'hi':
        return encodeURIComponent('नमस्ते ज्योतिषाचार्य पार्थसारथी जी, मुझे ज्योतिष परामर्श प्राप्त करना है।');
      default:
        return encodeURIComponent('Vanakkam Astrologer Parthasarathy Ji, I would like to consult regarding Astrology.');
    }
  };

  return (
    <>
      {/* Desktop Floating WhatsApp Button */}
      <div className="whatsapp-float-container desktop-only-float">
        <a
          href={`https://wa.me/919367780030?text=${getWaMsg()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float-btn"
          aria-label="Chat on WhatsApp"
        >
          <span className="whatsapp-pulse"></span>
          <span className="whatsapp-icon">💬</span>
          <span className="whatsapp-label">{getWaText()}</span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Action Bar with 1-Tap Booking & WhatsApp */}
      <div className="mobile-bottom-bar">
        <button
          type="button"
          onClick={() => openBooking('birth-chart')}
          className="mobile-bar-btn mobile-bar-book"
        >
          <span className="bar-icon">📅</span>
          <span className="bar-label">{getBookText()}</span>
        </button>

        <a
          href={`https://wa.me/919367780030?text=${getWaMsg()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-bar-btn mobile-bar-wa"
          aria-label="WhatsApp"
        >
          <span className="bar-icon">💬</span>
          <span className="bar-label">{getWaText()}</span>
        </a>

        <a
          href="tel:+919367780030"
          className="mobile-bar-btn mobile-bar-call"
          aria-label="Call Astrologer"
        >
          <span className="bar-icon">📞</span>
          <span className="bar-label">Call</span>
        </a>
      </div>
    </>
  );
}
