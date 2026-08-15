'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t, lang, setLanguage, languages } = useLanguage();

  const mapsUrl = 'https://share.google/3r98gdF4n9AktNroD';

  return (
    <footer className="footer-celestial">
      <div className="section-container">
        <div className="footer-grid">
          {/* Column 1: Brand & About */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand">
              <span className="footer-star">✦</span>
              <span className="footer-brand-title">{t.nav.brand}</span>
            </div>
            <div className="footer-brand-sub">{t.nav.subtitle}</div>
            <p className="footer-about-text">{t.footer.aboutText}</p>

            <div className="footer-lang-selector">
              <span className="lang-label">Language / மொழி / भाषा:</span>
              <div className="footer-lang-pills">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => setLanguage(item.code)}
                    className={`footer-lang-btn ${item.code === lang ? 'active' : ''}`}
                  >
                    <span>{item.flag}</span>
                    <span>{item.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">{t.footer.quickLinks}</h4>
            <ul className="footer-links">
              <li><Link href="/booking">{t.nav.bookNow}</Link></li>
              <li><Link href="/#services">{t.nav.services}</Link></li>
              <li><Link href="/#horoscope">{t.nav.horoscope}</Link></li>
              <li><Link href="/#about">{t.nav.about}</Link></li>
              <li><Link href="/#focus">{t.nav.focus}</Link></li>
              <li><Link href="/#testimonials">{t.nav.testimonials}</Link></li>
              <li><Link href="/#faq">{t.nav.faq}</Link></li>
              <li><Link href="/contact">{t.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Column 3: Astrological Services */}
          <div className="footer-col">
            <h4 className="footer-heading">{t.footer.servicesTitle}</h4>
            <ul className="footer-links">
              {t.services.items.map((s) => (
                <li key={s.id}>
                  <Link href={`/booking?service=${s.id}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-heading">{t.footer.contactTitle}</h4>
            <div className="footer-address">
              <p className="addr-line highlight"><strong>{t.footer.addressLine1}</strong></p>
              <p className="addr-line">📍 {t.footer.addressLine2}</p>
              <p className="addr-line">{t.footer.addressLine3}</p>
              <p className="addr-line">{t.footer.addressLine4}</p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-footer-map"
              >
                {t.footer.viewMaps || '📍 Open in Google Maps'}
              </a>
            </div>

            <div className="footer-contact-items">
              <div className="c-item">
                <span className="c-icon">📱</span>
                <a href="tel:+919367780030" className="c-link">{t.footer.phone}</a>
              </div>
              <div className="c-item">
                <span className="c-icon">📧</span>
                <a href="mailto:sarathymanickam@gmail.com" className="c-link">{t.footer.email}</a>
              </div>
              <div className="c-item">
                <span className="c-icon">⏰</span>
                <span className="c-text">{t.footer.hours}</span>
              </div>
            </div>

            <div className="footer-social-buttons">
              <a
                href="https://wa.me/919367780030"
                target="_blank"
                rel="noopener noreferrer"
                className="soc-btn wa"
              >
                💬 WhatsApp
              </a>
              <a href="tel:+919367780030" className="soc-btn phone">
                📞 Call Us
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} {t.nav.brand}. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
