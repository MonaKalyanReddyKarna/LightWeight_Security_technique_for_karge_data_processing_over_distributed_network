import React from 'react';
import { 
  BarChart3, 
  UploadCloud, 
  Cpu, 
  Terminal as TerminalIcon, 
  List, 
  Key, 
  ShieldCheck, 
  HardDrive 
} from 'lucide-react';
import { SidebarItem } from './SidebarItem';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-900/40 p-4 flex flex-col gap-2">
      <div className="mb-4 px-2">
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">Navigation</p>
        <SidebarItem icon={BarChart3} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
        <SidebarItem icon={UploadCloud} label="Data Ingestion" active={activeTab === 'ingestion'} onClick={() => setActiveTab('ingestion')} />
        <SidebarItem icon={Cpu} label="Compute Cluster" active={activeTab === 'compute'} onClick={() => setActiveTab('compute')} />
        <SidebarItem icon={TerminalIcon} label="Spark Code" active={activeTab === 'code'} onClick={() => setActiveTab('code')} />
        <SidebarItem icon={List} label="Job Monitor" active={activeTab === 'jobs'} onClick={() => setActiveTab('jobs')} />
        <SidebarItem icon={Key} label="Key Management" active={activeTab === 'kms'} onClick={() => setActiveTab('kms')} />
        <SidebarItem icon={ShieldCheck} label="Security Analysis" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
      </div>
      
      <div className="mt-auto p-4 glass-panel bg-blue-500/5 border-blue-500/20">
        <div className="flex items-center gap-2 mb-2 text-blue-400">
          <HardDrive size={14} />
          <span className="text-[10px] font-bold uppercase">HDFS Storage</span>
        </div>
        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-1">
          <div className="h-full bg-blue-500 w-[24%]" />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-zinc-500">
          <span>1.2 TB</span>
          <span>5.0 TB</span>
        </div>
      </div>
    </aside>
  );
};
