import { BookOpen } from "lucide-react";
import React from "react";

export interface IEmptyListProps {
    darkMode: boolean;
    t: Record<string, any>;
}

export default function EmptyListComponent(props:IEmptyListProps) {
  return (
    <div className={`text-center py-16 rounded-3xl border border-dashed ${props.darkMode ? 'border-slate-800 bg-slate-800/20 text-slate-500' : 'border-slate-200 bg-slate-50 text-slate-400'}`}>
      <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
      <p className="font-medium">{props.t.emptyList}</p>
    </div>
  );
}