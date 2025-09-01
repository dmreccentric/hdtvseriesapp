"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Movie = {
  _id: string; // from MongoDB
  title: string;
  genres: string[]; // <-- FIXED: should be array
  rating: number;
  released: number;
  type: "movie" | "series";
};

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  const router = useRouter();
  const [filtered, setFiltered] = useState<Movie[]>(
    [...movies].sort((a, b) => a.title.localeCompare(b.title))
  );

  const [filters, setFilters] = useState({
    genre: "",
    rating: "",
    released: "",
    type: "",
    sortBy: "title-asc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 28;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentMovies = filtered.slice(indexOfFirstCard, indexOfLastCard);

  const handleFilter = () => {
    let result = [...movies];

    // Filters
    if (filters.genre) {
      result = result.filter((m) => m.genres.includes(filters.genre));
    }
    if (filters.rating) {
      result = result.filter((m) => m.rating >= Number(filters.rating));
    }
    if (filters.released) {
      result = result.filter((m) => m.released.toString() === filters.released);
    }
    if (filters.type) {
      result = result.filter(
        (m) => m.type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    // Sorting
    const { sortBy } = filters;
    if (sortBy === "title-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "title-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "released-asc") {
      result.sort((a, b) => a.released - b.released);
    } else if (sortBy === "released-desc") {
      result.sort((a, b) => b.released - a.released);
    }

    setFiltered(result);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      genre: "",
      rating: "",
      released: "",
      type: "",
      sortBy: "title-asc",
    });
    setFiltered([...movies].sort((a, b) => a.title.localeCompare(b.title)));
    setCurrentPage(1);
  };

  return (
    <>
      {/* Filter Form */}
      <div className="bg-red-900 p-4 rounded-2xl space-y-3 md:w-xl">
        {/* Genres */}
        <select
          className="w-full p-2 rounded bg-red-800"
          value={filters.genre}
          onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
        >
          <option value="">All Genres</option>
          {[...new Set(movies.flatMap((m) => m.genres))] // flatten all arrays
            .filter(Boolean)
            .map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
        </select>

        {/* Ratings */}
        <select
          className="w-full p-2 rounded bg-red-800"
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
        >
          <option value="">All Ratings</option>
          {Array.from({ length: 9 }).map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}+
            </option>
          ))}
        </select>

        {/* Released Year */}
        <select
          className="w-full p-2 rounded bg-red-800"
          value={filters.released}
          onChange={(e) => setFilters({ ...filters, released: e.target.value })}
        >
          <option value="">All Years</option>
          {Array.from(
            { length: new Date().getFullYear() - 1990 + 1 },
            (_, i) => 1990 + i
          )
            .reverse() // so latest year appears first
            .map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>

        {/* Type */}
        <select
          className="w-full p-2 rounded bg-red-800"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>

        {/* Sort */}
        <select
          className="w-full p-2 rounded bg-red-800"
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
        >
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="released-asc">Year (Oldest)</option>
          <option value="released-desc">Year (Newest)</option>
        </select>

        {/* Buttons */}
        <button
          className="w-full bg-red-600 py-2 rounded-lg font-bold"
          onClick={handleFilter}
        >
          FILTER
        </button>

        <button
          className="w-full bg-gray-600 py-2 rounded-lg font-bold text-left px-6"
          onClick={handleReset}
        >
          RESET
        </button>
      </div>

      {/* Movies/Series Grid */}
      <div className="grid grid-cols-4 gap-3 mt-6">
        {currentMovies.map((item) => (
          <div
            key={item._id}
            className="bg-gray-300 text-black font-semibold flex items-center justify-center px-2 text-sm h-16 rounded-lg cursor-pointer hover:bg-gray-400 active:border-2 focus:border-2 focus:border-red-500 active:border-red-500"
            onClick={() => router.push(`/${item._id}`)}
          >
            {item.title}
          </div>
        ))}
      </div>
      {filtered.length > cardsPerPage && (
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          {/* Page Numbers with Collapse */}
          {(() => {
            const totalPages = Math.ceil(filtered.length / cardsPerPage);
            const pages: (number | string)[] = [];

            if (totalPages <= 7) {
              // Show all if few pages
              for (let i = 1; i <= totalPages; i++) pages.push(i);
            } else {
              // Always show first + last
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
          })()}

          <button
            className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={currentPage * cardsPerPage >= filtered.length}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
