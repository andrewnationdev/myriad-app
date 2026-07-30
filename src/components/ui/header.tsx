import { Sparkles, Globe, ChevronDown, Sun, Moon } from "lucide-react";
import React, { useState, useEffect } from "react";

interface IAppHeaderProps {
    t: {},
    lang: string;
    setLang: (lang:string) => void;
    setDarkMode: (state:boolean) => void;
    darkMode: boolean;
}

export default function AppHeaderComponent(props: IAppHeaderProps) {
    return <header className={`border-b ${props.darkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white/80'} backdrop-blur-md sticky top-0 z-40`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-500/30">
                    <Sparkles className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-tight">{props.t.appTitle}</h1>
                    <p className={`text-xs ${props.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{props.t.subtitle}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-medium ${props.darkMode ? 'border-slate-700 bg-slate-800 text-slate-200' : 'border-slate-200 bg-slate-100 text-slate-700'
                        }`}>
                        <Globe className="w-4 h-4 text-indigo-500" />
                        <select
                            value={props.lang}
                            onChange={(e) => props.setLang(e.target.value)}
                            className="bg-transparent outline-none cursor-pointer appearance-none pr-4"
                        >
                            <option value="pt" className={props.darkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'}>Português</option>
                            <option value="en" className={props.darkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'}>English</option>
                            <option value="aru" className={props.darkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'}>Arusian</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 opacity-50 absolute right-3 pointer-events-none" />
                    </div>
                </div>

                <button
                    onClick={() => props.setDarkMode(!props.darkMode)}
                    className={`p-2 rounded-xl border transition-all ${props.darkMode ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-amber-400' : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-indigo-600'
                        }`}
                >
                    {props.darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>
        </div>
    </header>
}