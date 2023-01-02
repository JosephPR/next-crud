// import Navbar from './navbar'
// import Footer from './footer'
import Head from "next/head";
import { Exo } from "@next/font/google";

const exo = Exo({ weight: ["400", "700"] });

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Next Crud</title>
        <meta property="og:title" content="Next Crud" key="title" />
      </Head>
      <div className={exo.className}>
        <main className="max-w-6xl m-auto">{children}</main>
      </div>
    </>
  );
}
