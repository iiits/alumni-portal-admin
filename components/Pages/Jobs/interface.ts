export interface JobsAnalytics {
  total: number;
  future: number;
  past: number;
  typeStats: {
    future: Record<string, number>;
    past: Record<string, number>;
    total: Record<string, number>;
  };
  workTypeStats: {
    future: Record<string, number>;
    past: Record<string, number>;
    total: Record<string, number>;
  };
  uniqueCompanies: number;
  topCompanies: Array<{ count: number; name: string }>;
  uniqueRoles: number;
  topRoles: Array<{ count: number; name: string }>;
  topPosters: Array<{
    id: string;
    name: string;
    batch: number;
    role: string;
    count: number;
  }>;
}
