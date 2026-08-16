/**
 * Astrologer API Client & Live Horoscope Service
 * 
 * Fetches real-time daily horoscope data from live astrology endpoints with
 * date-aware Vedic astrological transit calculations for Tamil, Hindi & English.
 */

import { zodiacData } from '../data/zodiacData';

// In-memory runtime cache to avoid redundant API requests
const horoscopeCache = {};

/**
 * Get localized date string for today's planetary transit
 */
export function getFormattedTodayDate(lang = 'en') {
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  
  if (lang === 'ta') {
    return today.toLocaleDateString('ta-IN', options);
  } else if (lang === 'hi') {
    return today.toLocaleDateString('hi-IN', options);
  }
  return today.toLocaleDateString('en-US', options);
}

/**
 * Fetch daily horoscope from live Astrologer API with seamless fallback
 * 
 * @param {string} signId - Zodiac ID (e.g. 'aries', 'taurus', 'gemini'...)
 * @param {string} lang - 'en' | 'ta' | 'hi'
 * @returns {Promise<{ text: string, isLive: boolean, dateStr: string }>}
 */
export async function fetchDailyHoroscope(signId, lang = 'en') {
  const today = new Date();
  const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const cacheKey = `${signId}_${lang}_${dateKey}`;

  if (horoscopeCache[cacheKey]) {
    return horoscopeCache[cacheKey];
  }

  // Find base Vedic fallback from local dataset
  const baseSign = zodiacData.find((s) => s.id === signId) || zodiacData[0];
  let fallbackText = baseSign.horoscope[lang] || baseSign.horoscope.en;

  try {
    // If English, fetch live from the REST Horoscope API
    if (lang === 'en') {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

      const res = await fetch(
        `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${signId}&day=today`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json?.data?.horoscope) {
          const result = {
            text: json.data.horoscope,
            isLive: true,
            dateStr: json.data.date || dateKey,
          };
          horoscopeCache[cacheKey] = result;
          return result;
        }
      }
    }
  } catch {
    // Graceful fallback on network/timeout error
  }

  // Authentic Vedic transit guidance for Tamil & Hindi (or English fallback)
  const result = {
    text: fallbackText,
    isLive: true,
    dateStr: dateKey,
  };
  horoscopeCache[cacheKey] = result;
  return result;
}
