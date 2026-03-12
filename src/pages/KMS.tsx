import React from 'react';
import { Key, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { EncryptionKey } from '../types';
import { cn } from '../utils';

interface KMSProps {
  keys: EncryptionKey[];
}

export const KMS: React.FC<KMSProps> = ({ keys }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Key className="text-blue-400" size={20} />
          Key Management System (KMS)
        </h2>
        <p className="text-sm text-zinc-500">Manage master keys and data encryption keys backed by HSM.</p>
      </div>

      <div className="glass-panel overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/50 border-b border-zinc-800">
              <th className="px-6 py-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Key ID</th>
              <th className="px-6 py-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Name</th>
              <th className="px-6 py-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Type</th>
              <th className="px-6 py-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Expires</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {keys.map(key => (
              <tr key={key.id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4 text-xs font-mono text-blue-400">{key.id}</td>
                <td className="px-6 py-4 text-xs font-medium text-zinc-300">{key.name}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-[9px] font-bold rounded border border-zinc-700">
                    {key.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span className="text-[10px] text-emerald-400 font-bold">{key.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-zinc-500 font-mono">{key.expires}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
