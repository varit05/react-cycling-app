export interface Icycling {
  id?: string;
  ActivityType: string;
  Date: Date | string;
  Title: string;
  Distance: number;
  Calories: number | string;
  Time: string;
  AvgSpeed: number;
  MaxSpeed: number;
  ElevGain: number | string;
  ElevLoss: number | string;
  BestLapTime: string;
  NumberofLaps: number;
  MaxTemp: number;
}
