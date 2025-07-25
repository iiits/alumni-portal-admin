export interface UserAnalytics {
  overview: {
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
  };
  byBatch: Array<{
    batch: number;
    total: number;
    byRole: Record<string, number>;
    growth: { count: number; rate: number };
  }>;
  byDepartment: Array<{
    department: string;
    total: number;
    byRole: Record<string, number>;
    growth: { count: number; rate: number };
  }>;
  unverified: {
    total: number;
    users: Array<{
      name: string;
      collegeEmail: string;
      batch: string;
      department: string;
      role: string;
      createdAt: string;
    }>;
  };
}
