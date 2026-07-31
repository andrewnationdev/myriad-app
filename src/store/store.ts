import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IMediaStore } from '../schema/media';

export const useMediaStore = create<IMediaStore>()(
  persist(
    (set, get) => ({
      items: [],
      language: 'pt',
      darkMode: false,

      addItem: (newItem) =>
        set((state) => ({ items: [...state.items, { ...newItem, id: Date.now() }] })),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateItem: (updatedItem) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === updatedItem.id ? updatedItem : i)),
        })),

      getItemsByType: (type) => get().items.filter((i) => i.type === type),
      getItemsByStatus: (status) => get().items.filter((i) => i.status === status),

      setLanguage: (language) => set({ language }),
      setDarkMode: (darkMode) => set({ darkMode }),
    }),
    {
      name: 'myriad-storage',
    }
  )
);