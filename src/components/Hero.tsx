import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Clock,
  Heart,
  Sparkles,
  X,
  Stethoscope,
  Building2,
  Compass,
} from 'lucide-react';
import { HERO_IMAGE, CITIES_LIST, SUGGESTED_SEARCHES } from '../data/mockData';
import { ServiceCategorySlug, SearchSuggestion } from '../types';

interface HeroProps {
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  locationQuery: string;
  onLocationQueryChange: (loc: string) => void;
  onFindCare: () => void;
  onQuickCategorySelect: (slug: ServiceCategorySlug) => void;
  onClearSearch: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchQueryChange,
  locationQuery,
  onLocationQueryChange,
  onFindCare,
  onQuickCategorySelect,
  onClearSearch,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  // Close suggestions if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    onFindCare();
  };

  // Filter suggested searches based on current query
  const filteredSuggestions = SUGGESTED_SEARCHES.filter((item) => {
    if (!searchQuery.trim()) return true;
    return item.text.toLowerCase().includes(searchQuery.toLowerCase().trim());
  }).slice(0, 6);

  const handleSelectSuggestion = (item: SearchSuggestion) => {
    onSearchQueryChange(item.text);
    if (item.categorySlug) {
      onQuickCategorySelect(item.categorySlug);
    }
    if (item.location) {
      onLocationQueryChange(item.location);
    }
    setShowSuggestions(false);
    onFindCare();
  };

  return (
    <section className="relative pt-6 pb-14 md:pt-10 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Proposition, Smart Search Engine & Quick Tags */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Trust statement & badge */}
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold text-[#174B3A] tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#F28B68]"></span>
              <span>India’s Dedicated Pet Healthcare Discovery Platform</span>
            </div>

            {/* Headline */}
            <h1
              className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] leading-[1.12] text-[#174B3A] mb-4"
              style={{ textWrap: 'balance' }}
            >
              Because every paw deserves the best care.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#252D29]/80 leading-relaxed max-w-2xl mb-8">
              Find trusted veterinary clinics, hospitals, boarding, diagnostics and emergency care for your furry companions across India's top cities.
            </p>

            {/* Prominent Smart Search Panel */}
            <div
              ref={searchWrapperRef}
              className="relative bg-white rounded-2xl p-3 sm:p-4 shadow-md border border-[#174B3A]/10 max-w-2xl z-20"
            >
              <form onSubmit={handleSubmit} aria-label="Search animal care facilities" className="flex flex-col sm:flex-row gap-3">
                {/* Input 1: Search services / partial keywords with clear button */}
                <div className="relative flex-1">
                  <label htmlFor="hero-service-search" className="sr-only">
                    Search veterinary services, clinics, or treatments
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#174B3A]/60">
                    <Search className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <input
                    id="hero-service-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      onSearchQueryChange(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search services, vaccines, clinics, diagnostics..."
                    className="w-full pl-10 pr-9 py-3 text-sm rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A] text-[#252D29] placeholder:text-[#252D29]/50"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        onSearchQueryChange('');
                        setShowSuggestions(false);
                      }}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#252D29]/40 hover:text-[#252D29] transition-colors cursor-pointer"
                      aria-label="Clear search input"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Input 2: Enter city or locality with clear option */}
                <div className="relative sm:w-52">
                  <label htmlFor="hero-city-select" className="sr-only">
                    Select City or Metro
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#174B3A]/60">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <select
                    id="hero-city-select"
                    value={locationQuery}
                    onChange={(e) => onLocationQueryChange(e.target.value)}
                    className="w-full pl-10 pr-8 py-3 text-sm rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A] text-[#252D29] appearance-none cursor-pointer"
                  >
                    {CITIES_LIST.map((city) => (
                      <option key={city} value={city === 'All Cities' ? '' : city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-xs text-[#252D29]/50" aria-hidden="true">
                    ▼
                  </div>
                </div>

                {/* Submit: Find Care Button */}
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-semibold text-white bg-[#174B3A] hover:bg-[#12382c] active:scale-[0.98] rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B3A]"
                >
                  <span>Find Care</span>
                  <ArrowRight className="w-4 h-4 text-[#F28B68]" aria-hidden="true" />
                </button>
              </form>

              {/* Smart Autocomplete / Suggestions Popover */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-[#174B3A]/15 overflow-hidden z-30 animate-fade-in">
                  <div className="px-4 py-2 bg-[#FAF8F3] border-b border-[#174B3A]/10 flex items-center justify-between text-[11px] font-semibold text-[#174B3A] uppercase tracking-wider">
                    <span>Suggested Services & Locations</span>
                    <span className="text-[#252D29]/50 lowercase font-normal">Click to apply</span>
                  </div>
                  <div className="divide-y divide-stone-100 max-h-64 overflow-y-auto">
                    {filteredSuggestions.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSelectSuggestion(item)}
                        className="w-full px-4 py-2.5 text-left text-xs hover:bg-[#E9F1E9] flex items-center justify-between group transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          {item.type === 'service' ? (
                            <Stethoscope className="w-3.5 h-3.5 text-[#174B3A]" />
                          ) : item.type === 'locality' ? (
                            <MapPin className="w-3.5 h-3.5 text-[#F28B68]" />
                          ) : (
                            <Building2 className="w-3.5 h-3.5 text-[#174B3A]" />
                          )}
                          <span className="text-[#252D29] group-hover:text-[#174B3A] font-medium">
                            {item.text}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#252D29]/45 uppercase font-mono">
                          {item.type}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick tags */}
              <div className="mt-3.5 pt-3 border-t border-[#174B3A]/8 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[#252D29]/60 font-medium">Popular:</span>
                <button
                  type="button"
                  onClick={() => onQuickCategorySelect('veterinary-clinics')}
                  className="px-2.5 py-1 rounded-md bg-[#FAF8F3] hover:bg-[#E9F1E9] text-[#174B3A] transition-colors cursor-pointer"
                >
                  Vaccinations
                </button>
                <button
                  type="button"
                  onClick={() => onQuickCategorySelect('animal-hospitals')}
                  className="px-2.5 py-1 rounded-md bg-[#FAF8F3] hover:bg-[#E9F1E9] text-[#174B3A] transition-colors cursor-pointer"
                >
                  24/7 Trauma ICU
                </button>
                <button
                  type="button"
                  onClick={() => onQuickCategorySelect('pet-boarding')}
                  className="px-2.5 py-1 rounded-md bg-[#FAF8F3] hover:bg-[#E9F1E9] text-[#174B3A] transition-colors cursor-pointer"
                >
                  Dog Boarding
                </button>
                <button
                  type="button"
                  onClick={() => onQuickCategorySelect('diagnostics')}
                  className="px-2.5 py-1 rounded-md bg-[#FAF8F3] hover:bg-[#E9F1E9] text-[#174B3A] transition-colors cursor-pointer"
                >
                  Ultrasound & X-Ray
                </button>
                <button
                  type="button"
                  onClick={() => onQuickCategorySelect('animal-ambulances')}
                  className="px-2.5 py-1 rounded-md bg-red-50 hover:bg-red-100 text-red-700 font-medium transition-colors cursor-pointer"
                >
                  Pet Ambulance
                </button>
                {(searchQuery || locationQuery) && (
                  <button
                    type="button"
                    onClick={onClearSearch}
                    className="px-2.5 py-1 rounded-md text-red-600 hover:bg-red-50 text-[11px] font-medium transition-colors cursor-pointer ml-auto"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Reassurance Micro-Statements */}
            <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#252D29]/70">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#174B3A]" />
                <span>Verified Clinic Contacts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#174B3A]" />
                <span>Real Operating Hours</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#F28B68]" />
                <span>Zero Commission for Pet Parents</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Hero Photograph */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:h-full lg:min-h-[460px] rounded-3xl overflow-hidden shadow-xl border border-[#174B3A]/10 bg-stone-200">
              <img
                src={HERO_IMAGE}
                alt="Happy golden retriever dog and calm cat sitting peacefully together in a sunlit living room"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                loading="eager"
              />

              {/* Scrim and badge overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

              {/* Top floating location pill */}
              <div className="absolute top-4 right-4">
                <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#174B3A] text-xs font-semibold border border-white/60 shadow-md inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F28B68]" />
                  <span>Pan-India Discovery</span>
                </span>
              </div>

              {/* Floating Reassurance Glass Badge */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-white/50 text-[#252D29]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E9F1E9] text-[#174B3A] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#174B3A]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#174B3A]">
                      24/7 Verified Emergency Grid
                    </p>
                    <p className="text-[11px] text-[#252D29]/70">
                      Emergency phone lines vetted for night triage & trauma admissions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-metric strip below hero split */}
        <div className="mt-12 pt-8 border-t border-[#174B3A]/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="p-4 rounded-xl bg-[#E9F1E9]/40 border border-[#174B3A]/10">
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#174B3A] tabular-nums">
              140+
            </div>
            <div className="text-xs font-semibold text-[#252D29] mt-0.5">Vetted Providers</div>
            <div className="text-[11px] text-[#252D29]/65">Clinics, hospitals & labs</div>
          </div>

          <div className="p-4 rounded-xl bg-[#E9F1E9]/40 border border-[#174B3A]/10">
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#174B3A] tabular-nums">
              6 Metros
            </div>
            <div className="text-xs font-semibold text-[#252D29] mt-0.5">Pan-India Coverage</div>
            <div className="text-[11px] text-[#252D29]/65">Bengaluru, Mumbai, Delhi +</div>
          </div>

          <div className="p-4 rounded-xl bg-[#E9F1E9]/40 border border-[#174B3A]/10">
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#174B3A] tabular-nums">
              24/7
            </div>
            <div className="text-xs font-semibold text-[#252D29] mt-0.5">Emergency Triage</div>
            <div className="text-[11px] text-[#252D29]/65">Midnight trauma & transit</div>
          </div>

          <div className="p-4 rounded-xl bg-[#E9F1E9]/40 border border-[#174B3A]/10">
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#174B3A] tabular-nums">
              100% Free
            </div>
            <div className="text-xs font-semibold text-[#252D29] mt-0.5">For Pet Parents</div>
            <div className="text-[11px] text-[#252D29]/65">Direct clinic telephone access</div>
          </div>
        </div>
      </div>
    </section>
  );
};
