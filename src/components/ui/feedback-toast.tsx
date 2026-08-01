import { CheckCircle2, X, AlertCircle } from 'lucide-react';

interface IFeedbackToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function FeedbackToast({ message, type, onClose }: IFeedbackToastProps) {
  const isSuccess = type === 'success';

  return (
    <div
      role="status"
      className={`fixed bottom-4 right-4 z-50 flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur ${isSuccess
        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700'
        : 'border-rose-500/30 bg-rose-500/10 text-rose-700'
        }`}
    >
      {isSuccess ? <CheckCircle2 className="mt-0.5 h-5 w-5" /> : <AlertCircle className="mt-0.5 h-5 w-5" />}
      <div className="pr-2">
        <p className="text-sm font-semibold">{message}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="ml-auto rounded-full p-1 transition hover:bg-black/5"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
