export interface Journey {
  title: string;
  period: {
    start: string;
    end?: string;
  };
  location: string;
}
