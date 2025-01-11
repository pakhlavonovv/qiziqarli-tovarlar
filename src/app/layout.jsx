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
  title: "Floxsy - Online shopping website",
  description: "Floxsy dropshipping website",
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
        <meta property="og:title" content="Floxsy - Fashion, Tech, and More at Your Fingertips" />
        <meta property="og:description" content="Floxsy is a dropshipping website offering a wide range of products at competitive prices. Explore various categories, special deals, and more!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://floxsy-store.com" />
        <meta property="og:site_name" content="Floxsy" />
        <link href="/assets/9daff39f/css/style.min.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <title>Floxsy - Fashion, Tech, and More at Your Fingertips</title>
        <link rel="shortcut icon" href="/favicon.ico?v=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon1616.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
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
