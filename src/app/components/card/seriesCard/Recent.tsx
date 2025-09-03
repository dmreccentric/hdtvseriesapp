"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Movie {
  _id: string;
  title: string;
  subtitle: string;
  img: string;
  himg?: string;
  rating?: number;
  trailer?: string;
  createdAt?: string;
  released?: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

function toTitleCase(str: string) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function MovieCard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(`${API_BASE}/api/v1/newmovie`);
        const data = await res.json();
        const sorted = (data.movies ?? []).sort((a: Movie, b: Movie) => {
          const dateA = new Date(a.createdAt ?? 0).getTime();
          const dateB = new Date(b.createdAt ?? 0).getTime();
          return dateB - dateA;
        });
        setMovies(sorted);
      } catch (err) {
        console.error("fetchMovies error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (movies.length === 0) return <p>No movies found</p>;

  return (
    <>
      {movies.map((movie) => (
        <Link key={movie._id} href={`/${movie._id}`}>
          <div className="mt-3">
            <div className="relative md:w-[180px] lg:w-[200px] flex-shrink-0">
              {/* Image Card */}
              <div className="relative h-[220px] md:h-[270px] lg:h-[300px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition w-full">
                <Image
                  src={movie.img ?? "/fallback.png"}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 180px, (max-width: 1024px) 200px, 300px"
                />
              </div>

              {/* Title */}
              <div className="mt-2 px-2 py-1 rounded-lg text-sm font-normal font-arvo text-left text-red-600">
                {toTitleCase(movie.title)}
              </div>

              {/* Subtitle */}
              <div className="mt-2 px-2 py-1 rounded-lg text-white text-[13px] font-normal font-arvo text-left">
                {toTitleCase(movie.subtitle)}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
