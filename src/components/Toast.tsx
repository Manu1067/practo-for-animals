import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { NotificationToast } from '../types';

interface ToastProps {
  toast: NotificationToast | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-[#174B3A] shrink-0" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-slide-up">
      <div className="bg-white rounded-2xl shadow-xl border border-[#174B3A]/15 p-4 flex items-start gap-3 text-[#252D29]">
        <div className="mt-0.5">{getIcon()}</div>
        <div className="flex-1 pr-1">
          <h4 className="font-heading font-bold text-xs text-[#174B3A]">
            {toast.title}
          </h4>
          <p className="text-[11px] text-[#252D29]/75 mt-0.5 leading-relaxed">
            {toast.message}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="text-[#252D29]/40 hover:text-[#252D29] transition-colors p-1 rounded-lg cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
