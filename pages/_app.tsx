import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";
import FluidCursor from "../components/fluid-cursor";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <NextNProgress color="#000" options={{ showSpinner: false }} />
      <Component {...pageProps}></Component>
      <FluidCursor />
    </ThemeProvider>
  );
}

export default MyApp;
