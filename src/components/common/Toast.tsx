import React from 'react';
import { useApp } from '../../context/AppContext';
import { Info, AlertTriangle, AlertOctagon, CheckCircle2, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-16 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const getIcon = () => {
          switch (toast.type) {
            case 'error':
              return <AlertOctagon className="w-5 h-5 text-red-400 shrink-0" />;
            case 'warning':
              return <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
            case 'success':
              return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
            case 'info':
            default:
              return <Info className="w-5 h-5 text-cyan-400 shrink-0" />;
          }
        };

        const getBorder = () => {
          switch (toast.type) {
            case 'error':
              return 'border-red-500/40 bg-slate-900/90 text-red-200';
            case 'warning':
              return 'border-amber-500/40 bg-slate-900/90 text-amber-200';
            case 'success':
              return 'border-emerald-500/40 bg-slate-900/90 text-emerald-200';
            case 'info':
            default:
              return 'border-cyan-500/40 bg-slate-900/90 text-cyan-200';
          }
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 ${getBorder()}`}
          >
            <div className="flex items-center gap-2.5">
              {getIcon()}
              <span className="text-xs font-semibold">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
