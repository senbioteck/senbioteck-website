'use client';

import { useState, useEffect } from 'react';
import { Slot, getAvailableSlots, formatSlotDate, formatSlotTime } from '@/lib/appointments';
import type { Metadata } from 'next';

interface BookingFormData {
  slotId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reason: string;
  notes: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  reason?: string;
}

const SERVICES = [
  { id: 'general', name: 'Consultation générale', description: 'Bilan de santé, suivi médical' },
  { id: 'specialist', name: 'Spécialiste', description: 'Consultation avec un médecin spécialiste' },
  { id: 'checkup', name: 'Bilan de santé', description: 'Examen de prévention complet' },
];

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^[\d\s\+\-\.]{10,}$/.test(phone.replace(/\s/g, ''));
}

export default function AppointmentBookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [slotTakenError, setSlotTakenError] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    slotId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reason: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  useEffect(() => {
    if (selectedDate) {
      fetchSlots();
    }
  }, [selectedDate]);

  const fetchSlots = async () => {
    if (!selectedDate) return;
    setLoading(true);
    setError(null);
    setSlotTakenError(false);
    try {
      const result = await getAvailableSlots({ date: selectedDate, limit: 50 });
      setSlots(result.data.filter(s => s.status === 'AVAILABLE'));
    } catch {
      setError('Impossible de charger les créneaux. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot(slot);
    setFormData(prev => ({ ...prev, slotId: slot.id }));
    setSlotTakenError(false);
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.firstName.trim()) errors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) errors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Email invalide';
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = 'Numéro de téléphone invalide';
    }
    if (!formData.reason.trim()) errors.reason = 'Le motif de consultation est requis';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    setError(null);
    setSlotTakenError(false);
    try {
      const { createAppointment } = await import('@/lib/appointments');
      await createAppointment(formData);
      setBookingSuccess(true);
      setStep(3);
    } catch (err) {
      const message = err instanceof Error ? err.message : '';
      if (message.toLowerCase().includes('slot') || message.toLowerCase().includes('taken') || message.toLowerCase().includes('booked')) {
        setSlotTakenError(true);
        fetchSlots();
      } else {
        setError('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedSlot(null);
      setFormData(prev => ({ ...prev, slotId: '' }));
    } else if (step === 3) {
      setStep(2);
    }
  };

  if (bookingSuccess) {
    return (
      <div className="container-page section-padding">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Rendez-vous confirmé !</h1>
          <p className="text-gray-600 mb-6">
            Votre rendez-vous a été enregistré. Vous recevrez un email de confirmation à{' '}
            <strong>{formData.email}</strong>.
          </p>
          {selectedSlot && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2">Détails du rendez-vous :</h3>
              <p><span className="text-gray-600">Date :</span> {formatSlotDate(selectedSlot.startTime)}</p>
              <p><span className="text-gray-600">Heure :</span> {formatSlotTime(selectedSlot.startTime)}</p>
              <p><span className="text-gray-600">Motif :</span> {formData.reason}</p>
            </div>
          )}
          <p className="text-sm text-gray-500 mb-6">
            Pour annuler ou modifier votre rendez-vous, contactez-nous à{' '}
            <a href="tel:+33123456789" className="text-primary hover:underline">01 23 45 67 89</a>.
          </p>
          <a href="/patient" className="btn-primary">
            Retour au portail
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page section-padding">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Prendre rendez-vous</h1>

        <nav aria-label="Steps" className="mb-8">
          <ol className="flex items-center justify-center gap-4">
            {['Service', 'Créneau', 'Confirmation'].map((label, index) => {
              const stepNum = index + 1;
              const isActive = step === stepNum;
              const isComplete = step > stepNum;
              return (
                <li key={label} className="flex items-center">
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      isComplete
                        ? 'bg-primary text-white'
                        : isActive
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {isComplete ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      stepNum
                    )}
                  </span>
                  <span className={`ml-2 text-sm ${isActive ? 'font-medium text-primary' : 'text-gray-500'}`}>
                    {label}
                  </span>
                  {index < 2 && <span className="mx-4 text-gray-300">→</span>}
                </li>
              );
            })}
          </ol>
        </nav>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700" role="alert">
            {error}
          </div>
        )}

        {slotTakenError && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg text-orange-700" role="alert">
            <strong>Ce créneau vient d&apos;être réservé.</strong> Veuillez sélectionner un autre créneau.
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Sélectionnez un service</h2>
            <div className="space-y-3">
              {SERVICES.map(service => (
                <button
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service.id);
                    setStep(2);
                  }}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Sélectionnez une date</h2>
              <div className="flex flex-wrap gap-2">
                {availableDates.map(date => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedSlot(null);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedDate === date
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {new Date(date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </button>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Créneaux disponibles - {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </h2>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="mt-2 text-gray-600">Chargement des créneaux...</p>
                  </div>
                ) : slots.length === 0 ? (
                  <p className="text-center py-8 text-gray-600">
                    Aucun créneau disponible pour cette date. Veuillez sélectionner une autre date.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {slots.map(slot => (
                      <button
                        key={slot.id}
                        onClick={() => handleSlotSelect(slot)}
                        disabled={slot.status !== 'AVAILABLE'}
                        className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                          selectedSlot?.id === slot.id
                            ? 'bg-primary text-white'
                            : slot.status === 'AVAILABLE'
                            ? 'bg-gray-100 text-gray-700 hover:bg-primary/10'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {formatSlotTime(slot.startTime)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {selectedSlot && (
              <div className="flex justify-between">
                <button onClick={goBack} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  ← Retour
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="btn-primary"
                  disabled={!selectedSlot}
                >
                  Continuer →
                </button>
              </div>
            )}
          </div>
        )}

        {step === 3 && selectedSlot && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Vos informations</h2>
            <div className="space-y-4">
              <div className="bg-primary/5 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">Date et heure sélectionnées :</p>
                <p className="font-semibold">
                  {formatSlotDate(selectedSlot.startTime)} à {formatSlotTime(selectedSlot.startTime)}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                      formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    aria-describedby={formErrors.firstName ? 'firstName-error' : undefined}
                  />
                  {formErrors.firstName && (
                    <p id="firstName-error" className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                      formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    aria-describedby={formErrors.lastName ? 'lastName-error' : undefined}
                  />
                  {formErrors.lastName && (
                    <p id="lastName-error" className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-describedby={formErrors.email ? 'email-error' : undefined}
                />
                {formErrors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                    formErrors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                />
                {formErrors.phone && (
                  <p id="phone-error" className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium mb-1">
                  Motif de consultation <span className="text-red-500">*</span>
                </label>
                <select
                  id="reason"
                  value={formData.reason}
                  onChange={e => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                    formErrors.reason ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-describedby={formErrors.reason ? 'reason-error' : undefined}
                >
                  <option value="">Sélectionnez un motif</option>
                  <option value="Consultation de suivi">Consultation de suivi</option>
                  <option value="Première consultation">Première consultation</option>
                  <option value="Renouvellement d'ordonnance">Renouvellement d'ordonnance</option>
                  <option value="Analyse de résultats">Analyse de résultats</option>
                  <option value="Autre">Autre</option>
                </select>
                {formErrors.reason && (
                  <p id="reason-error" className="text-red-500 text-sm mt-1">{formErrors.reason}</p>
                )}
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium mb-1">
                  Notes supplémentaires
                </label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Informations complémentaires..."
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={goBack} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                ← Retour
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Confirmation...
                  </>
                ) : (
                  'Confirmer le rendez-vous'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
