import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:text-white">
      <Head>
        <title>欢迎o(*￣▽￣*)ブ</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-5xl lg:text-6xl font-bold ">
          欢迎使用{" "}
          <a href="https://github.com/the1812/Bilibili-Evolved">
            {/* Bilibili-Evolved */}
            <Image
              src="/bilibili-evolved.svg"
              alt="Bilibili-Evolved"
              width={500}
              height={60}
            />
          </a>
        </h1>

        {/* <p className="mt-3 text-2xl">
          Get started by editing{" "}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            pages/index.js
          </code>
        </p> */}

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Link href="/user" passHref>
            <div className="index-card shadow-runner">
              <div className="index-cark-box-shadow"></div>
              <div className="text-[5rem] lg:text-[12rem]">📚</div>
              <h3 className="lg:text-2xl font-bold text-center">我是使用者</h3>
            </div>
          </Link>

          <a href="/developer" className="index-card">
            <div className="text-[5rem] lg:text-[12rem]">💻</div>
            <h3 className="lg:text-2xl font-bold mt-auto">我是开发者</h3>
          </a>
        </div>
      </main>

      {/* <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer> */}
    </div>
  );
};

export default Home;
