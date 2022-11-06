import React from "react";
import Link from "next/link";
import Image from "next/image";

const Title = ({ ...props }) => {
  return (
    <div {...props}>
      <Link href="/" legacyBehavior>
        <a className="flex justify-center items-center">
          <Image
            className="cursor-pointer"
            src="/icon.svg"
            alt="Bilibili-Evolved"
            width={30}
            height={30}
          />
        </a>
      </Link>
      <span className="font-bold dark:text-white">BiliBili-Evolved 指南</span>
    </div>
  );
};

export default Title;
