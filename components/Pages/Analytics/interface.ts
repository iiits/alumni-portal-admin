export interface DashboardAnalytics {
  users: {
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
  };
  events: {
    total: number;
    upcoming: number;
    past: number;
    nextEvents: Array<{
      name: string;
      dateTime: string;
      venue: string;
      type: string;
    }>;
  };
  referrals: {
    total: number;
    active: number;
    topCompanies: Array<{ count: number; name: string }>;
    topRoles: Array<{ count: number; name: string }>;
  };
  jobs: {
    total: number;
    active: number;
    topCompanies: Array<{ count: number; name: string }>;
    topRoles: Array<{ count: number; name: string }>;
  };
  logins: {
    activeUsers: number;
    timeline: {
      "1d": Array<{ date: string; count: number }>;
      "30d": Array<{ date: string; count: number }>;
    };
  };
}
