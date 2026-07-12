import type { Metadata } from "next";
import localFont from "next/font/local";
import { profile, summaryText } from "@/lib/content";
import "./globals.css";

const archivo = localFont({
  src: [
    {
      path: "./fonts/archivo-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/archivo-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-archivo",
  display: "swap",
});

const publicSans = localFont({
  src: [
    {
      path: "./fonts/public-sans-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/public-sans-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-public-sans",
  display: "swap",
});

const ibmPlexMono = localFont({
  src: "./fonts/ibm-plex-mono-latin-400-normal.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const siteTitle = `${profile.name} — ${profile.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://joshikunal.com"),
  title: siteTitle,
  description: summaryText,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://joshikunal.com/",
    siteName: "Kunal Joshi",
    title: siteTitle,
    description: summaryText,
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: summaryText,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: "https://joshikunal.com/",
  jobTitle: profile.tagline,
  email: "mailto:joshikunal16@gmail.com",
  sameAs: [
    "https://github.com/joshikunal94",
    "https://www.linkedin.com/in/joshikunal16/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${archivo.variable} ${publicSans.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <div className="aurora" aria-hidden="true">
          <span className="aurora__blob aurora__blob--a" />
          <span className="aurora__blob aurora__blob--b" />
          <span className="aurora__blob aurora__blob--c" />
        </div>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
