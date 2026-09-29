import { CartItem } from "@/reducers/cartReducer";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: "Preparing" | "On the way" | "Delivered";
  createdAt: string;
};

export type OrdersAction =
  | { type: "PLACE_ORDER"; payload: Order }
  | { type: "UPDATE_STATUS"; payload: { id: string; status: Order["status"] } };

export function ordersReducer(state: Order[], action: OrdersAction): Order[] {
  switch (action.type) {
    case "PLACE_ORDER":
      return [action.payload, ...state];
    case "UPDATE_STATUS":
      return state.map((o) =>
        o.id === action.payload.id
          ? { ...o, status: action.payload.status }
          : o,
      );
    default:
      return state;
  }
}
