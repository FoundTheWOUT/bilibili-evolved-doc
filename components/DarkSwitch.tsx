import React from "react";
import cn from "classnames";
import { Themes, useTheme } from "./ThemeProvider";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

const DarkSwitch = ({ className }: { className?: string }) => {
  const { theme, setDarkMode, setLightMode } = useTheme();

  return (
    <div
      className={cn(
        "flex justify-center items-center h-full w-8 cursor-pointer",
        className
      )}
    >
      <div className="h-6">
        {theme === Themes.DARK ? (
          <SunIcon
            className="h-full text-white"
            onClick={() => setLightMode()}
          />
        ) : (
          <MoonIcon className="h-full" onClick={() => setDarkMode()} />
        )}
      </div>
    </div>
  );
};

export default DarkSwitch;
