import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return <View style={{ flex: 1 }} />;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Redirect href={user.role === "manager" ? "/dashboard" : "/menu"} />;
}
