import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <Head />
      <body>
        {/* Lets globals.css hide [data-reveal] before paint only when JS will animate it in. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
