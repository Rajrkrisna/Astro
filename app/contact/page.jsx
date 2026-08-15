'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="logo">✨ Celestial Guidance</Link>
          <ul className="nav-links">
            <li><Link href="/#services">Services</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#testimonials">Testimonials</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* Contact Section */}
      <section className="contact-page">
        <div className="contact-container">
          <h1>Get in Touch</h1>
          <p>Have questions? Want to book a reading? We'd love to hear from you!</p>

          <div className="contact-content">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <div className="info-item">
                <h3>📧 Email</h3>
                <p>contact@celestialguidance.com</p>
              </div>
              <div className="info-item">
                <h3>📱 Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="info-item">
                <h3>📍 Location</h3>
                <p>123 Cosmic Lane<br />Astral City, AC 12345<br />United States</p>
              </div>
              <div className="info-item">
                <h3>⏰ Business Hours</h3>
                <p>Monday - Friday: 10 AM - 6 PM<br />Saturday: 12 PM - 4 PM<br />Sunday: By Appointment</p>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="service">Service Interested In *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a service</option>
                  <option value="birth-chart">Birth Chart Analysis</option>
                  <option value="horoscope">Personalized Horoscope</option>
                  <option value="compatibility">Relationship Compatibility</option>
                  <option value="career">Career Guidance</option>
                  <option value="transit">Transit Predictions</option>
                  <option value="remedial">Remedial Measures</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
              {submitted && <p className="success-message">Thank you! Your message has been sent successfully.</p>}
            </form>
          </div>
        </div>
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
