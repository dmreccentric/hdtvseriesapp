"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 28;

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(`${API_BASE}/api/v1/movie`);
        const data = await res.json();
        const sorted = (data.movies ?? []).sort(
          (a: Movie, b: Movie) => (b.rating ?? 0) - (a.rating ?? 0)
        );
        setMovies(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (movies.length === 0) return <p>No movies found</p>;

  const totalPages = Math.ceil(movies.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentMovies = movies.slice(indexOfFirstCard, indexOfLastCard);

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }

    return pages.map((p, idx) =>
      typeof p === "number" ? (
        <button
          key={idx}
          onClick={() => setCurrentPage(p)}
          className={`px-3 py-1 rounded ${
            currentPage === p
              ? "bg-red-600 text-white font-bold"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          {p}
        </button>
      ) : (
        <span key={idx} className="px-2">
          {p}
        </span>
      )
    );
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="grid gap-4 grid-cols-2">
          {currentMovies.map((movie) => (
            <Link key={movie._id} href={`/${movie._id}`}>
              <div className="relative w-full md:w-[180px] lg:w-[200px] flex-shrink-0">
                <div className="relative h-[220px] md:h-[270px] lg:h-[300px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition w-full">
                  <Image
                    src={movie.img ?? "/fallback.png"}
                    alt={movie.title}
                    fill
                    className="object-fill rounded-2xl"
                    sizes="(max-width: 768px) 180px, (max-width: 1024px) 200px, 300px"
                  />
                </div>
                <div className="mt-2 px-2 py-1 rounded-lg text-sm font-normal font-arvo text-left text-red-600">
                  {toTitleCase(movie.title)}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex gap-2 mt-4">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>

              {renderPageNumbers()}

              <button
                className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
