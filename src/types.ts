export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  century: string;
  language: string;
  format: string;
  publicationYear: number;
  status: 'AVAILABLE' | 'RESTRICTED' | 'PRE-ORDER';
  archivedAt: string;
}

export interface ApiKey {
  id: string;
  name: string;
  token: string;
  created: string;
  lastUsed: string;
  type: 'live' | 'test';
}

export interface Metric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  type: 'requests' | 'latency' | 'error';
}

export type ActiveTab = 'documentation' | 'catalog' | 'dashboard' | 'getting-started' | 'settings' | 'support' | 'api-status';

export interface UserProfile {
  name: string;
  email: string;
  quotaTier: string;
  registered: string;
  role: string;
  status: string;
  avatarUrl: string;
  bio: string;
  usedRequests: number;
  maxRequests: number;
  location: string;
  nodeKey: string;
}

