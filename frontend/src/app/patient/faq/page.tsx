'use client';

import { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    id: '1',
    category: 'Rendez-vous',
    question: 'Comment prendre rendez-vous en ligne ?',
    answer: 'Pour prendre rendez-vous, accédez à la section "Rendez-vous" de votre portail patient. Sélectionnez le service souhaité, choisissez une date et un créneau disponible, puis remplissez vos informations personnelles. Vous recevrez un email de confirmation.',
  },
  {
    id: '2',
    category: 'Rendez-vous',
    question: 'Puis-je annuler ou modifier mon rendez-vous ?',
    answer: 'Pour annuler ou modifier un rendez-vous, veuillez contacter notre secrétariat par téléphone au 01 23 45 67 89 ou par email à contact@senbioteck.fr. Merci de nous prévenir au moins 24 heures à l\'avance.',
  },
  {
    id: '3',
    category: 'Rendez-vous',
    question: 'Que faire si aucun créneau n\'est disponible ?',
    answer: 'Si aucun créneau ne vous convient, vous pouvez contacter notre secrétariat qui fera son possible pour trouver une solution adaptée à vos besoins. Vous pouvez également vérifier régulièrement notre calendrier, de nouveaux créneaux étant ajoutés régulièrement.',
  },
  {
    id: '4',
    category: 'Mon compte',
    question: 'Comment créer un compte patient ?',
    answer: 'Vous n\'avez pas besoin de créer de compte pour prendre rendez-vous ou consulter les ressources santé. Ces services sont accessibles à tous. Un compte sera créé automatiquement lors de votre première prise de rendez-vous.',
  },
  {
    id: '5',
    category: 'Mon compte',
    question: 'J\'ai oublié mon mot de passe, que faire ?',
    answer: 'Si vous avez un compte administrateur et avez oublié votre mot de passe, utilisez la fonction "Mot de passe oublié" sur la page de connexion. Si vous n\'arrivez pas à y accéder, contactez notre support technique.',
  },
  {
    id: '6',
    category: 'Ressources santé',
    question: 'Les ressources santé sont-elles fiables ?',
    answer: 'Oui, toutes nos ressources santé sont vérifiées par notre équipe médicale. Elles sont rédigées ou relues par des professionnels de santé qualifiés pour garantir leur exactitude et leur pertinence.',
  },
  {
    id: '7',
    category: 'Ressources santé',
    question: 'Puis-je partager une ressource avec mon médecin ?',
    answer: 'Absolument ! Vous pouvez discuter de ces ressources lors de votre consultation. Cependant, ces informations ne remplacent pas un avis médical professionnel. Consultez toujours votre médecin pour des conseils personnalisés.',
  },
  {
    id: '8',
    category: 'Données et confidentialité',
    question: 'Mes données médicales sont-elles protégées ?',
    answer: 'Oui, la protection de vos données est notre priorité. Nous respectons le Règlement Général sur la Protection des Données (RGPD) et la réglementation française sur les données de santé. Vos informations sont chiffrées et stockées de manière sécurisée.',
  },
  {
    id: '9',
    category: 'Données et confidentialité',
    question: 'Comment fonctionne le consentement aux cookies ?',
    answer: 'Lors de votre première visite, un bandeau vous demande d\'accepter ou de refuser les cookies. Vous pouvez modifier votre choix à tout moment via les paramètres de votre navigateur. Les cookies essentiels ne peuvent pas être désactivés.',
  },
  {
    id: '10',
    category: 'Urgence',
    question: 'Que faire en cas d\'urgence médicale ?',
    answer: 'En cas d\'urgence médicale, composez immédiatement le 15 (SAMU) ou le 112 (numéro d\'urgence européen). Notre portail patient n\'est pas adapté aux situations d\'urgence. Ne tardez pas à appeler les services d\'urgence.',
  },
];

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span className="font-medium text-gray-900 pr-4">{item.question}</span>
        <span
          className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-answer-${item.id}`}
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
      >
        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(FAQS.map(faq => faq.category)));

  const filteredFAQs = selectedCategory
    ? FAQS.filter(faq => faq.category === selectedCategory)
    : FAQS;

  const handleToggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="container-page section-padding">
      <h1 className="text-3xl font-bold mb-4 text-center">Foire Aux Questions</h1>
      <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
        Trouvez rapidement les réponses aux questions les plus fréquentes sur nos services.
      </p>

      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Toutes les questions
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {filteredFAQs.map(faq => (
            <AccordionItem
              key={faq.id}
              item={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>

        <div className="mt-8 text-center bg-primary/5 rounded-xl p-6">
          <h3 className="font-semibold mb-2">Vous n&apos;avez pas trouvé votre réponse ?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Notre équipe est là pour vous aider. Contactez-nous directement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+33123456789" className="btn-primary text-sm">
              01 23 45 67 89
            </a>
            <a href="/patient/contact" className="btn-secondary text-sm">
              Envoyer un message
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
