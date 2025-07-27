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
