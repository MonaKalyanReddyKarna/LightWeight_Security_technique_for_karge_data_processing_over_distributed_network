import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const SecurityAnalysis: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ShieldCheck className="text-blue-400" size={20} />
          Security Analysis & Audit
        </h2>
        <p className="text-sm text-zinc-500">Deep inspection of cryptographic strength and vulnerability assessment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 flex flex-col gap-4">
          <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Vulnerability Scanner</h3>
          <div className="flex flex-col gap-3">
            {[
              { name: 'Brute Force Resistance', status: 'Optimal', score: 98 },
              { name: 'Side-Channel Protection', status: 'Good', score: 85 },
              { name: 'Quantum Resistance', status: 'Warning', score: 45 },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-800 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-zinc-300">{item.name}</span>
                  <span className={cn(
                    "text-[10px] font-bold uppercase",
                    item.status === 'Optimal' ? "text-emerald-400" : "text-amber-400"
                  )}>{item.status}</span>
                </div>
                <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full", item.score > 90 ? "bg-emerald-500" : "bg-amber-500")} 
                    style={{ width: `${item.score}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 flex flex-col gap-4">
          <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Compliance Status</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
              <CheckCircle2 className="text-emerald-500" size={24} />
              <div>
                <h4 className="text-sm font-bold text-emerald-400">FIPS 140-2 Level 3</h4>
                <p className="text-[10px] text-zinc-500">HSM modules meet federal security standards.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
              <CheckCircle2 className="text-emerald-500" size={24} />
              <div>
                <h4 className="text-sm font-bold text-emerald-400">GDPR Article 32</h4>
                <p className="text-[10px] text-zinc-500">Technical measures for data protection in place.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-rose-500/5 border border-rose-500/20 rounded-lg">
              <ShieldAlert className="text-rose-500" size={24} />
              <div>
                <h4 className="text-sm font-bold text-rose-400">SOC2 Type II</h4>
                <p className="text-[10px] text-zinc-500">Audit pending for next quarter.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { cn } from '../utils';
