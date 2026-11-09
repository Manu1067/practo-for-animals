/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { FeaturedProviders } from './components/FeaturedProviders';
import { EmergencySection } from './components/EmergencySection';
import { TrustSection } from './components/TrustSection';
import { ProviderCtaSection } from './components/ProviderCtaSection';
import { Footer } from './components/Footer';

import { ProviderDetailsModal } from './components/modals/ProviderDetailsModal';
import { ListBusinessModal } from './components/modals/ListBusinessModal';
import { SubmitCorrectionModal } from './components/modals/SubmitCorrectionModal';
import { ContactModal } from './components/modals/ContactModal';
import { SignInModal } from './components/modals/SignInModal';
import { AboutModal } from './components/modals/AboutModal';
import { PrivacyModal } from './components/modals/PrivacyModal';
import { Toast } from './components/Toast';

import {
  MOCK_PROVIDERS,
  VET_CLINIC_IMAGE,
  PROVIDER_IMG_CESSNA,
  PROVIDER_IMG_HEIDI,
  PROVIDER_IMG_SCANVET,
  PROVIDER_IMG_CARE_AMBULANCE,
  PROVIDER_IMG_VOSD,
} from './data/mockData';
import {
  Provider,
  ServiceCategorySlug,
  BusinessRegistrationData,
  CorrectionData,
  NotificationToast,
} from './types';

const LOCAL_STORAGE_BUSINESSES_KEY = 'practo_animals_user_businesses';
const LOCAL_STORAGE_CORRECTIONS_KEY = 'practo_animals_user_corrections';

