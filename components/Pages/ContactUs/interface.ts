export interface ContactUsAnalytics {
  total: number;
  resolved: number;
  unresolved: number;
  timeseries: Array<{
    date: string;
    count: number;
    resolved: number;
    unresolved: number;
  }>;
}

export interface ContactUs {
  id: string;
  user: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  resolved: boolean;
  resolutionMessage?: string;
  createdAt: Date;
}

export interface ContactUsFilters {
  search?: string;
  page?: string;
  limit?: string;
  startDate?: string;
  endDate?: string;
  resolved?: string;
}
