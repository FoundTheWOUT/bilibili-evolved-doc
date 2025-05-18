import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import cn from "classnames";
import { Themes, useTheme } from "components/ThemeProvider";
import { Transition } from "@headlessui/react";
import freshHome from "../public/images/index/fresh-home.png";

// deploy
const tabs = [
  {
    title: "自由组合",
    content: "近百种组件，总有适合你的，下载它们组合出只属于你的应用吧",
    img: {
      light: "/images/index/image-0.png",
      dark: "/images/index/image-dark-0.png",
    },
  },
  {
    title: "自由开关",
    content: "每个组件随时随地，开谁关谁你说了算。",
    img: {
      light: "/images/index/image.png",
      dark: "/images/index/image-dark.png",
    },
  },
  {
    title: "清爽首页",
    content: "使用重新设计的清爽风格首页替换原本的首页",
  },
  {
    title: "黑暗主题",
    content: "我们提供啊B定制化黑暗主题，保护夜里在B站冲浪的你",
  },
];

const StyledTransition = ({
  children,
  show,
  className = "",
}: PropsWithChildren<{ show: boolean; className?: string }>) => (
  <Transition
    className={cn("absolute", className)}
    show={show}
    enterFrom="opacity-0 -translate-x-10"
    enterTo="opacity-100 translate-x-0"
    enter="transition duration-300"
    leaveFrom="opacity-100 translate-x-0"
    leaveTo="opacity-0 -translate-x-10"
    leave="transition duration-300"
    appear={true}
    unmount={false}
  >
    {children}
  </Transition>
);

const Home: NextPage<{ contributors: any[] }> = ({ contributors }) => {
  const [activeTab, setTab] = useState(0);
  const { theme, setDarkMode, setLightMode } = useTheme();
  return (
    <div className="px-5">
      <Head>
        <title>欢迎o(*￣▽￣*)ブ</title>
      </Head>

      <div className="flex gap-2 lg:px-32">
        {/* left */}
        <div className="light-up sticky top-0 hidden h-screen w-184 items-center xl:flex">
          {/* light */}
          <StyledTransition show={activeTab === 0 || activeTab === 1}>
            <Image
              className="rounded-xl dark:hidden"
              src="/images/index/image-0.png"
              alt="img"
              width={321}
              height={911}
            />
            <Image
              className="absolute top-20 left-32 hidden rounded-lg dark:block"
              src="/images/index/bilibili-dark.png"
              alt=""
              height={222}
              width={321}
            />
            <Image
              className="hidden rounded-xl dark:block"
              src="/images/index/image-dark-0.png"
              alt="img"
              width={321}
              height={951}
            />
          </StyledTransition>

          <StyledTransition show={activeTab == 2}>
            <Image
              placeholder="blur"
              className="rounded-xl"
              src={freshHome}
              alt=""
            />
            <Link
              href="/docs/user/features#清爽首页"
              className="btn mx-auto mt-4 w-fit px-4 py-2"
            >
              了解更多
            </Link>
          </StyledTransition>
        </div>

        {/* right */}
        <main className="z-10 flex-1">
          {/* page1 */}
          <section className="flex-center h-screen flex-col">
            <div className="flex flex-col">
              <span className="text-7xl font-bold text-main">
                BiliBili-Evolved
              </span>
              <span className="mt-4 text-lg font-bold dark:text-white">
                给你足够多，足够强大的功能
              </span>
              <Link
                href="/docs/user/install"
                className="btn mt-8 w-fit p-4 text-lg font-bold"
              >
                立刻尝试
              </Link>
            </div>
          </section>

          {/* page2 */}
          <section className="flex-center mx-auto h-screen max-w-xl flex-col">
            <span className="mr-auto text-2xl font-bold text-main">我们有</span>
            <div className="my-4 w-full border-b-2 border-main/30"></div>
            <div className="grid w-full gap-5 lg:grid-cols-2">
              {tabs.map((item, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex h-40 cursor-pointer flex-col rounded-xl border-4 px-16 transition xl:px-6 2xl:px-14",
                    {
                      "border-main/30": idx !== 3 && activeTab !== idx,
                      "border-main shadow-lg shadow-main/30":
                        idx !== 3 && activeTab === idx,
                      "border-stone-500 bg-black text-white": idx === 3,
                    }
                  )}
                  onClick={() => {
                    if (idx === 3) {
                      theme == Themes.DARK ? setLightMode() : setDarkMode();
                    } else {
                      setTab(idx);
                    }
                  }}
                >
                  <span
                    className={cn("flex basis-1/3 items-end font-bold", {
                      "text-main": idx !== 3,
                    })}
                  >
                    {item.title}
                  </span>
                  <p className="text-ellipsis text-sm dark:text-white">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* footer */}
      <section className="mt-56 h-screen lg:mx-auto">
        <div className="flex-center mx-auto max-w-7xl translate-y-1/2 flex-col gap-12 rounded-lg bg-[#F19953] py-20">
          <span className="text-4xl font-bold text-white">社区支持</span>
          <Link
            href="/docs/developer"
            className="rounded-xl bg-[#EDF7F6] px-4 
            py-2 text-lg font-bold text-[#2660A4] shadow-lg
              shadow-[#EDF7F6]/50 transition-shadow active:shadow-none"
          >
            参与开发
          </Link>
          <div className="mx-12 flex flex-wrap justify-around gap-4">
            {contributors.map((contributor, idx) => (
              <Link
                href={contributor.html_url}
                target="_blank"
                className="flex gap-1 rounded-xl bg-[#EDF7F6] p-2 transition-shadow hover:shadow-lg hover:shadow-[#EDF7F6]/50"
                key={idx}
              >
                <Image
                  src={contributor.avatar_url}
                  className="rounded-full"
                  height={44}
                  width={44}
                  alt=""
                />
                <div className="flex flex-col">
                  <span className="font-extrabold text-[#2660A4]">
                    {contributor.login}
                  </span>
                  <span className="text-sm text-[#2660A4]/70">
                    贡献 {contributor.contributions}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getStaticProps() {
  let contributors = [];
  try {
    contributors = await fetch(
      "https://api.github.com/repos/the1812/Bilibili-Evolved/contributors"
    ).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      contributors,
    }, // will be passed to the page component as props
  };
}

export default Home;
