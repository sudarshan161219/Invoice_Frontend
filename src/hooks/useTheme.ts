// import { useEffect, useState } from "react";

// export function useTheme() {
//   const [theme, setTheme] = useState<"light" | "dark">(() => {
//     if (typeof window === "undefined") return "light";
//     return localStorage.getItem("theme") as "dark" | "light" ??
//       (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
//   });

//   useEffect(() => {
//     const root = document.documentElement;
//     if (theme === "dark") {
//       root.classList.add("dark");
//     } else {
//       root.classList.remove("dark");
//     }
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () =>
//     setTheme((prev) => (prev === "dark" ? "light" : "dark"));

//   return { theme, toggleTheme };
// }

import { useContext } from "react";
import { ThemeContext } from "@/context/theme-context";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
