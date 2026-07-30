export type TMediaType = "movies" | "books" | "series";

export type TMediaStatus = "wishlist" | "progress" | "completed";

export interface IMediaItem {
  id:number;
  title:string;
  type:TMediaType;
  status:TMediaStatus;
  rating:number;
  notes:string;
}

export interface IMediaStore {
  items: IMediaItem[];
  language: string;
  darkMode: boolean;
  addItem: (newItem: Omit<IMediaItem, 'id'>) => void;
  removeItem: (id: number) => void;
  updateItem: (updatedItem: IMediaItem) => void;
  getItemsByType: (type: TMediaType) => IMediaItem[];
  getItemsByStatus: (status: TMediaStatus) => IMediaItem[];
  setLanguage: (language: string) => void;
  setDarkMode: (darkMode: boolean) => void;
}