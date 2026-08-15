'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat';
import Celestial3DBackground from '../../components/Celestial3DBackground';
import { useLanguage } from '../../context/LanguageContext';

export default function ContactPage() {
  const { t, lang } = useLanguage();

  const mapsUrl = 'https://share.google/3r98gdF4n9AktNroD';

  const getBadgeText = () => {
    switch (lang) {
      case 'ta': return 'நேரடி தொடர்பு & ஆலோசனை';
      case 'hi': return 'प्रत्यक्ष संपर्क एवं परामर्श';
      default: return 'Direct Consultation & Connect';
    }
  };

  const getHeroTitle = () => {
    switch (lang) {
      case 'ta': return 'ஸ்ரீ அருணாசலேஸ்வரா ஜோதிட ஆராய்ச்சி மையம்';
      case 'hi': return 'श्री अरुणाचलेश्वर ज्योतिष एवं अनुसंधान केंद्र';
      default: return 'Connect with Astrologer M. Parthasarathy';
    }
  };

  const getHeroSubtitle = () => {
    switch (lang) {
      case 'ta': return 'வைத்தீஸ்வரன் கோவிலில் நேரிலோ அல்லது ஆன்லைன் வீடியோ/போன் மூலமாகவோ உங்கள் ஜாதக பலன்களை ஆலோசிக்கலாம்.';
      case 'hi': return 'वैथीस्वरन कोइल में प्रत्यक्ष रूप से या ऑनलाइन वीडियो/फोन द्वारा अपने जीवन का मार्गदर्शन प्राप्त करें।';
      default: return 'Schedule an in-person reading at Vaitheeswaran Koil or connect via Phone and Video Call from anywhere globally.';
    }
  };

  const getPhoneCardTitle = () => {
    switch (lang) {
      case 'ta': return 'தொலைபேசி & வாட்ஸ்அப்';
      case 'hi': return 'फोन एवं व्हाट्सएप';
      default: return 'Phone & WhatsApp';
    }
  };

  const getPhoneSub = () => {
    switch (lang) {
      case 'ta': return 'நேரடி அழைப்பு & வாட்ஸ்அப் கிடைக்கும்';
      case 'hi': return 'कॉल एवं व्हाट्सएप उपलब्ध';
      default: return 'Available on Call & WhatsApp';
    }
  };

  const getEmailCardTitle = () => {
    switch (lang) {
      case 'ta': return 'மின்னஞ்சல்';
      case 'hi': return 'ईमेल';
      default: return 'Email Address';
    }
  };

  const getEmailSub = () => {
    switch (lang) {
      case 'ta': return '24 மணி நேரத்தில் பதில்';
      case 'hi': return '24 घंटे के भीतर उत्तर';
      default: return 'Responses within 24 hours';
    }
  };

  const getAddressCardTitle = () => {
    switch (lang) {
      case 'ta': return 'ஆராய்ச்சி மைய முகவரி';
      case 'hi': return 'केंद्र का पता';
      default: return 'Research Centre Address';
    }
  };

  const getMapsBtnText = () => {
    switch (lang) {
      case 'ta': return 'கூகுள் வரைபடத்தில் பார்க்க';
      case 'hi': return 'गूगल मैप्स पर देखें';
      default: return 'View on Google Maps';
    }
  };

  return (
    <main className="contact-page-wrapper">
      {/* 3D Celestial Sacred Background */}
      <Celestial3DBackground />

      <Navbar />

      <section className="contact-page-hero">
        <div className="section-container">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>{getBadgeText()}</span>
          </div>

          <h1 className="section-title">
            {getHeroTitle()}
          </h1>

          <p className="section-subtitle">
            {getHeroSubtitle()}
          </p>
        </div>
      </section>

      {/* Quick Contact Info Cards */}
      <section className="contact-cards-section">
        <div className="section-container">
          <div className="contact-details-grid">
            <div className="contact-card-glass">
              <div className="contact-card-icon">📱</div>
              <h3 className="contact-card-title">{getPhoneCardTitle()}</h3>
              <p className="contact-card-val">
                <a href="tel:+919367780030" className="c-link">+91 93677 80030</a>
              </p>
              <p className="contact-card-val" style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '0.25rem' }}>
                {getPhoneSub()}
              </p>
            </div>

            <div className="contact-card-glass">
              <div className="contact-card-icon">📧</div>
              <h3 className="contact-card-title">{getEmailCardTitle()}</h3>
              <p className="contact-card-val">
                <a href="mailto:sarathymanickam@gmail.com" className="c-link">sarathymanickam@gmail.com</a>
              </p>
              <p className="contact-card-val" style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '0.25rem' }}>
                {getEmailSub()}
              </p>
            </div>

            <div className="contact-card-glass">
              <div className="contact-card-icon">📍</div>
              <h3 className="contact-card-title">{getAddressCardTitle()}</h3>
              <p className="contact-card-val" style={{ fontSize: '0.92rem' }}>
                24/10, Thiruvavaduthurai Madathu Street,<br />
                Vaitheeswaran Koil - 609117,<br />
                Mayiladuthurai District, Tamil Nadu, India
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-open-gmaps"
              >
                <span>📍 {getMapsBtnText()}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
