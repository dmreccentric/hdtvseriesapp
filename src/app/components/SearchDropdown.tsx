"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Star } from "lucide-react";
import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface Movie {
  _id: string;
  title: string;
  plot?: string;
  img?: string;
  rating?: number;
  type?: string;
}

function toTitleCase(str: string) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function SearchDropdown({ query }: { query: string }) {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
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

        if (!res.ok) {
          const text = await res.text();
          console.error("API Error:", res.status, text);
          setResults([]);
          return;
        }

        const data = await res.json();
        setResults(data.movies || []);
      } catch (err) {
        console.error("Search fetch failed:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  if (!query) return null;

  return (
    <div className="absolute mt-2 w-full bg-[#1f1f1f] border border-white/10 rounded-lg shadow-lg overflow-hidden z-50 max-h-120 overflow-y-auto search-scrollbar">
      {loading ? (
        <div className="flex items-center justify-center p-4 text-gray-300">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          Searching...
        </div>
      ) : results.length > 0 ? (
        results.map((movie) => (
          <Link
            key={movie._id}
            href={`/${movie._id}`}
            className="flex items-start space-x-3 p-3 hover:bg-white/10 transition"
          >
            <Image
              src={movie.img || "/placeholder.jpg"}
              alt={movie.title}
              width={48}
              height={64}
              className="object-cover rounded"
            />

            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white truncate">
                {toTitleCase(movie.title)}
              </h4>
              <p className="text-xs text-gray-400 line-clamp-2">{movie.plot}</p>
              <div className="flex items-center text-xs text-gray-300 mt-1 space-x-2">
                <span>iMDb</span>
                <span className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 mr-1" />
                  {movie.rating || "N/A"}
                </span>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="p-3 text-gray-400 text-sm">No results found</div>
      )}
    </div>
  );
}
