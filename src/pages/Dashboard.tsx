import React, { useMemo } from 'react';
import { Zap, Database, Lock, CheckCircle2, Activity, Settings, RotateCcw, Play, Clock, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { StatCard } from '../components/StatCard';
import { TECHNIQUES } from '../constants';
import { cn } from '../utils';
import { SecurityTechnique, AttackEvent } from '../types';

interface DashboardProps {
  isProcessing: boolean;
  selectedTechnique: SecurityTechnique;
  setSelectedTechnique: (t: SecurityTechnique) => void;
  datasetSize: string;
  setDatasetSize: (s: string) => void;
  throughputData: { time: number, value: number }[];
  attacks: AttackEvent[];
  startProcessing: () => void;
  reset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  isProcessing,
  selectedTechnique,
  setSelectedTechnique,
  datasetSize,
  setDatasetSize,
  throughputData,
  attacks,
  startProcessing,
  reset
}) => {
  const radarData = useMemo(() => [
    { subject: 'Throughput', A: 120, B: 110, fullMark: 150 },
    { subject: 'Security', A: 98, B: 130, fullMark: 150 },
    { subject: 'Access Control', A: 86, B: 130, fullMark: 150 },
    { subject: 'Integrity', A: 99, B: 100, fullMark: 150 },
    { subject: 'Overhead', A: 85, B: 90, fullMark: 150 },
  ], []);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">System Overview Panel</h2>
        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
          <Clock size={12} />
          Last Scan: {new Date().toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Encryption Throughput" value={isProcessing ? `${(2.41 / selectedTechnique.speedMultiplier).toFixed(2)} GB/s` : '0.00 GB/s'} subValue="Real-time Metrics" icon={Zap} trend="up" />
        <StatCard label="Data Encrypted (24h)" value="847.3 GB" subValue="Total Volume" icon={Database} />
        <StatCard label="Key Operations (24h)" value="18,472" subValue="HSM-Backed" icon={Lock} />
        <StatCard label="Cluster Health" value="10/10" subValue="Nodes Healthy" icon={CheckCircle2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-panel p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Settings className="text-blue-400" size={20} />
                  Security Configuration
                </h3>
                <p className="text-sm text-zinc-500">Select cryptographic technique for distributed processing.</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={reset} className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors">
                  <RotateCcw size={20} />
                </button>
                <button 
                  onClick={startProcessing}
                  disabled={isProcessing}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all",
                    isProcessing ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
                  )}
                >
                  <Play size={16} fill="currentColor" />
                  Run Spark Job
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-zinc-500 font-bold">Encryption Algorithm</label>
                <select 
                  value={selectedTechnique.id}
                  onChange={(e) => setSelectedTechnique(TECHNIQUES.find(t => t.id === e.target.value)!)}
                  disabled={isProcessing}
                  className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                >
                  {TECHNIQUES.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-zinc-500 font-bold">Dataset Volume</label>
                <select 
                  value={datasetSize}
                  onChange={(e) => setDatasetSize(e.target.value)}
                  disabled={isProcessing}
                  className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                >
                  <option>50 GB</option>
                  <option>100 GB</option>
                  <option>500 GB (Stress Test)</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase text-zinc-500 font-bold">Distributed Mode</label>
                <div className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <span className="text-sm text-blue-400 font-mono uppercase">10 NODES SIMULATED</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 h-80 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Real-time Encryption Throughput (GB/s)</span>
              <div className="flex items-center gap-2 text-xs text-blue-400">
                <Activity size={12} />
                Live Stream
              </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={throughputData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis stroke="#52525b" fontSize={10} tickFormatter={(v) => `${v}G`} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', fontSize: '10px' }} />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-panel flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between bg-rose-500/5">
              <div className="flex items-center gap-2 text-rose-400">
                <ShieldAlert size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Threat Monitor</span>
              </div>
              <span className="text-[10px] font-mono text-rose-500/70">{attacks.length} Events</span>
            </div>
            <div className="p-4 flex flex-col gap-3 max-h-64 overflow-y-auto">
              <AnimatePresence initial={false}>
                {attacks.length === 0 ? (
                  <div className="text-center py-8 text-zinc-600 text-xs italic">No active threats detected.</div>
                ) : (
                  attacks.map((attack) => (
                    <motion.div 
                      key={attack.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "p-3 rounded-lg border flex flex-col gap-1",
                        attack.status === 'breached' ? "bg-rose-500/10 border-rose-500/30" : "bg-zinc-800/50 border-zinc-700"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-zinc-300 uppercase">{attack.type} ATTACK</span>
                        <span className={cn(
                          "text-[9px] px-1.5 py-0.5 rounded uppercase font-bold",
                          attack.status === 'breached' ? "bg-rose-500 text-white" : "bg-emerald-500/20 text-emerald-400"
                        )}>
                          {attack.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[9px] font-mono">
                        <span className="text-rose-400/70">SRC: {Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}.x.x</span>
                        <span className="text-zinc-600">{new Date(attack.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="glass-panel p-6 flex flex-col gap-4">
            <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Performance Radar</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#27272a" />
                  <PolarAngleAxis dataKey="subject" stroke="#52525b" fontSize={10} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} hide />
                  <Radar name="Proposed" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                  <Radar name="Baseline" dataKey="A" stroke="#52525b" fill="#52525b" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 text-[9px] font-mono text-zinc-500">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Proposed</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-zinc-600 rounded-full" /> Baseline</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
