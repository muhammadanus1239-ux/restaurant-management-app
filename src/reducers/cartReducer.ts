export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type CartAction =
  | { type: "ADD_ITEM"; payload: { id: string; name: string; price: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "INCREASE"; payload: { id: string } }
  | { type: "DECREASE"; payload: { id: string } }
  | { type: "CLEAR_CART" };

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((i) => i.id === action.payload.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter((i) => i.id !== action.payload.id);
    case "INCREASE":
      return state.map((i) =>
        i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i,
      );
    case "DECREASE":
      return state
        .map((i) =>
          i.id === action.payload.id ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}
