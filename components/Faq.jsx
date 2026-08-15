'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Faq() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="section-container">
        {/* Header */}
        <div className="section-header text-center">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>{t.faq.badge}</span>
          </div>
          <h2 className="section-title">{t.faq.title}</h2>
          <p className="section-subtitle">{t.faq.subtitle}</p>
        </div>

        {/* Accordion */}
        <div className="faq-accordion-container">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`faq-item-glass ${isOpen ? 'active' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question-row">
                  <h3 className="faq-question-text">{item.q}</h3>
                  <span className={`faq-expand-icon ${isOpen ? 'rotated' : ''}`}>
                    {isOpen ? '−' : '+'}
                  </span>
                </div>

                {isOpen && (
                  <div className="faq-answer-drawer">
                    <p className="faq-answer-text">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
