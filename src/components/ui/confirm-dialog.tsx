import { AlertTriangle } from 'lucide-react';

interface IConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel: string;
  cancelLabel: string;
  darkMode: boolean;
}

export default function ConfirmDialog({ title, message, onConfirm, onCancel, confirmLabel, cancelLabel, darkMode }: IConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
      <div className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-100' : 'border-slate-200 bg-white text-slate-800'}`}>
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-amber-500/10 p-2 text-amber-500">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className={`mt-2 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{message}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${darkMode ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
              {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-2xl bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
          >
              {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
