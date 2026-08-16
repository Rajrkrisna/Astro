'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function BookingSection({ initialService, isDedicatedPage = true }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    tob: '',
    pob: '',
    service: initialService || 'birth-chart',
    consultLang: 'Tamil',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateWhatsAppMessage = () => {
    const selectedServiceObj = t.services.items.find((s) => s.id === formData.service);
    const serviceName = selectedServiceObj ? selectedServiceObj.title : formData.service;

    const text = `*Astrology Consultation Request - Sri Arunachaleswara Astrology*
----------------------------------------
*Name:* ${formData.name || 'Not specified'}
*Phone:* ${formData.phone || 'Not specified'}
*Email:* ${formData.email || 'Not specified'}
*Service:* ${serviceName}
*Date of Birth:* ${formData.dob || 'Not specified'}
*Time of Birth:* ${formData.tob || 'Not specified'}
*Place of Birth:* ${formData.pob || 'Not specified'}
*Preferred Language:* ${formData.consultLang}
*Questions/Concerns:* ${formData.message || 'General consultation request'}
----------------------------------------
_Sent from Sri Arunachaleswara Astrology Website_`;

    return encodeURIComponent(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const getBirthDetailsTitle = () => {
    return t.booking.dobLabel.includes('பிறந்த') 
      ? 'பிறப்பு விவரங்கள் (துல்லியமான கணிப்புக்கு)'
      : t.booking.dobLabel.includes('जन्म')
      ? 'जन्म विवरण (सटीक गणना हेतु)'
      : 'Birth Coordinates (For Precision Kundli Charting)';
  };

  const getLanguagePrefLabel = () => {
    return t.booking.nameLabel.includes('பெயர்')
      ? 'ஆலோசனை மொழி *'
      : t.booking.nameLabel.includes('नाम')
      ? 'परामर्श की भाषा *'
      : 'Preferred Consultation Language *';
  };

  const getOtherServiceLabel = () => {
    return t.booking.nameLabel.includes('பெயர்')
      ? 'மற்றவை / பொதுவான ஆலோசனை'
      : t.booking.nameLabel.includes('नाम')
      ? 'अन्य / सामान्य परामर्श'
      : 'Other / General Life Consultation';
  };

  return (
    <section id="booking" className="booking-section-centered">
      <div className="booking-centered-container">
        {/* Main Centered Form Card Only */}
        <div className="booking-form-wrapper-centered">
          {submitted ? (
            <div className="booking-success-card">
              <div className="success-icon-wrap">
                <span className="success-icon">✓</span>
              </div>
              <h3 className="success-title">{t.booking.successTitle}</h3>
              <p className="success-msg">{t.booking.successMsg}</p>

              <div className="booking-summary-box">
                <div className="summary-row">
                  <span className="summary-label">Name:</span>
                  <span className="summary-val">{formData.name}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Phone:</span>
                  <span className="summary-val">{formData.phone}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Service:</span>
                  <span className="summary-val">
                    {t.services.items.find((s) => s.id === formData.service)?.title || formData.service}
                  </span>
                </div>
              </div>

              <div className="success-actions">
                <a
                  href={`https://wa.me/919367780030?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-success-wa"
                >
                  <span>💬 Send Details Instantly on WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      dob: '',
                      tob: '',
                      pob: '',
                      service: initialService || 'birth-chart',
                      consultLang: 'Tamil',
                      message: '',
                    });
                  }}
                  className="btn-submit-another"
                >
                  ← Submit Another Query
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="booking-form-card">
              {/* Row 1: Name & Phone */}
              <div className="form-row-2">
                <div className="form-field">
                  <label htmlFor="name">{t.booking.nameLabel}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.booking.namePlaceholder}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="phone">{t.booking.phoneLabel}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.booking.phonePlaceholder}
                    required
                  />
                </div>
              </div>

              {/* Row 2: Email & Service */}
              <div className="form-row-2">
                <div className="form-field">
                  <label htmlFor="email">{t.booking.emailLabel}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.booking.emailPlaceholder}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="service">{t.booking.serviceLabel}</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    {t.services.items.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                    <option value="other">
                      {getOtherServiceLabel()}
                    </option>
                  </select>
                </div>
              </div>

              {/* Birth Details Box */}
              <div className="birth-details-subgroup">
                <div className="subgroup-title">
                  <span>🌟 {getBirthDetailsTitle()}</span>
                </div>

                <div className="form-row-2">
                  <div className="form-field">
                    <label htmlFor="dob">{t.booking.dobLabel}</label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="tob">{t.booking.tobLabel}</label>
                    <input
                      type="time"
                      id="tob"
                      name="tob"
                      value={formData.tob}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-field birth-pob-field">
                  <label htmlFor="pob">{t.booking.pobLabel}</label>
                  <input
                    type="text"
                    id="pob"
                    name="pob"
                    value={formData.pob}
                    onChange={handleChange}
                    placeholder={t.booking.pobPlaceholder}
                    required
                  />
                </div>
              </div>

              {/* Preferred Consultation Language */}
              <div className="form-field">
                <label htmlFor="consultLang">{getLanguagePrefLabel()}</label>
                <select
                  id="consultLang"
                  name="consultLang"
                  value={formData.consultLang}
                  onChange={handleChange}
                  required
                >
                  <option value="Tamil">தமிழ் (Tamil)</option>
                  <option value="Indian English">Indian English</option>
                  <option value="Hindi">हिन्दी (Hindi)</option>
                </select>
              </div>

              {/* Large Specific Questions or Concerns Textarea Below */}
              <div className="form-field form-field-full">
                <label htmlFor="message">{t.booking.messageLabel}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.booking.messagePlaceholder}
                  className="booking-large-textarea"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <div className="booking-submit-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-submit-booking-centered"
                >
                  {loading ? '...' : `✦ ${t.booking.submitBtn}`}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
