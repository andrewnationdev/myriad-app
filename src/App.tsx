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
import EmptyListComponent from './components/ui/empty-list';
import MediaItemCardComponent from './components/MediaCard/media-card';

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
          <EmptyListComponent
            darkMode={darkMode}
            t={t}
          />
        ) : (
         <MediaItemCardComponent
           darkMode={darkMode}
           t={t}
           filteredItems={filteredItems}
           openEdit={openEdit}
           deleteItem={deleteItem}
         />
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