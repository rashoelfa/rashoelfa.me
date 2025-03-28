import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";
import FluidCursor from "../components/fluid-cursor";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <FluidCursor />
      <NextNProgress color="#000" options={{ showSpinner: false }} />
      <Component {...pageProps}></Component>
    </ThemeProvider>
  );
}

export default MyApp;
