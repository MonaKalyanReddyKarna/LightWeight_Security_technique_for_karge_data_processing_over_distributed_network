import React from 'react';
import { List, Activity, Zap, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { SparkJob } from '../types';
import { cn } from '../utils';

interface JobMonitorProps {
  jobs: SparkJob[];
}

export const JobMonitor: React.FC<JobMonitorProps> = ({ jobs }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <List className="text-blue-400" size={20} />
          Spark Job Monitor
        </h2>
        <p className="text-sm text-zinc-500">Real-time visualization of job execution stages.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {jobs.length === 0 ? (
          <div className="glass-panel p-12 flex flex-col items-center justify-center text-zinc-500">
            <Activity size={48} className="mb-4 opacity-20" />
            <p>No jobs have been executed yet.</p>
          </div>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="glass-panel p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center",
                    job.status === 'running' ? "bg-blue-500/20 text-blue-400 animate-pulse" : 
                    job.status === 'completed' ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                  )}>
                    {job.status === 'running' ? <Zap size={24} /> : <ShieldCheck size={24} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-200 text-lg">{job.name}</h3>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Job ID: {job.id} | Technique: {job.technique}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={cn(
                    "px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                    job.status === 'running' ? "bg-blue-500 text-white" : "bg-emerald-500/20 text-emerald-400"
                  )}>
                    {job.status}
                  </span>
                  <p className="text-[10px] text-zinc-500 mt-2 font-mono">
                    {new Date(job.startTime).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {job.stages.map((stage, i) => (
                  <div key={i} className={cn(
                    "p-4 rounded-lg border flex items-center justify-between transition-all",
                    stage.status === 'completed' ? "bg-emerald-500/5 border-emerald-500/20" :
                    stage.status === 'running' ? "bg-blue-500/5 border-blue-500/40 ring-1 ring-blue-500/20" :
                    "bg-zinc-800/30 border-zinc-800"
                  )}>
                    <div className="flex items-center gap-3">
                      {stage.status === 'completed' ? <CheckCircle2 size={16} className="text-emerald-500" /> :
                       stage.status === 'running' ? <Activity size={16} className="text-blue-400 animate-spin" /> :
                       <Clock size={16} className="text-zinc-600" />}
                      <span className={cn(
                        "text-xs font-medium",
                        stage.status === 'completed' ? "text-zinc-300" :
                        stage.status === 'running' ? "text-blue-400" :
                        "text-zinc-500"
                      )}>
                        {stage.name}
                      </span>
                    </div>
                    {stage.duration && <span className="text-[9px] font-mono text-zinc-600">{stage.duration}</span>}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
