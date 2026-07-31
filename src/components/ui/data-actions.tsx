import React from 'react';

interface IDataActionsProps {
  darkMode: boolean;
  t: Record<string, any>;
  onExport: () => void;
}

export default function DataActionsComponent({ darkMode, t, onExport }: IDataActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
      <button
        type="button"
        onClick={onExport}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 transition-all font-medium"
      >
        {t.exportData}
      </button>

      <button
        type="button"
        onClick={() => {}}
        className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border font-medium transition-all ${darkMode
          ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
        }`}
      >
        {t.importData}
      </button>
    </div>
  );
}