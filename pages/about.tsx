import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import ProfileCard from "../components/about/profilecard";
import AboutMe from "../components/about/aboutme";
import Experience from "../components/about/experience";
import Education from "../components/about/education";

const CardTw =
  "h-fit max-w-4xl mx-auto mt-4 bg-[#ebebeb] dark:bg-slate-800 md:rounded-lg border border-black dark:border-slate-600 dark:text-slate-200 border-solid";

const About: NextPage = () => {
  return (
    <div className="h-full xl:h-screen bg-[#ebebeb] dark:bg-slate-800">
      <Head>
      <title>Rasyidana Sulthan Fathansyah | About</title>
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
        <div>
          <div className={CardTw}>
            <ProfileCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
