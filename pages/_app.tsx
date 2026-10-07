import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";
import FluidCursor from "../components/fluid-cursor";
import Navbar from "../components/navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      <div className={`${geist.variable} flex min-h-dvh flex-col font-sans`}>
        <FluidCursor />
        <NextNProgress color="rgb(var(--accent))" height={2} options={{ showSpinner: false }} />
        <Navbar />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
