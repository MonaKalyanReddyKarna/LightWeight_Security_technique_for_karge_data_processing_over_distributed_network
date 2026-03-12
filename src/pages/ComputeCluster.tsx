import React from 'react';
import { Cpu } from 'lucide-react';
import { SparkNodeCard } from '../components/SparkNodeCard';
import { SparkNode } from '../types';

interface ComputeClusterProps {
  nodes: SparkNode[];
}

export const ComputeCluster: React.FC<ComputeClusterProps> = ({ nodes }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Cpu className="text-blue-400" size={20} />
          Distributed Spark Cluster
        </h2>
        <p className="text-sm text-zinc-500">Monitor health and resource allocation of the 10-node executor cluster.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {nodes.map(node => (
          <SparkNodeCard 
            key={node.id} 
            node={node} 
            onClick={() => {}}
            isSelected={false}
          />
        ))}
      </div>
    </div>
  );
};
