import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used inside ThemeProvider");
  }
  return context;
}
