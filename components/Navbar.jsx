'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';

export default function Navbar() {
  const { lang, setLanguage, t, languages } = useLanguage();
  const { openBooking } = useBooking();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0];

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link href="/" className="nav-brand" onClick={() => setMobileMenuOpen(false)}>
          <div className="logo-emblem">
            <span className="logo-star">✦</span>
            <span className="logo-sun">☉</span>
          </div>
          <div className="brand-text-wrapper">
            <span className="brand-main">{t.nav.brand}</span>
            <span className="brand-sub">{t.nav.subtitle}</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            <li>
              <Link href="/#services" className="nav-item">
                {t.nav.services}
              </Link>
            </li>
            <li>
              <Link href="/#horoscope" className="nav-item">
                {t.nav.horoscope}
              </Link>
            </li>
            <li>
              <Link href="/#about" className="nav-item">
                {t.nav.about}
              </Link>
            </li>
            <li>
              <Link href="/#focus" className="nav-item">
                {t.nav.focus}
              </Link>
            </li>
            <li>
              <Link href="/#testimonials" className="nav-item">
                {t.nav.testimonials}
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="nav-item">
                {t.nav.faq}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="nav-item">
                {t.nav.contact}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Action Area: Language Switcher & Book Consultation Button */}
        <div className="nav-actions">
          {/* Language Switcher Dropdown */}
          <div className="lang-switcher-wrap" ref={dropdownRef}>
            <button
              className="lang-select-btn"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              aria-label="Select Language"
              aria-expanded={langDropdownOpen}
            >
              <span className="lang-flag">{currentLangObj.flag}</span>
              <span className="lang-name">{currentLangObj.nativeName}</span>
              <span className={`lang-arrow ${langDropdownOpen ? 'open' : ''}`}>▾</span>
            </button>

            {langDropdownOpen && (
              <div className="lang-dropdown-menu">
                <div className="lang-dropdown-header">Choose Language / மொழியை தேர்ந்தெடுக்க / भाषा चुनें</div>
                {languages.map((item) => (
                  <button
                    key={item.code}
                    className={`lang-option-item ${item.code === lang ? 'active' : ''}`}
                    onClick={() => {
                      setLanguage(item.code);
                      setLangDropdownOpen(false);
                    }}
                  >
                    <span className="option-flag">{item.flag}</span>
                    <span className="option-native">{item.nativeName}</span>
                    <span className="option-label">({item.label})</span>
                    {item.code === lang && <span className="option-check">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button that opens the Side Drawer */}
          <button
            type="button"
            onClick={() => openBooking('birth-chart')}
            className="btn-nav-cta"
          >
            <span className="btn-cta-icon">✦</span>
            <span className="btn-cta-text">{t.nav.bookNow}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="drawer-logo">
                <span className="logo-star">✦</span> {t.nav.brand}
              </div>
              <button
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Mobile Language Switcher */}
            <div className="mobile-lang-selector">
              <div className="mobile-lang-title">🌐 Select Language / மொழி / भाषा</div>
              <div className="mobile-lang-grid">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    className={`mobile-lang-pill ${item.code === lang ? 'active' : ''}`}
                    onClick={() => {
                      setLanguage(item.code);
                    }}
                  >
                    <span className="pill-flag">{item.flag}</span>
                    <span className="pill-name">{item.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>

            <nav className="mobile-nav-links">
              <button
                type="button"
                className="mobile-booking-drawer-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking('birth-chart');
                }}
              >
                <span>📅</span> {t.nav.bookNow}
              </button>
              <Link href="/#services" onClick={() => setMobileMenuOpen(false)}>
                <span>🔯</span> {t.nav.services}
              </Link>
              <Link href="/#horoscope" onClick={() => setMobileMenuOpen(false)}>
                <span>🌙</span> {t.nav.horoscope}
              </Link>
              <Link href="/#about" onClick={() => setMobileMenuOpen(false)}>
                <span>👤</span> {t.nav.about}
              </Link>
              <Link href="/#focus" onClick={() => setMobileMenuOpen(false)}>
                <span>🧭</span> {t.nav.focus}
              </Link>
              <Link href="/#testimonials" onClick={() => setMobileMenuOpen(false)}>
                <span>⭐</span> {t.nav.testimonials}
              </Link>
              <Link href="/#faq" onClick={() => setMobileMenuOpen(false)}>
                <span>❓</span> {t.nav.faq}
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <span>📍</span> {t.nav.contact}
              </Link>
            </nav>

            <div className="mobile-drawer-cta">
              <button
                type="button"
                className="btn-drawer-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking('birth-chart');
                }}
              >
                ✦ {t.nav.bookNow}
              </button>
              <a
                href="https://wa.me/919367780030"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-drawer-wa"
              >
                💬 WhatsApp (+91 93677 80030)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
