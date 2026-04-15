import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

const BASE_URL = "https://rashoelfa.me";
const DEFAULT_IMAGE = `${BASE_URL}/assets/image/meta-header.jpeg`;

export default function SEO({
  title,
  description,
  canonical,
  path = "",
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: SEOProps) {
  const fullUrl = `${BASE_URL}${path}`;
  const canonicalUrl = canonical || fullUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebSite",
    name: title,
    description,
    url: fullUrl,
    ...(type === "article" && {
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      author: authors?.map((name) => ({
        "@type": "Person",
        name,
      })),
    }),
    publisher: {
      "@type": "Person",
      name: "Rasyidana Sulthan Fathansyah",
      url: BASE_URL,
    },
    image: {
      "@type": "ImageObject",
      url: DEFAULT_IMAGE,
    },
    sameAs: [
      "https://github.com/rashoelfa",
      "https://www.linkedin.com/in/rasyidana/",
    ],
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Rasyidana Sulthan Fathansyah" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:site_name" content="Rasyidana Sulthan Fathansyah" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
      <meta name="twitter:creator" content="@rashoelfa" />

      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
