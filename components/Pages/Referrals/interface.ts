export interface ReferralsAnalytics {
  totalPosts: number;
  futurePosts: number;
  pastPosts: number;
  totalReferrals: number;
  uniqueCompanies: number;
  topCompanies: Array<{ count: number; name: string }>;
  uniqueRoles: number;
  topRoles: Array<{ count: number; name: string }>;
  topPosters: Array<{
    id: string;
    name: string;
    batch: number;
    role: string;
    postCount: number;
    totalReferrals: number;
    avgReferrals: number;
  }>;
}

export interface Referral {
  id: string;
  isActive: boolean;
  numberOfReferrals: number;
  jobDetails: {
    title: string;
    description: string;
    company: string;
    role: string;
    link: string;
  };
  postedBy: {
    id: string;
    name: string;
    batch: number;
    role: string;
  };
  postedOn: Date;
  lastApplyDate: Date;
}

export interface ReferralFilters {
  page: string;
  limit: string;
  search: string;
  startMonthYear: string;
  endMonthYear: string;
  dateField?: string;
  maxReferrals?: string;
  minReferrals?: string;
}
