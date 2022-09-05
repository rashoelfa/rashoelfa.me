import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/navbar";
import ProfileCard from "../components/profilecard";

const About: NextPage = () => {
  return (
    <div className="h-screen bg-[#ebebeb] dark:bg-slate-800">
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
        <ProfileCard />
        
      </main>
    </div>
  );
};

export default About;
