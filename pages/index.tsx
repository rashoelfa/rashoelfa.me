import type { NextPage } from "next";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/index.module.css";
import Navbar from "../components/navbar";

const dataEndpoints = {
  location: "https://geolocation-db.com/json/",
  flag: "https://flagcdn.com/40x30/",
};

const Home: NextPage = () => {
  //creating IP state
  const [location, setLocation] = useState({
    IPv4: "",
    country_code: "unknown",
    country_name: "flag",
  });

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get(dataEndpoints.location);
    setLocation(res.data);
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);
  return (
    <div className="h-screen bg-[#ebebeb] dark:bg-slate-800">
      <Head>
        <title>Rasyidana Sulthan Fathansyah</title>
        <meta
          name="title"
          content="Rasyidana Sulthan Fathansyah | Personal Website"
        />
        <meta
          name="description"
          content="Personal website that explain about Rasyidana Sulthan Fathansyah which the creator of this website :)"
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
        <meta
          property="og:image"
          content="https://rashoelfa.me/assets/image/meta-header.jpeg"
        />

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
        <meta
          property="twitter:image"
          content="https://rashoelfa.me/assets/image/meta-header.jpeg"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className="h-4/5">
        <div className="h-full max-w-5xl flex mx-auto items-center justify-center">
          <div className="text-xl md:text-2xl lg:text-4xl font-bold">
            <h1 className="dark:text-slate-200">
              Hello 👋,
              <br />
              {location.country_code !== "unknown" ? (
                <span>
                  You are {location.IPv4} from{" "}
                  <Image
                    layout="fixed"
                    height={"30px"}
                    width={"40px"}
                    src={
                      dataEndpoints.flag +
                      location.country_code?.toLowerCase() +
                      ".png"
                    }
                    alt={location.country_name}
                  />
                </span>
              ) : (
                <span></span>
              )}
            </h1>
            <h1 className="dark:text-slate-200">
              I&apos;m <span className={styles.text}>Rasyid</span> is a{" "}
              <span className={styles.secondText}>Developer</span> 👨‍💻
            </h1>
            <Link href="/about">
              <button className={styles.glow}>
                <p>About Me</p>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
