import React, { useState } from 'react';
import {
  Star,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  RotateCcw,
  ShieldAlert,
  SlidersHorizontal,
  X,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Provider, ServiceCategorySlug } from '../types';
import { CITIES_LIST, SERVICE_CATEGORIES } from '../data/mockData';

interface FeaturedProvidersProps {
  allProviders: Provider[];
  providers: Provider[];
  selectedCategory: ServiceCategorySlug;
  onCategoryChange: (cat: ServiceCategorySlug) => void;
  locationFilter: string;
  onLocationFilterChange: (loc: string) => void;
  searchFilter: string;
  onSearchFilterChange: (q: string) => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  openNowOnly: boolean;
  onOpenNowToggle: () => void;
  emergencyOnly: boolean;
  onEmergencyToggle: () => void;
  onResetFilters: () => void;
  onViewDetails: (provider: Provider) => void;
  onContactProvider: (provider: Provider) => void;
}

export const FeaturedProviders: React.FC<FeaturedProvidersProps> = ({
  allProviders,
  providers,
  selectedCategory,
  onCategoryChange,
  locationFilter,
  onLocationFilterChange,
  searchFilter,
  onSearchFilterChange,
  minRating,
  onMinRatingChange,
  openNowOnly,
  onOpenNowToggle,
  emergencyOnly,
  onEmergencyToggle,
  onResetFilters,
  onViewDetails,
  onContactProvider,
}) => {
  const isFiltered =
    selectedCategory !== 'all' ||
    locationFilter !== '' ||
    searchFilter.trim() !== '' ||
    minRating > 0 ||
    openNowOnly ||
    emergencyOnly;

  // Compute counts per category from all available providers
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: allProviders.length };
    for (const cat of SERVICE_CATEGORIES) {
      counts[cat.slug] = allProviders.filter((p) => p.categorySlug === cat.slug).length;
    }
    return counts;
  }, [allProviders]);

  return (
    <section id="providers-section" className="py-16 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-[#174B3A] tracking-wider uppercase mb-2">
              Verified Care Directory
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#174B3A] tracking-tight">
              Featured Animal Healthcare Providers
            </h2>
            <p className="text-xs text-[#252D29]/65 mt-1">
              Real facilities and illustrative sample listings across Indian metros with direct phone access.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#174B3A] bg-[#E9F1E9] px-3 py-1.5 rounded-lg tabular-nums border border-[#174B3A]/10">
              Showing {providers.length} of {allProviders.length} facilities
            </span>
            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#174B3A] hover:bg-[#E9F1E9] rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#174B3A]/10 mb-8 space-y-4">
          {/* Row 1: Category Filter Buttons with live counts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
            <button
              onClick={() => onCategoryChange('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-[#174B3A] text-white shadow-xs'
                  : 'bg-[#FAF8F3] text-[#252D29]/75 hover:bg-[#E9F1E9] hover:text-[#174B3A]'
              }`}
            >
              <span>All Categories</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === 'all'
                    ? 'bg-white/20 text-white'
                    : 'bg-stone-200 text-[#252D29]/70'
                }`}
              >
                {categoryCounts['all'] || allProviders.length}
              </span>
            </button>
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.slug)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.slug
                    ? 'bg-[#174B3A] text-white shadow-xs'
                    : 'bg-[#FAF8F3] text-[#252D29]/75 hover:bg-[#E9F1E9] hover:text-[#174B3A]'
                }`}
              >
                <span>{cat.title}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.slug
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-200 text-[#252D29]/70'
                  }`}
                >
                  {categoryCounts[cat.slug] || 0}
                </span>
              </button>
            ))}
          </div>

          {/* Row 2: Secondary Quick Filters (City, Rating, Open Now, 24/7) */}
          <div className="pt-3 border-t border-[#174B3A]/8 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              {/* City selector */}
              <div className="flex items-center gap-1.5 bg-[#FAF8F3] px-2.5 py-1.5 rounded-lg border border-[#174B3A]/10">
                <label htmlFor="filter-city-select" className="sr-only">
                  Filter listings by city
                </label>
                <MapPin className="w-3.5 h-3.5 text-[#174B3A]" aria-hidden="true" />
                <select
                  id="filter-city-select"
                  value={locationFilter}
                  onChange={(e) => onLocationFilterChange(e.target.value)}
                  className="bg-transparent text-xs text-[#252D29] font-medium focus:outline-none cursor-pointer"
                >
                  {CITIES_LIST.map((city) => (
                    <option key={city} value={city === 'All Cities' ? '' : city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating selector */}
              <div className="flex items-center gap-1.5 bg-[#FAF8F3] px-2.5 py-1.5 rounded-lg border border-[#174B3A]/10">
                <label htmlFor="filter-rating-select" className="sr-only">
                  Filter listings by minimum star rating
                </label>
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" aria-hidden="true" />
                <select
                  id="filter-rating-select"
                  value={minRating}
                  onChange={(e) => onMinRatingChange(Number(e.target.value))}
                  className="bg-transparent text-xs text-[#252D29] font-medium focus:outline-none cursor-pointer"
                >
                  <option value={0}>Any Rating</option>
                  <option value={4.0}>4.0+ Rated</option>
                  <option value={4.7}>4.7+ Top Rated</option>
                  <option value={4.8}>4.8+ Exceptional</option>
                </select>
              </div>

              {/* Open Now Checkbox Button */}
              <button
                type="button"
                onClick={onOpenNowToggle}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  openNowOnly
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-[#FAF8F3] border-[#174B3A]/10 text-[#252D29]/75 hover:bg-[#E9F1E9]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    openNowOnly ? 'bg-emerald-500' : 'bg-stone-300'
                  }`}
                />
                <span>Open Now</span>
              </button>

              {/* 24/7 Emergency Toggle Button */}
              <button
                type="button"
                onClick={onEmergencyToggle}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  emergencyOnly
                    ? 'bg-red-50 border-red-300 text-red-700 font-semibold shadow-xs'
                    : 'bg-[#FAF8F3] border-[#174B3A]/10 text-[#252D29]/75 hover:bg-[#E9F1E9]'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                <span>24/7 Emergency Only</span>
              </button>
            </div>

            {/* Keyword Search Quick Clear */}
            {searchFilter && (
              <div className="text-xs text-[#252D29]/70 flex items-center gap-2">
                <span>
                  Query: <strong className="text-[#174B3A]">"{searchFilter}"</strong>
                </span>
                <button
                  onClick={() => onSearchFilterChange('')}
                  className="underline hover:text-[#174B3A] cursor-pointer"
                >
                  clear
                </button>
              </div>
            )}
          </div>

          {/* Active Filter Chips with Individual 1-Click Removal */}
          {isFiltered && (
            <div className="pt-2.5 border-t border-[#174B3A]/8 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-[#252D29]/50 uppercase tracking-wider">
                Active:
              </span>

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#E9F1E9] text-[#174B3A] text-xs font-medium">
                  <span>Category: {SERVICE_CATEGORIES.find((c) => c.slug === selectedCategory)?.title}</span>
                  <button
                    onClick={() => onCategoryChange('all')}
                    className="hover:text-red-700 cursor-pointer ml-0.5"
                    title="Remove filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {locationFilter && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#E9F1E9] text-[#174B3A] text-xs font-medium">
                  <span>City: {locationFilter}</span>
                  <button
                    onClick={() => onLocationFilterChange('')}
                    className="hover:text-red-700 cursor-pointer ml-0.5"
                    title="Remove filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {searchFilter && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#E9F1E9] text-[#174B3A] text-xs font-medium">
                  <span>Keyword: "{searchFilter}"</span>
                  <button
                    onClick={() => onSearchFilterChange('')}
                    className="hover:text-red-700 cursor-pointer ml-0.5"
                    title="Remove filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium">
                  <span>★ {minRating}+</span>
                  <button
                    onClick={() => onMinRatingChange(0)}
                    className="hover:text-red-700 cursor-pointer ml-0.5"
                    title="Remove filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {openNowOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
                  <span>Open Now</span>
                  <button
                    onClick={onOpenNowToggle}
                    className="hover:text-red-700 cursor-pointer ml-0.5"
                    title="Remove filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {emergencyOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-50 text-red-800 border border-red-200 text-xs font-medium">
                  <span>24/7 Emergency</span>
                  <button
                    onClick={onEmergencyToggle}
                    className="hover:text-red-700 cursor-pointer ml-0.5"
                    title="Remove filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Empty State when no results match with helpful suggestions */}
        {providers.length === 0 && (
          <div className="text-center py-16 px-6 bg-white rounded-3xl border border-[#174B3A]/10 shadow-xs max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#E9F1E9] text-[#174B3A] flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal className="w-7 h-7 text-[#174B3A]" />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-[#174B3A] mb-2">
              No Providers Match Current Filters
            </h3>
            <p className="text-xs sm:text-sm text-[#252D29]/75 mb-6 leading-relaxed">
              We couldn't find any animal healthcare facilities matching your specific criteria
              {locationFilter ? ` in ${locationFilter}` : ''}
              {searchFilter ? ` for "${searchFilter}"` : ''}.
            </p>

            {/* Helpful Suggestions */}
            <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#174B3A]/10 text-left text-xs text-[#252D29]/80 mb-6 space-y-2">
              <div className="font-semibold text-[#174B3A] flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#F28B68]" />
                <span>Suggestions to find care:</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[#252D29]/70">
                {locationFilter && (
                  <li>
                    Switch location to{' '}
                    <button
                      onClick={() => onLocationFilterChange('')}
                      className="text-[#174B3A] font-semibold underline cursor-pointer"
                    >
                      All Cities
                    </button>{' '}
                    to see regional referral hospitals.
                  </li>
                )}
                {minRating > 0 && (
                  <li>
                    Clear rating filter to view clinics with fewer illustrative reviews.
                  </li>
                )}
                {searchFilter && (
                  <li>
                    Try broader keywords like "vaccination", "cat", "surgery", or "ICU".
                  </li>
                )}
                <li>
                  If your pet is in immediate danger, use our{' '}
                  <a href="#emergency-section" className="text-red-700 font-semibold underline">
                    Emergency Protocol
                  </a>.
                </li>
              </ul>
            </div>

            <button
              onClick={onResetFilters}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#174B3A] hover:bg-[#12382c] rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Reset All Filters & View All ({allProviders.length})
            </button>
          </div>
        )}

        {/* Provider Listings Grid */}
        {providers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((p) => {
              const hasPhone = Boolean(p.phone && p.phone.trim().length > 0);

              return (
                <div
                  key={p.id}
                  className="group bg-white rounded-2xl border border-[#174B3A]/10 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Card Media with fallback */}
                    <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                      <img
                        src={p.image}
                        alt={`Facility and healthcare setting of ${p.name} in ${p.locality}, ${p.city}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />

                      {/* Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Top Labels: Sample Listing & Status */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                        {/* Sample listing disclaimer badge */}
                        <div className="flex items-center gap-1.5">
                          <span className="bg-black/75 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                            {p.isUserAdded ? 'Community Listed' : 'Illustrative Profile'}
                          </span>
                        </div>

                        {/* Open / 24/7 Status */}
                        {p.is24x7Emergency ? (
                          <span className="bg-red-600 text-white font-semibold text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                            <ShieldAlert className="w-3 h-3" />
                            <span>24/7 Emergency</span>
                          </span>
                        ) : p.isOpenNow ? (
                          <span className="bg-emerald-600 text-white font-semibold text-[11px] px-2 py-0.5 rounded-md">
                            Open Now
                          </span>
                        ) : (
                          <span className="bg-stone-800 text-stone-200 text-[11px] px-2 py-0.5 rounded-md">
                            Closed Now
                          </span>
                        )}
                      </div>

                      {/* Locality & Distance bottom overlay */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                        <div className="flex items-center gap-1 font-medium truncate drop-shadow-sm">
                          <MapPin className="w-3.5 h-3.5 text-[#F28B68] shrink-0" />
                          <span className="truncate">{p.locality}, {p.city}</span>
                        </div>
                        <span className="text-[11px] text-white/90 shrink-0 tabular-nums font-mono drop-shadow-sm">
                          ~{p.distanceKm} km away
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      {/* Category & Rating separator line */}
                      <div className="flex items-center justify-between text-xs text-[#252D29]/65 mb-2">
                        <span className="font-medium text-[#174B3A]">{p.category}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span className="font-semibold text-[#252D29] tabular-nums">{p.rating}</span>
                          <span className="text-[11px] text-[#252D29]/50">
                            ({p.reviewsCount} reviews · illustrative)
                          </span>
                        </div>
                      </div>

                      {/* Provider Name */}
                      <h3 className="font-heading font-bold text-lg text-[#174B3A] leading-snug mb-2 line-clamp-1">
                        {p.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-[#252D29]/75 line-clamp-2 leading-relaxed mb-4">
                        {p.shortDescription}
                      </p>

                      {/* Timings */}
                      <div className="flex items-center gap-1.5 text-xs text-[#252D29]/70 mb-3">
                        <Clock className="w-3.5 h-3.5 text-[#174B3A]/70 shrink-0" />
                        <span className="truncate">{p.openingHours}</span>
                      </div>

                      {/* Key Services Offered */}
                      <div className="pt-3 border-t border-[#174B3A]/8">
                        <div className="text-[11px] font-semibold text-[#252D29]/60 uppercase tracking-wider mb-1.5">
                          Offered Services
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {p.services.slice(0, 3).map((srv, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] px-2 py-0.5 rounded-md bg-[#FAF8F3] text-[#252D29]/80 border border-[#174B3A]/10 truncate"
                            >
                              {srv}
                            </span>
                          ))}
                          {p.services.length > 3 && (
                            <span className="text-[11px] px-1.5 py-0.5 text-[#174B3A] font-medium">
                              +{p.services.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-[#174B3A]/8 flex items-center gap-2">
                      <button
                        onClick={() => onViewDetails(p)}
                        className="flex-1 py-2 px-3 text-xs font-semibold text-[#174B3A] bg-[#E9F1E9] hover:bg-[#dbe7db] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {/* Contact button with clear handling for missing telephone */}
                      {hasPhone ? (
                        <button
                          onClick={() => onContactProvider(p)}
                          className="py-2 px-3 text-xs font-semibold text-white bg-[#174B3A] hover:bg-[#12382c] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                          title={`Call ${p.phone}`}
                        >
                          <Phone className="w-3.5 h-3.5 text-[#F28B68]" />
                          <span>Contact</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onViewDetails(p)}
                          className="py-2 px-3 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                          title="Phone number pending verification. Inquire online."
                        >
                          <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                          <span>Inquire</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
