import React from "react";
import Link from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";

const DocType = ({ ...props }) => {
  const { pathname } = useRouter();

  const style = (type: string) => {
    return cn("z-50 flex-1 text-center rounded-md cursor-pointer", {
      "bg-sky-200 dark:bg-sky-700 text-sky-700 dark:text-sky-200 font-bold":
        pathname.match(type),
    });
  };

  return (
    <div {...props}>
      <Link href="/user" passHref>
        <div className={style("user")}>
          <span>用户手册</span>
        </div>
      </Link>
      <Link href="/developer" passHref>
        <div className={style("developer")}>
          <span>开发文档</span>
        </div>
      </Link>
    </div>
  );
};

export default DocType;
