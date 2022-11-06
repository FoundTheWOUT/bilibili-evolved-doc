import React from "react";
import Link from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";

const DocType = ({ ...props }) => {
  const {
    query: { slug },
  } = useRouter();

  const style = (type: string) => {
    return cn("z-50 flex-1 text-center rounded-md cursor-pointer", {
      "bg-sky-200 dark:bg-sky-700 text-sky-700 dark:text-sky-200 font-bold":
        slug && slug.includes(type),
    });
  };

  return (
    <div {...props}>
      <Link href="/docs/user" legacyBehavior>
        <a className={style("user")}>用户手册</a>
      </Link>
      <Link href="/docs/developer" legacyBehavior>
        <a className={style("developer")}>开发文档</a>
      </Link>
    </div>
  );
};

export default DocType;
