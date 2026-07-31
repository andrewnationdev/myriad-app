import type { IMediaItem, TMediaStatus } from '../schema/media';

const STATUS_BY_TAB: Record<string, TMediaStatus | 'notes'> = {
  wishlist: 'wishlist',
  progress: 'progress',
  finished: 'completed',
  notes: 'notes',
};

export function filterMediaItems(items: IMediaItem[], activeTab: string, searchTerm: string) {
  const normalizedSearch = searchTerm.toLowerCase();
  const tab = STATUS_BY_TAB[activeTab];

  return items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(normalizedSearch) ||
      item.notes.toLowerCase().includes(normalizedSearch);

    if (tab === 'notes') return matchesSearch && item.notes.trim().length > 0;
    if (tab) return matchesSearch && item.status === tab;
    return matchesSearch;
  });
}