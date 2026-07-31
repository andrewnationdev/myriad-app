import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IMediaStore } from '../schema/media';

function getNextItemId(items: IMediaStore['items']) {
  return items.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
}

export const useMediaStore = create<IMediaStore>()(
  persist(
    (set, get) => ({
      items: [],
      language: 'pt',
      darkMode: false,

      addItem: (newItem) =>
        set((state) => ({
          items: [...state.items, { ...newItem, id: getNextItemId(state.items) }],
        })),

      importItems: (newItems) =>
        set((state) => {
          let nextId = getNextItemId(state.items);
          const importedItems = newItems.map((item) => ({
            ...item,
            id: nextId++,
          }));

          return { items: [...state.items, ...importedItems] };
        }),

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