import React from "react";
import { RouteItem } from ".";
import cn from "classnames";
import Link, { LinkProps } from "next/link";

interface SideBarItemProps {
  route: RouteItem;
  selected: string;
  level: number;
}

interface ItemProps extends LinkProps {
  title: string;
  level: number;
  selected?: boolean;
  selectable?: boolean;
}

const StyledLink = ({
  title,
  level,
  selected,
  selectable = true,
  ...rest
}: ItemProps) => {
  return (
    <Link
      className={cn("my-1 block rounded px-4 py-2 transition dark:text-white", {
        "hover:bg-sky-100 dark:hover:bg-opacity-25": selectable && !selected,
        "font-bold": level === 0,
        "ml-2": level === 1,
        "ml-4": level === 2,
        "bg-sky-200 text-sky-700 dark:bg-sky-700 dark:text-sky-200": selected,
      })}
      {...rest}
    >
      {title}
    </Link>
  );
};

const SideBarItem = ({ route, selected, level }: SideBarItemProps) => {
  return (
    <>
      {route.path && (
        <StyledLink
          key={route.title}
          href={route.path}
          title={route.title}
          level={level}
          selected={selected === route.path}
        />
      )}
    </>
  );
  // return Linkable(
  //   <Item
  //     title={route.title}
  //     level={level}
  //     selected={selected === route.path}
  //   />,
  //   route
  // );
};

export default SideBarItem;
