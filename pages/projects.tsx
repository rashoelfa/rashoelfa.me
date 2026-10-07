import type { NextPage } from "next";
import SEO from "../components/SEO";
import { useReveal } from "../hooks/use-gsap";

const Projects: NextPage = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <main ref={ref} className="mx-auto w-full max-w-6xl flex-1 px-6 py-24">
      <SEO
        title="Projects | Rasyidana Sulthan Fathansyah"
        description="Explore my coding projects and portfolio. I'm a Backend Developer working with Go, Node.js, and various cloud technologies."
        path="/projects"
      />
      <p data-reveal className="font-mono text-sm text-muted">
        Projects
      </p>
      <h1 data-reveal className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.035em]">
        Under construction.
      </h1>
      <p data-reveal className="mt-6 text-lg text-muted">
        New projects coming soon.
      </p>
    </main>
  );
};

export default Projects;
