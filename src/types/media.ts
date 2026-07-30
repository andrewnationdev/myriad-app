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