'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { lang, setLanguage, t, languages } = useLanguage();
  const { openBooking } = useBooking();
  const { theme, toggleTheme, isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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

        {/* Action Area: Theme Toggle, Language Switcher & Book Consultation Button */}
        <div className="nav-actions">
          {/* Theme Toggle Button (Day / Galaxy Night) */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'Day' : 'Galaxy Night'} theme`}
            title={isDark ? 'Switch to Solar Day Theme' : 'Switch to Galaxy Night Theme'}
          >
            <span className="theme-icon-glow">{isDark ? '🌙' : '☀️'}</span>
            <span className="theme-label-text">{isDark ? 'Night' : 'Day'}</span>
          </button>

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
                    {item.nativeName !== item.label && <span className="option-label">({item.label})</span>}
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
            aria-label="Book Consultation"
          >
            <span className="btn-cta-icon">✦</span>
            <span className="btn-cta-text btn-cta-text-desktop">{t.nav.bookNow}</span>
            <span className="btn-cta-text btn-cta-text-mobile">
              {lang === 'ta' ? 'முன்பதிவு' : lang === 'hi' ? 'बुकिंग' : 'Book'}
            </span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Mounted via Portal to document.body */}
      {mounted && mobileMenuOpen && createPortal(
        <div 
          className="mobile-drawer-overlay" 
          onClick={() => setMobileMenuOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="drawer-logo">
                <span className="logo-star">✦</span> {t.nav.brand}
              </div>
              <button
                type="button"
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
                    type="button"
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

            {/* Mobile Theme Switcher */}
            <div className="mobile-theme-row">
              <span className="mobile-theme-label">🌌 Theme:</span>
              <button
                type="button"
                className="mobile-theme-toggle-btn"
                onClick={toggleTheme}
              >
                <span>{isDark ? '🌙 Galaxy Night' : '☀️ Solar Day'}</span>
                <span className="theme-switch-indicator">Tap to Switch</span>
              </button>
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
                <span>✦</span> {t.nav.bookNow}
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
        </div>,
        document.body
      )}
    </header>
  );
}
