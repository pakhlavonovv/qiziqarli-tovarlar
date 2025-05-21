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
        <meta name="author" content="Xoji aka do‘koni" />
        <meta name="description" content="Xoji aka online do‘koni — Mahalliy arzon narxdagi mahsulotlar, oziq-ovqat, kundalik ehtiyojlar, hammasi bir joyda." />
        <meta name="keywords" content="hoji aka, offline do‘kon, o‘zbekcha market, arzon mahsulotlar, kundalik ehtiyojlar" />
        <meta property="og:title" content="Xoji aka do‘koni — Mahalliy va arzon mahsulotlar markazi" />
        <meta property="og:description" content="Xoji aka online do‘koni — Mahalliy arzon narxdagi mahsulotlar, kundalik ehtiyojlar, hammasi bir joyda." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xoji aka do‘koni" />
        <link rel="icon" href="favicon.ico?v=2" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
        <title>Xoji aka do‘koni — Mahalliy va arzon mahsulotlar markazi</title>
      </head>
      <body className={`${notoSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
