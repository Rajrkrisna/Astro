'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Newsletter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="newsletter-section">
      <div className="section-container">
        <div className="newsletter-card-glow">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>{t.newsletter.badge}</span>
          </div>
          <h2 className="newsletter-title">{t.newsletter.title}</h2>
          <p className="newsletter-subtitle">{t.newsletter.subtitle}</p>

          {submitted ? (
            <div className="newsletter-success">
              <span className="success-check">✓</span>
              <span>{t.newsletter.success}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter.placeholder}
                className="newsletter-input"
                required
              />
              <button type="submit" className="btn-newsletter-submit">
                <span>✦ {t.newsletter.btn}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
