import { X } from 'lucide-react';
import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { TMediaStatus, TMediaType } from '../../schema/media';

export interface IAddItemModalProps {
    darkMode: boolean;
    setIsModalOpen: () => void;
    editingId: number | null;
    t: Record<string, any>;
    handleSave: (e: React.FormEvent<HTMLFormElement>) => void;
    formTitle: string;
    setFormTitle: (v: string) => void;
    formType: TMediaType;
    setFormType: Dispatch<SetStateAction<TMediaType>>;
    formStatus: TMediaStatus;
    setFormStatus: Dispatch<SetStateAction<TMediaStatus>>;
    formRating: number;
    setFormRating: Dispatch<SetStateAction<number>>;
    formNotes: string;
    setFormNotes: (v: string) => void;
}

export default function AddItemModalComponent(props: IAddItemModalProps) {
    const { darkMode, setIsModalOpen, editingId, t, handleSave, formTitle, setFormTitle, formType, setFormType, formStatus, setFormStatus, formRating, setFormRating, formNotes, setFormNotes} = props;

    return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
        <div className={`w-full max-w-lg p-6 rounded-3xl border shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold">{editingId ? 'Editar Item' : t.addTitle}</h2>
                <button
                    onClick={setIsModalOpen}
                    className={`p-2 rounded-xl ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">{t.titlePlaceholder}</label>
                    <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className={`w-full px-4 py-3 rounded-2xl border outline-none ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                        placeholder="Ex: O Senhor dos Anéis..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">{t.typeLabel}</label>
                        <select
                            value={formType}
                            onChange={(e) => setFormType(e.target.value)}
                            className={`w-full px-4 py-3 rounded-2xl border outline-none ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                                }`}
                        >
                            <option value="movies">{t.movies}</option>
                            <option value="books">{t.books}</option>
                            <option value="series">{t.series}</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">{t.statusLabel}</label>
                        <select
                            value={formStatus}
                            onChange={(e) => setFormStatus(e.target.value)}
                            className={`w-full px-4 py-3 rounded-2xl border outline-none ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                                }`}
                        >
                            <option value="wishlist">{t.wishlistTab}</option>
                            <option value="progress">{t.progressTab}</option>
                            <option value="completed">{t.finishedTab}</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">{t.ratingLabel}</label>
                        <select
                            value={formRating}
                            onChange={(e) => setFormRating(e.target.value)}
                            className={`w-full px-4 py-3 rounded-2xl border outline-none ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                                }`}
                        >
                            <option value="0">0 - Sem Nota</option>
                            <option value="1">⭐ 1</option>
                            <option value="2">⭐⭐ 2</option>
                            <option value="3">⭐⭐⭐ 3</option>
                            <option value="4">⭐⭐⭐⭐ 4</option>
                            <option value="5">⭐⭐⭐⭐⭐ 5</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">{t.notesLabel}</label>
                    <textarea
                        rows={3}
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        placeholder="Escreva seus comentários ou marcações estilo Markdown..."
                        className={`w-full px-4 py-3 rounded-2xl border outline-none font-mono text-sm ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                    ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={setIsModalOpen}
                        className={`px-5 py-2.5 rounded-xl font-medium transition-all ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                            }`}
                    >
                        {t.cancel}
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/25 transition-all"
                    >
                        {t.save}
                    </button>
                </div>
            </form>
        </div>
    </div>
}