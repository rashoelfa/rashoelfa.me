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
  flag: "https://countryflagsapi.com/png/",
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
    const res = await axios.get("https://geolocation-db.com/json/");
    setLocation(res.data);
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);
  return (
    <div className="h-screen bg-[#ebebeb] dark:bg-slate-800">
      <Head>
        <title>rashoelfa</title>
        <meta
          name="description"
          content="Personal Website Rasyidana Sulthan Fathansyah"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className="h-4/5">
        <div className="h-full max-w-5xl flex mx-auto items-center justify-center">
          <div className="md:text-4xl sm:text-2xl font-bold">
            <h1 className="dark:text-slate-200">
              Hello 👋,
              <br />
              You are {location.IPv4} from{" "}
              <Image
                layout="fixed"
                height={"28px"}
                width={"40px"}
                src={dataEndpoints.flag + location.country_code?.toLowerCase()}
                alt={location.country_name}
              />
            </h1>
            <h1 className="dark:text-slate-200">
              I&apos;m <span className={styles.text}>Syidan</span> is a{" "}
              <span className={styles.secondText}>Developer</span> 👨‍💻
            </h1>
            <Link href="/about">
              <button className={styles.glow}>
                <a>About Me</a>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
