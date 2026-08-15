import './globals.css';

export const metadata = {
  title: 'Celestial Guidance - Professional Astrologer',
  description: 'Discover your cosmic journey with expert astrological readings',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
