# Capital Firm Website

A modern, professional website for Capital Firm, a financial services company. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Fast Performance** - Built with Next.js for optimal speed and SEO
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Clean, professional design with Tailwind CSS
- 📝 **Contact Form** - Lead generation with contact form
- 🔍 **SEO Optimized** - Meta tags and structured data for search engines
- ⚡ **TypeScript** - Type-safe development experience

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd capitalfirm
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
capitalfirm/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── Services.tsx    # Services showcase
│   ├── About.tsx       # About section
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## Customization

### Colors
The primary color scheme can be customized in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    // ... other shades
  }
}
```

### Content
Update the content in each component file to match your business:
- Company name and tagline in `Header.tsx`
- Services in `Services.tsx`
- About information in `About.tsx`
- Contact details in `Contact.tsx`

### Images
Replace the placeholder images with your own:
- Hero image in `Hero.tsx`
- Add company logo to `public/` directory

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## SEO

The site includes:
- Meta tags for search engines
- Open Graph tags for social sharing
- Structured data markup
- Responsive design for mobile-first indexing

## Performance

- Optimized images with Next.js Image component
- CSS and JavaScript minification
- Automatic code splitting
- Static generation for fast loading

## Support

For questions or support, please contact us at info@capitalfirm.com

## License

This project is licensed under the MIT License. 