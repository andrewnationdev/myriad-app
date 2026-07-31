import type { IMediaItem } from '../schema/media';

export const mockData: IMediaItem[] = [
    { id: 1, title: 'Duna: Parte 2', type: 'movies', status: 'progress', rating: 5, notes: 'Fotografia espetacular e ritmo impecável.' },
    { id: 2, title: 'O Pequeno Príncipe', type: 'books', status: 'completed', rating: 5, notes: 'Uma leitura leve e profunda sobre a essência humana.' },
    { id: 3, title: 'Arcane', type: 'series', status: 'wishlist', rating: 0, notes: 'Recomendado pelos amigos.' }
  ]