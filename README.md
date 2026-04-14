# SENBIOTECK Website

Modern, responsive website for SENBIOTECK — an African biotech company specializing in AI-validated phytotherapy products.

## Features

- **5 Pages**: Home, Products, Notre Science, About, Contact
- **Responsive Design**: Mobile-first (375px → 1280px)
- **Premium UI**: Tailwind CSS + custom design system
- **Animations**: Framer Motion for smooth micro-interactions
- **WhatsApp Integration**: Floating action button + prominent CTA
- **African Biotech Branding**: Forest green, gold accents, Playfair Display typography

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build for Production

```bash
npm run build
npm start
```

## Deployment on VPS (Hostinger)

```bash
# Build the project
npm run build

# The output is in .next/
# Upload to your VPS and run:
npm start
```

For PM2 process management:
```bash
npm install -g pm2
pm2 start npm --name "senbioteck" -- start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles + custom properties
│   ├── produits/           # Products page
│   ├── science/            # Notre Science page
│   ├── about/              # About page
│   └── contact/            # Contact page
├── components/
│   ├── Navbar.tsx          # Responsive navigation
│   ├── Footer.tsx          # Site footer
│   ├── WhatsAppFAB.tsx     # Floating WhatsApp button
│   ├── ProductCard.tsx     # Product display card
│   ├── PlantCard.tsx       # Plant info card
│   └── TestimonialCard.tsx # Customer testimonial
├── package.json
├── tailwind.config.ts
└── next.config.js
```

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Forest | `#1D9E75` | Primary brand color |
| Forest Dark | `#085041` | Headings, accents |
| Forest Light | `#E1F5EE` | Backgrounds, cards |
| Gold | `#C8972A` | Premium accents, CTAs |
| Cream | `#FAF8F3` | Global background |
| Earth | `#3D2B1F` | Body text |

## Legal Notes

All products are dietary supplements, not medications. Products contain mandatory disclaimers as required by regulations.
