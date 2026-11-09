import React, { useState } from 'react';
import { X, Building2, CheckCircle2, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import { BusinessRegistrationData, ServiceCategorySlug } from '../../types';
import { CITIES_LIST } from '../../data/mockData';

interface ListBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (data: BusinessRegistrationData) => void;
}

export const ListBusinessModal: React.FC<ListBusinessModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState<ServiceCategorySlug>('veterinary-clinics');
  const [city, setCity] = useState('Bengaluru');
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [services, setServices] = useState('');
  const [consultationFee, setConsultationFee] = useState('₹600');
  const [is24x7, setIs24x7] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredSummary, setRegisteredSummary] = useState<BusinessRegistrationData | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!businessName.trim()) newErrors.businessName = 'Business or clinic name is required';
    if (!contactPerson.trim()) newErrors.contactPerson = 'Doctor / Contact person name is required';
    if (!phone.trim() || phone.trim().length < 8) newErrors.phone = 'Valid phone number is required (min 8 digits)';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid administrative email is required';
    if (!address.trim()) newErrors.address = 'Full street address is required';
    if (!locality.trim()) newErrors.locality = 'Locality / Area name is required';
    if (!description.trim() || description.trim().length < 15) {
      newErrors.description = 'Please provide a descriptive overview (at least 15 characters)';
    }
    if (!services.trim()) newErrors.services = 'Please list at least 1-2 core services offered (comma separated)';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const submissionData: BusinessRegistrationData = {
      businessName,
      category,
      contactPerson,
      phone,
      email,
      address,
      city,
      locality,
      description,
      services,
      is24x7,
      consultationFee,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setRegisteredSummary(submissionData);
      onSubmitSuccess(submissionData);
    }, 450);
  };

  const handleFinish = () => {
    setRegisteredSummary(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#174B3A]/15 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#174B3A]/10 bg-[#FAF8F3] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E9F1E9] text-[#174B3A] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#174B3A]" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl text-[#174B3A]">
                List Your Animal Care Business
              </h2>
              <p className="text-xs text-[#252D29]/65">
                Join India's dedicated pet health discovery network for free.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-200 text-[#252D29] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-8 overflow-y-auto">
          {registeredSummary ? (
            /* Confirmation Screen */
            <div className="text-center py-6 space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-2xl text-[#174B3A] mb-1">
                  Registration Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-[#252D29]/75 max-w-md mx-auto">
                  <strong>{registeredSummary.businessName}</strong> has been saved and published to the live directory.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#FAF8F3] p-5 rounded-2xl border border-[#174B3A]/15 text-left text-xs space-y-2.5 max-w-lg mx-auto">
                <div className="flex justify-between pb-2 border-b border-[#174B3A]/10">
                  <span className="text-[#252D29]/60 font-medium">Category:</span>
                  <span className="font-semibold text-[#174B3A]">{registeredSummary.category}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#174B3A]/10">
                  <span className="text-[#252D29]/60 font-medium">City & Locality:</span>
                  <span className="font-semibold text-[#252D29]">{registeredSummary.locality}, {registeredSummary.city}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#174B3A]/10">
                  <span className="text-[#252D29]/60 font-medium">Public Phone:</span>
                  <span className="font-mono font-semibold text-[#174B3A]">{registeredSummary.phone}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#174B3A]/10">
                  <span className="text-[#252D29]/60 font-medium">Contact Person:</span>
                  <span className="font-semibold text-[#252D29]">{registeredSummary.contactPerson}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#174B3A]/10">
                  <span className="text-[#252D29]/60 font-medium">24/7 Emergency:</span>
                  <span className="font-semibold text-[#252D29]">{registeredSummary.is24x7 ? 'Yes (Emergency Ready)' : 'Standard Hours'}</span>
                </div>
                <div>
                  <span className="text-[#252D29]/60 font-medium block mb-1">Services Registered:</span>
                  <p className="text-[11px] text-[#252D29]/80 font-mono bg-white p-2 rounded-lg border border-stone-200">
                    {registeredSummary.services}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#174B3A] hover:bg-[#12382c] rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  View in Directory
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <>
              <div className="mb-6 p-4 rounded-xl bg-[#E9F1E9]/60 border border-[#174B3A]/10 text-xs text-[#174B3A] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#174B3A] shrink-0 mt-0.5" />
                <span>
                  <strong>Zero Listing Fees & Direct Parent Access:</strong> Your listing will be indexed in our local discovery grid immediately and saved in your local session. You retain 100% direct patient relationships with zero booking commissions.
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Business Name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="reg-biz-name" className="block text-xs font-semibold text-[#252D29] mb-1">
                      Clinic / Facility Name *
                    </label>
                    <input
                      id="reg-biz-name"
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Apex Pet Hospital & Trauma Care"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                    />
                    {errors.businessName && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.businessName}</span>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="reg-category" className="block text-xs font-semibold text-[#252D29] mb-1">
                      Primary Category *
                    </label>
                    <select
                      id="reg-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ServiceCategorySlug)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                    >
                      <option value="veterinary-clinics">Veterinary Clinic</option>
                      <option value="animal-hospitals">Animal Hospital</option>
                      <option value="pet-boarding">Pet Boarding & Daycare</option>
                      <option value="diagnostics">Veterinary Diagnostics</option>
                      <option value="animal-ambulances">Animal Ambulance</option>
                      <option value="animal-ngos">Animal NGO & Shelter</option>
                    </select>
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="reg-city" className="block text-xs font-semibold text-[#252D29] mb-1">
                      City *
                    </label>
                    <select
                      id="reg-city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                    >
                      {CITIES_LIST.filter((c) => c !== 'All Cities').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                      <option value="Other">Other Metro</option>
                    </select>
                  </div>

                  {/* Locality */}
                  <div>
                    <label htmlFor="reg-locality" className="block text-xs font-semibold text-[#252D29] mb-1">
                      Locality / Suburb *
                    </label>
                    <input
                      id="reg-locality"
                      type="text"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      placeholder="e.g. Indiranagar, Bandra West"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                    />
                    {errors.locality && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.locality}</span>
                    )}
                  </div>

                  {/* Full Address */}
                  <div>
                    <label htmlFor="reg-address" className="block text-xs font-semibold text-[#252D29] mb-1">
                      Full Street Address *
                    </label>
                    <input
                      id="reg-address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 142/B, 100 Feet Road, HAL 2nd Stage"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                    />
                    {errors.address && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.address}</span>
                    )}
                  </div>

                  {/* Contact Person */}
                  <div>
                    <label htmlFor="reg-contact" className="block text-xs font-semibold text-[#252D29] mb-1">
                      Doctor / Manager Contact Person *
                    </label>
                    <input
                      id="reg-contact"
                      type="text"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g. Dr. Rajeshwari Rao"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                    />
                    {errors.contactPerson && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.contactPerson}</span>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="reg-phone" className="block text-xs font-semibold text-[#252D29] mb-1">
                      Public Clinic Phone *
                    </label>
                    <input
                      id="reg-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98450 12345"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.phone}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="reg-email" className="block text-xs font-semibold text-[#252D29] mb-1">
                      Administrative Email *
                    </label>
                    <input
                      id="reg-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. contact@apexvet.in"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.email}</span>
                    )}
                  </div>

                  {/* Consultation Fee */}
                  <div>
                    <label htmlFor="reg-fee" className="block text-xs font-semibold text-[#252D29] mb-1">
                      Consultation Fee Indicator
                    </label>
                    <input
                      id="reg-fee"
                      type="text"
                      value={consultationFee}
                      onChange={(e) => setConsultationFee(e.target.value)}
                      placeholder="e.g. ₹600 or Free (NGO)"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                    />
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label htmlFor="reg-description" className="block text-xs font-semibold text-[#252D29] mb-1">
                      Clinic Overview / Description *
                    </label>
                    <textarea
                      id="reg-description"
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g. Compassionate veterinary hospital with digital radiography, modern surgical theater, and round-the-clock emergency care."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                    />
                    {errors.description && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.description}</span>
                    )}
                  </div>

                  {/* Services Offered */}
                  <div className="sm:col-span-2">
                    <label htmlFor="reg-services" className="block text-xs font-semibold text-[#252D29] mb-1">
                      Services Offered (comma separated) *
                    </label>
                    <input
                      id="reg-services"
                      type="text"
                      value={services}
                      onChange={(e) => setServices(e.target.value)}
                      placeholder="e.g. Annual Inoculations, Soft Tissue Surgery, In-house Ultrasound, Dental Care, Boarding"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                    />
                    {errors.services && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.services}</span>
                    )}
                  </div>

                  {/* 24x7 Emergency Checkbox */}
                  <div className="sm:col-span-2">
                    <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF8F3] border border-[#174B3A]/10 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={is24x7}
                        onChange={(e) => setIs24x7(e.target.checked)}
                        className="w-4 h-4 text-[#174B3A] rounded border-stone-300 focus:ring-[#174B3A]"
                      />
                      <div>
                        <span className="text-xs font-semibold text-[#174B3A] block">
                          Equipped for 24/7 Night Trauma & Emergencies
                        </span>
                        <span className="text-[11px] text-[#252D29]/65">
                          Check this only if a licensed veterinary surgeon is on active night duty at your premises.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#174B3A]/10">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-xs font-medium text-[#252D29] hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-[#174B3A] hover:bg-[#12382c] rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting ? 'Registering Clinic...' : 'Register Business for Free'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
