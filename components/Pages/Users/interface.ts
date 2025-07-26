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

interface SocialMediaProfile {
  type:
    | "youtube"
    | "reddit"
    | "linkedin"
    | "twitter"
    | "instagram"
    | "facebook"
    | "discord"
    | "github";
  link: string;
  visibility: "yes" | "no";
}

export interface UserProfileData {
  name: string;
  profilePicture: string;
  username: string;
  batch: string;
  department: string;
  bio: string;
  collegeEmail: string;
  personalEmail: string;
  profiles: SocialMediaProfile[];
  alumniDetails?: {
    verified: boolean;
    location: {
      city: string;
      country: string;
    };
    jobPosition: {
      title: string;
      company: string;
      type: string;
      start: string;
      end: string | null;
      ongoing: boolean;
      location: string;
      jobType: string;
      description: string;
    }[];
    education: {
      school: string;
      degree: string;
      fieldOfStudy: string;
      start: string;
      end: string;
      ongoing: boolean;
      location: string;
      description: string;
    }[];
    expertise: string[];
  };
}

export interface UserFilters {
  page?: string;
  limit?: string;
  search?: string;
  batch?: string;
  department?: string;
  role?: string;
  verified?: string;
}
