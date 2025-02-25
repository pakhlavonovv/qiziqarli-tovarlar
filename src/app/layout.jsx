"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const disableDevTools = (event) => {
        if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I")) {
          event.preventDefault();
          alert("Viewing the code is prohibited by the website!")
        }
      };

      const disableRightClick = (event) => {
        event.preventDefault();
      };

      document.addEventListener("contextmenu", disableRightClick);
      document.addEventListener("keydown", disableDevTools);

      return () => {
        document.removeEventListener("contextmenu", disableRightClick);
        document.removeEventListener("keydown", disableDevTools);
      };
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Floxsy" />
        <meta name="description" content="Floxsy is a shopping website offering a wide range of products at competitive prices. Explore various categories, special deals, and more!" />
        <meta name="keywords" content="trend products, online shopping, products, fashion, electronics, deals" />
        <meta property="og:title" content="Floxsy - Elevate Your Life with Style and Innovation" />
        <meta property="og:description" content="Floxsy is a shopping website offering a wide range of products at competitive prices. Explore various categories, special deals, and more!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://floxsy.shop" />
        <meta property="og:site_name" content="Floxsy" />
        <link rel="icon" href="favicon.ico?v=2" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
        <title>Floxsy - Elevate Your Life with Style and Innovation</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
