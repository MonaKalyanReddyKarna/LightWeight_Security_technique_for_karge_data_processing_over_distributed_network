import React, { useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '../utils';

interface TerminalProps {
  logs: string[];
}

export const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="glass-panel h-48 flex flex-col overflow-hidden bg-black/40">
      <div className="px-3 py-1.5 border-bottom border-zinc-800 flex items-center gap-2 bg-zinc-900/50">
        <TerminalIcon size={12} className="text-zinc-500" />
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">System Logs</span>
      </div>
      <div ref={scrollRef} className="p-3 font-mono text-[11px] overflow-y-auto flex flex-col gap-1">
        {logs.map((log, i) => (
          <div key={i} className={cn(
            "flex gap-2",
            log.includes('ATTACK') || log.includes('BREACH') ? "text-rose-400" : 
            log.includes('SUCCESS') || log.includes('DONE') ? "text-emerald-400" : 
            log.includes('WARNING') ? "text-amber-400" : "text-zinc-400"
          )}>
            <span className="text-zinc-600">[{new Date().toLocaleTimeString()}]</span>
            <span>{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
