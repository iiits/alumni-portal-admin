export interface JobsAnalytics {
  total: number;
  future: number;
  past: number;
  typeStats: TypeStats;
  workTypeStats: WorkTypeStats;
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

type JobType = "fulltime" | "parttime" | "internship" | "others";
type workType = "remote" | "onsite" | "hybrid";

export interface TypeStats {
  future: Record<JobType, number>;
  past: Record<JobType, number>;
  total: Record<JobType, number>;
}

export interface WorkTypeStats {
  future: Record<workType, number>;
  past: Record<workType, number>;
  total: Record<workType, number>;
}
