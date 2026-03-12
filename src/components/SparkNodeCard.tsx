import React from 'react';
import { motion } from 'motion/react';
import { Server } from 'lucide-react';
import { cn } from '../utils';
import { SparkNode } from '../types';

interface SparkNodeCardProps {
  node: SparkNode;
  onClick: () => void;
  isSelected: boolean;
}

export const SparkNodeCard: React.FC<SparkNodeCardProps> = ({ node, onClick, isSelected }) => (
  <motion.div 
    whileHover={{ scale: 1.02, translateY: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={cn(
      "glass-panel p-3 flex flex-col gap-2 transition-all duration-500 cursor-pointer relative group",
      node.status === 'processing' && "border-blue-500/50 active-node",
      node.status === 'under-attack' && "border-rose-500/50 bg-rose-500/5",
      node.status === 'completed' && "border-emerald-500/50",
      isSelected && "ring-2 ring-blue-500 border-transparent shadow-lg shadow-blue-500/20"
    )}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Server size={14} className={cn(
          node.status === 'processing' ? "text-blue-400" : 
          node.status === 'under-attack' ? "text-rose-400" : 
          node.status === 'completed' ? "text-emerald-400" : "text-zinc-600"
        )} />
        <span className="text-[10px] font-mono text-zinc-500">{node.id}</span>
      </div>
      <div className={cn(
        "w-2 h-2 rounded-full",
        node.status === 'processing' ? "bg-blue-500 animate-pulse" : 
        node.status === 'under-attack' ? "bg-rose-500 animate-ping" : 
        node.status === 'completed' ? "bg-emerald-500" : "bg-zinc-700"
      )} />
    </div>
    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
      <motion.div 
        className={cn(
          "h-full",
          node.status === 'under-attack' ? "bg-rose-500" : "bg-blue-500"
        )}
        initial={{ width: 0 }}
        animate={{ width: `${node.progress}%` }}
      />
    </div>
    <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500">
      <span className="truncate max-w-[80px]">
        {node.status === 'under-attack' ? '!! BREACH !!' : node.currentTask || 'IDLE'}
      </span>
      <span>{node.cpuUsage?.toFixed(0)}% CPU</span>
    </div>
  </motion.div>
);
