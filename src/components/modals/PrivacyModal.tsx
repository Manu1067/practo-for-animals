import React from 'react';
import { X, Shield, Lock, FileText } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#174B3A]/15 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 border-b border-[#174B3A]/10 bg-[#FAF8F3] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E9F1E9] text-[#174B3A] flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#174B3A]" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-lg text-[#174B3A]">
                Privacy & Medical Disclaimers
              </h2>
              <p className="text-[11px] text-[#252D29]/65">
                Transparent information handling and emergency responsibility
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

        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#252D29]/80 leading-relaxed">
          <div>
            <h3 className="font-heading font-bold text-sm text-[#174B3A] mb-1">
              1. Veterinary Medical Advice Disclaimer
            </h3>
            <p>
              Information published on Practo for Animals, including triage guidelines, symptoms lists, and emergency instructions, is strictly for educational and informational triage guidance. It does NOT constitute formal veterinary diagnosis or treatment. Always consult a certified veterinary surgeon immediately.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-sm text-[#174B3A] mb-1">
              2. Illustrative & Mock Listing Data
            </h3>
            <p>
              All sample listings, reviews, ratings, distances, and contact details shown in this prototype are illustrative demonstrations. Practo for Animals does not warranty real-time bed availability or immediate surgical readiness of listed facilities without prior telephone confirmation.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-sm text-[#174B3A] mb-1">
              3. User Privacy & Contact Information
            </h3>
            <p>
              Any details submitted through the "List Your Business", "Submit a Correction", or "Request Appointment" modules are processed locally for the prototype demonstration and are never sold or shared with third-party advertisers.
            </p>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#174B3A] hover:bg-[#12382c] rounded-xl transition-colors cursor-pointer"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
