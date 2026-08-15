'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you! We'll contact you at ${email}`);
    setEmail('');
  };

  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">🌟 Sri Arunachaleswara Astrology</div>
          <ul className="nav-links">
            <li><Link href="#services">Services</Link></li>
            <li><Link href="#about">About</Link></li>
            <li><Link href="#testimonials">Testimonials</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Sri Arunachaleswara Astrology & Research Centre</h1>
          <p className="astrologer-name">M. Parthasarathy</p>
          <p className="credentials">M.A., B.Ed.</p>
          <p>Discover your cosmic journey with expert Vedic & Western Astrology</p>
          <Link href="/contact" className="cta-button">Book a Reading</Link>
        </div>
        <div className="hero-background"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">💼</div>
            <h3>Career & Business</h3>
            <p>Strategic guidance for career advancement and business success through astrological insights.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🌿</div>
            <h3>Holistic Wellness</h3>
            <p>Comprehensive wellness solutions combining ancient wisdom with modern practices.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🏛️</div>
            <h3>Vastu & Nadi</h3>
            <p>Expert Vastu consultation and Nadi readings for balanced living spaces and life path.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🎯</div>
            <h3>Jamakkol Prasanam</h3>
            <p>Traditional palmistry and predictive astrology for detailed life forecasting.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🌙</div>
            <h3>Birth Chart Analysis</h3>
            <p>Detailed natal chart interpretation revealing your cosmic blueprint and life purpose.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">💫</div>
            <h3>Personalized Horoscope</h3>
            <p>Daily, weekly, and monthly predictions tailored to your astrological profile.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-content">
          <h2>About M. Parthasarathy</h2>
          <p>
            <strong>M.A., B.Ed.</strong> - An esteemed astrologer with deep expertise in Vedic astrology, 
            Western astrology, and traditional predictive sciences. M. Parthasarathy heads the 
            <em> Sri Arunachaleswara Astrology & Research Centre</em>, dedicated to providing authentic 
            guidance for personal and professional growth.
          </p>
          <p>
            With years of dedicated research and practical experience, the centre specializes in comprehensive 
            astrological services including career guidance, business consultations, holistic wellness, 
            Vastu expertise, Nadi readings, and Jamakkol Prasanam (palmistry).
          </p>
          <div className="credentials">
            <h3>Specializations</h3>
            <ul>
              <li>✓ Vedic Astrology (Traditional & Contemporary)</li>
              <li>✓ Western Astrology</li>
              <li>✓ Vastu Shastra</li>
              <li>✓ Nadi Readings</li>
              <li>✓ Jamakkol Prasanam (Palmistry)</li>
              <li>✓ Career & Business Consultation</li>
              <li>✓ Holistic Wellness Guidance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="service-areas">
        <h2>Focus Areas</h2>
        <div className="areas-grid">
          <div className="area-item">
            <h3>💼 Career & Business</h3>
            <p>Job selection, business ventures, timing for major decisions</p>
          </div>
          <div className="area-item">
            <h3>❤️ Relationships</h3>
            <p>Compatibility analysis, marriage timing, family harmony</p>
          </div>
          <div className="area-item">
            <h3>🏠 Vastu Solutions</h3>
            <p>Home and office Vastu consultation for prosperity</p>
          </div>
          <div className="area-item">
            <h3>💎 Wealth & Prosperity</h3>
            <p>Financial planning and investment guidance</p>
          </div>
          <div className="area-item">
            <h3>🧘 Holistic Health</h3>
            <p>Health predictions and wellness recommendations</p>
          </div>
          <div className="area-item">
            <h3>🔮 Remedial Measures</h3>
            <p>Personalized solutions and positive interventions</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <h2>Client Testimonials</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p className="text">"M. Parthasarathy's career guidance was transformative. His insights helped me make the right professional choices."</p>
            <p className="author">- Rajesh K.</p>
          </div>
          <div className="testimonial">
            <p className="text">"The Vastu consultation completely changed the energy in our home. Highly recommend!"</p>
            <p className="author">- Priya M.</p>
          </div>
          <div className="testimonial">
            <p className="text">"Accurate predictions and practical guidance. His holistic approach to wellness is remarkable."</p>
            <p className="author">- Anita R.</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <h2>Stay Connected</h2>
        <p>Subscribe to receive monthly astrological insights and wellness tips</p>
        <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Sri Arunachaleswara Astrology & Research Centre. All rights reserved.</p>
        <div className="contact-footer">
          <p>📱 +91 93677 80030 | 📧 sarathymanickam@gmail.com</p>
          <p>📍 24/10, Thiruvavaduthurai Madathu Street, Vaitheeswaran Koil - 609117, Tamil Nadu, India</p>
        </div>
        <div className="social-links">
          <a href="https://wa.me/919367780030" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="tel:+919367780030">Call Us</a>
          <a href="mailto:sarathymanickam@gmail.com">Email</a>
        </div>
      </footer>
    </>
  );
}
