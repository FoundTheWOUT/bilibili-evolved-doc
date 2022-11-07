/* eslint-disable @next/next/no-img-element */
import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import cn from "classnames";
import { Themes, useTheme } from "components/ThemeProvider";
import { Octokit } from "octokit";
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
    content: "🚧WIP",
  },
  {
    title: "黑暗主题",
    content: "我们提供啊B定制化黑暗主题，保护夜里在B站冲浪的你",
  },
];
const Home: NextPage = () => {
  // console.log(collaborators);
  const [activeTab, setTab] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const { theme, setDarkMode, setLightMode } = useTheme();

  return (
    <div className="px-5">
      <Head>
        <title>欢迎o(*￣▽￣*)ブ</title>
      </Head>

      <div className="flex lg:px-32 pt-4">
        <div className="h-full sticky top-4 hidden xl:block">
          <div
            className="absolute"
            style={{
              left: "-100px",
              top: "-50px",
              width: "640px",
              height: "1024px",
              background: "rgba(27, 178, 237, 0.3)",
              filter: "blur(200px)",
              borderRadius: "200px",
            }}
          ></div>
          <div className="relative">
            <img
              className={cn("absolute top-5 rounded-lg transition opacity-0", {
                "translate-x-40 opacity-100": theme == Themes.DARK,
              })}
              src="/images/index/bilibili-dark.png"
              alt=""
            />
            <img
              className={cn(
                "rounded-xl transition h-[90vh] origin-bottom-left object-contain",
                {
                  "rotate-0": theme == Themes.LIGHT,
                  "-rotate-12": theme == Themes.DARK,
                }
              )}
              src={
                theme == Themes.DARK
                  ? tabs[activeImage].img!.dark
                  : tabs[activeImage].img!.light
              }
              alt="img"
              width={322}
            />
          </div>
        </div>

        <main className="flex-1 z-10">
          {/* page1 */}
          <section className="h-screen flex-center flex-col">
            <div className="flex flex-col">
              <span className="font-bold text-MAIN text-7xl">
                BiliBili-Evolved
              </span>
              <span className="font-bold text-lg mt-4 dark:text-white">
                给你足够多，足够强大的功能
              </span>
              <Link href="/docs/user/install" legacyBehavior>
                <a className="flex-center mt-8 h-[60px] w-[120px] rounded-xl bg-MAIN shadow-lg shadow-MAIN/50 active:shadow-none transition-shadow text-lg font-bold text-white">
                  立刻尝试
                </a>
              </Link>
            </div>
          </section>

          {/* page2 */}
          <section className="h-screen w-full max-w-[40rem] flex-center flex-col mx-auto">
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
                    if (idx === 2) return;
                    if (idx === 3) {
                      theme == Themes.DARK ? setLightMode() : setDarkMode();
                    } else {
                      setActiveImage(idx);
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
          <img
            className="mt-10"
            src="https://contrib.rocks/image?repo=the1812/Bilibili-Evolved"
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
