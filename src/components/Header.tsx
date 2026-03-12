import React from 'react';
import { Shield, Activity } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-14 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Shield className="text-white" size={20} />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight uppercase">Lightweight Security Framework</h1>
          <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest">Anurag University | Dept of CSE</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Status: Secure</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400">
          <Activity size={16} />
        </div>
      </div>
    </header>
  );
};
