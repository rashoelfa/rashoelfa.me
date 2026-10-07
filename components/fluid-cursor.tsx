import { useEffect } from "react";

import fluidCursor from "../hooks/use-FluidCursor";

// ponytail: never torn down; it lives in _app for the whole session. The flag stops StrictMode's double effect from starting two sims.
let started = false;

const FluidCursor = () => {
  useEffect(() => {
    if (started || matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    started = true;
    fluidCursor();
  }, []);

  return <canvas id="fluid" aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen" />;
};
export default FluidCursor;
