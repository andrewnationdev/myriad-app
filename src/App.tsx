import React, { useState, useEffect } from 'react';
import {
  Film, BookOpen, Tv, Plus, Trash2, Edit2, Check, X,
  Moon, Sun, Globe, Search, BookMarked, MessageSquare, Star, Sparkles, ChevronDown
} from 'lucide-react';

import { translations } from './schema/translation';
import AppHeaderComponent from './components/ui/header';
import SearchBarComponent from './components/ui/searchbar';
import FilterComponent from './components/ui/filter';
import { mockData } from './utils/mock';
import { useMediaStore } from './store/store';
import AddItemModalComponent from './components/ui/add-item-modal';

export default function App() {
  const [activeTab, setActiveTab] = useState('wishlist');
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState('movies');
  const [formStatus, setFormStatus] = useState('wishlist');
  const [formRating, setFormRating] = useState(3);
  const [formNotes, setFormNotes] = useState('');

  const { language, setLanguage, darkMode, setDarkMode, updateItem, addItem, items } = useMediaStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const t = translations[language];

  const handleSave = (e) => {
  e.preventDefault();
  if (!formTitle.trim()) return;

  const mediaData = {
    title: formTitle,
    type: formType,
    status: formStatus,
    rating: Number(formRating),
    notes: formNotes
  };

  if (editingId) {
    updateItem({
      id: editingId,
      ...mediaData
    });
    setEditingId(null);
  } else {

    addItem(mediaData);
  }

  setFormTitle('');
  setFormNotes('');
  setIsModalOpen(false);
};

const deleteItem = (id) => {
  removeItem(id);
};

  const openEdit = (item) => {
    setEditingId(item.id);
    setFormTitle(item.title);
    setFormType(item.type);
    setFormStatus(item.status);
    setFormRating(item.rating);
    setFormNotes(item.notes);
    setIsModalOpen(true);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'wishlist') return matchesSearch && item.status === 'wishlist';
    if (activeTab === 'progress') return matchesSearch && item.status === 'progress';
    if (activeTab === 'finished') return matchesSearch && item.status === 'completed';
    if (activeTab === 'notes') return matchesSearch && item.notes.trim().length > 0;
    return matchesSearch;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <AppHeaderComponent t={t} lang={language} setLang={setLanguage} setDarkMode={setDarkMode} darkMode={darkMode} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <FilterComponent t={t}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
          setEditingId={setEditingId}
          setFormTitle={setFormTitle}
          setFormNotes={setFormNotes}
          setIsModalOpen={setIsModalOpen} />

        <SearchBarComponent translation={t}
          query={searchTerm}
          setSearchTerm={setSearchTerm}
          darkMode={darkMode}
        />

        {filteredItems.length === 0 ? (
          <div className={`text-center py-16 rounded-3xl border border-dashed ${darkMode ? 'border-slate-800 bg-slate-800/20 text-slate-500' : 'border-slate-200 bg-slate-50 text-slate-400'}`}>
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-medium">{t.emptyList}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map(item => {
              const TypeIcon = item.type === 'movies' ? Film : item.type === 'books' ? BookOpen : Tv;
              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-3xl border flex flex-col justify-between transition-all hover:scale-[1.01] ${darkMode ? 'bg-slate-800/50 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold ${item.type === 'movies' ? 'bg-amber-500/10 text-amber-500' :
                        item.type === 'books' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-sky-500/10 text-sky-500'
                        }`}>
                        <TypeIcon className="w-3.5 h-3.5" />
                        {t[item.type]}
                      </span>

                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: item.rating }).map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>

                    {item.notes && (
                      <div className={`p-3 rounded-2xl text-sm mb-4 font-mono ${darkMode ? 'bg-slate-900/50 text-slate-300' : 'bg-slate-50 text-slate-600 border border-slate-100'}`}>
                        {item.notes}
                      </div>
                    )}
                  </div>

                  <div className={`flex justify-between items-center pt-4 border-t ${darkMode ? 'border-slate-700/50' : 'border-slate-100'}`}>
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${item.status === 'wishlist' ? 'bg-purple-500/10 text-purple-400' :
                      item.status === 'progress' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'
                      }`}>
                      {item.status === 'wishlist' ? t.wishlistTab : item.status === 'progress' ? t.progressTab : t.finishedTab}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className={`p-2 rounded-xl transition-all ${darkMode ? 'hover:bg-slate-700 text-slate-400 hover:text-slate-200' : 'hover:bg-slate-100 text-slate-500'}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-2 rounded-xl transition-all hover:bg-rose-500/10 text-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {isModalOpen &&
        <AddItemModalComponent
          darkMode={darkMode}
          t={t}
          editingId={editingId}
          formTitle={formTitle}
          setFormTitle={setFormTitle}
          formType={formType}
          setFormType={setFormType}
          formStatus={formStatus}
          setFormStatus={setFormStatus}
          formRating={formRating}
          setFormRating={setFormRating}
          formNotes={formNotes}
          setFormNotes={setFormNotes}
          handleSave={handleSave}
          setIsModalOpen={setIsModalOpen}
        />
      }
    </div>
  );
}