"use client";

import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";

const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin", "latin-ext"],
});

export default function RootLayout({ children }) {
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const disableDevTools = (event) => {
  //       if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I")) {
  //         event.preventDefault();
  //         alert("Kodga kirish taqiqlangan!")
  //       }
  //     };

  //     const disableRightClick = (event) => {
  //       event.preventDefault();
  //     };

  //     document.addEventListener("contextmenu", disableRightClick);
  //     document.addEventListener("keydown", disableDevTools);

  //     return () => {
  //       document.removeEventListener("contextmenu", disableRightClick);
  //       document.removeEventListener("keydown", disableDevTools);
  //     };
  //   }
  // }, []);

  return (
    <html lang="uz">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Donyorbek shop" />
        <meta name="description" content="Qiziqarli tovarlar — Siz izlagan sifatli va arzon mahsulotlar" />
        <meta name="keywords" content="donyorbek, arzon mahsulotlar, kundalik ehtiyojlar" />
        <meta property="og:title" content="Qiziqarli tovarlar — Siz izlagan sifatli va arzon mahsulotlar" />
        <meta property="og:description" content="Qiziqarli tovarlar — Siz izlagan sifatli va arzon mahsulotlar, kundalik ehtiyojlar, hammasi bir joyda." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Qiziqarli tovarlar" />
        <link rel="icon" href="favicon.ico?v=2" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
        <title>Qiziqarli tovarlar — Siz izlagan sifatli va arzon mahsulotlar</title>
      </head>
      <body className={`${notoSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
