import "@root/faust.config";
import React from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import { DM_Mono } from "next/font/google";
import "@/styles/globals.css";

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ['latin'] 
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <FaustProvider pageProps={pageProps}>
      <div className={dmMono.className}>
        <Component {...pageProps} key={router.asPath} />
      </div>
    </FaustProvider>
  );
}
