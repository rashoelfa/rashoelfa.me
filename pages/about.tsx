import type { NextPage } from "next";
import ProfileCard from "../components/about/profilecard";
import AboutMe from "../components/about/aboutme";
import Experience from "../components/about/experience";
import Education from "../components/about/education";
import SEO from "../components/SEO";
import { useReveal } from "../hooks/use-gsap";

const About: NextPage = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <main ref={ref} className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <SEO
        title="About Me | Rasyidana Sulthan Fathansyah"
        description="Learn more about Rasyidana Sulthan Fathansyah, a Backend Developer with experience in Go, Node.js, and cloud technologies. View my education, experience, and download my CV."
        path="/about"
      />
      <article
        className="overflow-hidden rounded-3xl border border-line bg-paper/60 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.35)] backdrop-blur-md"
      >
        <ProfileCard />
        {/* <div data-reveal>
          <AboutMe />
        </div>
        <div data-reveal>
          <Experience />
        </div>
        <div data-reveal>
          <Education />
        </div> */}
      </article>
    </main>
  );
};

export default About;
