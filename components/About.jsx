'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';

export default function About() {
  const { t, lang } = useLanguage();
  const { openBooking } = useBooking();

  const mapsUrl = 'https://share.google/3r98gdF4n9AktNroD';

  const mapsText =
    lang === 'ta'
      ? '📍 கூகுள் மேப்பில் பார்க்க'
      : lang === 'hi'
      ? '📍 गूगल मैप्स पर स्थान देखें'
      : '📍 View on Google Maps';

  const locationText =
    lang === 'ta'
      ? '📍 வைத்தீஸ்வரன் கோவில், தமிழ்நாடு'
      : lang === 'hi'
      ? '📍 वैथीस्वरन कोइल, तमिलनाडु'
      : '📍 Vaitheeswaran Koil, Tamil Nadu';

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="about-layout-grid">
          {/* Left Column: Astrologer Portrait Card & Spiritual Emblem */}
          <div className="about-visual-column">
            <div className="astrologer-portrait-card">
              <div className="portrait-inner">
                {/* Concentric, Mathematically Centered Sacred Om Visual */}
                <div className="astrology-yantra-visual">
                  <div className="yantra-circle outer"></div>
                  <div className="yantra-circle middle"></div>
                  <div className="yantra-center-symbol">ॐ</div>
                </div>

                <div className="portrait-details">
                  <h3 className="portrait-name">M. Parthasarathy</h3>
                  <p className="portrait-degree">M.A., B.Ed.</p>
                  <div className="portrait-badge">
                    <span>
                      🌟{' '}
                      {lang === 'ta'
                        ? '25+ வருட ஓலைச்சுவடி & வேத ஜோதிட அனுபவம்'
                        : lang === 'hi'
                        ? '25+ वर्ष ताड़पत्र एवं वैदिक अनुभव'
                        : '25+ Years Palm Leaf & Vedic Experience'}
                    </span>
                  </div>
                  
                  {/* Clickable Google Maps Location Link */}
                  <div className="portrait-loc-wrap">
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portrait-loc-link"
                      title="Open location in Google Maps"
                    >
                      <span>{locationText}</span>
                      <span className="loc-arrow">↗</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Clickable Centre Mini Address Card with Google Maps Direct Link */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="centre-mini-card-link"
                title="Click to view on Google Maps"
              >
                <div className="centre-icon">🏛️</div>
                <div className="centre-text">
                  <strong className="centre-title">Sri Arunachaleswara Astrology & Research Centre</strong>
                  <p className="centre-addr">24/10, Thiruvavaduthurai Madathu Street, Vaitheeswaran Koil</p>
                  <span className="centre-maps-action">📍 View on Google Maps ↗</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Bio & Core Expertise */}
          <div className="about-content-column">
            <div className="section-badge">
              <span className="badge-sparkle">✦</span>
              <span>{t.about.badge}</span>
            </div>
            <h2 className="section-title">{t.about.title}</h2>
            <div className="astrologer-title-lead">{t.about.degrees}</div>
            <div className="founder-tag">{t.about.founder}</div>

            <div className="about-paragraphs">
              <p className="bio-p">{t.about.bioP1}</p>
              <p className="bio-p">{t.about.bioP2}</p>
            </div>

            <div className="specialties-container">
              <h4 className="specialties-heading">{t.about.specialtiesTitle}</h4>
              <div className="specialties-grid">
                {t.about.specialties.map((item, index) => (
                  <div key={index} className="specialty-item">
                    <span className="specialty-check">✓</span>
                    <span className="specialty-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="consultation-mode-banner">
              <span className="banner-icon">🌐</span>
              <span className="banner-text">{t.about.consultationModes}</span>
            </div>

            <div className="about-cta-row">
              <button
                type="button"
                onClick={() => openBooking('birth-chart')}
                className="btn-about-book"
              >
                <span>✦ {t.hero.ctaPrimary}</span>
              </button>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-about-maps"
              >
                <span>{mapsText}</span>
              </a>
              <a
                href="https://wa.me/919367780030"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-about-wa"
              >
                💬 WhatsApp (+91 93677 80030)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
