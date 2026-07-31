import { BookMarked, Film, Check, MessageSquare, Plus } from "lucide-react";
import React from "react";

export interface IFilterProps {
    t: {};
    activeTab: string;
    setActiveTab: (tab:string) => void;
    darkMode: boolean;
  onCreate: () => void;
}

export default function FilterComponent(props:IFilterProps){
    return <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'wishlist', label: props.t.wishlistTab, icon: BookMarked },
              { id: 'progress', label: props.t.progressTab, icon: Film },
              { id: 'finished', label: props.t.finishedTab, icon: Check },
              { id: 'notes', label: props.t.notesTab, icon: MessageSquare }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = props.activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => props.setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all shadow-sm ${isActive
                    ? 'bg-indigo-600 text-white shadow-indigo-500/30'
                    : props.darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={props.onCreate}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-medium shadow-lg shadow-indigo-500/25 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>{props.t.addTitle}</span>
          </button>
        </div>
}