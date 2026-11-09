import React, { useState } from 'react';
import { X, User, Heart, Building2, CheckCircle2 } from 'lucide-react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInSuccess: (name: string, role: string) => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  onSignInSuccess,
}) => {
  const [role, setRole] = useState<'parent' | 'provider'>('parent');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setError('');
    onSignInSuccess(
      name,
      role === 'parent' ? 'Pet Parent' : 'Verified Healthcare Provider'
    );
    onClose();
  };

  const handleQuickDemoLogin = (demoName: string, demoRole: 'parent' | 'provider') => {
    onSignInSuccess(
      demoName,
      demoRole === 'parent' ? 'Pet Parent' : 'Verified Healthcare Provider'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#174B3A]/15 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#174B3A]/10 bg-[#FAF8F3] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E9F1E9] text-[#174B3A] flex items-center justify-center">
              <User className="w-5 h-5 text-[#174B3A]" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-lg text-[#174B3A]">
                Sign In to Practo for Animals
              </h2>
              <p className="text-[11px] text-[#252D29]/65">
                Access saved clinics, pet vaccine records & inquiries
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-200 text-[#252D29] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Role selector tabs */}
          <div className="grid grid-cols-2 p-1 bg-[#FAF8F3] rounded-xl mb-5 border border-[#174B3A]/10">
            <button
              type="button"
              onClick={() => setRole('parent')}
              className={`py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'parent'
                  ? 'bg-white text-[#174B3A] shadow-xs'
                  : 'text-[#252D29]/70 hover:text-[#174B3A]'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-[#F28B68]" />
              <span>Pet Parent</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('provider')}
              className={`py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'provider'
                  ? 'bg-white text-[#174B3A] shadow-xs'
                  : 'text-[#252D29]/70 hover:text-[#174B3A]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-[#174B3A]" />
              <span>Care Provider</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} aria-label="Sign In Form" className="space-y-4">
            <div>
              <label htmlFor="signin-name" className="block text-xs font-semibold text-[#252D29] mb-1">
                Your Name
              </label>
              <input
                id="signin-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === 'parent' ? 'e.g. Priya Sharma' : 'e.g. Dr. A. V. Rao'}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
              />
            </div>

            <div>
              <label htmlFor="signin-email" className="block text-xs font-semibold text-[#252D29] mb-1">
                Email Address
              </label>
              <input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@example.com"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
              />
            </div>

            {error && <span className="text-xs text-red-600 block">{error}</span>}

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#174B3A] hover:bg-[#12382c] rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Continue to Portal
            </button>
          </form>

          {/* Quick 1-click Demo logins */}
          <div className="mt-5 pt-4 border-t border-[#174B3A]/10 text-center">
            <span className="text-[11px] text-[#252D29]/60 block mb-2 font-medium">
              Prototype Quick Test Profiles:
            </span>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Priya Sharma (Parent)', 'parent')}
                className="px-2.5 py-1.5 rounded-lg bg-[#FAF8F3] hover:bg-[#E9F1E9] text-[11px] font-medium text-[#174B3A] border border-[#174B3A]/10 cursor-pointer"
              >
                Sign in as Pet Parent
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Dr. Vikram Rao (Vet)', 'provider')}
                className="px-2.5 py-1.5 rounded-lg bg-[#FAF8F3] hover:bg-[#E9F1E9] text-[11px] font-medium text-[#174B3A] border border-[#174B3A]/10 cursor-pointer"
              >
                Sign in as Clinic Partner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
