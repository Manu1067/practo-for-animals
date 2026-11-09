import React, { useState } from 'react';
import { X, Flag, CheckCircle2, AlertTriangle, Check } from 'lucide-react';
import { Provider, CorrectionData } from '../../types';

interface SubmitCorrectionModalProps {
  isOpen: boolean;
  providers: Provider[];
  preselectedProvider?: Provider | null;
  onClose: () => void;
  onSubmitSuccess: (data: CorrectionData) => void;
}

export const SubmitCorrectionModal: React.FC<SubmitCorrectionModalProps> = ({
  isOpen,
  providers,
  preselectedProvider,
  onClose,
  onSubmitSuccess,
}) => {
  const [providerId, setProviderId] = useState(preselectedProvider?.id || (providers[0]?.id || ''));
  const [correctionType, setCorrectionType] = useState<CorrectionData['correctionType']>('wrong-hours');
  const [correctedInformation, setCorrectedInformation] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<CorrectionData | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctedInformation.trim() || correctedInformation.trim().length < 8) {
      setError('Please provide specific details about the corrected information (at least 8 characters).');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const selected = providers.find((p) => p.id === providerId);
    const providerName = selected ? selected.name : 'General Directory Feedback';

    const correctionPayload: CorrectionData = {
      id: `corr-${Date.now()}`,
      providerId,
      providerName,
      correctionType,
      correctedInformation,
      contactEmail,
      additionalDetails,
      submittedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData(correctionPayload);
      onSubmitSuccess(correctionPayload);
    }, 400);
  };

  const handleFinish = () => {
    setSubmittedData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#174B3A]/15 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#174B3A]/10 bg-[#FAF8F3] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Flag className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl text-[#174B3A]">
                Submit a Correction
              </h2>
              <p className="text-xs text-[#252D29]/65">
                Help keep India's pet care directory 100% accurate.
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

        {/* Form Body or Confirmation View */}
        <div className="p-5 sm:p-6">
          {submittedData ? (
            /* Confirmation View */
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-2xl text-[#174B3A] mb-1">
                  Correction Logged!
                </h3>
                <p className="text-xs text-[#252D29]/75 max-w-xs mx-auto">
                  Thank you for helping the pet parent community. Your report has been recorded locally.
                </p>
              </div>

              <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#174B3A]/15 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between pb-1.5 border-b border-[#174B3A]/10">
                  <span className="text-[#252D29]/60 font-medium">Facility:</span>
                  <span className="font-semibold text-[#174B3A]">{submittedData.providerName}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-[#174B3A]/10">
                  <span className="text-[#252D29]/60 font-medium">Type:</span>
                  <span className="font-semibold text-[#252D29]">{submittedData.correctionType}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-[#174B3A]/10">
                  <span className="text-[#252D29]/60 font-medium">Ticket ID:</span>
                  <span className="font-mono text-[#174B3A]">{submittedData.id}</span>
                </div>
                <div>
                  <span className="text-[#252D29]/60 font-medium block mb-1">Corrected Info:</span>
                  <p className="text-[11px] bg-white p-2 rounded-lg border border-stone-200 text-[#252D29]/80">
                    {submittedData.correctedInformation}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#174B3A] hover:bg-[#12382c] rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Close & Return
                </button>
              </div>
            </div>
          ) : (
            /* Form View */
            <>
              <div className="mb-5 p-3 rounded-xl bg-[#FAF8F3] border border-[#174B3A]/10 text-xs text-[#252D29]/75 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Noticed an outdated phone number, incorrect weekend clinic hours, or relocated emergency facility? Our verification team audits submissions within 24 hours.
                </span>
              </div>

              <form onSubmit={handleSubmit} aria-label="Submit a Correction Form" className="space-y-4">
                <div>
                  <label htmlFor="corr-provider-select" className="block text-xs font-semibold text-[#252D29] mb-1">
                    Provider Name *
                  </label>
                  <select
                    id="corr-provider-select"
                    value={providerId}
                    onChange={(e) => setProviderId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                  >
                    {providers.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.locality}, {p.city})
                      </option>
                    ))}
                    <option value="general">Other Provider Not in Directory</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="corr-issue-type" className="block text-xs font-semibold text-[#252D29] mb-1">
                    Correction Type *
                  </label>
                  <select
                    id="corr-issue-type"
                    value={correctionType}
                    onChange={(e) => setCorrectionType(e.target.value as CorrectionData['correctionType'])}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                  >
                    <option value="wrong-hours">Incorrect Clinic Working Hours / Night Shift</option>
                    <option value="wrong-phone">Outdated, Switched Off, or Unreachable Phone</option>
                    <option value="permanently-closed">Facility Permanently Closed or Relocated</option>
                    <option value="address-error">Incorrect Address or Locality</option>
                    <option value="wrong-services">Incorrect Services or Pricing Listed</option>
                    <option value="other">Other Information Update</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="corr-info-details" className="block text-xs font-semibold text-[#252D29] mb-1">
                    Corrected Information *
                  </label>
                  <textarea
                    id="corr-info-details"
                    rows={3}
                    value={correctedInformation}
                    onChange={(e) => setCorrectedInformation(e.target.value)}
                    placeholder="e.g. Their correct emergency night phone number is +91 98765 00000. They are closed on Tuesday mornings for scheduled surgeries."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                  />
                  {error && <span className="text-[11px] text-red-600 mt-1 block">{error}</span>}
                </div>

                <div>
                  <label htmlFor="corr-user-email" className="block text-xs font-semibold text-[#252D29] mb-1">
                    Contact Email (Optional, for verification credit)
                  </label>
                  <input
                    id="corr-user-email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="petparent@gmail.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                  />
                </div>

                <div>
                  <label htmlFor="corr-add-details" className="block text-xs font-semibold text-[#252D29] mb-1">
                    Additional Details / Source (Optional)
                  </label>
                  <input
                    id="corr-add-details"
                    type="text"
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    placeholder="e.g. Visited clinic yesterday; verified with reception staff."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#174B3A]/15 focus:outline-none focus:ring-2 focus:ring-[#174B3A]"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#174B3A]/10">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-medium text-[#252D29] hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#174B3A] hover:bg-[#12382c] rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Verified Correction'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
