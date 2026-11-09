import React, { useState } from 'react';
import { X, Phone, ShieldAlert, Copy, Check, Clock, MapPin, AlertTriangle, Mail } from 'lucide-react';
import { Provider } from '../../types';

interface ContactModalProps {
  provider: Provider | null;
  onClose: () => void;
  onOpenDetails: (p: Provider) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  provider,
  onClose,
  onOpenDetails,
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmergency, setCopiedEmergency] = useState(false);

  if (!provider) return null;

  const hasPhone = Boolean(provider.phone && provider.phone.trim().length > 0);
  const hasEmergency = Boolean(provider.emergencyPhone && provider.emergencyPhone.trim().length > 0);

  const handleCopy = (num: string, isEmergency = false) => {
    navigator.clipboard?.writeText(num);
    if (isEmergency) {
      setCopiedEmergency(true);
      setTimeout(() => setCopiedEmergency(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#174B3A]/15 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#174B3A]/10 bg-[#FAF8F3] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#174B3A] uppercase tracking-wider block">
              Contact Healthcare Provider
            </span>
            <h2 className="font-heading font-extrabold text-lg text-[#174B3A]">
              {provider.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-200 text-[#252D29] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-1.5 text-xs text-[#252D29]/75 pb-3 border-b border-[#174B3A]/10">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#174B3A]" />
              <span>{provider.locality}, {provider.city}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#174B3A]" />
              <span>{provider.openingHours}</span>
            </div>
          </div>

          {/* Primary Phone Box or Missing Notice */}
          {hasPhone ? (
            <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#252D29]/60 uppercase tracking-wider block">
                  Primary Reception Line
                </span>
                <span className="text-base font-bold text-[#174B3A] font-mono">
                  {provider.phone}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(provider.phone, false)}
                  className="p-2 rounded-lg bg-white hover:bg-stone-100 text-[#252D29] border border-stone-200 transition-colors cursor-pointer"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={`tel:${provider.phone}`}
                  className="px-3.5 py-2 rounded-lg bg-[#174B3A] hover:bg-[#12382c] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F28B68]" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-2">
              <div className="font-semibold flex items-center gap-1.5 text-amber-800">
                <AlertTriangle className="w-4 h-4" />
                <span>Direct Telephone Line Under Verification</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-900/80">
                This facility’s public telephone is temporarily unavailable or undergoing editorial update. You can contact them via email or walk in at their physical address in {provider.locality}.
              </p>
              {provider.email && (
                <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
                  <span className="font-mono text-xs">{provider.email}</span>
                  <a
                    href={`mailto:${provider.email}`}
                    className="px-3 py-1 rounded-md bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900"
                  >
                    Send Email
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Emergency Night Line if available */}
          {hasEmergency && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" />
                  <span>24/7 Critical Care Dispatch</span>
                </span>
                <span className="text-base font-bold text-red-900 font-mono">
                  {provider.emergencyPhone}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(provider.emergencyPhone!, true)}
                  className="p-2 rounded-lg bg-white hover:bg-red-100 text-red-800 border border-red-200 transition-colors cursor-pointer"
                  title="Copy emergency phone"
                >
                  {copiedEmergency ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={`tel:${provider.emergencyPhone}`}
                  className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 24/7</span>
                </a>
              </div>
            </div>
          )}

          {/* Vital Emergency Warning Notice: Never pretend bookings/slots are confirmed */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold mb-0.5">Crucial Reminder:</strong>
              <span>
                Always speak with the attending staff member before setting out. <strong>Slots and emergency surgical bays are never assumed confirmed</strong> until verbally verified by the clinic.
              </span>
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center text-xs">
            <button
              onClick={() => {
                onClose();
                onOpenDetails(provider);
              }}
              className="text-[#174B3A] font-semibold hover:underline cursor-pointer"
            >
              View Full Clinical Profile & Doctors →
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#252D29] font-medium cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
