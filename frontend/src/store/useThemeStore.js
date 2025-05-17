// GLOBAL STATE MANAGEMENT
import { create } from "zustand";

// Set for setter
// Get for getter
export const useThemeStore = create((set) => ({
  // STATE
  theme: localStorage.getItem("preferred-theme") || "forest",
  // ACTION
  setTheme: (theme) => {
    localStorage.setItem("preferred-theme", theme);
    set({ theme: theme });
  },
}));
