import { useState, useEffect } from 'react';
import { translations } from './types/schema/translation';
import AppHeaderComponent from './components/ui/header';
import SearchBarComponent from './components/ui/searchbar';
import FilterComponent from './components/ui/filter';
import DataActionsComponent from './components/ui/data-actions';
import { useMediaStore } from './store/store';
import AddItemModalComponent from './components/ui/add-item-modal';
import EmptyListComponent from './components/ui/empty-list';
import MediaItemCardComponent from './components/MediaCard/media-card';
import FeedbackToast from './components/ui/feedback-toast';
import ConfirmDialog from './components/ui/confirm-dialog';
import { useMediaForm } from './hooks/use-media-form';
import { filterMediaItems } from './utils/filter-media-items';
import { downloadMediaCsv, parseMediaCsv } from './utils/csv';

export default function App() {
  const [activeTab, setActiveTab] = useState('wishlist');
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ type: 'import' | 'delete'; file?: File; itemId?: number } | null>(null);

  const { language, setLanguage, darkMode, setDarkMode, updateItem, addItem, importItems, removeItem, items } = useMediaStore();
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
  const handleExport = () => {
    downloadMediaCsv(items);
    setToast({ message: 'Exportação iniciada com sucesso!', type: 'success' });
  };

  const handleImport = async (file: File) => {
    try {
      const csvText = await file.text();
      const importedItems = parseMediaCsv(csvText);

      if (importedItems.length > 0) {
        importItems(importedItems);
        setToast({ message: `${importedItems.length} item${importedItems.length > 1 ? 's' : ''} importado${importedItems.length > 1 ? 's' : ''} com sucesso!`, type: 'success' });
      } else {
        setToast({ message: 'Nenhum item válido foi encontrado no CSV.', type: 'error' });
      }
    } catch {
      setToast({ message: 'Falha ao importar o arquivo. Verifique o formato do CSV.', type: 'error' });
    }
  };

  const requestImportConfirmation = (file: File) => {
    setConfirmAction({ type: 'import', file });
  };

  const requestDeleteConfirmation = (id: number) => {
    setConfirmAction({ type: 'delete', itemId: id });
  };

  const confirmActionHandler = async () => {
    if (!confirmAction) return;

    if (confirmAction.type === 'import' && confirmAction.file) {
      await handleImport(confirmAction.file);
    }

    if (confirmAction.type === 'delete' && confirmAction.itemId !== undefined) {
      removeItem(confirmAction.itemId);
      setToast({ message: 'Item removido com sucesso!', type: 'success' });
    }

    setConfirmAction(null);
  };

  const cancelActionHandler = () => {
    setConfirmAction(null);
  };

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

        <div className="flex flex-col md:flex-row md:items-end gap-3 mb-8">
          <SearchBarComponent
            translation={t}
            query={searchTerm}
            setSearchTerm={setSearchTerm}
            darkMode={darkMode}
            className="flex-1"
          />

          <DataActionsComponent
            darkMode={darkMode}
            t={t}
            onExport={handleExport}
            onImport={requestImportConfirmation}
          />
        </div>

        {filteredItems.length === 0 ? (
          <EmptyListComponent darkMode={darkMode} t={t} />
        ) : (
          <MediaItemCardComponent
            darkMode={darkMode}
            t={t}
            filteredItems={filteredItems}
            openEdit={openEdit}
            deleteItem={requestDeleteConfirmation}
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

      {confirmAction && (
        <ConfirmDialog
          title={confirmAction.type === 'import' ? 'Importar conteúdo?' : 'Excluir item?'}
          message={confirmAction.type === 'import'
            ? 'Essa ação adicionará os itens do CSV à sua lista atual. Deseja continuar?'
            : 'Essa ação removerá o item da sua lista. Deseja continuar?'}
          onConfirm={confirmActionHandler}
          onCancel={cancelActionHandler}
          darkMode={darkMode}
        />
      )}

      {toast && (
        <FeedbackToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}