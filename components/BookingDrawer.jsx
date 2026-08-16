'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';

export default function BookingDrawer() {
  const { t, lang } = useLanguage();
  const { isOpen, closeBooking, activeService } = useBooking();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    tob: '',
    pob: '',
    service: 'birth-chart',
    consultLang: 'Tamil',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeService) {
      setFormData((prev) => ({ ...prev, service: activeService }));
    }
  }, [activeService, isOpen]);

  if (!isOpen) return null;

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

  const getDrawerHeaderTitle = () => {
    switch (lang) {
      case 'ta': return 'ஜாதக ஆலோசனை முன்பதிவு';
      case 'hi': return 'ज्योतिष परामर्श बुकिंग';
      default: return 'Book Your Astrology Consultation';
    }
  };

  const getBirthDetailsTitle = () => {
    return lang === 'ta'
      ? 'பிறப்பு விவரங்கள் (துல்லியமான கணிப்புக்கு)'
      : lang === 'hi'
      ? 'जन्म विवरण (सटीक गणना हेतु)'
      : 'Birth Coordinates (For Precision Kundli Charting)';
  };

  const getLanguagePrefLabel = () => {
    return lang === 'ta'
      ? 'ஆலோசனை மொழி *'
      : lang === 'hi'
      ? 'परामर्श की भाषा *'
      : 'Preferred Consultation Language *';
  };

  const getOtherServiceLabel = () => {
    return lang === 'ta'
      ? 'மற்றவை / பொதுவான ஆலோசனை'
      : lang === 'hi'
      ? 'अन्य / सामान्य परामर्श'
      : 'Other / General Life Consultation';
  };

  return (
    <div className="booking-drawer-overlay" onClick={closeBooking}>
      <div className="booking-side-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="booking-drawer-header">
          <div className="drawer-title-group">
            <div className="drawer-badge">
              <span className="badge-sparkle">✦</span>
              <span>{t.booking.badge}</span>
            </div>
            <h2 className="booking-drawer-title">{getDrawerHeaderTitle()}</h2>
          </div>
          <button
            type="button"
            className="booking-drawer-close-btn"
            onClick={closeBooking}
            aria-label="Close booking form"
          >
            ✕
          </button>
        </div>

        {/* Drawer Body: Clean Booking Form */}
        <div className="booking-drawer-body">
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
                  <span>💬 Send Details on WhatsApp</span>
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
                      service: activeService || 'birth-chart',
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
            <form onSubmit={handleSubmit} className="booking-drawer-form">
              {/* Name & Phone */}
              <div className="drawer-form-row">
                <div className="form-field">
                  <label htmlFor="drawer-name">{t.booking.nameLabel}</label>
                  <input
                    type="text"
                    id="drawer-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.booking.namePlaceholder}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="drawer-phone">{t.booking.phoneLabel}</label>
                  <input
                    type="tel"
                    id="drawer-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.booking.phonePlaceholder}
                    required
                  />
                </div>
              </div>

              {/* Email & Service */}
              <div className="drawer-form-row">
                <div className="form-field">
                  <label htmlFor="drawer-email">{t.booking.emailLabel}</label>
                  <input
                    type="email"
                    id="drawer-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.booking.emailPlaceholder}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="drawer-service">{t.booking.serviceLabel}</label>
                  <select
                    id="drawer-service"
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

                <div className="drawer-form-row-3">
                  <div className="form-field">
                    <label htmlFor="drawer-dob">{t.booking.dobLabel}</label>
                    <input
                      type="date"
                      id="drawer-dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="drawer-tob">{t.booking.tobLabel}</label>
                    <input
                      type="time"
                      id="drawer-tob"
                      name="tob"
                      value={formData.tob}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="drawer-pob">{t.booking.pobLabel}</label>
                    <input
                      type="text"
                      id="drawer-pob"
                      name="pob"
                      value={formData.pob}
                      onChange={handleChange}
                      placeholder={t.booking.pobPlaceholder}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Preferred Consultation Language */}
              <div className="form-field">
                <label htmlFor="drawer-consultLang">{getLanguagePrefLabel()}</label>
                <select
                  id="drawer-consultLang"
                  name="consultLang"
                  value={formData.consultLang}
                  onChange={handleChange}
                  required
                >
                  <option value="Tamil">தமிழ் (Tamil)</option>
                  <option value="English">English</option>
                  <option value="Hindi">हिन्दी (Hindi)</option>
                </select>
              </div>

              {/* Large Specific Questions or Concerns Textarea Below */}
              <div className="form-field form-field-full">
                <label htmlFor="drawer-message">{t.booking.messageLabel}</label>
                <textarea
                  id="drawer-message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.booking.messagePlaceholder}
                  className="booking-large-textarea"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-drawer-booking-submit"
              >
                {loading ? '...' : `✦ ${t.booking.submitBtn}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
