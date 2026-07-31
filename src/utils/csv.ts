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

function parseCsvRows(csvText: string) {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const character = csvText[index];
    const nextCharacter = csvText[index + 1];

    if (character === '"') {
      if (inQuotes && nextCharacter === '"') {
        currentCell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (character === ',' && !inQuotes) {
      currentRow.push(currentCell);
      currentCell = '';
      continue;
    }

    if ((character === '\n' || character === '\r') && !inQuotes) {
      if (character === '\r' && nextCharacter === '\n') {
        index += 1;
      }

      currentRow.push(currentCell);
      rows.push(currentRow);
      currentRow = [];
      currentCell = '';
      continue;
    }

    currentCell += character;
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell);
    rows.push(currentRow);
  }

  return rows;
}

export function parseMediaCsv(csvText: string): Omit<IMediaItem, 'id'>[] {
  const normalizedText = csvText.replace(/^\uFEFF/, '').trim();

  if (!normalizedText) {
    return [];
  }

  const rows = parseCsvRows(normalizedText);
  if (rows.length < 2) {
    return [];
  }

  const header = rows[0].map((value) => value.trim().toLowerCase());
  const columnIndex = {
    title: header.indexOf('title'),
    type: header.indexOf('type'),
    status: header.indexOf('status'),
    rating: header.indexOf('rating'),
    notes: header.indexOf('notes'),
  };

  return rows.slice(1).flatMap((row) => {
    const title = row[columnIndex.title]?.trim();
    const type = row[columnIndex.type]?.trim();
    const status = row[columnIndex.status]?.trim();
    const ratingValue = Number(row[columnIndex.rating] ?? 0);
    const notes = row[columnIndex.notes] ?? '';

    if (!title || !['movies', 'books', 'series'].includes(type) || !['wishlist', 'progress', 'completed'].includes(status) || Number.isNaN(ratingValue)) {
      return [];
    }

    return [{
      title,
      type: type as IMediaItem['type'],
      status: status as IMediaItem['status'],
      rating: ratingValue,
      notes,
    }];
  });
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