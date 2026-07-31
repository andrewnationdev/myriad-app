import React, { useState, useEffect } from 'react';
import { translations } from './schema/translation';
import AppHeaderComponent from './components/ui/header';
import SearchBarComponent from './components/ui/searchbar';
import FilterComponent from './components/ui/filter';
import { useMediaStore } from './store/store';
import AddItemModalComponent from './components/ui/add-item-modal';
import EmptyListComponent from './components/ui/empty-list';
import MediaItemCardComponent from './components/MediaCard/media-card';
import { useMediaForm } from './hooks/use-media-form';
import { filterMediaItems } from './utils/filter-media-items';

export default function App() {
  const [activeTab, setActiveTab] = useState('wishlist');
  const [searchTerm, setSearchTerm] = useState('');

  const { language, setLanguage, darkMode, setDarkMode, updateItem, addItem, removeItem, items } = useMediaStore();
  const {
    isModalOpen,
    editingId,
    formTitle,
    setFormTitle,
    formType,
    setFormType,
    formStatus,
    setFormStatus,
    formRating,
    setFormRating,
    formNotes,
    setFormNotes,
    openCreate,
    openEdit,
    closeModal,
    handleSave,
  } = useMediaForm({ addItem, updateItem });
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const filteredItems = filterMediaItems(items, activeTab, searchTerm);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <AppHeaderComponent t={t} lang={language} setLang={setLanguage} setDarkMode={setDarkMode} darkMode={darkMode} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <FilterComponent
          t={t}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
          onCreate={openCreate}
        />

        <SearchBarComponent
          translation={t}
          query={searchTerm}
          setSearchTerm={setSearchTerm}
          darkMode={darkMode}
        />

        {filteredItems.length === 0 ? (
          <EmptyListComponent darkMode={darkMode} t={t} />
        ) : (
          <MediaItemCardComponent
            darkMode={darkMode}
            t={t}
            filteredItems={filteredItems}
            openEdit={openEdit}
            deleteItem={removeItem}
          />
        )}
      </main>

      {isModalOpen && (
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
          setIsModalOpen={closeModal}
        />
      )}
    </div>
  );
}