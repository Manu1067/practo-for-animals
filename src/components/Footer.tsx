import React from 'react';
import { PawPrint, Heart, Flag, Shield, Mail, Phone, ExternalLink } from 'lucide-react';
import { ServiceCategorySlug } from '../types';

interface FooterProps {
  onOpenCorrection: () => void;
  onOpenListBusiness: () => void;
  onSelectCategory: (cat: ServiceCategorySlug) => void;
  onNavigateToEmergency: () => void;
  onOpenPrivacyModal: () => void;
  onOpenAboutModal: () => void;
  onSelectCity?: (city: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCorrection,
  onOpenListBusiness,
  onSelectCategory,
  onNavigateToEmergency,
  onOpenPrivacyModal,
  onOpenAboutModal,
  onSelectCity,
}) => {
  return (
    <footer className="bg-[#174B3A] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand Lockup & Mission */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-[#F28B68]" />
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                Practo <span className="text-[#F28B68]">for Animals</span>
              </span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed max-w-sm mb-4">
              "Because every paw deserves the best care." An open, community-backed directory dedicated to transparent veterinary healthcare, rapid diagnostics, pet boarding, and 24/7 animal emergency assistance.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Mail className="w-3.5 h-3.5 text-[#F28B68]" />
              <span>contact@practoforanimals.mock</span>
            </div>
          </div>

          {/* Col 3: Care Categories */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
              Care Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75">
              <li>
                <button
                  onClick={() => onSelectCategory('veterinary-clinics')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Veterinary Clinics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('animal-hospitals')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Animal Hospitals (24/7)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('pet-boarding')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pet Boarding & Daycare
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('diagnostics')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Veterinary Diagnostics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('animal-ambulances')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Animal Ambulances
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('animal-ngos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Animal NGOs & Shelters
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: For Providers & Community */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
              For Providers & Community
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75">
              <li>
                <button
                  onClick={onOpenListBusiness}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>List Your Practice</span>
                  <ExternalLink className="w-3 h-3 text-[#F28B68]" />
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCorrection}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-amber-200"
                >
                  <Flag className="w-3 h-3" />
                  <span>Submit a Correction</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToEmergency}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Emergency Protocol
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAboutModal}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About the Project
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Major Metro Hubs */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
              Major Metros
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCity && onSelectCity('Bengaluru')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Bengaluru (Domlur, Whitefield, Koramangala)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCity && onSelectCity('Mumbai')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Mumbai (Bandra, Powai, Andheri)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCity && onSelectCity('Delhi NCR')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Delhi NCR (GK-1, Neeti Bagh, Noida)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCity && onSelectCity('Pune')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pune (Koregaon Park, Baner)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCity && onSelectCity('Hyderabad')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Hyderabad (Jubilee Hills, Gachibowli)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCity && onSelectCity('Chennai')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Chennai (Adyar, Anna Nagar)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Disclaimer Bar */}
        <div className="py-6 border-b border-white/10 text-xs text-white/70 leading-relaxed">
          <p>
            <strong className="text-white">Educational Prototype & Medical Disclaimer:</strong> Practo for Animals is an illustrative pet healthcare discovery directory created for product design and academic review purposes. Listings, timings, phone numbers, and facilities depicted represent illustrative mock data. In any life-threatening pet medical scenario, please immediately establish telephone contact with your nearest operational animal hospital before transporting the animal.
          </p>
        </div>

        {/* Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-1">
            <span>© 2026 Practo for Animals. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Built with care for animals</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenCorrection}
              className="hover:text-white transition-colors underline cursor-pointer"
            >
              Submit a Correction
            </button>
            <button
              onClick={onOpenPrivacyModal}
              className="hover:text-white transition-colors underline cursor-pointer"
            >
              Privacy & Disclaimers
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
