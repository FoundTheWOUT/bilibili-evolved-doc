import React from "react";
import cn from "classnames";
import { useTheme } from "./ThemeProvider";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

const DarkSwitch = ({ className }: { className?: string }) => {
  const { setDarkMode, setLightMode } = useTheme();

  return (
    <div
      className={cn(
        "flex justify-center items-center h-full w-8 cursor-pointer",
        className
      )}
    >
      <div className="h-6">
        <SunIcon
          className="h-full text-white hidden dark:inline"
          onClick={() => setLightMode()}
        />
        <MoonIcon
          className="h-full dark:hidden"
          onClick={() => setDarkMode()}
        />
      </div>
    </div>
  );
};

export default DarkSwitch;
