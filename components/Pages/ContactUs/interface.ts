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
