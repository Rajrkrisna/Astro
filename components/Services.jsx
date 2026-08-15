'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';

export default function Services() {
  const { t } = useLanguage();
  const { openBooking } = useBooking();

  return (
    <section id="services" className="services-section">
      <div className="section-container">
        {/* Header */}
        <div className="section-header text-center">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>{t.services.badge}</span>
          </div>
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-subtitle">{t.services.subtitle}</p>
        </div>

        {/* Services Grid */}
        <div className="services-cards-grid">
          {t.services.items.map((service) => (
            <div key={service.id} className="service-card-premium">
              <div className="service-card-top">
                <div className="service-icon-glow">{service.icon}</div>
                <h3 className="service-card-title">{service.title}</h3>
              </div>

              <p className="service-card-desc">{service.description}</p>

              <div className="service-highlights-list">
                {service.highlights.map((highlight, idx) => (
                  <div key={idx} className="highlight-item">
                    <span className="highlight-dot">✦</span>
                    <span className="highlight-text">{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="service-card-action">
                <button
                  type="button"
                  onClick={() => openBooking(service.id)}
                  className="btn-service-book"
                  aria-label={`Book ${service.title}`}
                >
                  <span>{t.services.bookThisService}</span>
                  <span className="service-btn-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
