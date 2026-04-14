import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portail Patient',
  description: 'Portail patient Senbioteck - Prenez rendez-vous, consultez vos ressources santé et FAQ.',
};

export default function PatientPage() {
  return (
    <div className="container-page section-padding">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur votre Portail Patient</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Accédez à vos services de santé en ligne : prenez rendez-vous,
          consultez vos ressources santé et trouvez réponses à vos questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Link
          href="/patient/rdv"
          className="group p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary transition-all"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            Prendre rendez-vous
          </h2>
          <p className="text-sm text-gray-600">
            Réservez facilement un créneau pour votre consultation en quelques clics.
          </p>
        </Link>

        <Link
          href="/patient/ressources"
          className="group p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary transition-all"
        >
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            Ressources santé
          </h2>
          <p className="text-sm text-gray-600">
            Consultez nos articles et guides pour mieux comprendre votre santé.
          </p>
        </Link>

        <Link
          href="/patient/faq"
          className="group p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary transition-all"
        >
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-teal-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            FAQ
          </h2>
          <p className="text-sm text-gray-600">
            Trouvez rapidement les réponses aux questions les plus fréquentes.
          </p>
        </Link>
      </div>

      <div className="mt-16 bg-primary/5 rounded-xl p-6 max-w-3xl mx-auto">
        <h3 className="text-lg font-semibold mb-3">Besoin d&apos;urgence ?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Pour toute situation d&apos;urgence médicale, veuillez appeler le 15 (SAMU)
          ou le 112 (numéro d&apos;urgence européen).
        </p>
        <div className="flex gap-4">
          <a href="tel:15" className="btn-primary text-sm">
            Appeler le 15
          </a>
          <a href="tel:112" className="btn-secondary text-sm">
            Appeler le 112
          </a>
        </div>
      </div>
    </div>
  );
}
