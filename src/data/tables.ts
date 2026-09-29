export type Table = {
  id: string;
  name: string;
  seats: number;
  location: "Indoor" | "Outdoor";
  available: boolean;
};

export const tables: Table[] = [
  {
    id: "T1",
    name: "Table 1",
    seats: 2,
    location: "Indoor",
    available: true,
  },
  {
    id: "T2",
    name: "Table 2",
    seats: 2,
    location: "Indoor",
    available: true,
  },
  {
    id: "T3",
    name: "Table 3",
    seats: 4,
    location: "Indoor",
    available: true,
  },
  {
    id: "T4",
    name: "Table 4",
    seats: 4,
    location: "Outdoor",
    available: true,
  },
  {
    id: "T5",
    name: "Table 5",
    seats: 6,
    location: "Outdoor",
    available: true,
  },
  {
    id: "T6",
    name: "Table 6",
    seats: 8,
    location: "Indoor",
    available: true,
  },
];
