import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";

const Projects: NextPage = () => {
  return (
    <div className="h-screen bg-[#ebebeb] dark:bg-slate-800">
      <Head>
        <title>rashoelfa | Projects</title>
        <meta
          name="description"
          content="Personal Website Rasyidana Sulthan Fathansyah"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Navbar />
      <main>
        <h1>This is Projects Page</h1>
      </main>
    </div>
  );
};

export default Projects;
