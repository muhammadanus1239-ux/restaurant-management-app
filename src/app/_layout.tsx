import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrdersProvider } from "@/context/OrdersContext";
import { ReservationsProvider } from "@/context/ReservationsContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useAuth } from "@/hooks/useAuth";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

function AppNavigator() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inManager = segments[0] === "(manager)";
    const inCustomer = segments[0] === "(customer)";
    const inLogin = segments[0] === "login";

    // Not logged in
    if (!user) {
      if (inManager || inCustomer) {
        router.replace("/login");
      }
      return;
    }

    // Logged-in manager
    if (user.role === "manager") {
      if (inLogin || inCustomer) {
        router.replace("/dashboard");
      }
      return;
    }

    // Logged-in customer
    if (user.role === "customer") {
      if (inLogin || inManager) {
        router.replace("/menu");
      }
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <OrdersProvider>
            <ReservationsProvider>
              <AppNavigator />
            </ReservationsProvider>
          </OrdersProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
