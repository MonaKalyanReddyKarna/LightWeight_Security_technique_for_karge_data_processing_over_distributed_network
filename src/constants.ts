import { SecurityTechnique } from './types';

export const TECHNIQUES: SecurityTechnique[] = [
  {
    id: 'chacha20',
    name: 'ChaCha20-Poly1305 (Lightweight)',
    description: 'IEEE 802.11ad standard. High-performance stream cipher. 3x faster than AES on software-only nodes.',
    speedMultiplier: 1.0,
    securityScore: 96,
    vulnerabilities: ['Nonce reuse risk'],
  },
  {
    id: 'lcsc',
    name: 'LCSC (Linear Coding)',
    description: 'Research-grade lightweight technique using linear encoding and node reputation for distributed consensus.',
    speedMultiplier: 1.2,
    securityScore: 94,
    vulnerabilities: ['Reputation cold-start'],
  },
  {
    id: 'speck',
    name: 'SPECK (NSA Lightweight)',
    description: 'Optimized for software performance in resource-constrained distributed environments.',
    speedMultiplier: 0.9,
    securityScore: 92,
    vulnerabilities: ['Differential cryptanalysis'],
  },
  {
    id: 'aes128',
    name: 'AES-128 (Standard)',
    description: 'Industry standard block cipher. Balanced speed/security for modern hardware with AES-NI.',
    speedMultiplier: 1.8,
    securityScore: 97,
    vulnerabilities: ['Side-channel attacks'],
  },
  {
    id: 'des',
    name: 'DES (Legacy)',
    description: '56-bit key legacy encryption. Fast but highly vulnerable to brute force.',
    speedMultiplier: 0.7,
    securityScore: 40,
    vulnerabilities: ['Brute force (2^56)', 'Small block size'],
  },
  {
    id: 'hashing',
    name: 'SHA-256 (Integrity Only)',
    description: 'Non-reversible hashing. Fast for integrity checks but does not provide confidentiality.',
    speedMultiplier: 0.5,
    securityScore: 60,
    vulnerabilities: ['No confidentiality', 'Rainbow tables'],
  },
  {
    id: 'aes256gcm',
    name: 'AES-256-GCM (Heavyweight)',
    description: 'Maximum security standard. High computational overhead on large distributed datasets.',
    speedMultiplier: 3.5,
    securityScore: 99,
    vulnerabilities: ['High latency', 'Resource intensive'],
  }
];
