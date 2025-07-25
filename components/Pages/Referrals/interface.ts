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
