"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Film, Tv, PlayCircle, Sliders } from "lucide-react";

interface Right {
  right?: boolean;
}

export default function Sidebar({ right }: Right) {
  const [isOpen, setIsOpen] = useState(false);
  const isRight = right ? "right-0" : "left-0";

  return (
    <>
      {/* Toggle Button (Mobile) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-white p-2 rounded-lg shadow-lg z-50 "
        >
          ☰
        </button>
      )}
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-screen  bg-black/10 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed top-0 ${isRight} h-screen w-60 bg-[#1a0101] text-white shadow-lg transform transition-transform duration-300 z-40 md:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header with Logo + Close Button */}
        <div className="flex items-center justify-between p-6 text-2xl font-bold border-b border-white/10 bg-[#1a0101]">
          HDTVSeries
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            ✖
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-4 p-4 bg-[#1a0101]">
          <Link
            href="/"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition"
          >
            <Home className="h-5 w-5" /> Home
          </Link>
          <Link
            href="/movies"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition"
          >
            <Film className="h-5 w-5" /> Movies
          </Link>
          <Link
            href="/series"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition"
          >
            <Tv className="h-5 w-5" /> Series
          </Link>
          <Link
            href="/trailers"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition"
          >
            <PlayCircle className="h-5 w-5" /> Trailers
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition"
          >
            <Sliders className="h-5 w-5" /> Filter
          </Link>
        </nav>
      </aside>
    </>
  );
}
