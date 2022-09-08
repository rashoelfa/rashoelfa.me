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
    <div className="h-full 3xl:h-screen bg-[#ebebeb] dark:bg-slate-800">
      <Head>
        <title>rashoelfa | About</title>
        <meta
          name="description"
          content="Personal Website Rasyidana Sulthan Fathansyah"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <div>
          <div className={CardTw}>
            <ProfileCard />
          </div>
          <div className={CardTw}>
            <AboutMe />
          </div>
          <div className={CardTw}>
            <Experience />
          </div>
          <div className={CardTw}>
            <Education />
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
