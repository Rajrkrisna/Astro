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
          <div className="logo">✨ Celestial Guidance</div>
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
          <h1>Welcome to Your Cosmic Journey</h1>
          <p>Unlock the mysteries of the universe and discover your true path</p>
          <Link href="/contact" className="cta-button">Book a Reading</Link>
        </div>
        <div className="hero-background"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🌙</div>
            <h3>Birth Chart Analysis</h3>
            <p>Discover your cosmic blueprint and life purpose through detailed natal chart interpretation.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🔮</div>
            <h3>Personalized Horoscope</h3>
            <p>Get daily, weekly, and monthly predictions tailored specifically to your astrological profile.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">💫</div>
            <h3>Relationship Compatibility</h3>
            <p>Explore the cosmic connections between you and your loved ones with synastry analysis.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">⭐</div>
            <h3>Career Guidance</h3>
            <p>Find your calling and optimal career path using astrological insights and planetary influences.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🌟</div>
            <h3>Transit Predictions</h3>
            <p>Understand current planetary movements and their impact on your life events and decisions.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🪐</div>
            <h3>Remedial Measures</h3>
            <p>Receive personalized recommendations to balance energies and enhance positive outcomes.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-content">
          <h2>About Me</h2>
          <p>
            With over 15 years of experience in Vedic and Western astrology, I'm dedicated to helping individuals 
            understand their cosmic destiny and navigate life's challenges with confidence.
          </p>
          <p>
            My approach combines ancient astrological wisdom with modern psychological insights, providing 
            practical guidance for personal growth and spiritual development.
          </p>
          <div className="credentials">
            <h3>Credentials</h3>
            <ul>
              <li>✓ Certified Vedic Astrologer</li>
              <li>✓ Bachelor's in Psychology</li>
              <li>✓ 15+ Years Professional Experience</li>
              <li>✓ 500+ Satisfied Clients</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <h2>Client Testimonials</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p className="text">"The birth chart reading was incredibly insightful and helped me make important life decisions."</p>
            <p className="author">- Sarah M.</p>
          </div>
          <div className="testimonial">
            <p className="text">"Her guidance about career transitions was spot-on. Highly recommend!"</p>
            <p className="author">- John D.</p>
          </div>
          <div className="testimonial">
            <p className="text">"The relationship compatibility analysis brought so much clarity to my partnership."</p>
            <p className="author">- Emma R.</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <h2>Stay Connected</h2>
        <p>Subscribe to receive monthly horoscopes and cosmic insights</p>
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
        <p>&copy; 2024 Celestial Guidance. All rights reserved.</p>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
        </div>
      </footer>
    </>
  );
}
