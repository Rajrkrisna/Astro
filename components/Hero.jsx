'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';

export default function Hero() {
  const { t, lang } = useLanguage();
  const { openBooking } = useBooking();

  return (
    <section className="hero-section">
      {/* Background Celestial Elements on Light Aesthetic Surface */}
      <div className="celestial-bg">
        <div className="celestial-glow glow-top-left"></div>
        <div className="celestial-glow glow-bottom-right"></div>
        <div className="celestial-orbit-ring orbit-1"></div>
        <div className="celestial-orbit-ring orbit-2"></div>
        <div className="stars-layer"></div>
      </div>

      <div className="hero-container">
        {/* Top Badges */}
        <div className="hero-badge-container">
          <div className="hero-badge">
            <span className="badge-sparkle">✨</span>
            <span>{t.hero.badge}</span>
          </div>
          <a
            href="https://share.google/3r98gdF4n9AktNroD"
            target="_blank"
            rel="noopener noreferrer"
            className="location-pill location-link"
            title="Open location in Google Maps"
          >
            <span>{t.hero.locationBadge}</span>
            <span className="pill-arrow">↗</span>
          </a>
        </div>

        {/* Main Headings */}
        <h1 className="hero-main-title">
          {t.hero.title}
        </h1>

        {/* Astrologer Identity Card Highlight */}
        <div className="astrologer-badge-box">
          <div className="astrologer-symbol">ॐ</div>
          <div className="astrologer-meta">
            <div className="name-highlight">{t.hero.astrologerName}</div>
            <div className="credentials-highlight">{t.hero.degrees}</div>
          </div>
        </div>

        {/* Tagline */}
        <p className="hero-tagline">
          {t.hero.tagline}
        </p>

        {/* Action Buttons */}
        <div className="hero-cta-group">
          <button
            type="button"
            onClick={() => openBooking('birth-chart')}
            className="btn-primary-glow"
          >
            <span className="btn-glow-icon">✦</span>
            <span>{t.hero.ctaPrimary}</span>
          </button>
          <Link href="/#horoscope" className="btn-secondary-glass">
            <span className="btn-glow-icon">🌙</span>
            <span>{t.hero.ctaSecondary}</span>
          </Link>
          <a
            href="https://wa.me/919367780030?text=Vanakkam%20Astrologer%20Parthasarathy%20Ji,%20I%20would%20like%20to%20consult%20for%20Astrology."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-hero"
          >
            <span className="btn-glow-icon">💬</span>
            <span>{t.hero.ctaWhatsApp}</span>
          </a>
        </div>

        {/* Live Consultation Status */}
        <div className="live-status-bar">
          <span className="live-dot"></span>
          <span className="live-text">
            {lang === 'ta'
              ? 'நேரடி & வாட்ஸ்அப் வீடியோ ஆலோசனை முன்பதிவு திறக்கப்பட்டுள்ளது'
              : lang === 'hi'
              ? 'प्रत्यक्ष एवं ऑनलाइन वीडियो परामर्श बुकिंग उपलब्ध है'
              : 'Appointments Available for Today • In-Person & Online Video Consultations'}
          </span>
        </div>

        {/* Statistics Grid */}
        <div className="hero-stats-grid">
          <div className="stat-card">
            <div className="stat-number">{t.hero.stats.experience}</div>
            <div className="stat-label">{t.hero.stats.experienceLabel}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{t.hero.stats.clients}</div>
            <div className="stat-label">{t.hero.stats.clientsLabel}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{t.hero.stats.accuracy}</div>
            <div className="stat-label">{t.hero.stats.accuracyLabel}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{t.hero.stats.presence}</div>
            <div className="stat-label">{t.hero.stats.presenceLabel}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
