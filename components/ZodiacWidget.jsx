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
  const [isPaused, setIsPaused] = useState(false);

  const scrollContainerRef = useRef(null);
  const animFrameRef = useRef(null);

  // Triple zodiac dataset (36 items) for endless smooth continuous loop
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

  // Continuous Auto-Rolling Animation Loop (60 FPS smooth ticker)
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // Start in the middle set
    const singleSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft === 0) {
      el.scrollLeft = singleSetWidth;
    }

    const rollSpeed = 0.65; // Smooth meditative scroll speed

    const roll = () => {
      if (!isPaused && el) {
        el.scrollLeft += rollSpeed;

        // Loop seamlessly when passing through sets
        if (el.scrollLeft >= singleSetWidth * 2) {
          el.scrollLeft -= singleSetWidth;
        } else if (el.scrollLeft <= 5) {
          el.scrollLeft += singleSetWidth;
        }
      }
      animFrameRef.current = requestAnimationFrame(roll);
    };

    animFrameRef.current = requestAnimationFrame(roll);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPaused]);

  // Manual Previous Sign (loops recursively)
  const handlePrevSign = () => {
    const currentIndex = zodiacData.findIndex((s) => s.id === selectedSign.id);
    const prevIndex = (currentIndex - 1 + zodiacData.length) % zodiacData.length;
    setSelectedSign(zodiacData[prevIndex]);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };

  // Manual Next Sign (loops recursively)
  const handleNextSign = () => {
    const currentIndex = zodiacData.findIndex((s) => s.id === selectedSign.id);
    const nextIndex = (currentIndex + 1) % zodiacData.length;
    setSelectedSign(zodiacData[nextIndex]);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 220, behavior: 'smooth' });
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

        {/* Continuous Auto-Rolling Carousel in Loop with Side Controls */}
        <div
          className="zodiac-carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            // Resume rolling 2 seconds after user finishes touching/swiping
            setTimeout(() => setIsPaused(false), 2000);
          }}
        >
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
            className="zodiac-scroll-track continuous-loop-track"
            ref={scrollContainerRef}
          >
            {infiniteZodiacList.map((sign, idx) => {
              const isSelected = selectedSign.id === sign.id;
              const signName = sign.names[lang] || sign.names.en;

              return (
                <button
                  key={`${sign.id}-${idx}`}
                  type="button"
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
