import './globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import { BookingProvider } from '../context/BookingContext';
import BookingDrawer from '../components/BookingDrawer';
import WhatsAppFloat from '../components/WhatsAppFloat';

export const metadata = {
  title: 'Sri Arunachaleswara Astrology & Research Centre | Astrologer M. Parthasarathy',
  description: 'Expert Vedic Astrology, Janma Kundli Analysis, Vastu Shastra, Jamakkol Prasanam & authentic remedies by Astrologer M. Parthasarathy (M.A., B.Ed.) at Vaitheeswaran Koil, Tamil Nadu.',
  keywords: [
    'Sri Arunachaleswara Astrology',
    'Astrologer M Parthasarathy',
    'Vaitheeswaran Koil Astrologer',
    'Vedic Astrology Tamil Nadu',
    'Kundli Matching',
    'Jamakkol Prasanam',
    'Vastu Shastra Consultation',
    'Tamil Astrologer',
    'Hindi Astrologer',
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#fffdfa',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Noto+Sans+Tamil:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          <BookingProvider>
            {children}
            <BookingDrawer />
            <WhatsAppFloat />
          </BookingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
