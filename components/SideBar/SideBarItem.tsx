import React, { useContext } from "react";
import { RouteItem, SidebarContext } from ".";
import cn from "classnames";
import Linkable from "../HOC/Linkable";

interface SideBarItemProps {
  route: RouteItem;
  selected: string;
  level: number;
}

interface ItemProps {
  title: string;
  level: number;
  selected?: boolean;
  selectable?: boolean;
  href?: string;
}

const Item = ({
  title,
  level,
  selected,
  selectable = true,
  ...rest
}: ItemProps) => {
  const { hideSidebar } = useContext(SidebarContext);
  return (
    <a
      className={cn("px-4 py-2 my-1 rounded dark:text-white transition block", {
        "hover:bg-sky-100 dark:hover:bg-opacity-25": selectable && !selected,
        "font-bold": level === 0,
        "ml-2": level === 1,
        "ml-4": level === 2,
        "bg-sky-200 dark:bg-sky-700 text-sky-700 dark:text-sky-200": selected,
      })}
      onClick={() => hideSidebar()}
      {...rest}
    >
      {title}
    </a>
  );
};

const SideBarItem = ({ route, selected, level }: SideBarItemProps) => {
  return Linkable(
    <Item
      title={route.title}
      level={level}
      selected={selected === route.path}
    />,
    route
  );
};

export default SideBarItem;
