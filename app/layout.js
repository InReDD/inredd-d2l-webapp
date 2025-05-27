import "./globals.scss";

import { Yeseva_One, Poppins, Rhodium_Libre, IBM_Plex_Sans, IBM_Plex_Sans_Devanagari } from "next/font/google";
import Head from "next/head";
import { generateMetadata } from "@/helpers";
import { Suspense } from "react";
import Bootstrap from "./bootstrap";
import AppProvider from ".";
import { cookies } from "next/headers";
import jwtDecode from "jwt-decode";

const yesevaOne = Yeseva_One({
  subsets: ['latin'],
  variable: '--font-yesevane_one',
  weight: ['400'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '300', '600'],
});

const rhodiumLibre = Rhodium_Libre({
  subsets: ['latin'],
  variable: '--font-rhodium_libre',
  weight: ['400'],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-ibm_plex_sans',
  weight: ['400', '300', '600'],
});

const ibmPlexSansDevanagari = IBM_Plex_Sans_Devanagari({
  subsets: ['latin'],
  variable: '--font-ibm_plex_sans_devanagari',
  weight: ['400', '300', '600'],
});

export const metadata = generateMetadata({
  title: "Next",
  description: "Description",
});

export const jsonLd = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  name: "Next",
  url: process.env.NEXT_PUBLIC_APP_URL,
  sameAs: [],
};

export default async function RootLayout({ children }) {
  let user = null;
  const cookiesStore = cookies();
  // const token = cookiesStore.get("app-token")?.value;

  // if (token) {
  //   user = jwtDecode(token, { header: false });
  // }

  return (
    <html lang="pt-BR" className={`${poppins.variable} ${yesevaOne.variable} ${rhodiumLibre.variable} ${ibmPlexSans.variable} ${ibmPlexSansDevanagari.variable}`}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <body>
        <AppProvider>{children}</AppProvider>
        <Suspense>
          <Bootstrap />
        </Suspense>
      </body>
    </html>
  );
}
