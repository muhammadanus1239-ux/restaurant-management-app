import { Reservation } from "@/data/reservations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

type ReservationsContextType = {
  reservations: Reservation[];

  addReservation: (
    reservation: Omit<Reservation, "id" | "createdAt" | "status">,
  ) => Promise<Reservation>;

  updateReservationStatus: (
    id: string,
    status: Reservation["status"],
  ) => Promise<void>;

  isTableAvailable: (
    tableId: string,
    date: string,
    time: string,
    excludeReservationId?: string,
  ) => boolean;
};

const ReservationsContext = createContext<ReservationsContextType | null>(null);

const STORAGE_KEY = "@restaurant_reservations";

export function ReservationsProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);

        if (saved) {
          setReservations(JSON.parse(saved));
        }
      } catch (error) {
        console.log("Load Reservations Error:", error);
      } finally {
        setLoaded(true);
      }
    };

    loadReservations();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const saveReservations = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
      } catch (error) {
        console.log("Save Reservations Error:", error);
      }
    };

    saveReservations();
  }, [reservations, loaded]);

  // Check whether a table is already booked
  const isTableAvailable = (
    tableId: string,
    date: string,
    time: string,
    excludeReservationId?: string,
  ) => {
    const normalizedDate = date.trim().toLowerCase();
    const normalizedTime = time.trim().toLowerCase();

    const alreadyBooked = reservations.some((reservation) => {
      if (reservation.id === excludeReservationId) {
        return false;
      }

      if (reservation.status === "Cancelled") {
        return false;
      }

      const sameTable = reservation.tableId === tableId;

      const sameDate = reservation.date.trim().toLowerCase() === normalizedDate;

      const sameTime = reservation.time.trim().toLowerCase() === normalizedTime;

      return sameTable && sameDate && sameTime;
    });

    return !alreadyBooked;
  };

  // Add reservation
  const addReservation = async (
    data: Omit<Reservation, "id" | "createdAt" | "status">,
  ) => {
    const available = isTableAvailable(data.tableId, data.date, data.time);

    if (!available) {
      throw new Error(
        "This table is already reserved for the selected date and time.",
      );
    }

    const reservation: Reservation = {
      ...data,
      id: Date.now().toString(),
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    setReservations((current) => [reservation, ...current]);

    return reservation;
  };

  // Update reservation status
  const updateReservationStatus = async (
    id: string,
    status: Reservation["status"],
  ) => {
    setReservations((current) =>
      current.map((reservation) =>
        reservation.id === id ? { ...reservation, status } : reservation,
      ),
    );
  };

  return (
    <ReservationsContext.Provider
      value={{
        reservations,
        addReservation,
        updateReservationStatus,
        isTableAvailable,
      }}
    >
      {children}
    </ReservationsContext.Provider>
  );
}

export function useReservations() {
  const context = useContext(ReservationsContext);

  if (!context) {
    throw new Error("useReservations must be used inside ReservationsProvider");
  }

  return context;
}
