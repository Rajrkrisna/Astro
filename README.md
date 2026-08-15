# Celestial Guidance - Astrologer Website

A modern, professional website for astrologers built with **Next.js 14**, featuring beautiful UI, responsive design, and essential features for astrology services.

## Features

✨ **Hero Section** - Eye-catching landing area with call-to-action

🌙 **Services Showcase** - Display all astrological services with icons

👤 **About Section** - Professional background and credentials

⭐ **Client Testimonials** - Social proof from satisfied customers

📧 **Newsletter Signup** - Build your email list

📱 **Contact Page** - Full contact form with service selection

🎨 **Responsive Design** - Works perfectly on mobile, tablet, and desktop

⚡ **Fast Performance** - Optimized with Next.js

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pmanickapriya/Astro.git
cd Astro
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

## Project Structure

```
Astro/
├── app/
│   ├── page.jsx              # Home page
│   ├── contact/
│   │   └── page.jsx          # Contact page
│   ├── layout.jsx            # Root layout
│   └── globals.css           # Global styles
├── package.json              # Dependencies
├── next.config.js            # Next.js configuration
└── README.md                 # This file
```

## Customization

### Update Business Information

Edit the following in `app/page.jsx` and `app/contact/page.jsx`:
- Business name ("Celestial Guidance")
- Contact email and phone
- Services offered
- About section content
- Social media links

### Change Colors & Styling

Edit `app/globals.css` to customize:
- Primary gradient: `#667eea` → `#764ba2`
- Accent color: `#ffd700`
- Fonts and spacing

### Add More Sections

Create new pages in the `app/` directory and link them in the navigation.

## Building for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

## Deployment

Easily deploy to:
- **Vercel** (recommended): `vercel deploy`
- **Netlify**: Connect GitHub repository
- **Any Node.js hosting**: Use `npm run build && npm start`

## Technologies Used

- **Next.js 14** - React framework
- **React 18** - UI library
- **CSS3** - Styling with animations
- **JavaScript (ES6+)** - Interactivity

## Future Enhancements

- [ ] Blog section for horoscopes and articles
- [ ] Online booking system
- [ ] Client testimonials database
- [ ] Email notifications
- [ ] User authentication
- [ ] Payment integration
- [ ] Admin dashboard

## License

MIT License - Feel free to use this for your astrology business!

## Support

For questions or issues, please open a GitHub issue.

---

**Made with ✨ for astrologers**
