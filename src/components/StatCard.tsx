import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils';

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: any;
  trend?: 'up' | 'down';
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, icon: Icon, trend }) => (
  <motion.div 
    whileHover={{ scale: 1.02, translateY: -4 }}
    className="glass-panel p-4 flex flex-col gap-1 cursor-default group"
  >
    <div className="flex items-center justify-between text-zinc-500 mb-2">
      <span className="text-[10px] font-mono uppercase tracking-wider group-hover:text-blue-400 transition-colors">{label}</span>
      <Icon size={16} className="group-hover:text-blue-400 transition-colors" />
    </div>
    <div className="text-2xl font-semibold tracking-tight group-hover:text-white transition-colors">{value}</div>
    {subValue && (
      <div className={cn("text-[10px] mt-1 font-mono uppercase", trend === 'up' ? "text-emerald-500" : trend === 'down' ? "text-rose-500" : "text-zinc-500")}>
        {subValue}
      </div>
    )}
  </motion.div>
);
