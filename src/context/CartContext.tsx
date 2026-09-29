import { CartItem, cartReducer } from "@/reducers/cartReducer";
import { createContext, ReactNode, useReducer } from "react";

type CartContextType = {
  items: CartItem[];
  addItem: (item: { id: string; name: string; price: number }) => void;
  removeItem: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const addItem = (item: { id: string; name: string; price: number }) =>
    dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (id: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  const increase = (id: string) =>
    dispatch({ type: "INCREASE", payload: { id } });
  const decrease = (id: string) =>
    dispatch({ type: "DECREASE", payload: { id } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        increase,
        decrease,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
