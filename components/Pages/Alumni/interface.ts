export interface AlumniAnalytics {
  batches: Array<{
    batch: number;
    total: number;
    byRole: Record<string, number>;
    growth: { count: number; rate: number };
  }>;
  departments: Array<{
    department: string;
    total: number;
    byRole: Record<string, number>;
    growth: { count: number; rate: number };
  }>;
  jobs: {
    all: {
      total: number;
      byEmploymentType: Record<string, number>;
      byJobType: Record<string, number>;
      topTitles: Array<{ _id: string; count: number }>;
      topLocations: Array<{ _id: string; count: number }>;
      topCompanies: Array<{ _id: string; count: number }>;
    };
    ongoing: {
      total: number;
      byEmploymentType: Record<string, number>;
      byJobType: Record<string, number>;
      topTitles: Array<{ _id: string; count: number }>;
      topLocations: Array<{ _id: string; count: number }>;
      topCompanies: Array<{ _id: string; count: number }>;
    };
  };
  education: {
    all: {
      total: number;
      topDegrees: Array<{ _id: string; count: number }>;
      topFields: Array<{ _id: string; count: number }>;
      topSchools: Array<{ _id: string; count: number }>;
      topLocations: Array<{ _id: string; count: number }>;
    };
    ongoing: {
      total: number;
      topDegrees: Array<{ _id: string; count: number }>;
      topFields: Array<{ _id: string; count: number }>;
      topSchools: Array<{ _id: string; count: number }>;
      topLocations: Array<{ _id: string; count: number }>;
    };
  };
  locations: {
    topCities: Array<{ _id: string; count: number }>;
    topCountries: Array<{ _id: string; count: number }>;
  };
}
