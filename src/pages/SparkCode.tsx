import React from 'react';
import { Terminal as TerminalIcon, Play } from 'lucide-react';
import { cn } from '../utils';

interface SparkCodeProps {
  sparkCode: string;
  setSparkCode: (c: string) => void;
  isProcessing: boolean;
  onRun: () => void;
}

export const SparkCode: React.FC<SparkCodeProps> = ({
  sparkCode,
  setSparkCode,
  isProcessing,
  onRun
}) => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <TerminalIcon className="text-blue-400" size={20} />
            Job Definition (PySpark)
          </h2>
          <p className="text-sm text-zinc-500">Configure distributed processing logic and security parameters.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm rounded-lg transition-all">
            Save Script
          </button>
          <button 
            onClick={onRun}
            disabled={isProcessing}
            className={cn(
              "px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-all flex items-center gap-2",
              isProcessing && "opacity-50 cursor-not-allowed"
            )}
          >
            <Play size={14} fill="currentColor" />
            Run Job
          </button>
        </div>
      </div>
      <div className="glass-panel flex-1 bg-black/60 p-4 font-mono text-sm overflow-hidden flex flex-col">
        <textarea 
          value={sparkCode}
          onChange={(e) => setSparkCode(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-zinc-300 resize-none scrollbar-hide"
          spellCheck={false}
        />
      </div>
    </div>
  );
};
