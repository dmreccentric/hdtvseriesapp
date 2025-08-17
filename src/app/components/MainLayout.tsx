"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { FaTv } from "react-icons/fa";
import { Search } from "lucide-react";
import Footer from "../components/Footer";
import SearchDropdown from "./SearchDropdown";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-[#1a0000]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between space-x-4 bg-[#2d0202]/60 backdrop-blur-md text-white p-4 shadow-lg border-b border-white/10">
        {/* Logo */}
        <Link href="/">
          <img src="/hdtvseries.ico" alt="Logo" className="h-10 w-13" />
        </Link>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="placeholder:text-gray-400 border border-white/20 flex h-9 w-full rounded-md bg-white/10 px-3 pr-4 py-5 text-sm pl-10 text-white focus:border-red-400 focus:ring-2 focus:ring-red-400/40 outline-none"
          />

          {/* Client-only search dropdown */}
          <SearchDropdown query={query} />
        </div>

        {/* Icon (TV) */}
        <Link href="/search" className="text-2xl hover:text-gray-300">
          <FaTv />
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6 pt-24">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
