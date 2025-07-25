export interface EventsAnalytics {
  total: number;
  future: number;
  past: number;
  typeStats: Record<string, number>;
  timeseries: Array<{
    monthYear: string;
    total: number;
    typeStats: Record<string, number>;
  }>;
}
