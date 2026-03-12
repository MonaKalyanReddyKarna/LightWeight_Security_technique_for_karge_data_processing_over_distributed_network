import { useState, useRef } from 'react';
import { SparkJob, SparkNode, SecurityTechnique, AttackEvent, JobStage } from '../types';

export const useSparkJob = (selectedTechnique: SecurityTechnique, datasetSize: string) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [jobs, setJobs] = useState<SparkJob[]>([]);
  const [nodes, setNodes] = useState<SparkNode[]>(
    Array.from({ length: 10 }, (_, i) => ({
      id: `worker-${(i + 1).toString().padStart(2, '0')}`,
      status: 'idle',
      progress: 0,
      cpuUsage: Math.random() * 5 + 2,
      ramUsage: Math.random() * 2 + 1,
      uptime: '00:00:00',
      logs: []
    }))
  );
  const [attacks, setAttacks] = useState<AttackEvent[]>([]);
  const [throughputData, setThroughputData] = useState<{ time: number, value: number }[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startProcessing = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    const jobId = `spark-job-${Math.random().toString(36).substr(2, 6)}`;
    const stages: JobStage[] = [
      { name: `Partitioning ${datasetSize} Data`, status: 'running' },
      { name: 'Distributing to 10 Nodes', status: 'pending' },
      { name: `Applying ${selectedTechnique.name}`, status: 'pending' },
      { name: 'Integrity Check (HMAC)', status: 'pending' },
      { name: 'Parallel Re-encryption', status: 'pending' },
      { name: 'Aggregating Results', status: 'pending' }
    ];

    const newJob: SparkJob = {
      id: jobId,
      name: `Distributed Job - ${selectedTechnique.name}`,
      status: 'running',
      progress: 0,
      startTime: Date.now(),
      technique: selectedTechnique.name,
      datasetSize: datasetSize,
      stages
    };

    setJobs(prev => [newJob, ...prev]);
    setLogs(prev => [...prev, `[INFO] Starting job ${jobId}...`, `[SEC] Applying ${selectedTechnique.name} protection.`]);

    let currentStageIndex = 0;
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += (Math.random() * 5 + 2) / selectedTechnique.speedMultiplier;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setIsProcessing(false);
        setJobs(prev => prev.map(j => j.id === jobId ? { 
          ...j, 
          status: 'completed', 
          progress: 100, 
          endTime: Date.now(),
          stages: j.stages.map(s => ({ ...s, status: 'completed', duration: `${(Math.random() * 10 + 5).toFixed(1)}s` }))
        } : j));
        setLogs(prev => [...prev, `[DONE] Job ${jobId} completed successfully.`]);
        setNodes(prev => prev.map(n => ({ ...n, status: 'completed', progress: 100 })));
        return;
      }

      const stageThresholds = [15, 30, 45, 75, 90, 100];
      if (progress > stageThresholds[currentStageIndex]) {
        currentStageIndex++;
      }

      setJobs(prev => prev.map(j => j.id === jobId ? { 
        ...j, 
        progress,
        stages: j.stages.map((s, i) => ({
          ...s,
          status: i < currentStageIndex ? 'completed' : i === currentStageIndex ? 'running' : 'pending',
          duration: i < currentStageIndex ? s.duration || `${(Math.random() * 5 + 2).toFixed(1)}s` : undefined
        }))
      } : j));

      setNodes(prev => prev.map(n => ({
        ...n,
        status: 'processing',
        progress: Math.min(100, progress + (Math.random() * 10 - 5)),
        cpuUsage: Math.random() * 40 + 40,
        currentTask: stages[currentStageIndex].name
      })));

      setThroughputData(prev => [...prev, { time: Date.now(), value: (2.41 / selectedTechnique.speedMultiplier) + (Math.random() * 0.2 - 0.1) }].slice(-20));

      if (Math.random() < 0.05) {
        const attackType = ['MITM', 'Replay', 'Side-Channel', 'Unauthorized Access'][Math.floor(Math.random() * 4)];
        const isBreached = Math.random() > (selectedTechnique.securityScore / 100);
        
        const newAttack: AttackEvent = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: Date.now(),
          type: attackType,
          severity: isBreached ? 'high' : 'medium',
          status: isBreached ? 'breached' : 'intercepted',
          techniqueId: selectedTechnique.id
        };

        setAttacks(prev => [newAttack, ...prev].slice(0, 10));
        setLogs(prev => [...prev, `!! ATTACK DETECTED: ${attackType} !!`, isBreached ? `[BREACH] Security layer bypassed!` : `[SUCCESS] Attack mitigated by ${selectedTechnique.name}.`]);
      }

    }, 500);

    timerRef.current = interval;
  };

  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsProcessing(false);
    setNodes(prev => prev.map(n => ({ ...n, status: 'idle', progress: 0, currentTask: undefined, cpuUsage: Math.random() * 5 + 2 })));
    setThroughputData([]);
    setAttacks([]);
    setLogs(prev => [...prev, '[INFO] System reset. Cluster ready.']);
  };

  return {
    isProcessing,
    jobs,
    nodes,
    attacks,
    throughputData,
    logs,
    startProcessing,
    reset,
    setLogs
  };
};
