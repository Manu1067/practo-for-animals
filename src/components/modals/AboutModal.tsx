import React from 'react';
import { X, PawPrint, Heart, Shield, CheckCircle2 } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#174B3A]/15 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 border-b border-[#174B3A]/10 bg-[#FAF8F3] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#174B3A] text-white flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-[#F28B68]" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-lg text-[#174B3A]">
                About Practo for Animals
              </h2>
              <p className="text-[11px] text-[#252D29]/65">
                "Because every paw deserves the best care."
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

        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-xs sm:text-sm text-[#252D29]/80 leading-relaxed">
          <div>
            <h3 className="font-heading font-bold text-base text-[#174B3A] mb-1.5">
              The Mission
            </h3>
            <p>
              In urban India, millions of companion animals face delayed care during acute health crises due to fragmented clinic discovery, outdated telephone contacts, and lack of clarity on night emergency readiness. Practo for Animals bridges this critical gap with a transparent, free, and community-audited veterinary directory.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-base text-[#174B3A] mb-1.5">
              Core Principles
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#174B3A] shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Direct Access:</strong> No hidden commission markups or paid priority queues. Pet parents connect straight to clinic landlines.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#174B3A] shrink-0 mt-0.5" />
                <span>
                  <strong>Ethical Transparency:</strong> Clear indication of emergency capability, hospital facilities, consultation pricing, and illustrative data flags.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#174B3A] shrink-0 mt-0.5" />
                <span>
                  <strong>Crowdsourced Verification:</strong> Any pet parent or doctor can submit immediate corrections to keep timings and phone numbers reliable.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#174B3A]/10 text-xs text-[#252D29]/75">
            <strong>Internship Assignment Prototype Notice:</strong> This web application was created as an advanced Product Development, Design & AI Systems prototype demonstrating user-centric healthcare directory architecture and responsive UX.
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#174B3A] hover:bg-[#12382c] rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
