'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';

export default function FocusAreas() {
  const { t } = useLanguage();
  const { openBooking } = useBooking();

  return (
    <section id="focus" className="focus-section">
      <div className="section-container">
        {/* Header */}
        <div className="section-header text-center">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>{t.focus.badge}</span>
          </div>
          <h2 className="section-title">{t.focus.title}</h2>
          <p className="section-subtitle">{t.focus.subtitle}</p>
        </div>

        {/* 6 Grid Items */}
        <div className="focus-areas-grid">
          {t.focus.items.map((item, idx) => (
            <div key={idx} className="focus-card-glass">
              <div className="focus-icon-box">{item.icon}</div>
              <h3 className="focus-card-title">{item.title}</h3>
              <p className="focus-card-desc">{item.desc}</p>
              <button
                type="button"
                onClick={() => openBooking('birth-chart')}
                className="focus-learn-more"
              >
                <span>{t.nav.bookNow}</span>
                <span className="focus-arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
