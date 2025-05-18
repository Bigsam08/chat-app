/**
 * theme store to handle theme changes across all pages
 * theme: the default theme
 * toggleTheme: a function that changes the theme reseting the theme dynamically
 */

import { create } from "zustand";


const themes = ["purple", "snow", "dark"];
const defaultTheme = localStorage.getItem("theme") || "purple"; // check if the user has a theme picked from the local storage

const useThemeStore = create((set) => ({
    theme: defaultTheme, // default theme

    // function to switch themes
    toggleTheme: () =>
        set((state) => {
            const currentIndex = themes.indexOf(state.theme);
            const nextTheme = themes[(currentIndex + 1) % themes.length];
            return { theme: nextTheme };
        }),
    // pick your preferred theme
    setTheme: (theme) => {
        localStorage.setItem("theme", theme);
        set({ theme });
    },
}));

export default useThemeStore;