export type University = "UNICAMP" | "UNIFEI";
export type Other = "Udacity" | "Oracle";
export type Company = "Red Hat" | "Samsung" | "iFood" | "Motorola" | "B2ML Systems";

export interface Journey {
  title: string;
  period: {
    start: number;
    end?: number | "Present";
  };
  location: University | Other | Company;
}
