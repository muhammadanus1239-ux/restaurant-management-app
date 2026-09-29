
export type Reservation = {
  id: string;
  customerName: string;
  date: string;
  time: string;
  guests: number;
  tableId: string;
  tableName: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
};

export const reservations: Reservation[] = [];
