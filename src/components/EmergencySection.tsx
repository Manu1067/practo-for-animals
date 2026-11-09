import React from 'react';
import {
  ShieldAlert,
  PhoneCall,
  Clock,
  AlertTriangle,
  ArrowRight,
  Truck,
  CheckCircle2,
  Building2,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { EMERGENCY_TRIAGE_TIPS, EMERGENCY_IMAGE } from '../data/mockData';
import { Provider } from '../types';

interface EmergencySectionProps {
  emergencyProviders: Provider[];
  onFindEmergencyCare: () => void;
  onOpenCorrection: () => void;
  onViewProvider: (p: Provider) => void;
}

export const EmergencySection: React.FC<EmergencySectionProps> = ({
  emergencyProviders,
  onFindEmergencyCare,
  onOpenCorrection,
  onViewProvider,
}) => {
  // Select top sample emergency providers (hospitals + ambulances)
  const featuredEmergency = emergencyProviders.slice(0, 3);

  return (
    <section id="emergency-section" className="py-16 md:py-24 bg-[#174B3A] text-white relative overflow-hidden">
      {/* Subtle organic background accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#F28B68]/10 pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Split: Left Proposition & Mandatory Phone Alert / Right Editorial Emergency Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-600/20 border border-red-500/30 text-red-200 text-xs font-semibold mb-4">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Critical Pet Care & Trauma Protocol</span>
            </div>

            <h2
              className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4"
              style={{ textWrap: 'balance' }}
            >
              Your pet needs urgent attention?
            </h2>

            <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-6">
              Immediate veterinary triage can save your pet's life during trauma, toxic ingestion, or acute breathing distress.
            </p>

            {/* CRITICAL Phone Confirmation Disclaimer */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-white/95 text-xs sm:text-sm leading-relaxed flex items-start gap-3.5 mb-8">
              <AlertTriangle className="w-5 h-5 text-[#F28B68] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-1 text-sm sm:text-base">
                  MANDATORY: Confirm readiness by telephone before departure.
                </strong>
                <span className="text-white/85 leading-relaxed block">
                  Even 24-hour trauma facilities occasionally experience active surgical overflows or specialist rotations. Call ahead so the veterinary ICU team can prep oxygen concentrators, heating tables, and emergency IV setups prior to arrival.
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onFindEmergencyCare}
                className="px-6 py-3.5 text-sm font-semibold text-[#174B3A] bg-white hover:bg-[#FAF8F3] rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4 text-[#F28B68]" />
                <span>Find Emergency Care & Ambulances</span>
                <ArrowRight className="w-4 h-4 text-[#174B3A]" />
              </button>

              <button
                onClick={onOpenCorrection}
                className="px-4 py-3 text-xs font-medium text-white/80 hover:text-white underline underline-offset-4 cursor-pointer"
              >
                Report an outdated emergency number
              </button>
            </div>
          </div>

          {/* Right Column: Visual Emergency Hero Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-stone-900 aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={EMERGENCY_IMAGE}
                alt="24/7 Veterinary emergency intensive care and mobile pet trauma unit"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Live Emergency Grid
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-white">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-[#F28B68]">Rapid Medical Dispatch</span>
                  <span className="font-mono text-white/70">Average: ~20-30 min</span>
                </div>
                <p className="text-xs text-white/80">
                  Critical transport fitted with oxygen concentrators, trauma splints, and trained paravets.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Sample Emergency Hospitals & Ambulances Strip */}
        <div className="mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#F28B68]" />
            <span>Sample 24/7 Animal Hospitals & Ambulance Transit Units</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredEmergency.map((prov) => (
              <div
                key={prov.id}
                className="bg-white/10 backdrop-blur-xs rounded-2xl overflow-hidden border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-all duration-200 group"
              >
                <div>
                  {/* Visual card header image */}
                  <div className="relative h-36 w-full bg-black/40 overflow-hidden">
                    <img
                      src={prov.image}
                      alt={`Emergency response facility of ${prov.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
                    
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs">
                      <span className="font-semibold text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                        {prov.categorySlug === 'animal-ambulances' ? (
                          <Truck className="w-3 h-3 text-[#F28B68]" />
                        ) : (
                          <Building2 className="w-3 h-3 text-[#F28B68]" />
                        )}
                        <span>{prov.category}</span>
                      </span>
                      <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                        24/7 Ready
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-2.5 right-2.5 text-xs text-white/90 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-[#F28B68] shrink-0" />
                      <span className="truncate">{prov.locality}, {prov.city}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-heading font-bold text-base text-white mb-1.5 leading-snug">
                      {prov.name}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-2 leading-relaxed mb-2">
                      {prov.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onViewProvider(prov)}
                      className="text-xs text-white hover:text-[#F28B68] font-medium flex items-center gap-1 underline underline-offset-2 cursor-pointer"
                    >
                      <span>View Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    {prov.emergencyPhone || prov.phone ? (
                      <a
                        href={`tel:${prov.emergencyPhone || prov.phone}`}
                        aria-label={`Call 24/7 emergency dispatch for ${prov.name} at ${prov.emergencyPhone || prov.phone}`}
                        className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Call Now</span>
                      </a>
                    ) : (
                      <span className="text-[11px] text-white/60">Phone verifying</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Emergency Triage Red-Flag Cards */}
        <div className="mt-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#F28B68]" />
            <span>Rapid Triage Checklist · When to Rush In Immediately</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EMERGENCY_TRIAGE_TIPS.map((tip, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/8 hover:bg-white/12 transition-colors border border-white/15 backdrop-blur-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#F28B68] mb-2">
                    <span className="font-semibold">{tip.urgency}</span>
                    <span className="text-white/40">0{idx + 1}</span>
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white mb-2">
                    {tip.title}
                  </h3>
                  <div className="text-xs text-white/75 mb-3 leading-relaxed">
                    <span className="text-white/50 block font-medium">Symptoms:</span>
                    {tip.symptom}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] text-white/90 leading-normal flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F28B68] shrink-0 mt-0.5" />
                  <span>{tip.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* National / Multi-city illustrative emergency dispatch helpline strip */}
        <div className="mt-10 p-5 rounded-2xl bg-black/25 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/30 text-red-300 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white">Illustrative Emergency Hotlines</div>
              <div className="text-white/65 text-[11px]">
                Bengaluru: +91 96866 01777 · Delhi NCR: +91 98110 99887 · Mumbai: +91 98200 44112 · Hyderabad: +91 91000 88991
              </div>
            </div>
          </div>
          <span className="text-white/60 text-[11px] text-center sm:text-right">
            Sample emergency directory for demonstration. Always verify readiness by telephone.
          </span>
        </div>
      </div>
    </section>
  );
};
