export type ServiceCategorySlug =
  | 'all'
  | 'veterinary-clinics'
  | 'animal-hospitals'
  | 'pet-boarding'
  | 'diagnostics'
  | 'animal-ambulances'
  | 'animal-ngos';

export interface ServiceCategory {
  id: string;
  slug: ServiceCategorySlug;
  title: string;
  shortDesc: string;
  longDesc: string;
  count: number;
  iconName: string;
  badge?: string;
  image?: string;
}

export interface Doctor {
  name: string;
  specialization: string;
  experience: string;
  degrees: string;
}

export interface Provider {
  id: string;
  name: string;
  category: string;
  categorySlug: ServiceCategorySlug;
  rating: number;
  reviewsCount: number;
  isIllustrative: boolean;
  city: string;
  locality: string;
  fullAddress: string;
  distanceKm: number;
  openingHours: string;
  isOpenNow: boolean;
  is24x7Emergency: boolean;
  phone: string;
  emergencyPhone?: string;
  email?: string;
  services: string[];
  image: string;
  shortDescription: string;
  aboutText: string;
  consultationFee: string;
  facilities: string[];
  doctors: Doctor[];
  emergencyNotice?: string;
  establishedYear: number;
  isUserAdded?: boolean;
}

export interface SearchFilters {
  query: string;
  location: string;
  category: ServiceCategorySlug;
  minRating: number;
  openNowOnly: boolean;
  emergencyOnly: boolean;
}

export interface BusinessRegistrationData {
  businessName: string;
  category: ServiceCategorySlug;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  locality: string;
  description: string;
  services: string;
  is24x7: boolean;
  consultationFee?: string;
}

export interface CorrectionData {
  id: string;
  providerId: string;
  providerName: string;
  correctionType:
    | 'wrong-hours'
    | 'wrong-phone'
    | 'permanently-closed'
    | 'address-error'
    | 'wrong-services'
    | 'other';
  correctedInformation: string;
  contactEmail?: string;
  additionalDetails?: string;
  submittedAt: string;
}

export interface NotificationToast {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

export interface SearchSuggestion {
  text: string;
  type: 'service' | 'provider' | 'category' | 'locality';
  categorySlug?: ServiceCategorySlug;
  location?: string;
}
