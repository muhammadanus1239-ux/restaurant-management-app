import { users } from "@/data/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => User | null;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "@restaurant_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load logged-in user when app starts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.log("Load User Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (email: string, password: string) => {
    const found = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!found) {
      return null;
    }

    setUser(found);

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(found)).catch((error) => {
      console.log("Save User Error:", error);
    });

    return found;
  };

  const logout = async () => {
    setUser(null);

    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
