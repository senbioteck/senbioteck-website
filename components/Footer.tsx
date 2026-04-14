'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const footerLinks = {
  produits: [
    { href: '/produits#senviril', label: 'SENVIRIL-1' },
    { href: '/produits#senfertil', label: 'SENFERTIL-M' },
    { href: '/produits#senimmu', label: 'SENIMMU-1' },
  ],
  company: [
    { href: '/about', label: 'À propos' },
    { href: '/science', label: 'Notre Science' },
    { href: '/contact', label: 'Contact' },
  ],
  legal: [
    { href: '/mentions-legales', label: 'Mentions légales' },
    { href: '/politique-confidentialite', label: 'Politique de confidentialité' },
  ],
}

const socialLinks = [
  { href: 'https://wa.me/22170000000', label: 'WhatsApp', icon: 'M' },
  { href: 'https://tiktok.com/@senbioteck', label: 'TikTok', icon: 'T' },
  { href: 'https://facebook.com/senbioteck', label: 'Facebook', icon: 'F' },
  { href: 'https://instagram.com/senbioteck', label: 'Instagram', icon: 'I' },
  { href: 'https://youtube.com/@senbioteck', label: 'YouTube', icon: 'Y' },
]

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-cream/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">S</span>
              </div>
              <span className="font-heading font-bold text-xl text-cream">
                SENBIOTECK
              </span>
            </div>
            <p className="text-cream/70 text-sm mb-6">
              La nature africaine, validée par la science. Des formules biologiques à base de plantes médicinales africaines.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-forest/30 flex items-center justify-center hover:bg-forest transition-colors"
                  aria-label={social.label}
                >
                  <span className="text-sm font-medium">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-cream">
              Produits
            </h4>
            <ul className="space-y-2">
              {footerLinks.produits.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-forest-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-cream">
              Société
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-forest-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-cream">
              Contact
            </h4>
            <ul className="space-y-2 text-cream/70 text-sm">
              <li>Dakar, Sénégal</li>
              <li>contact@senbioteck.com</li>
              <li>+221 70 000 00 00</li>
            </ul>
          </div>
        </div>

        <div className="section-divider my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/50 text-sm">
            © 2025 SENBIOTECK. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/50 hover:text-cream/80 transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 p-4 bg-forest/20 rounded-lg"
        >
          <p className="text-cream/60 text-xs text-center">
            ⚠️ Ces produits sont des compléments alimentaires à base de plantes. Ils ne sont pas des médicaments et ne se substituent pas à un traitement médical. 
            Consultez un professionnel de santé avant utilisation.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
