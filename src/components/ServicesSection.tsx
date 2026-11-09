import React from 'react';
import {
  Stethoscope,
  Building2,
  Home,
  Activity,
  Truck,
  HeartHandshake,
  ArrowUpRight,
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/mockData';
import { ServiceCategorySlug } from '../types';

interface ServicesSectionProps {
  selectedCategory: ServiceCategorySlug;
  onSelectCategory: (slug: ServiceCategorySlug) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-[#174B3A]" aria-hidden="true" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#174B3A]" aria-hidden="true" />;
      case 'Home':
        return <Home className="w-6 h-6 text-[#174B3A]" aria-hidden="true" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-[#174B3A]" aria-hidden="true" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-red-700" aria-hidden="true" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#174B3A]" aria-hidden="true" />;
      default:
        return <Stethoscope className="w-6 h-6 text-[#174B3A]" aria-hidden="true" />;
    }
  };

  return (
    <section id="services-section" className="py-16 bg-[#E9F1E9]/30 border-y border-[#174B3A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold text-[#174B3A] tracking-wider uppercase mb-2">
              Tailored Care Categories
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#174B3A] tracking-tight">
              Explore Animal Healthcare Services
            </h2>
          </div>
          <p className="text-sm text-[#252D29]/75 max-w-md">
            Click any service category below to instantly filter vetted clinics, hospitals, and specialists in your locality.
          </p>
        </div>

        {/* 6 Premium Service Cards Grid with Consistent Dimensions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {SERVICE_CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                aria-pressed={isSelected}
                className={`group relative text-left p-6 rounded-2xl transition-all duration-200 cursor-pointer border flex flex-col justify-between h-full hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B3A] ${
                  isSelected
                    ? 'bg-white border-[#174B3A] shadow-md ring-2 ring-[#174B3A]/15'
                    : 'bg-white hover:bg-white/95 border-[#174B3A]/10 hover:border-[#174B3A]/30 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Row: Icon + Index + Arrow */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        cat.slug === 'animal-ambulances'
                          ? 'bg-red-50 group-hover:bg-red-100'
                          : isSelected
                          ? 'bg-[#E9F1E9]'
                          : 'bg-[#FAF8F3] group-hover:bg-[#E9F1E9]'
                      }`}
                    >
                      {getIcon(cat.iconName)}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-medium text-[#252D29]/45">
                        0{idx + 1}
                      </span>
                      <div
                        className="w-8 h-8 rounded-full bg-[#FAF8F3] group-hover:bg-[#174B3A] group-hover:text-white text-[#252D29]/60 flex items-center justify-center transition-colors"
                        aria-hidden="true"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-heading font-bold text-lg text-[#174B3A] mb-2 group-hover:text-[#12382c] transition-colors">
                    {cat.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm text-[#252D29]/75 leading-relaxed mb-4">
                    {cat.shortDesc}
                  </p>
                </div>

                {/* Clean unboxed metadata separator */}
                <div className="pt-3 border-t border-[#174B3A]/8 flex items-center justify-between text-xs text-[#252D29]/65">
                  <span className="tabular-nums font-medium">{cat.count}+ Listed Facilities</span>
                  {cat.badge && (
                    <span className="font-medium text-red-600">{cat.badge}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
