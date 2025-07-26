export interface Overview {
  total: number;
  byRole: Record<string, number>;
  growth: {
    "1d": { rate: number; count: number };
    "7d": { rate: number; count: number };
    "30d": { rate: number; count: number };
  };
  timeline: {
    "1d": Array<{ date: string; count: number }>;
    "30d": Array<{ date: string; count: number }>;
  };
}

export interface ByBatch {
  batch: number;
  total: number;
  byRole: Record<string, number>;
  growth: { count: number; rate: number };
}

export interface ByDepartment {
  department: string;
  total: number;
  byRole: Record<string, number>;
  growth: { count: number; rate: number };
}

export interface Unverified {
  total: number;
  users: Array<{
    name: string;
    collegeEmail: string;
    batch: string;
    department: string;
    role: string;
    createdAt: string;
  }>;
}

export interface UserAnalytics {
  overview: Overview;
  byBatch: Array<ByBatch>;
  byDepartment: Array<ByDepartment>;
  unverified: Unverified;
}
