import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    throughput TEXT,
    total_encrypted TEXT,
    key_ops TEXT,
    nodes_healthy TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export const getStats = () => {
  return db.prepare('SELECT * FROM stats ORDER BY timestamp DESC LIMIT 1').get();
};

export const updateStats = (throughput: string, totalEncrypted: string, keyOps: string, nodesHealthy: string) => {
  return db.prepare('INSERT INTO stats (throughput, total_encrypted, key_ops, nodes_healthy) VALUES (?, ?, ?, ?)').run(throughput, totalEncrypted, keyOps, nodesHealthy);
};

export default db;
