import React from "react";
import { MenuAlt2Icon } from "@heroicons/react/solid";
import DarkSwitch from "./DarkSwitch";
import Title from "./Title";
import { SidebarContext } from "./SideBar";

const NavBar = () => {
  const { showSidebar, hidden, hideSidebar } = React.useContext(SidebarContext);
  return (
    <div className="h-14 border-b lg:border-none sticky top-0 backdrop-blur mb-2 lg:backdrop-blur-none z-50 lg:z-0">
      <div className="lg:hidden h-full flex items-center">
        <div className="h-full w-14 flex items-center justify-center">
          <MenuAlt2Icon
            className="h-6 dark:text-white"
            onClick={() => (hidden ? showSidebar() : hideSidebar())}
          />
        </div>
        <Title className="flex-1 flex items-center justify-center" />
        <div className="w-14 flex justify-center">
          <DarkSwitch />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
