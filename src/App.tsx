import React, { useState, useEffect } from 'react';
import { TECHNIQUES } from './constants';
import { SecurityTechnique, EncryptionKey } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Terminal } from './components/Terminal';
import { Dashboard } from './pages/Dashboard';
import { DataIngestion } from './pages/DataIngestion';
import { ComputeCluster } from './pages/ComputeCluster';
import { SparkCode } from './pages/SparkCode';
import { JobMonitor } from './pages/JobMonitor';
import { KMS } from './pages/KMS';
import { SecurityAnalysis } from './pages/SecurityAnalysis';
import { useSparkJob } from './hooks/useSparkJob';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTechnique, setSelectedTechnique] = useState<SecurityTechnique>(TECHNIQUES[0]);
  const [datasetSize, setDatasetSize] = useState('100 GB');
  const [chunkSize, setChunkSize] = useState('128 MB');
  const [accessPolicy, setAccessPolicy] = useState('(ANALYST AND (DATA_SCIENTIST OR COMPLIANCE_OFFICER))');
  const [sparkCode, setSparkCode] = useState<string>(`# Distributed PySpark Security Job
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, udf, lit, spark_partition_id
from pyspark.sql.types import StringType

# Initialize Distributed Spark Session
spark = SparkSession.builder \\
    .appName("DistributedLightweightSecure") \\
    .config("spark.executor.instances", "10") \\
    .config("spark.executor.cores", "4") \\
    .getOrCreate()

# Load Large Dataset (Partitioned across 10 nodes)
df = spark.read.parquet("s3://data-lake/input-large") \\
    .repartition(10) # Force distribution across cluster

# Apply Lightweight Security Technique
def secure_process(data):
    # Distributed processing logic
    return data

secure_udf = udf(secure_process, StringType())
df_secure = df.withColumn("data", secure_udf(col("data"))) \\
    .withColumn("node_id", spark_partition_id())

# Write to secure sink
df_secure.write.mode("overwrite").parquet("s3://secure-output/distributed-data")
`);

  const {
    isProcessing,
    jobs,
    nodes,
    attacks,
    throughputData,
    logs,
    startProcessing,
    reset,
    setLogs
  } = useSparkJob(selectedTechnique, datasetSize);

  const [activeKeys] = useState<EncryptionKey[]>([
    { id: 'MK-001', name: 'LSF_MASTER_KEY_v1', type: 'MK', created: '2024-01-01', expires: '2025-01-01', status: 'ACTIVE' },
    { id: 'DEK-001', name: 'fin_records_q1', type: 'DEK', created: '2024-03-10', expires: '2024-06-10', status: 'ACTIVE' },
    { id: 'DEK-002', name: 'txn_data_jan', type: 'DEK', created: '2024-03-11', expires: '2024-06-11', status: 'ACTIVE' },
  ]);

  useEffect(() => {
    setLogs([
      '[INFO] System initialized.', 
      '[INFO] Cloud storage connected.', 
      '[INFO] HSM Status: ONLINE',
      '[INFO] KMS Status: OPERATIONAL'
    ]);
  }, [setLogs]);

  return (
    <div className="min-h-screen flex flex-col data-grid">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {activeTab === 'dashboard' && (
            <Dashboard 
              isProcessing={isProcessing}
              selectedTechnique={selectedTechnique}
              setSelectedTechnique={setSelectedTechnique}
              datasetSize={datasetSize}
              setDatasetSize={setDatasetSize}
              throughputData={throughputData}
              attacks={attacks}
              startProcessing={startProcessing}
              reset={reset}
            />
          )}

          {activeTab === 'ingestion' && (
            <DataIngestion 
              selectedTechnique={selectedTechnique}
              setSelectedTechnique={setSelectedTechnique}
              accessPolicy={accessPolicy}
              setAccessPolicy={setAccessPolicy}
              chunkSize={chunkSize}
              setChunkSize={setChunkSize}
            />
          )}

          {activeTab === 'compute' && <ComputeCluster nodes={nodes} />}

          {activeTab === 'code' && (
            <SparkCode 
              sparkCode={sparkCode}
              setSparkCode={setSparkCode}
              isProcessing={isProcessing}
              onRun={() => {
                setActiveTab('dashboard');
                startProcessing();
              }}
            />
          )}

          {activeTab === 'jobs' && <JobMonitor jobs={jobs} />}
          
          {activeTab === 'kms' && <KMS keys={activeKeys} />}

          {activeTab === 'security' && <SecurityAnalysis />}

          <Terminal logs={logs} />
        </main>
      </div>
    </div>
  );
}
