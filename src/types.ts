export interface SecurityTechnique {
  id: string;
  name: string;
  description: string;
  speedMultiplier: number;
  securityScore: number;
  vulnerabilities: string[];
}

export interface SparkNode {
  id: string;
  status: 'idle' | 'processing' | 'under-attack' | 'completed';
  progress: number;
  currentTask?: string;
  reputation?: number;
  cpuUsage?: number;
  ramUsage?: number;
  uptime?: string;
  logs?: string[];
}

export interface AttackEvent {
  id: string;
  timestamp: number;
  type: string;
  severity: 'low' | 'medium' | 'high';
  status: 'intercepted' | 'failed' | 'breached';
  techniqueId: string;
}

export interface JobStage {
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: string;
}

export interface SparkJob {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed';
  progress: number;
  startTime: number;
  endTime?: number;
  technique: string;
  datasetSize: string;
  stages: JobStage[];
}

export interface EncryptionKey {
  id: string;
  name: string;
  type: 'DEK' | 'KEK' | 'MK';
  created: string;
  expires: string;
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
}
