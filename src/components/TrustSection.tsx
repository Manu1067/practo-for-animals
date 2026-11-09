import React from 'react';
import { Compass, ShieldCheck, LayoutGrid, Users, CheckCircle2 } from 'lucide-react';
import { TRUST_POINTS } from '../data/mockData';

export const TrustSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#174B3A]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#174B3A]" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-6 h-6 text-[#174B3A]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[#174B3A]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#174B3A]" />;
    }
  };

  return (
    <section id="about-section" className="py-20 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-semibold text-[#174B3A] tracking-wider uppercase mb-2">
            Why Pet Parents Trust Our Directory
          </div>
          <h2
            className="font-heading font-extrabold text-2xl sm:text-4xl text-[#174B3A] tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            Built for Clarity, Transparency, and Urgent Reliability
          </h2>
          <p className="text-sm sm:text-base text-[#252D29]/75 leading-relaxed">
            When your pet is ailing, every second counts. We cut out confusing referral directories, expired phone numbers, and hidden clinic costs.
          </p>
        </div>

        {/* 4 Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_POINTS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-2xl border border-[#174B3A]/10 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#E9F1E9] flex items-center justify-center mb-5">
                  {getIcon(item.icon)}
                </div>
                <h3 className="font-heading font-bold text-lg text-[#174B3A] mb-2.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#252D29]/75 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#174B3A]/8 flex items-center gap-1.5 text-xs text-[#174B3A] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#F28B68]" />
                <span>Verified Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-14 bg-[#E9F1E9] rounded-2xl p-6 sm:p-8 border border-[#174B3A]/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="font-heading font-bold text-lg text-[#174B3A] mb-1.5">
              Strict Ethical Directory Standards
            </h4>
            <p className="text-xs sm:text-sm text-[#252D29]/80 leading-relaxed">
              We never promote unverified home remedies, paid artificial doctor rankings, or misleading real-time bed claims. Every profile features verifiable physical addresses and direct landlines.
            </p>
          </div>
          <div className="text-center sm:text-right shrink-0">
            <div className="text-xs font-semibold text-[#174B3A] uppercase tracking-wider">
              Transparency Guarantee
            </div>
            <div className="text-sm font-bold text-[#252D29] mt-0.5">
              100% Free Public Resource
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
