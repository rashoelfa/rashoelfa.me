import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";

const Projects: NextPage = () => {
  return (
    <div className="h-screen bg-[#ebebeb] dark:bg-slate-800">
      <Head>
      <title>Rasyidana Sulthan Fathansyah | Projects</title>
        <meta
          name="title"
          content="Rasyidana Sulthan Fathansyah | Personal Website"
        />
        <meta
          name="description"
          content="Personal website that explain about the creator of this website :)"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rashoelfa.me/" />
        <meta
          property="og:title"
          content="Rasyidana Sulthan Fathansyah | Personal Website"
        />
        <meta
          property="og:description"
          content="Personal website that explain about the creator of this website :)"
        />
        <meta property="og:image" content="https://rashoelfa.me/assets/image/meta-header.jpeg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rashoelfa.me/" />
        <meta
          property="twitter:title"
          content="Rasyidana Sulthan Fathansyah | Personal Website"
        />
        <meta
          property="twitter:description"
          content="Personal website that explain about the creator of this website :)"
        />
        <meta property="twitter:image" content="https://rashoelfa.me/assets/image/meta-header.jpeg" />
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
