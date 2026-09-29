import { CartItem } from "@/reducers/cartReducer";
import { Order, ordersReducer } from "@/reducers/ordersReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    ReactNode,
    useEffect,
    useReducer,
    useState,
} from "react";

type OrdersContextType = {
  orders: Order[];
  placeOrder: (items: CartItem[], total: number) => Order;
  updateStatus: (id: string, status: Order["status"]) => void;
};

export const OrdersContext = createContext<OrdersContextType | null>(null);

const ORDERS_STORAGE_KEY = "@restaurant_orders";

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, dispatch] = useReducer(ordersReducer, []);
  const [loaded, setLoaded] = useState(false);

  // Load saved orders when app starts
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const savedOrders = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);

        if (savedOrders) {
          const parsedOrders: Order[] = JSON.parse(savedOrders);

          parsedOrders.forEach((order) => {
            dispatch({
              type: "PLACE_ORDER",
              payload: order,
            });
          });
        }
      } catch (error) {
        console.log("Load Orders Error:", error);
      } finally {
        setLoaded(true);
      }
    };

    loadOrders();
  }, []);

  // Save orders whenever they change
  useEffect(() => {
    if (!loaded) return;

    const saveOrders = async () => {
      try {
        await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
      } catch (error) {
        console.log("Save Orders Error:", error);
      }
    };

    saveOrders();
  }, [orders, loaded]);

  const placeOrder = (items: CartItem[], total: number): Order => {
    const order: Order = {
      id: Date.now().toString(),
      items: [...items],
      total,
      status: "Preparing",
      createdAt: new Date().toLocaleString(),
    };

    dispatch({
      type: "PLACE_ORDER",
      payload: order,
    });

    return order;
  };

  const updateStatus = (id: string, status: Order["status"]) => {
    dispatch({
      type: "UPDATE_STATUS",
      payload: {
        id,
        status,
      },
    });
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        placeOrder,
        updateStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
