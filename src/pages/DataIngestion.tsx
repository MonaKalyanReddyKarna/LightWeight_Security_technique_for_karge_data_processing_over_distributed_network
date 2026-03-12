import React from 'react';
import { UploadCloud } from 'lucide-react';
import { TECHNIQUES } from '../constants';
import { SecurityTechnique } from '../types';

interface DataIngestionProps {
  selectedTechnique: SecurityTechnique;
  setSelectedTechnique: (t: SecurityTechnique) => void;
  accessPolicy: string;
  setAccessPolicy: (p: string) => void;
  chunkSize: string;
  setChunkSize: (s: string) => void;
}

export const DataIngestion: React.FC<DataIngestionProps> = ({
  selectedTechnique,
  setSelectedTechnique,
  accessPolicy,
  setAccessPolicy,
  chunkSize,
  setChunkSize
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <UploadCloud className="text-blue-400" size={20} />
          Data Ingestion Module
        </h2>
        <p className="text-sm text-zinc-500">Configure encryption parameters and access policies for new datasets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-8 flex flex-col items-center justify-center border-dashed border-2 border-zinc-800 rounded-xl group hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer">
          <UploadCloud size={64} className="text-zinc-600 mb-4 group-hover:text-blue-400 transition-colors" />
          <h3 className="text-xl font-bold mb-2">Upload Large Dataset</h3>
          <p className="text-sm text-zinc-500 mb-8 text-center max-w-md">
            Drag and drop your large data files (CSV, Parquet, JSON) to initialize the distributed processing pipeline.
          </p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-blue-900/20">
            Select Files
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-panel p-6 flex flex-col gap-4">
            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Ingestion Config</h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase text-zinc-500 font-bold">Encryption Algorithm</label>
              <select 
                value={selectedTechnique.id}
                onChange={(e) => setSelectedTechnique(TECHNIQUES.find(t => t.id === e.target.value)!)}
                className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm rounded-lg px-3 py-2 outline-none"
              >
                {TECHNIQUES.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase text-zinc-500 font-bold">CP-ABE Access Policy</label>
              <input 
                type="text" 
                value={accessPolicy}
                onChange={(e) => setAccessPolicy(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter Boolean formula..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase text-zinc-500 font-bold">Chunk Size</label>
              <select 
                value={chunkSize}
                onChange={(e) => setChunkSize(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm rounded-lg px-3 py-2 outline-none"
              >
                <option>64 MB</option>
                <option>128 MB</option>
                <option>256 MB</option>
              </select>
            </div>

            <button className="mt-2 w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg font-bold text-sm transition-all border border-zinc-700">
              START SECURE INGESTION
            </button>
          </div>

          <div className="glass-panel p-6 flex flex-col gap-4">
            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Recent Ingestions</h3>
            <div className="flex flex-col gap-3">
              {[
                { name: 'financial_records_q1.parquet', size: '10.2 GB', status: '100%' },
                { name: 'user_activity_logs.csv', size: '4.5 GB', status: '100%' },
              ].map((file, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg border border-zinc-800">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-300 truncate max-w-[120px]">{file.name}</span>
                    <span className="text-[9px] text-zinc-500">{file.size}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">{file.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
