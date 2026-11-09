import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  Phone,
  Mail,
  Star,
  ShieldAlert,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Copy,
  Check,
  Flag,
  Info,
} from 'lucide-react';
import { Provider } from '../../types';

interface ProviderDetailsModalProps {
  provider: Provider | null;
  onClose: () => void;
  onRequestAppointment: (data: {
    ownerName: string;
    petName: string;
    petType: string;
    phone: string;
    preferredDate: string;
    notes: string;
  }) => void;
  onReportCorrection?: (provider: Provider) => void;
}

export const ProviderDetailsModal: React.FC<ProviderDetailsModalProps> = ({
  provider,
  onClose,
  onRequestAppointment,
  onReportCorrection,
}) => {
  const [copied, setCopied] = useState(false);
  const [ownerName, setOwnerName] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('Dog');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!provider) return null;

  const hasPhone = Boolean(provider.phone && provider.phone.trim().length > 0);

  const handleCopyPhone = () => {
    if (!hasPhone) return;
    navigator.clipboard?.writeText(provider.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!ownerName.trim()) errors.ownerName = 'Please enter your name';
    if (!petName.trim()) errors.petName = 'Please enter pet name';
    if (!phone.trim() || phone.trim().length < 8) errors.phone = 'Please enter a valid phone number';
    if (!preferredDate) errors.preferredDate = 'Please select a preferred date';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      onRequestAppointment({
        ownerName,
        petName,
        petType,
        phone,
        preferredDate,
        notes,
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#174B3A]/15 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-[#174B3A]/10 flex items-center justify-between bg-[#FAF8F3]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#174B3A]">
              {provider.category}
            </span>
            <span className="text-xs text-[#252D29]/40">·</span>
            <span className="text-xs bg-[#174B3A]/10 text-[#174B3A] px-2 py-0.5 rounded-md font-medium">
              {provider.isUserAdded ? 'Community Verified Listing' : 'Illustrative Profile'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onReportCorrection && (
              <button
                onClick={() => {
                  onClose();
                  onReportCorrection(provider);
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-amber-800 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
              >
                <Flag className="w-3.5 h-3.5 text-amber-600" />
                <span>Report Inaccuracy</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white hover:bg-stone-200 text-[#252D29] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-8">
          {/* Main Top Row: Image & Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-sm relative">
              <img
                src={provider.image}
                alt={provider.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {provider.is24x7Emergency && (
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>24/7 Trauma Emergency</span>
                </div>
              )}
            </div>

            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span className="font-bold text-sm text-[#252D29]">{provider.rating}</span>
                  </div>
                  <span className="text-xs text-[#252D29]/60">
                    ({provider.reviewsCount} verified reviews · illustrative)
                  </span>
                </div>

                <h2 className="font-heading font-extrabold text-2xl text-[#174B3A] mb-2">
                  {provider.name}
                </h2>

                <p className="text-xs sm:text-sm text-[#252D29]/80 leading-relaxed mb-4">
                  {provider.aboutText}
                </p>

                <div className="space-y-2 text-xs text-[#252D29]/80">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#174B3A] shrink-0 mt-0.5" />
                    <span>{provider.fullAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#174B3A] shrink-0" />
                    <span className="font-medium text-[#174B3A]">{provider.openingHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#174B3A]">Consultation Fee:</span>
                    <span>{provider.consultationFee}</span>
                  </div>
                  {provider.email && (
                    <div className="flex items-center gap-2 text-[#252D29]/70">
                      <Mail className="w-3.5 h-3.5 text-[#174B3A]" />
                      <a href={`mailto:${provider.email}`} className="hover:underline">
                        {provider.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Action telephone strip with graceful handling for missing phone */}
              <div className="mt-6 pt-4 border-t border-[#174B3A]/10 flex flex-wrap items-center gap-3">
                {hasPhone ? (
                  <>
                    <a
                      href={`tel:${provider.phone}`}
                      className="px-4 py-2.5 bg-[#174B3A] hover:bg-[#12382c] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#F28B68]" />
                      <span>Call {provider.phone}</span>
                    </a>

                    <button
                      onClick={handleCopyPhone}
                      className="px-3 py-2.5 bg-[#FAF8F3] hover:bg-[#E9F1E9] text-[#174B3A] text-xs font-medium rounded-xl border border-[#174B3A]/15 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Copied' : 'Copy Number'}</span>
                    </button>
                  </>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>
                      Direct telephone number is undergoing editorial verification. Please visit the physical facility or reach out via email.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Alert Notice Box if applicable */}
          {provider.emergencyNotice && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-0.5">Emergency Triage Notice:</strong>
                <span>{provider.emergencyNotice}</span>
              </div>
            </div>
          )}

          {/* Section: Doctors & Clinical Team */}
          {provider.doctors && provider.doctors.length > 0 && (
            <div>
              <h3 className="font-heading font-bold text-base text-[#174B3A] mb-3">
                Attending Veterinary Doctors & Specialists
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {provider.doctors.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#FAF8F3] border border-[#174B3A]/10"
                  >
                    <div className="font-bold text-sm text-[#174B3A]">{doc.name}</div>
                    <div className="text-xs text-[#252D29]/80 font-medium">{doc.specialization}</div>
                    <div className="text-[11px] text-[#252D29]/60 mt-1">
                      {doc.degrees} · {doc.experience}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Facilities & Equipment */}
          <div>
            <h3 className="font-heading font-bold text-base text-[#174B3A] mb-3">
              Hospital Facilities & Clinical Equipment
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {provider.facilities.map((fac, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-[#FAF8F3] border border-[#174B3A]/8 text-xs text-[#252D29]/85 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#174B3A] shrink-0" />
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Services List */}
          <div>
            <h3 className="font-heading font-bold text-base text-[#174B3A] mb-2.5">
              All Available Services
            </h3>
            <div className="flex flex-wrap gap-2">
              {provider.services.map((srv, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-[#E9F1E9] text-[#174B3A] text-xs font-medium"
                >
                  {srv}
                </span>
              ))}
            </div>
          </div>

          {/* Consultation Inquiry Form with Mandatory Non-Instant Booking Notice */}
          <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#174B3A]/15">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-[#174B3A]" />
              <h3 className="font-heading font-bold text-base text-[#174B3A]">
                Request Consultation Inquiry / Callback
              </h3>
            </div>

            {/* Crucial Ethical Policy Notice: Never pretend bookings are confirmed */}
            <div className="mb-4 p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 text-xs flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <span>
                <strong>Booking Confirmation Policy:</strong> Submitting this inquiry notifies clinic reception. Because operating schedules and emergency surgeries fluctuate, <strong>appointments are NOT confirmed until a staff member contacts you by telephone</strong>. For urgent triage, please call directly.
              </span>
            </div>

            <form onSubmit={handleBookingSubmit} aria-label="Appointment Request Form" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-owner-name" className="block text-xs font-medium text-[#252D29] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    id="modal-owner-name"
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. Rohini Sharma"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                  />
                  {formErrors.ownerName && (
                    <span className="text-[11px] text-red-600 mt-0.5 block">{formErrors.ownerName}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-pet-name" className="block text-xs font-medium text-[#252D29] mb-1">
                    Pet Name & Breed *
                  </label>
                  <input
                    id="modal-pet-name"
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="e.g. Bruno (Golden Retriever)"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                  />
                  {formErrors.petName && (
                    <span className="text-[11px] text-red-600 mt-0.5 block">{formErrors.petName}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-pet-type" className="block text-xs font-medium text-[#252D29] mb-1">
                    Pet Category
                  </label>
                  <select
                    id="modal-pet-type"
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit / Small Animal">Rabbit / Small Animal</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="modal-owner-phone" className="block text-xs font-medium text-[#252D29] mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    id="modal-owner-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                  />
                  {formErrors.phone && (
                    <span className="text-[11px] text-red-600 mt-0.5 block">{formErrors.phone}</span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="modal-consult-date" className="block text-xs font-medium text-[#252D29] mb-1">
                    Preferred Consultation Date *
                  </label>
                  <input
                    id="modal-consult-date"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full sm:w-1/2 px-3 py-2 text-xs rounded-lg bg-white border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                  />
                  {formErrors.preferredDate && (
                    <span className="text-[11px] text-red-600 mt-0.5 block">{formErrors.preferredDate}</span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="modal-consult-notes" className="block text-xs font-medium text-[#252D29] mb-1">
                    Reason for Visit / Symptoms (Optional)
                  </label>
                  <textarea
                    id="modal-consult-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Annual vaccination booster and itching on ears."
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-[#252D29] hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#174B3A] hover:bg-[#12382c] rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Dispatching Inquiry...' : 'Send Inquiry to Reception'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
