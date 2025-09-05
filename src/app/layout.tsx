import type { Metadata } from "next";
import { Arvo } from "next/font/google";
import "./globals.css";
import { TabHistoryProvider } from "./context/TabHistoryContext";

// Load Arvo font
const arvo = Arvo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-arvo",
});

export const metadata: Metadata = {
  title: "Search & Download Movies and Tv Shows",
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
      <TabHistoryProvider>
        <body className={` ${arvo.variable} antialiased`}>{children}</body>
      </TabHistoryProvider>
    </html>
  );
}
