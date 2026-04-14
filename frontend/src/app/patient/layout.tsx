'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

function CookieConsentBanner({ onAccept, onDecline }: CookieConsentProps) {
  return (
    <div
      role="dialog"
      aria-label="Consentement cookies"
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-1">Consentement aux cookies</h2>
            <p className="text-sm text-gray-600">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site.
              En continuant, vous acceptez notre{' '}
              <Link href="/politique-cookies" className="text-primary hover:underline">
                politique de cookies
              </Link>
              .
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onDecline}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Refuser
            </button>
            <button
              onClick={onAccept}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'declined' | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cookie-consent');
    if (saved) setCookieConsent(saved as 'accepted' | 'declined');
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setCookieConsent('accepted');
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setCookieConsent('declined');
  };

  const navItems = [
    { href: '/patient', label: 'Accueil' },
    { href: '/patient/rdv', label: 'Rendez-vous' },
    { href: '/patient/ressources', label: 'Ressources santé' },
    { href: '/patient/faq', label: 'FAQ' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="container-page">
          <div className="flex items-center justify-between h-16">
            <Link href="/patient" className="text-xl font-bold text-primary">
              Senbioteck - Portail Patient
            </Link>
            <nav className="flex items-center gap-1" role="navigation" aria-label="Navigation patient">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-100 border-t py-8 mt-16">
        <div className="container-page">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} Senbioteck - Portail Patient.
            En cas d'urgence, contactez le 15 (SAMU).
          </p>
        </div>
      </footer>
      {cookieConsent === null && (
        <CookieConsentBanner onAccept={handleAccept} onDecline={handleDecline} />
      )}
    </div>
  );
}