export default function App() {
  // Directory & Provider State with local storage persistence
  const [providers, setProviders] = useState<Provider[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BUSINESSES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...parsed, ...MOCK_PROVIDERS];
        }
      }
    } catch {
      // Fallback to defaults
    }
    return MOCK_PROVIDERS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategorySlug>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [openNowOnly, setOpenNowOnly] = useState<boolean>(false);
  const [emergencyOnly, setEmergencyOnly] = useState<boolean>(false);

  // Modals State
  const [detailsProvider, setDetailsProvider] = useState<Provider | null>(null);
  const [contactProvider, setContactProvider] = useState<Provider | null>(null);
  const [isListBusinessOpen, setIsListBusinessOpen] = useState(false);
  const [isCorrectionOpen, setIsCorrectionOpen] = useState(false);
  const [correctionTargetProvider, setCorrectionTargetProvider] = useState<Provider | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // User session & Toast
  const [userSession, setUserSession] = useState<{ name: string; role: string } | null>(null);
  const [toast, setToast] = useState<NotificationToast | null>(null);

  // Filter calculation - combines all active filters seamlessly
  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
        return false;
      }

      // Location filter (handles partial keywords across city and locality)
      if (locationQuery && locationQuery.trim() !== '') {
        const queryLoc = locationQuery.toLowerCase().trim();
        const matchCity = p.city.toLowerCase().includes(queryLoc);
        const matchLocality = p.locality.toLowerCase().includes(queryLoc);
        if (!matchCity && !matchLocality) return false;
      }

      // Keyword / Service Search filter (supports partial keywords across names, services, category, description)
      if (searchQuery && searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(query);
        const matchCategory = p.category.toLowerCase().includes(query);
        const matchServices = p.services.some((s) => s.toLowerCase().includes(query));
        const matchLocality = p.locality.toLowerCase().includes(query);
        const matchCity = p.city.toLowerCase().includes(query);
        const matchShortDesc = p.shortDescription.toLowerCase().includes(query);

        if (
          !matchName &&
          !matchCategory &&
          !matchServices &&
          !matchLocality &&
          !matchCity &&
          !matchShortDesc
        ) {
          return false;
        }
      }

      // Min Rating
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }

      // Open Now
      if (openNowOnly && !p.isOpenNow) {
        return false;
      }

      // 24/7 Emergency (covers 24/7 hospitals and emergency ambulances)
      if (emergencyOnly && !p.is24x7Emergency && p.categorySlug !== 'animal-ambulances') {
        return false;
      }

      return true;
    });
  }, [
    providers,
    selectedCategory,
    locationQuery,
    searchQuery,
    minRating,
    openNowOnly,
    emergencyOnly,
  ]);

  // Providers suitable for emergency section
  const emergencyProviders = useMemo(() => {
    return providers.filter(
      (p) => p.is24x7Emergency || p.categorySlug === 'animal-ambulances'
    );
  }, [providers]);

  // Handlers
  const handleFindCare = () => {
    const el = document.getElementById('providers-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryFromCards = (slug: ServiceCategorySlug) => {
    setSelectedCategory(slug);
    const el = document.getElementById('providers-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFindEmergencyCare = () => {
    setSelectedCategory('all');
    setEmergencyOnly(true);
    const el = document.getElementById('providers-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setToast({
      id: Date.now().toString(),
      type: 'warning',
      title: 'Showing Emergency Care & Ambulances',
      message: 'Filtered to 24/7 hospitals and mobile ambulances. Always call to confirm availability before transit.',
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setSelectedCategory('all');
    setMinRating(0);
    setOpenNowOnly(false);
    setEmergencyOnly(false);
  };

  const handleClearSearchOnly = () => {
    setSearchQuery('');
    setLocationQuery('');
  };

  const handleListBusinessSuccess = (data: BusinessRegistrationData) => {
    // Dynamically insert into provider state and localStorage so user sees their clinic immediately!
    const newProvider: Provider = {
      id: `user-p-${Date.now()}`,
      name: data.businessName,
      category:
        data.category === 'veterinary-clinics'
          ? 'Veterinary Clinics'
          : data.category === 'animal-hospitals'
          ? 'Animal Hospitals'
          : data.category === 'pet-boarding'
          ? 'Pet Boarding'
          : data.category === 'diagnostics'
          ? 'Diagnostics'
          : data.category === 'animal-ambulances'
          ? 'Animal Ambulances'
          : 'Animal NGOs',
      categorySlug: data.category,
      rating: 5.0,
      reviewsCount: 1,
      isIllustrative: true,
      isUserAdded: true,
      city: data.city === 'Other' ? 'Local Metro' : data.city,
      locality: data.locality,
      fullAddress: data.address ? `${data.address}, ${data.locality}, ${data.city}` : `${data.locality}, ${data.city}`,
      distanceKm: 1.1,
      openingHours: data.is24x7 ? 'Open 24 Hours · Emergency Ready' : '09:00 AM – 08:00 PM',
      isOpenNow: true,
      is24x7Emergency: data.is24x7,
      phone: data.phone,
      emergencyPhone: data.is24x7 ? data.phone : undefined,
      email: data.email,
      services: data.services.split(',').map((s) => s.trim()),
      image:
        data.category === 'animal-hospitals'
          ? PROVIDER_IMG_CESSNA
          : data.category === 'pet-boarding'
          ? PROVIDER_IMG_HEIDI
          : data.category === 'diagnostics'
          ? PROVIDER_IMG_SCANVET
          : data.category === 'animal-ambulances'
          ? PROVIDER_IMG_CARE_AMBULANCE
          : data.category === 'animal-ngos'
          ? PROVIDER_IMG_VOSD
          : VET_CLINIC_IMAGE,
      shortDescription: data.description,
      aboutText: `${data.description} Contact person: ${data.contactPerson}. Verified local pet care facility registered on Practo for Animals.`,
      consultationFee: data.consultationFee || '₹600 – ₹900',
      facilities: ['Licensed Veterinary Surgeon', 'In-house Pharmacy', 'Vaccination Cold Chain'],
      doctors: [
        {
          name: data.contactPerson,
          specialization: 'Attending Practitioner',
          experience: 'Verified Clinician',
          degrees: 'BVSc & AH',
        },
      ],
      establishedYear: 2026,
    };

    const updated = [newProvider, ...providers];
    setProviders(updated);
    setSelectedCategory(data.category);

    try {
      const existingSaved = localStorage.getItem(LOCAL_STORAGE_BUSINESSES_KEY);
      const list = existingSaved ? JSON.parse(existingSaved) : [];
      list.unshift(newProvider);
      localStorage.setItem(LOCAL_STORAGE_BUSINESSES_KEY, JSON.stringify(list));
    } catch {
      // storage unavailable
    }

    setToast({
      id: Date.now().toString(),
      type: 'success',
      title: 'Practice Registered Successfully!',
      message: `"${data.businessName}" is now active in the directory. Stored locally in your session.`,
    });

    handleFindCare();
  };

  const handleCorrectionSuccess = (data: CorrectionData) => {
    try {
      const existing = localStorage.getItem(LOCAL_STORAGE_CORRECTIONS_KEY);
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(data);
      localStorage.setItem(LOCAL_STORAGE_CORRECTIONS_KEY, JSON.stringify(list));
    } catch {
      // ignore
    }

    setToast({
      id: Date.now().toString(),
      type: 'success',
      title: 'Correction Submitted to Editorial Desk',
      message: `Thank you for auditing "${data.providerName}". Stored with Ticket ID #${data.id}.`,
    });
  };

  const handleAppointmentRequest = (data: {
    ownerName: string;
    petName: string;
    petType: string;
    phone: string;
    preferredDate: string;
    notes: string;
  }) => {
    setToast({
      id: Date.now().toString(),
      type: 'success',
      title: 'Appointment Request Dispatched',
      message: `Request for ${data.petName} on ${data.preferredDate} sent to clinic reception. You will receive a telephone call to confirm slot availability.`,
    });
  };

  const handleSignInSuccess = (name: string, role: string) => {
    setUserSession({ name, role });
    setToast({
      id: Date.now().toString(),
      type: 'info',
      title: `Welcome, ${name}!`,
      message: `Signed in as ${role}. You can now save preferred clinics and fast-track consultation requests.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#252D29]">
      {/* Top Notification Bar if logged in */}
      {userSession && (
        <div className="bg-[#174B3A] text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
          <span>Active Session: <strong>{userSession.name}</strong> ({userSession.role})</span>
          <button
            onClick={() => setUserSession(null)}
            className="underline text-white/80 hover:text-white cursor-pointer ml-2"
          >
            Sign out
          </button>
        </div>
      )}

      {/* A. NAVBAR */}
      <Navbar
        onOpenListBusiness={() => setIsListBusinessOpen(true)}
        onOpenSignIn={() => setIsSignInOpen(true)}
        onNavigateToEmergency={handleFindEmergencyCare}
        onNavigateToServices={() => {
          const el = document.getElementById('services-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onNavigateToProviders={() => {
          const el = document.getElementById('providers-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="flex-1">
        {/* B. HERO SECTION */}
        <Hero
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          locationQuery={locationQuery}
          onLocationQueryChange={setLocationQuery}
          onFindCare={handleFindCare}
          onQuickCategorySelect={handleSelectCategoryFromCards}
          onClearSearch={handleClearSearchOnly}
        />

        {/* C. SERVICES SECTION */}
        <ServicesSection
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategoryFromCards}
        />

        {/* D. FEATURED PROVIDERS */}
        <FeaturedProviders
          allProviders={providers}
          providers={filteredProviders}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          locationFilter={locationQuery}
          onLocationFilterChange={setLocationQuery}
          searchFilter={searchQuery}
          onSearchFilterChange={setSearchQuery}
          minRating={minRating}
          onMinRatingChange={setMinRating}
          openNowOnly={openNowOnly}
          onOpenNowToggle={() => setOpenNowOnly(!openNowOnly)}
          emergencyOnly={emergencyOnly}
          onEmergencyToggle={() => setEmergencyOnly(!emergencyOnly)}
          onResetFilters={handleResetFilters}
          onViewDetails={(p) => setDetailsProvider(p)}
          onContactProvider={(p) => setContactProvider(p)}
        />

        {/* E. EMERGENCY SECTION */}
        <EmergencySection
          emergencyProviders={emergencyProviders}
          onFindEmergencyCare={handleFindEmergencyCare}
          onOpenCorrection={() => {
            setCorrectionTargetProvider(null);
            setIsCorrectionOpen(true);
          }}
          onViewProvider={(p) => setDetailsProvider(p)}
        />

        {/* F. TRUST SECTION */}
        <TrustSection />

        {/* G. PROVIDER CTA */}
        <ProviderCtaSection
          onOpenListBusiness={() => setIsListBusinessOpen(true)}
        />
      </main>

      {/* H. FOOTER */}
      <Footer
        onOpenCorrection={() => {
          setCorrectionTargetProvider(null);
          setIsCorrectionOpen(true);
        }}
        onOpenListBusiness={() => setIsListBusinessOpen(true)}
        onSelectCategory={handleSelectCategoryFromCards}
        onNavigateToEmergency={handleFindEmergencyCare}
        onOpenPrivacyModal={() => setIsPrivacyOpen(true)}
        onOpenAboutModal={() => setIsAboutOpen(true)}
        onSelectCity={(city) => {
          setLocationQuery(city);
          handleFindCare();
        }}
      />

      {/* Modals & Overlays */}
      <ProviderDetailsModal
        provider={detailsProvider}
        onClose={() => setDetailsProvider(null)}
        onRequestAppointment={handleAppointmentRequest}
        onReportCorrection={(p) => {
          setCorrectionTargetProvider(p);
          setIsCorrectionOpen(true);
        }}
      />

      <ContactModal
        provider={contactProvider}
        onClose={() => setContactProvider(null)}
        onOpenDetails={(p) => setDetailsProvider(p)}
      />

      <ListBusinessModal
        isOpen={isListBusinessOpen}
        onClose={() => setIsListBusinessOpen(false)}
        onSubmitSuccess={handleListBusinessSuccess}
      />

      <SubmitCorrectionModal
        isOpen={isCorrectionOpen}
        providers={providers}
        preselectedProvider={correctionTargetProvider}
        onClose={() => setIsCorrectionOpen(false)}
        onSubmitSuccess={handleCorrectionSuccess}
      />

      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSignInSuccess={handleSignInSuccess}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Floating Toast Notification */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
