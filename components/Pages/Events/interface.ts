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

export interface Event {
  id: string;
  name: string;
  dateTime: Date;
  endDateTime?: Date;
  venue: string;
  description: string;
  content: {
    title: string;
    description: string;
  };
  imageUrl?: string;
  links?: string[];
  type: string;
  postedBy: {
    name: string;
    collegeEmail: string;
    personalEmail: string;
    id: string;
  };
}

export interface EventFilters {
  page?: string;
  limit?: string;
  search?: string;
  startMonthYear?: string;
  endMonthYear?: string;
  type?: string;
}
