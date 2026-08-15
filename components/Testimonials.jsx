'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();
  const [reviewsData, setReviewsData] = useState({
    rating: 4.9,
    userRatingsTotal: '100+',
    reviews: [],
    mapsUrl: 'https://share.google/3r98gdF4n9AktNroD',
  });
  const [loading, setLoading] = useState(true);

  const googleMapsUrl = reviewsData.mapsUrl || 'https://share.google/3r98gdF4n9AktNroD';

  useEffect(() => {
    async function fetchGoogleReviews() {
      try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'success') {
            setReviewsData({
              rating: data.rating || 4.9,
              userRatingsTotal: data.userRatingsTotal || '100+',
              reviews: data.reviews || [],
              mapsUrl: data.mapsUrl || googleMapsUrl,
            });
          }
        }
      } catch (e) {
        console.warn('Could not load live Google reviews:', e);
      } finally {
        setLoading(false);
      }
    }

    fetchGoogleReviews();
  }, []);

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>{t.testimonials.badge}</span>
          </div>
          <h2 className="section-title">{t.testimonials.title}</h2>
          <p className="section-subtitle">{t.testimonials.subtitle}</p>

          {/* Google Reviews Live Rating Summary Badge */}
          <div className="google-reviews-header-card">
            <div className="google-logo-wrapper">
              <span className="g-logo-icon">G</span>
            </div>
            <div className="google-rating-info">
              <div className="rating-score-row">
                <span className="rating-number">{reviewsData.rating}</span>
                <span className="rating-stars">★★★★★</span>
                <span className="rating-count">({reviewsData.userRatingsTotal} {t.testimonials.googleReviewCount})</span>
              </div>
              <span className="google-verified-text">
                {t.testimonials.googleBadge} • Sri Arunachaleswara Astrology
              </span>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-google-read-all"
              title={t.testimonials.readAllReviews}
            >
              <span>{t.testimonials.readAllReviews}</span>
              <span className="btn-external-arrow">↗</span>
            </a>
          </div>
        </div>

        {/* Dynamic Reviews Showcase */}
        {loading ? (
          <div className="google-reviews-loading">
            <div className="loading-spinner-gold"></div>
          </div>
        ) : reviewsData.reviews.length > 0 ? (
          <div className="testimonials-cards-grid">
            {reviewsData.reviews.map((item, idx) => (
              <div key={idx} className="testimonial-card-glass google-live-card">
                <div className="card-top-header">
                  <div className="testimonial-stars">
                    {'★'.repeat(item.rating || 5)}
                  </div>
                  <a
                    href={item.author_url || googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="google-card-badge"
                  >
                    <span className="g-card-icon">G</span>
                    <span className="g-card-label">{t.testimonials.verifiedReview}</span>
                    <span className="g-card-arrow">↗</span>
                  </a>
                </div>

                <p className="testimonial-quote">"{item.text}"</p>

                <div className="testimonial-author-meta">
                  {item.profile_photo_url ? (
                    <img
                      src={item.profile_photo_url}
                      alt={item.author_name}
                      className="author-avatar-img"
                    />
                  ) : (
                    <div className="author-avatar-initial">
                      {item.author_name ? item.author_name.charAt(0) : 'G'}
                    </div>
                  )}
                  <div className="author-details">
                    <div className="author-name-row">
                      <a
                        href={item.author_url || googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="author-name hover-link"
                      >
                        {item.author_name}
                      </a>
                      <span className="author-check" title="Verified Google Reviewer">✓</span>
                    </div>
                    <div className="author-role-loc">
                      <span>{item.relative_time_description || 'Google Maps Review'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="google-showcase-hub">
            <div className="google-hub-inner">
              <div className="hub-badge-row">
                <span className="live-pulse-dot"></span>
                <span className="hub-status-text">Official Google Business Profile</span>
              </div>
              <h3 className="hub-headline">{t.testimonials.title}</h3>
              <p className="hub-subtext">{t.testimonials.googleBannerText}</p>
              
              <div className="hub-actions">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-google-primary-lg"
                >
                  <span className="g-btn-icon">G</span>
                  <span>{t.testimonials.readAllReviews}</span>
                  <span className="btn-arrow">↗</span>
                </a>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-google-secondary-lg"
                >
                  <span>✍️ {t.testimonials.writeReview}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
