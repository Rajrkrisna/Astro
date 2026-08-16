'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { zodiacData } from '../data/zodiacData';
import { fetchDailyHoroscope, getFormattedTodayDate } from '../services/astrologyApi';

export default function ZodiacWidget() {
  const { t, lang } = useLanguage();
  const { openBooking } = useBooking();
  const [selectedSign, setSelectedSign] = useState(zodiacData[0]);
  const [guidanceText, setGuidanceText] = useState(
    zodiacData[0].horoscope[lang] || zodiacData[0].horoscope.en
  );
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [todayDate, setTodayDate] = useState('');

  const scrollContainerRef = useRef(null);
  const activeTabRef = useRef(null);
  const isAutoScrolling = useRef(false);

  // Triple zodiac dataset for seamless infinite / recursive horizontal scrolling
  const infiniteZodiacList = [...zodiacData, ...zodiacData, ...zodiacData];

  // Update date on mount & language change
  useEffect(() => {
    setTodayDate(getFormattedTodayDate(lang));
  }, [lang]);

  // Fetch live daily horoscope from Astrologer API
  useEffect(() => {
    let isCurrent = true;
    setIsLoadingApi(true);

    fetchDailyHoroscope(selectedSign.id, lang).then((data) => {
      if (isCurrent) {
        setGuidanceText(data.text);
        setIsLoadingApi(false);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [selectedSign, lang]);

  // Center active tab smoothly whenever selectedSign changes
  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      isAutoScrolling.current = true;
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });

      const timer = setTimeout(() => {
        isAutoScrolling.current = false;
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [selectedSign]);

  // Infinite scroll boundary wrapper
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el || isAutoScrolling.current) return;

    const singleSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft <= 10) {
      el.scrollLeft += singleSetWidth;
    } else if (el.scrollLeft >= singleSetWidth * 2 - 10) {
      el.scrollLeft -= singleSetWidth;
    }
  };

  // Recursive Previous Arrow
  const handlePrevSign = () => {
    const currentIndex = zodiacData.findIndex((s) => s.id === selectedSign.id);
    const prevIndex = (currentIndex - 1 + zodiacData.length) % zodiacData.length;
    setSelectedSign(zodiacData[prevIndex]);
  };

  // Recursive Next Arrow
  const handleNextSign = () => {
    const currentIndex = zodiacData.findIndex((s) => s.id === selectedSign.id);
    const nextIndex = (currentIndex + 1) % zodiacData.length;
    setSelectedSign(zodiacData[nextIndex]);
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

        {/* Recursive Carousel with Side Navigation Arrows */}
        <div className="zodiac-carousel-wrapper">
          <button
            type="button"
            className="zodiac-nav-arrow arrow-left"
            onClick={handlePrevSign}
            aria-label="Previous zodiac sign"
            title="Previous Sign"
          >
            ❮
          </button>

          <div
            className="zodiac-scroll-track"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            {infiniteZodiacList.map((sign, idx) => {
              const isSelected = selectedSign.id === sign.id;
              const signName = sign.names[lang] || sign.names.en;
              // Attach ref to the middle set's active item for clean centering
              const isMiddleSetActive = isSelected && idx >= 12 && idx < 24;

              return (
                <button
                  key={`${sign.id}-${idx}`}
                  ref={isMiddleSetActive ? activeTabRef : null}
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
            onClick={handleNextSign}
            aria-label="Next zodiac sign"
            title="Next Sign"
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
            <div className="guidance-header-row">
              <h4 className="guidance-heading">
                <span>✦</span> {t.zodiac.todayGuidance}
              </h4>
              {todayDate && (
                <span className="guidance-live-badge">
                  <span className="live-dot"></span>
                  {todayDate}
                </span>
              )}
            </div>
            <p className="guidance-text">
              {isLoadingApi ? '...' : guidanceText}
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
