import React from 'react';
import { PlusCircle, Building2, Phone, CheckCircle } from 'lucide-react';
import { VET_CLINIC_IMAGE } from '../data/mockData';

interface ProviderCtaSectionProps {
  onOpenListBusiness: () => void;
}

export const ProviderCtaSection: React.FC<ProviderCtaSectionProps> = ({
  onOpenListBusiness,
}) => {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-[#174B3A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F3] rounded-3xl border border-[#174B3A]/15 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Column: Proposition */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#174B3A] tracking-wider uppercase mb-3">
                <Building2 className="w-4 h-4 text-[#F28B68]" />
                <span>For Veterinary Professionals & Facilities</span>
              </div>

              <h2
                className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#174B3A] tracking-tight mb-4"
                style={{ textWrap: 'balance' }}
              >
                Are you an animal-care provider?
              </h2>

              <p className="text-sm sm:text-base text-[#252D29]/80 leading-relaxed mb-6 max-w-xl">
                Help local pet parents reach you during critical moments. List your clinic, diagnostic lab, animal hospital, boarding facility, ambulance, or NGO on India's dedicated pet health discovery network.
              </p>

              {/* Benefits list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs sm:text-sm text-[#252D29]/85">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#174B3A] shrink-0" />
                  <span>Free verified directory listing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#174B3A] shrink-0" />
                  <span>Direct phone inquiries with zero cuts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#174B3A] shrink-0" />
                  <span>Promote 24/7 emergency readiness</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#174B3A] shrink-0" />
                  <span>Highlight doctors & surgical facilities</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenListBusiness}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-[#174B3A] hover:bg-[#12382c] rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <PlusCircle className="w-4 h-4 text-[#F28B68]" />
                  <span>List Your Business for Free</span>
                </button>

                <div className="flex items-center gap-2 text-xs text-[#252D29]/65">
                  <Phone className="w-3.5 h-3.5 text-[#174B3A]" />
                  <span>Questions? provider-support@practoforanimals.mock</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Accent */}
            <div className="lg:col-span-5 relative bg-stone-100 min-h-[280px] lg:min-h-full">
              <img
                src={VET_CLINIC_IMAGE}
                alt="Friendly veterinary doctor examining a happy dog in a clean consultation room"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/20">
                <p className="font-semibold text-white">Join 140+ clinics & hospitals</p>
                <p className="text-[11px] text-white/80">
                  Connecting over 25,000 monthly pet parents to quality care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
