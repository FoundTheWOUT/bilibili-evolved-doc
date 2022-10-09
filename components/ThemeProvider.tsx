import React, {
  PropsWithChildren,
  useState,
  useContext,
  useEffect,
} from "react";

type ThemeProps = PropsWithChildren<{
  className?: string;
}>;

declare global {
  interface Window {
    __set_theme_dark: () => void;
    __set_theme_light: () => void;
  }
}

export enum Themes {
  DARK = "dark",
  LIGHT = "light",
}

export const ThemeContext = React.createContext({
  setDarkMode: () => {},
  setLightMode: () => {},
  theme: Themes.LIGHT,
});

const STORAGE_THEME_KEY = "bv-doc-theme";

export const ThemeProvider = ({ children }: ThemeProps) => {
  const [theme, setTheme] = useState(() => {
    return (process as any).browser
      ? (localStorage.getItem(STORAGE_THEME_KEY) as Themes)
      : Themes.LIGHT;
  });

  function setHtmlMode(theme: Themes) {
    Object.values(Themes)
      .filter((v) => v !== theme)
      .forEach((v) => document.documentElement.classList.remove(v));

    document.documentElement.classList.add(theme);
  }

  function setThemeMode(theme: Themes) {
    setTheme(theme);
    setHtmlMode(theme);
    localStorage.setItem(STORAGE_THEME_KEY, theme);
  }

  useEffect(() => {
    window.__set_theme_dark = () => setThemeMode(Themes.DARK);
    window.__set_theme_light = () => setThemeMode(Themes.LIGHT);
  });

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setDarkMode: () => setThemeMode(Themes.DARK),
        setLightMode: () => setThemeMode(Themes.LIGHT),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
