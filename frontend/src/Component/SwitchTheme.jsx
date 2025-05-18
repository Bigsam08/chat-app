import { useState } from "react";
import useThemeStore from "../Store/ThemeStore";
import { SwatchIcon  } from "@heroicons/react/24/outline";

const themes = ["purple", "snow", "darkie"];

const SwitchTheme = () => {
  const { theme, setTheme } = useThemeStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 px-4 py-2  text-main rounded hover:scale-90"
      >
        <SwatchIcon className="h-6 w-6" /> {theme}
      </button>

      {open && (
        <div className="absolute right-0 mt-5 w-40 px-1 rounded-md shadow-lg bg-white/10 backdrop-blur-md z-50">
          <ul className="py-1">
            {themes.map((t) => (
              <li key={t}>
                <button
                  onClick={() => {
                    setTheme(t);
                    setOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left ${
                    theme === t
                      ? " font-semibold shadow-lg"
                      : "hover:bg-gray-100 dark:hover:bg-gray-500"
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SwitchTheme;
