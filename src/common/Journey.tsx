export interface Location {
  name: string;
  url: string;
}

export interface Journey {
  title: string;
  period: {
    start: number;
    end?: number | "Present";
  };
  location: Location;
}
