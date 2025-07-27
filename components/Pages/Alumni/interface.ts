export interface AlumniAnalytics {
  batches: ByBatch[];
  departments: ByDepartment[];
  jobs: Jobs;
  education: Education;
  locations: Locations;
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

export interface Locations {
  topCities: Array<{ _id: string; count: number }>;
  topCountries: Array<{ _id: string; count: number }>;
}

interface JobsInternal {
  total: number;
  byEmploymentType: Record<string, number>;
  byJobType: Record<string, number>;
  topTitles: Array<{ _id: string; count: number }>;
  topLocations: Array<{ _id: string; count: number }>;
  topCompanies: Array<{ _id: string; count: number }>;
}

export interface Jobs {
  all: JobsInternal;
  ongoing: JobsInternal;
}

interface EducationInternal {
  total: number;
  topDegrees: Array<{ _id: string; count: number }>;
  topFields: Array<{ _id: string; count: number }>;
  topSchools: Array<{ _id: string; count: number }>;
  topLocations: Array<{ _id: string; count: number }>;
}

export interface Education {
  all: EducationInternal;
  ongoing: EducationInternal;
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

interface AlumniDetails {
  id: string;
  jobPosition: {
    title: string;
    company: string;
    type: string;
    start: Date;
    end?: Date | null;
    ongoing: boolean;
    location: string;
    jobType: string;
    description?: string;
  }[];
  education: {
    school: string;
    degree: string;
    fieldOfStudy: string;
    start: Date;
    end?: Date | null;
    ongoing: boolean;
    location: string;
    description?: string;
  }[];
  location: {
    city: string;
    country: string;
  };
  expertise: string[];
  verified: boolean;
}

export interface AlumniProfileData {
  id: string;
  name: string;
  collegeEmail: string;
  personalEmail: string;
  userId: string;
  username: string;
  profilePicture: string;
  batch: string;
  department: string;
  profiles: SocialMediaProfile[];
  bio: string;
  role: string;
  alumniDetails: AlumniDetails;
}

export interface AlumniFilters {
  page?: string;
  limit?: string;
  search?: string;
  batch?: string;
  department?: string;
  verified?: string;
}
