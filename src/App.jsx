import React, { useState, useEffect } from 'react';
import { 
  Film, BookOpen, Tv, Plus, Trash2, Edit2, Check, X, 
  Moon, Sun, Globe, Search, BookMarked, MessageSquare, Star, Sparkles, ChevronDown 
} from 'lucide-react';

const translations = {
  pt: {
    appTitle: "CineBook Hub",
    subtitle: "Gerencie suas leituras e maratonas em um só lugar!",
    movies: "Filmes",
    books: "Livros",
    series: "Séries",
    watchlist: "Lista de Desejos",
    progress: "Em Progresso",
    completed: "Concluídos",
    notes: "Anotações / Diário",
    addTitle: "Adicionar Novo Item",
    titlePlaceholder: "Título...",
    typeLabel: "Categoria",
    statusLabel: "Status",
    ratingLabel: "Nota",
    notesLabel: "Comentários / Markdown",
    save: "Salvar",
    cancel: "Cancelar",
    delete: "Excluir",
    edit: "Editar",
    searchPlaceholder: "Pesquisar na sua lista...",
    emptyList: "Nenhum item encontrado por aqui ainda. Adicione o primeiro!",
    wishlistTab: "Quero Ver/Ler",
    progressTab: "Acompanhando",
    finishedTab: "Finalizados",
    notesTab: "Diário de Bordo",
    stats: "Estatísticas Rápidas",
    totalItems: "Total na Lista",
    favorites: "Favoritos"
  },
  en: {
    appTitle: "CineBook Hub",
    subtitle: "Manage your readings and marathons in one place!",
    movies: "Movies",
    books: "Books",
    series: "Series",
    watchlist: "Watchlist",
    progress: "In Progress",
    completed: "Completed",
    notes: "Notes / Journal",
    addTitle: "Add New Item",
    titlePlaceholder: "Title...",
    typeLabel: "Category",
    statusLabel: "Status",
    ratingLabel: "Rating",
    notesLabel: "Comments / Markdown",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    searchPlaceholder: "Search your list...",
    emptyList: "No items found here yet. Add your first one!",
    wishlistTab: "Wishlist",
    progressTab: "In Progress",
    finishedTab: "Finished",
    notesTab: "Journal",
    stats: "Quick Stats",
    totalItems: "Total Items",
    favorites: "Favorites"
  }
};

export default function App() {
  const [lang, setLang] = useState('pt');
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('wishlist');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [items, setItems] = useState([
    { id: 1, title: 'Duna: Parte 2', type: 'movies', status: 'progress', rating: 5, notes: 'Fotografia espetacular e ritmo impecável.' },
    { id: 2, title: 'O Pequeno Príncipe', type: 'books', status: 'completed', rating: 5, notes: 'Uma leitura leve e profunda sobre a essência humana.' },
    { id: 3, title: 'Arcane', type: 'series', status: 'wishlist', rating: 0, notes: 'Recomendado pelos amigos.' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState('movies');
  const [formStatus, setFormStatus] = useState('wishlist');
  const [formRating, setFormRating] = useState(3);
  const [formNotes, setFormNotes] = useState('');

  const t = translations[lang];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingId) {
      setItems(items.map(item => item.id === editingId ? {
        ...item,
        title: formTitle,
        type: formType,
        status: formStatus,
        rating: Number(formRating),
        notes: formNotes
      } : item));
      setEditingId(null);
    } else {
      const newItem = {
        id: Date.now(),
        title: formTitle,
        type: formType,
        status: formStatus,
        rating: Number(formRating),
        notes: formNotes
      };
      setItems([...items, newItem]);
    }

    setFormTitle('');
    setFormNotes('');
    setIsModalOpen(false);
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

  const deleteItem = (id) => {
    setItems(items.filter(i => i.id !== id));
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
      <header className={`border-b ${darkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white/80'} backdrop-blur-md sticky top-0 z-40`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">{t.appTitle}</h1>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-medium ${
                darkMode ? 'border-slate-700 bg-slate-800 text-slate-200' : 'border-slate-200 bg-slate-100 text-slate-700'
              }`}>
                <Globe className="w-4 h-4 text-indigo-500" />
                <select 
                  value={lang} 
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer appearance-none pr-4"
                >
                  <option value="pt" className={darkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'}>Português</option>
                  <option value="en" className={darkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'}>English</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 opacity-50 absolute right-3 pointer-events-none" />
              </div>
            </div>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border transition-all ${
                darkMode ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-amber-400' : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-indigo-600'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'wishlist', label: t.wishlistTab, icon: BookMarked },
              { id: 'progress', label: t.progressTab, icon: Film },
              { id: 'finished', label: t.finishedTab, icon: Check },
              { id: 'notes', label: t.notesTab, icon: MessageSquare }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all shadow-sm ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-indigo-500/30' 
                      : darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              setEditingId(null);
              setFormTitle('');
              setFormNotes('');
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-medium shadow-lg shadow-indigo-500/25 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>{t.addTitle}</span>
          </button>
        </div>

        <div className="relative mb-8">
          <Search className={`absolute left-4 top-3.5 w-5 h-5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-2xl border outline-none transition-all ${
              darkMode 
                ? 'bg-slate-800 border-slate-700 focus:border-indigo-500 text-slate-100' 
                : 'bg-white border-slate-200 focus:border-indigo-500 text-slate-800 shadow-sm'
            }`}
          />
        </div>

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
                  className={`p-5 rounded-3xl border flex flex-col justify-between transition-all hover:scale-[1.01] ${
                    darkMode ? 'bg-slate-800/50 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold ${
                        item.type === 'movies' ? 'bg-amber-500/10 text-amber-500' :
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
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                      item.status === 'wishlist' ? 'bg-purple-500/10 text-purple-400' :
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className={`w-full max-w-lg p-6 rounded-3xl border shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold">{editingId ? 'Editar Item' : t.addTitle}</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
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
                  className={`w-full px-4 py-3 rounded-2xl border outline-none ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
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
                    className={`w-full px-4 py-3 rounded-2xl border outline-none ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
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
                    className={`w-full px-4 py-3 rounded-2xl border outline-none ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
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
                    className={`w-full px-4 py-3 rounded-2xl border outline-none ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
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
                  rows="3"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Escreva seus comentários ou marcações estilo Markdown..."
                  className={`w-full px-4 py-3 rounded-2xl border outline-none font-mono text-sm ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                    darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
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
      )}
    </div>
  );
}