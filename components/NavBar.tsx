import React from "react";
import { MenuAlt2Icon } from "@heroicons/react/solid";
import DarkSwitch from "./DarkSwitch";
import Title from "./Title";
import { SidebarContext } from "./SideBar";

const NavBar = () => {
  const { showSidebar, hidden, hideSidebar } = React.useContext(SidebarContext);
  return (
    <div className="sticky top-0 z-50 mb-2 h-14 border-b backdrop-blur lg:z-0 lg:border-none lg:backdrop-blur-none">
      <div className="flex h-full items-center lg:hidden">
        <div className="flex h-full w-14 items-center justify-center">
          <MenuAlt2Icon
            className="h-6 dark:text-white"
            onClick={() => (hidden ? showSidebar() : hideSidebar())}
          />
        </div>
        <Title className="flex flex-1 items-center justify-center" />
        <div className="flex w-14 justify-center">
          <DarkSwitch />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
