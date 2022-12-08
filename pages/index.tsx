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
}: PropsWithChildren<{ show: boolean }>) => (
  <Transition
    className="absolute "
    show={show}
    enterFrom="opacity-0 -translate-x-10"
    enterTo="opacity-100 translate-x-0"
    enter="transition duration-300"
    leaveFrom="opacity-100 translate-x-0"
    leaveTo="opacity-0 -translate-x-10"
    leave="transition duration-300"
  >
    {children}
  </Transition>
);

const Home: NextPage = () => {
  const [activeTab, setTab] = useState(0);
  const { theme, setDarkMode, setLightMode } = useTheme();

  return (
    <div className="px-5">
      <Head>
        <title>欢迎o(*￣▽￣*)ブ</title>
      </Head>

      <div className="flex lg:px-32">
        {/* left */}
        <div className="h-screen w-[46rem] sticky top-0 hidden xl:flex items-center light-up">
          <StyledTransition show={activeTab !== 2 && theme == Themes.LIGHT}>
            {/* light */}
            <Image
              className="rounded-xl"
              src="/images/index/image-0.png"
              alt="img"
              width={321}
              height={911}
            />
          </StyledTransition>

          <StyledTransition show={activeTab !== 2 && theme == Themes.DARK}>
            {/* dark */}
            <Image
              className="absolute top-20 left-32 rounded-lg"
              src="/images/index/bilibili-dark.png"
              alt=""
              height={222}
              width={321}
            />
            <Image
              className="rounded-xl"
              src="/images/index/image-dark-0.png"
              alt="img"
              width={321}
              height={951}
            />
          </StyledTransition>

          <StyledTransition show={activeTab == 2}>
            <Image className="rounded-xl" src={freshHome} alt="" />
            <Link
              href="/docs/user/features#清爽首页"
              className="btn w-fit px-4 py-2 mt-4 mx-auto"
            >
              了解更多
            </Link>
          </StyledTransition>
        </div>

        {/* right */}
        <main className="z-10 flex-1">
          {/* page1 */}
          <section className="h-screen flex-center flex-col">
            <div className="flex flex-col">
              <span className="font-bold text-MAIN text-7xl">
                BiliBili-Evolved
              </span>
              <span className="font-bold text-lg mt-4 dark:text-white">
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
          <section className="h-screen flex-center max-w-xl flex-col mx-auto">
            <span className="font-bold text-MAIN text-2xl mr-auto">我们有</span>
            <div className="w-full border-MAIN/30 border-b-2 my-4"></div>
            <div className="w-full grid gap-5 lg:grid-cols-2">
              {tabs.map((item, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-40 border-4 rounded-xl p-4 lg:p-14 flex justify-center flex-col cursor-pointer transition",
                    {
                      "border-MAIN/30": idx !== 3 && activeTab !== idx,
                      "border-MAIN shadow-lg shadow-MAIN/30":
                        idx !== 3 && activeTab === idx,
                      "border-stone-500 bg-black text-white": idx === 3,
                    }
                  )}
                  onClick={() => {
                    setTab(idx);
                    if (idx === 3) {
                      theme == Themes.DARK ? setLightMode() : setDarkMode();
                    }
                  }}
                >
                  <span
                    className={cn("font-bold text-lg", {
                      "text-MAIN": idx !== 3,
                    })}
                  >
                    {item.title}
                  </span>
                  <p className="text-sm dark:text-white">{item.content}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* footer */}
      <section className="h-screen lg:mx-auto mt-56">
        <div className="translate-y-1/2 flex-center flex-col max-w-7xl bg-[#F19953] rounded-lg mx-auto py-20">
          <span className="font-bold text-white text-4xl">社区支持</span>
          <Link href="/docs/developer" legacyBehavior>
            <a
              className="mt-8 px-4 py-2 rounded-xl 
            bg-[#EDF7F6] shadow-lg shadow-[#EDF7F6]/50 active:shadow-none transition-shadow
              text-lg font-bold text-[#2660A4]"
            >
              参与开发
            </a>
          </Link>
          {/* TODO: replace with Github API */}
          <Image
            className="mt-10"
            src="https://contrib.rocks/image?repo=the1812/Bilibili-Evolved"
            alt=""
            height={132}
            width={812}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
