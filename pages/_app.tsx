import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";
import localFont from "@next/font/local";

const font = localFont({
  src: [
    {
      path: "./fonts/SFPRODISPLAYREGULAR.OTF",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SFPRODISPLAYMEDIUM.OTF",
      weight: "500",
      style: "medium",
    },
    {
      path: "./fonts/SFPRODISPLAYBOLD.OTF",
      weight: "700",
      style: "bold",
    },
  ],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <NextNProgress color="#000" options={{ showSpinner: false }} />
      <main className={font.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}

export default MyApp;
