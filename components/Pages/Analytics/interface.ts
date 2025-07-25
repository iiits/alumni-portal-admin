export interface UsersAnalytics {
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
  recentUsers: Array<{
    name: string;
    collegeEmail: string;
    batch: number;
    department: string;
    role: string;
  }>;
}

export interface EventsAnalytics {
  total: number;
  upcoming: number;
  past: number;
  nextEvents: Array<{
    name: string;
    dateTime: string;
    venue: string;
    type: string;
  }>;
}

export interface ReferralsAnalytics {
  total: number;
  active: number;
  topCompanies: Array<{ count: number; name: string }>;
  topRoles: Array<{ count: number; name: string }>;
}

export interface JobsAnalytics {
  total: number;
  active: number;
  topCompanies: Array<{ count: number; name: string }>;
  topRoles: Array<{ count: number; name: string }>;
}

export interface LoginsAnalytics {
  activeUsers: number;
  timeline: {
    "1d": Array<{ date: string; count: number }>;
    "30d": Array<{ date: string; count: number }>;
  };
}

export interface DashboardAnalytics {
  users: UsersAnalytics;
  events: EventsAnalytics;
  referrals: ReferralsAnalytics;
  jobs: JobsAnalytics;
  logins: LoginsAnalytics;
}
