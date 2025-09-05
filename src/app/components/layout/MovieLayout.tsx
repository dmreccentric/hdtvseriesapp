"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { FaHome, FaTv, FaChevronLeft } from "react-icons/fa";
import Footer from "../../components/Footer";
import Image from "next/image";
import BackButton from "../common/BackButton";
import SideBar from "../common/SideBar";
import { Search } from "lucide-react";
import SearchDropdown from "../SearchDropdown";

interface MovieLayoutProps {
  children: ReactNode;
}

export default function MovieLayout({ children }: MovieLayoutProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-[#2d0202]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-[#2d0202]/60 backdrop-blur-md border-b border-white/10 text-white p-4 shadow-lg">
        {/* Back button */}
        <BackButton />

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

        <div>
          <SideBar />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-18.5">{children}</main>
      {/* added pt-20 so content isn't hidden under the fixed header */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
