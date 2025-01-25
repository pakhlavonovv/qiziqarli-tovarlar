import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Floxsy - Elevate Your Life with Style and Innovation",
  description: "Floxsy is a shopping website offering a wide range of products at competitive prices. Explore various categories, special deals, and more!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Floxsy" />
        <meta name="description" content="Floxsy is a shopping website offering a wide range of products at competitive prices. Explore various categories, special deals, and more!" />
        <meta name="keywords" content="trend products, online shopping, products, fashion, electronics, deals" />
        <meta property="og:title" content="Floxsy - Elevate Your Life with Style and Innovation" />
        <meta property="og:description" content="Floxsy is a shopping website offering a wide range of products at competitive prices. Explore various categories, special deals, and more!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://floxsy.shop" />
        <meta property="og:site_name" content="Floxsy" />
        <link href="/assets/9daff39f/css/style.min.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" href="favicon.ico?v=2" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <title>Floxsy - Elevate Your Life with Style and Innovation</title>
        <meta name="csrf-param" content="_csrf" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
