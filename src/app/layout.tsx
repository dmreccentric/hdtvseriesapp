import type { Metadata } from "next";
import { Geist, Geist_Mono, Arvo } from "next/font/google";
import "./globals.css";

// Load Arvo font
const arvo = Arvo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-arvo",
});

// Geist Sans
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Geist Mono
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HDTvSeries",
  description: "HDTvSeries Official Website",
  icons: {
    icon: "/hdtvseries.ico", // <- set your favicon here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${arvo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
