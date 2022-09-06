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
        <div className="text-center max-w-7xl mx-auto">
          <h1 className="text-xl font-bold my-4">Under Construction :)</h1>
        </div>
      </main>
    </div>
  );
};

export default Projects;
