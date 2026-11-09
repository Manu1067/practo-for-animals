import React, { useState } from 'react';
import { PawPrint, Menu, X, PlusCircle, User, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  onOpenListBusiness: () => void;
  onOpenSignIn: () => void;
  onNavigateToEmergency: () => void;
  onNavigateToServices: () => void;
  onNavigateToProviders: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenListBusiness,
  onOpenSignIn,
  onNavigateToEmergency,
  onNavigateToServices,
  onNavigateToProviders,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#174B3A]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Brand Wordmark & Paw Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-decoration-none group whitespace-nowrap shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B3A]"
            aria-label="Practo for Animals Home"
          >
            <div className="w-10 h-10 rounded-xl bg-[#174B3A] text-[#FAF8F3] flex items-center justify-center shadow-xs group-hover:bg-[#12382c] transition-colors">
              <PawPrint className="w-5 h-5 text-[#F28B68]" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl text-[#174B3A] tracking-tight leading-none">
                Practo <span className="text-[#F28B68]">for Animals</span>
              </span>
              <span className="text-[11px] font-medium text-[#252D29]/70 tracking-wide mt-0.5">
                Pet Healthcare Network
              </span>
            </div>
          </a>

          {/* Zone 2: Single-line Text Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#252D29]/80"
          >
            <a
              href="#"
              className="text-[#174B3A] font-semibold hover:text-[#174B3A] transition-colors whitespace-nowrap py-1 border-b-2 border-[#174B3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B3A]"
            >
              Home
            </a>
            <button
              onClick={onNavigateToServices}
              className="text-[#252D29]/80 hover:text-[#174B3A] transition-colors whitespace-nowrap cursor-pointer py-1 border-b-2 border-transparent hover:border-[#174B3A]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B3A]"
            >
              Explore Services
            </button>
            <button
              onClick={onNavigateToProviders}
              className="text-[#252D29]/80 hover:text-[#174B3A] transition-colors whitespace-nowrap cursor-pointer py-1 border-b-2 border-transparent hover:border-[#174B3A]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B3A]"
            >
              Find Providers
            </button>
            <button
              onClick={onNavigateToEmergency}
              className="flex items-center gap-1.5 text-red-700 hover:text-red-800 font-semibold transition-colors whitespace-nowrap cursor-pointer py-1 border-b-2 border-transparent hover:border-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
            >
              <ShieldAlert className="w-4 h-4 text-red-600" aria-hidden="true" />
              <span>Emergency 24/7</span>
            </button>
            <a
              href="#about-section"
              className="text-[#252D29]/80 hover:text-[#174B3A] transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#174B3A]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B3A]"
            >
              About
            </a>
          </nav>

          {/* Zone 3: Actions (Sign In + List Your Business) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSignIn}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#174B3A] hover:bg-[#E9F1E9] rounded-lg transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B3A]"
            >
              <User className="w-4 h-4" aria-hidden="true" />
              <span>Sign In</span>
            </button>

            <button
              onClick={onOpenListBusiness}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#174B3A] hover:bg-[#12382c] active:scale-[0.98] rounded-lg shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B3A]"
            >
              <PlusCircle className="w-4 h-4 text-[#F28B68]" aria-hidden="true" />
              <span>List Your Business</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenListBusiness}
              className="sm:hidden px-3 py-2 text-xs font-semibold text-white bg-[#174B3A] rounded-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B3A]"
            >
              List Clinic
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-[#174B3A] hover:bg-[#E9F1E9] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B3A] cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-t border-[#174B3A]/10 bg-[#FAF8F3] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-slide-up"
        >
          <div className="flex flex-col space-y-1.5 text-sm font-medium">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left px-3.5 py-3 rounded-lg text-[#174B3A] font-semibold bg-[#E9F1E9] min-h-[44px] flex items-center"
            >
              Home
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToServices();
              }}
              className="text-left px-3.5 py-3 rounded-lg text-[#252D29] hover:bg-[#E9F1E9] min-h-[44px] flex items-center"
            >
              Explore Services
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToProviders();
              }}
              className="text-left px-3.5 py-3 rounded-lg text-[#252D29] hover:bg-[#E9F1E9] min-h-[44px] flex items-center"
            >
              Find Providers
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToEmergency();
              }}
              className="text-left px-3.5 py-3 rounded-lg text-red-700 font-semibold hover:bg-red-50 flex items-center justify-between min-h-[44px]"
            >
              <span>Emergency 24/7 Care</span>
              <ShieldAlert className="w-4 h-4 text-red-600" aria-hidden="true" />
            </button>
            <a
              href="#about-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-3 rounded-lg text-[#252D29] hover:bg-[#E9F1E9] min-h-[44px] flex items-center"
            >
              About Network
            </a>
          </div>

          <div className="pt-3 border-t border-[#174B3A]/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSignIn();
              }}
              className="w-full text-center px-4 py-3 text-xs font-semibold text-[#174B3A] bg-[#E9F1E9] hover:bg-[#dbe7db] rounded-lg cursor-pointer min-h-[44px] flex items-center justify-center"
            >
              Sign In to Pet Profile
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenListBusiness();
              }}
              className="w-full text-center px-4 py-3 text-xs font-semibold text-white bg-[#174B3A] hover:bg-[#12382c] rounded-lg shadow-xs cursor-pointer min-h-[44px] flex items-center justify-center"
            >
              List Your Veterinary Business
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
