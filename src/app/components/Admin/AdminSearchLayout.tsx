"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface Movie {
  _id: string;
  title: string;
  genres: string[];
  plot: string;
  type: string;
  language?: string;
  link?: string;
  trailer?: string;
  rating?: number;
  released?: number;
  seasons?: { seasonNumber: number; episodes: { episodeNumber: number }[] }[];
  img?: string;
  himg?: string;
}

export default function AdminSearchLayout({
  onResults,
}: {
  onResults: (movies: Movie[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      onResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASE}/api/v1/movie?search=${encodeURIComponent(
            query
          )}&limit=10`
        );
        if (res.ok) {
          const data = await res.json();
          onResults(data.movies || []);
        } else {
          onResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        onResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, onResults]);

  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="placeholder:text-gray-400 border border-gray-300 flex h-10 w-full rounded-md bg-white px-10 pr-10 text-sm text-black focus:border-red-400 focus:ring-2 focus:ring-red-400/40 outline-none"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>
      )}
      {loading && <p className="text-sm text-gray-500 mt-1">Searching...</p>}
    </div>
  );
}
