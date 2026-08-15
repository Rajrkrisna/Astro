'use client';

import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { zodiacData } from '../data/zodiacData';

export default function ZodiacWidget() {
  const { t, lang } = useLanguage();
  const { openBooking } = useBooking();
  const [selectedSign, setSelectedSign] = useState(zodiacData[0]);
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  return (
    <section id="horoscope" className="zodiac-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>{t.zodiac.badge}</span>
          </div>
          <h2 className="section-title">{t.zodiac.title}</h2>
          <p className="section-subtitle">{t.zodiac.subtitle}</p>
        </div>

        {/* Carousel with Side Cursor Arrows */}
        <div className="zodiac-carousel-wrapper">
          <button
            type="button"
            className="zodiac-nav-arrow arrow-left"
            onClick={scrollLeft}
            aria-label="Previous zodiac signs"
            title="Previous Signs"
          >
            ❮
          </button>

          <div className="zodiac-scroll-track" ref={scrollContainerRef}>
            {zodiacData.map((sign) => {
              const isSelected = selectedSign.id === sign.id;
              const signName = sign.names[lang] || sign.names.en;

              return (
                <button
                  key={sign.id}
                  onClick={() => setSelectedSign(sign)}
                  className={`zodiac-tab-pill ${isSelected ? 'active' : ''}`}
                >
                  <span className="sign-symbol-pill">{sign.symbol}</span>
                  <span className="sign-name-pill">{signName}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="zodiac-nav-arrow arrow-right"
            onClick={scrollRight}
            aria-label="Next zodiac signs"
            title="Next Signs"
          >
            ❯
          </button>
        </div>

        {/* Active Sign Prediction Card */}
        <div className="zodiac-display-card">
          <div className="zodiac-card-header">
            <div className="sign-icon-large-box">
              <span className="sign-symbol-huge">{selectedSign.symbol}</span>
            </div>
            <div className="sign-info-meta">
              <h3 className="active-sign-title">
                {selectedSign.names[lang] || selectedSign.names.en}
              </h3>
              <div className="sign-traits-row">
                <span className="trait-tag">
                  <strong>{t.zodiac.rulerLabel}:</strong>{' '}
                  {selectedSign.ruler[lang] || selectedSign.ruler.en}
                </span>
                <span className="trait-tag">
                  <strong>{t.zodiac.elementLabel}:</strong>{' '}
                  {selectedSign.element[lang] || selectedSign.element.en}
                </span>
                <span className="trait-tag">
                  <strong>{t.zodiac.luckyNumLabel}:</strong> {selectedSign.luckyNumber}
                </span>
                <span className="trait-tag">
                  <strong>{t.zodiac.luckyColorLabel}:</strong>{' '}
                  {selectedSign.luckyColor[lang] || selectedSign.luckyColor.en}
                </span>
              </div>
            </div>
          </div>

          <div className="zodiac-guidance-content">
            <h4 className="guidance-heading">
              <span>✦</span> {t.zodiac.todayGuidance}
            </h4>
            <p className="guidance-text">
              {selectedSign.horoscope[lang] || selectedSign.horoscope.en}
            </p>
          </div>

          <div className="zodiac-card-footer">
            <button
              type="button"
              onClick={() => openBooking('birth-chart')}
              className="btn-kundli-cta"
            >
              <span>📜 {t.zodiac.bookKundliReading}</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
