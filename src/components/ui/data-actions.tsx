import { Download, Upload } from 'lucide-react';
import { useRef } from 'react';

interface IDataActionsProps {
  darkMode: boolean;
  t: Record<string, any>;
  onExport: () => void;
  onImport: (file: File) => void | Promise<void>;
}

export default function DataActionsComponent({ darkMode, t, onExport, onImport }: IDataActionsProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
      <button
        type="button"
        onClick={onExport}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 transition-all font-medium"
      >
        <Download className="w-4 h-4" />
        {t.exportData}
      </button>

      <button
        type="button"
        onClick={handleImportClick}
        className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border font-medium transition-all ${darkMode
          ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
        }`}
      >
        <Upload className="w-4 h-4" />
        {t.importData}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (file) {
            await onImport(file);
          }
          event.target.value = '';
        }}
      />
    </div>
  );
}