'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { zodiacData } from '../data/zodiacData';
import { fetchDailyHoroscope, getFormattedTodayDate } from '../services/astrologyApi';
import ZodiacIcon from './ZodiacIcons';

export default function ZodiacWidget() {
  const { t, lang } = useLanguage();
  const { openBooking } = useBooking();

  // Active selected sign index (0 to 11)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [radius, setRadius] = useState(270);

  const selectedSign = zodiacData[selectedIndex];

  const [guidanceText, setGuidanceText] = useState(
    selectedSign.horoscope[lang] || selectedSign.horoscope.en
  );
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [todayDate, setTodayDate] = useState('');

  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);
  const currentAngleRef = useRef(0);
  const isDraggingRef = useRef(false);

  // Adjust 3D cylinder radius on screen resize
  useEffect(() => {
    const updateRadius = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 480) {
          setRadius(165);
        } else if (window.innerWidth < 768) {
          setRadius(210);
        } else {
          setRadius(275);
        }
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Update date on mount & language change
  useEffect(() => {
    setTodayDate(getFormattedTodayDate(lang));
  }, [lang]);

  // Fetch live daily horoscope from Astrologer API ONLY when selected sign or language changes
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
  }, [selectedSign.id, lang]);

  // Rotate 360° wheel directly to a specific sign index
  const rotateToIndex = useCallback((index) => {
    const normIndex = ((index % 12) + 12) % 12;
    setSelectedIndex(normIndex);

    // Calculate shortest angular distance to target index
    const targetAngle = -normIndex * 30;
    const current = currentAngleRef.current;
    const diff = ((targetAngle - current) % 360 + 540) % 360 - 180;
    const newAngle = current + diff;

    currentAngleRef.current = newAngle;
    setRotationAngle(newAngle);
  }, []);

  // Previous Sign (Step -30° in 360° space)
  const handlePrevSign = () => {
    const prevIndex = (selectedIndex - 1 + 12) % 12;
    rotateToIndex(prevIndex);
  };

  // Next Sign (Step +30° in 360° space)
  const handleNextSign = () => {
    const nextIndex = (selectedIndex + 1) % 12;
    rotateToIndex(nextIndex);
  };

  // Drag & Swipe 360° Wheel Handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartAngle.current = currentAngleRef.current;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = currentX - dragStartX.current;
    const newAngle = dragStartAngle.current + deltaX * 0.35;
    currentAngleRef.current = newAngle;
    setRotationAngle(newAngle);
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;

    // Snap to closest 30-degree sector on release
    const currentAngle = currentAngleRef.current;
    const rawIndex = Math.round(-currentAngle / 30);
    const snappedIndex = ((rawIndex % 12) + 12) % 12;
    rotateToIndex(snappedIndex);
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

        {/* 360° Interactive 3D Zodiac Wheel Viewport */}
        <div className="zodiac-360-container">
          <div
            className="zodiac-360-viewport"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* 360° 3D Revolving Cylinder Wheel */}
            <div
              className={`zodiac-360-wheel ${isDragging ? 'dragging' : 'smooth-turn'}`}
              style={{
                transform: `rotateY(${rotationAngle}deg)`,
              }}
            >
              {zodiacData.map((sign, idx) => {
                const isSelected = selectedIndex === idx;
                const signName = sign.names[lang] || sign.names.en;
                const cardAngle = idx * 30;

                // Compute relative angle to front camera
                const relAngle = ((cardAngle + rotationAngle) % 360 + 360) % 360;
                const isFront = relAngle <= 45 || relAngle >= 315;
                const isBack = relAngle > 90 && relAngle < 270;

                return (
                  <div
                    key={sign.id}
                    className={`zodiac-360-card ${isSelected ? 'active' : ''} ${
                      isFront ? 'front' : isBack ? 'back' : 'side'
                    }`}
                    style={{
                      transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      rotateToIndex(idx);
                    }}
                  >
                    <div className="zodiac-rasi-icon-wrap">
                      <ZodiacIcon signId={sign.id} size={54} className="rasi-svg-gold" />
                    </div>
                    <div className="zodiac-dual-name-wrap">
                      <span className="sign-name-western">{sign.names.en}</span>
                      <span className="sign-name-tamil">{sign.tamilFullName}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Front Stage Glowing Focus Ring Indicator */}
            <div className="zodiac-360-stage-glow" aria-hidden="true" />
          </div>

          {/* Navigation Controls */}
          <div className="zodiac-360-controls">
            <button
              type="button"
              className="zodiac-360-nav-btn arrow-prev"
              onClick={handlePrevSign}
              aria-label="Previous zodiac sign"
              title="Previous Sign"
            >
              ❮
            </button>
            <button
              type="button"
              className="zodiac-360-nav-btn arrow-next"
              onClick={handleNextSign}
              aria-label="Next zodiac sign"
              title="Next Sign"
            >
              ❯
            </button>
          </div>
        </div>

        {/* Active Sign Prediction Card */}
        <div className="zodiac-display-card">
          <div className="zodiac-card-header">
            <div className="sign-icon-large-box">
              <ZodiacIcon signId={selectedSign.id} size={76} className="rasi-svg-gold-huge" />
            </div>
            <div className="sign-info-meta">
              <div className="active-sign-name-duo">
                <h3 className="active-sign-title">{selectedSign.names[lang] || selectedSign.names.en}</h3>
                <span className="active-sign-tamil-sub">{selectedSign.tamilFullName}</span>
              </div>
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
