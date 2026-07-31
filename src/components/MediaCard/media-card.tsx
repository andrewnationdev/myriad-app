import { Film, BookOpen, Tv, Star, Edit2, Trash2 } from "lucide-react";
import React from "react";
import type { IMediaItem } from '../../schema/media';

export interface IMediaCardProps {
    darkMode: boolean;
    t: Record<string, any>;
    filteredItems: IMediaItem[];
    openEdit: (item: IMediaItem) => void;
    deleteItem: (id: number) => void;
}

export default function MediaItemCardComponent(props: IMediaCardProps) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {props.filteredItems.map(item => {
            const TypeIcon = item.type === 'movies' ? Film : item.type === 'books' ? BookOpen : Tv;
            return (
                <div
                    key={item.id}
                    className={`p-5 rounded-3xl border flex flex-col justify-between transition-all hover:scale-[1.01] ${props.darkMode ? 'bg-slate-800/50 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'
                        }`}
                >
                    <div>
                        <div className="flex justify-between items-start gap-2 mb-3">
                            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold ${item.type === 'movies' ? 'bg-amber-500/10 text-amber-500' :
                                item.type === 'books' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-sky-500/10 text-sky-500'
                                }`}>
                                <TypeIcon className="w-3.5 h-3.5" />
                                {props.t[item.type]}
                            </span>

                            <div className="flex items-center gap-1 text-amber-400">
                                {Array.from({ length: item.rating }).map((_, idx) => (
                                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                                ))}
                            </div>
                        </div>

                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>

                        {item.notes && (
                            <div className={`p-3 rounded-2xl text-sm mb-4 font-mono ${props.darkMode ? 'bg-slate-900/50 text-slate-300' : 'bg-slate-50 text-slate-600 border border-slate-100'}`}>
                                {item.notes}
                            </div>
                        )}
                    </div>

                    <div className={`flex justify-between items-center pt-4 border-t ${props.darkMode ? 'border-slate-700/50' : 'border-slate-100'}`}>
                        <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${item.status === 'wishlist' ? 'bg-purple-500/10 text-purple-400' :
                            item.status === 'progress' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'
                            }`}>
                            {item.status === 'wishlist' ? props.t.wishlistTab : item.status === 'progress' ? props.t.progressTab : props.t.finishedTab}
                        </span>

                        <div className="flex gap-2">
                            <button
                                onClick={() => props.openEdit(item)}
                                className={`p-2 rounded-xl transition-all ${props.darkMode ? 'hover:bg-slate-700 text-slate-400 hover:text-slate-200' : 'hover:bg-slate-100 text-slate-500'}`}
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => props.deleteItem(item.id)}
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
}