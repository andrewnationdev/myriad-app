import { Search } from "lucide-react";
import React from "react";

export interface ISearchBarProps {
    setSearchTerm: (query:string) => void;
    translation: {};
    query: string;
    darkMode: boolean;
    className?: string;
}

export default function SearchBarComponent(props:ISearchBarProps) {
    return <div className={`relative ${props.className ?? ''}`}>
        <Search className={`absolute left-4 top-3.5 w-5 h-5 ${props.darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
        <input
            type="text"
            placeholder={props.translation.searchPlaceholder}
            value={props.query}
            onChange={(e) => props.setSearchTerm(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-2xl border outline-none transition-all ${props.darkMode
                ? 'bg-slate-800 border-slate-700 focus:border-indigo-500 text-slate-100'
                : 'bg-white border-slate-200 focus:border-indigo-500 text-slate-800 shadow-sm'
                }`}
        />
    </div>
}