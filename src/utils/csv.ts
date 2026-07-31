import type { IMediaItem } from '../schema/media';

function escapeCsvValue(value: string) {
  const normalizedValue = value.replace(/"/g, '""');
  return `"${normalizedValue}"`;
}

export function buildMediaCsv(items: IMediaItem[]) {
  const header = ['id', 'title', 'type', 'status', 'rating', 'notes'];
  const rows = items.map((item) => [
    item.id,
    item.title,
    item.type,
    item.status,
    item.rating,
    item.notes,
  ].map((value) => escapeCsvValue(String(value))).join(','));

  return [header.join(','), ...rows].join('\n');
}

export function downloadMediaCsv(items: IMediaItem[], filename = 'myriad-export.csv') {
  const csvContent = buildMediaCsv(items);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}