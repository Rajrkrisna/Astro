'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function WhatsAppFloat() {
  const { lang } = useLanguage();

  const getWaText = () => {
    switch (lang) {
      case 'ta':
        return 'வாட்ஸ்அப் ஆலோசனை';
      case 'hi':
        return 'व्हाट्सएप परामर्श';
      default:
        return 'WhatsApp Us';
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
    <div className="whatsapp-float-container">
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
  );
}
