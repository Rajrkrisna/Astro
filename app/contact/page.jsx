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
          <Link href="/" className="logo">🌟 Sri Arunachaleswara Astrology</Link>
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
          <h1>Get in Touch with M. Parthasarathy</h1>
          <p>Have questions about astrology services? Want to book a consultation? We'd love to help!</p>

          <div className="contact-content">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <div className="info-item">
                <h3>📱 Phone</h3>
                <p><a href="tel:+919367780030">+91 93677 80030</a></p>
                <p style={{fontSize: '0.9rem', color: '#888'}}>Available on Call & WhatsApp</p>
              </div>
              <div className="info-item">
                <h3>📧 Email</h3>
                <p><a href="mailto:sarathymanickam@gmail.com">sarathymanickam@gmail.com</a></p>
              </div>
              <div className="info-item">
                <h3>📍 Address</h3>
                <p>Sri Arunachaleswara Astrology & Research Centre<br />
                24/10, Thiruvavaduthurai Madathu Street<br />
                Vaitheeswaran Koil - 609117<br />
                Mayiladuthurai District<br />
                Tamil Nadu, South India</p>
              </div>
              <div className="info-item">
                <h3>⏰ Consultation Hours</h3>
                <p>Monday - Friday: 9 AM - 6 PM<br />
                Saturday: 10 AM - 4 PM<br />
                Sunday: By Appointment Only</p>
              </div>
              <div className="info-item quick-contact">
                <h3>Quick Links</h3>
                <div className="quick-links">
                  <a href="https://wa.me/919367780030" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">💬 WhatsApp</a>
                  <a href="tel:+919367780030" className="btn-call">☎️ Call Now</a>
                </div>
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
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91"
                  required
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
                  <option value="career">Career & Business Guidance</option>
                  <option value="holistic">Holistic Wellness</option>
                  <option value="vastu">Vastu Consultation</option>
                  <option value="nadi">Nadi Reading</option>
                  <option value="jamakkol">Jamakkol Prasanam (Palmistry)</option>
                  <option value="birth-chart">Birth Chart Analysis</option>
                  <option value="horoscope">Personalized Horoscope</option>
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
                  placeholder="Tell us about your inquiry..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
              {submitted && <p className="success-message">✓ Thank you! Your message has been sent. We'll contact you soon.</p>}
            </form>
          </div>
        </div>
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
