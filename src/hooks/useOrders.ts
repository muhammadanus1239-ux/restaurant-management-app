import { OrdersContext } from "@/context/OrdersContext";
import { useContext } from "react";

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used inside OrdersProvider");
  }
  return context;
}
