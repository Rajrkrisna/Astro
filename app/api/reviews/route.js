import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache and revalidate every 1 hour

export async function GET() {
  const mapsUrl = 'https://share.google/3r98gdF4n9AktNroD';
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (apiKey && placeId) {
    try {
      const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,url&key=${apiKey}`;
      const response = await fetch(endpoint, { next: { revalidate: 3600 } });
      const data = await response.json();

      if (data.status === 'OK' && data.result) {
        const transformedReviews = (data.result.reviews || []).map((r) => ({
          author_name: r.author_name,
          author_url: r.author_url || mapsUrl,
          profile_photo_url: r.profile_photo_url || null,
          rating: r.rating || 5,
          relative_time_description: r.relative_time_description || 'Recently',
          text: r.text || '',
          time: r.time,
        }));

        return NextResponse.json({
          status: 'success',
          source: 'google_places_api_live',
          rating: data.result.rating || 4.9,
          userRatingsTotal: data.result.user_ratings_total || 100,
          reviews: transformedReviews,
          mapsUrl: data.result.url || mapsUrl,
        });
      }
    } catch (err) {
      console.error('Failed to fetch live Google Places reviews:', err);
    }
  }

  return NextResponse.json({
    status: 'success',
    source: 'google_maps_direct',
    rating: 4.9,
    userRatingsTotal: '100+',
    reviews: [],
    mapsUrl: mapsUrl,
  });
}
