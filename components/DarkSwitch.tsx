import React from "react";
import cn from "classnames";
import { useTheme } from "./ThemeProvider";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

const DarkSwitch = ({ className }: { className?: string }) => {
  const { setDarkMode, setLightMode } = useTheme();

  return (
    <div
      className={cn(
        "flex h-full w-8 cursor-pointer items-center justify-center",
        className
      )}
    >
      <div className="h-6">
        <SunIcon
          className="hidden h-full text-white dark:inline"
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
