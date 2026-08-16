'use client';

import React from 'react';

/**
 * 12 Authentic Traditional Golden Tamil Zodiac (Rasi) Icons
 * Sourced directly from authentic Vedic/Tamil astrological reference imagery.
 */
export default function ZodiacIcon({ signId, className = '', size = 52, alt = '' }) {
  const imageSrc = `/zodiac/${signId}.png`;

  return (
    <img
      src={imageSrc}
      alt={alt || `${signId} Tamil Rasi Symbol`}
      width={size}
      height={size}
      className={`rasi-gold-icon-img ${className}`}
      loading="eager"
      decoding="async"
      style={{
        objectFit: 'contain',
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}
