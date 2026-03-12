import React from 'react';
import { cn } from '../utils';

interface SidebarItemProps {
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg",
      active ? "bg-blue-500/10 text-blue-400" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
    )}
  >
    <Icon size={18} />
    {label}
  </button>
);
