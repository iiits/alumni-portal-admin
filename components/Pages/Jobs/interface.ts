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

export interface Job {
  id: string;
  jobName: string;
  company: string;
  role: string;
  eligibility: {
    batch: string[];
    requirements: string[];
  };
  description: string;
  type: string;
  stipend: string;
  duration: string;
  workType: string;
  links: string[];
  postedBy: {
    name: string;
    collegeEmail: string;
    personalEmail: string;
    id: string;
  };
  postedOn: Date;
  lastApplyDate: Date;
}

export interface JobFilters {
  page?: string;
  limit?: string;
  search?: string;
  startMonthYear?: string;
  endMonthYear?: string;
  dateField?: string;
  type?: string;
  workType?: string;
}
