"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { Search, X } from "lucide-react";
import Footer from "../../components/Footer";
import SearchDropdown from "../SearchDropdown";
import BackButton from "../common/BackButton";
import Nav from "../common/Nav";
import Image from "next/image";
import SideBar from "../common/SideBar";

interface SearchLayoutProps {
  children: ReactNode;
}

export default function SearchLayout({ children }: SearchLayoutProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#1a0000]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between space-x-4 bg-[#2d0202]/60 backdrop-blur-md text-white p-4 shadow-lg border-b border-white/10">
        <BackButton />

        {/* Logo */}
        <Link href="/">
          <Image src="/hdtvseries.ico" alt="Logo" width={40} height={40} />
        </Link>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="placeholder:text-gray-400 border border-white/20 flex h-9 w-full rounded-md bg-white/10 px-3 pr-10 pl-10 text-sm text-white focus:border-red-400 focus:ring-2 focus:ring-red-400/40 outline-none"
          />

          {/* Clear (X) button */}

          {query && isFocused && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/40 hover:bg-black/60 z-20"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          )}

          {/* Client-only search dropdown */}
          <SearchDropdown query={query} />
        </div>

        <div>
          <SideBar />
        </div>
        <div className="hidden md:flex">
          <Nav />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-24">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
