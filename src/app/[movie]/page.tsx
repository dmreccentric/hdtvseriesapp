"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MovieLayout from "../components/MovieLayout";
import { Star } from "lucide-react";

interface Movie {
  _id: string;
  title: string;
  img: string;
  himg?: string;
  rating?: number;
  trailer?: string;
  createdAt?: string;
  released?: number;
  language?: string;
  genres?: string[];
  plot?: string;
  link?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function MoviePage({ params }: { params: { movie: string } }) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/movie/${params.movie}`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch movie");

        const raw = await res.json();
        setMovie(raw.movie || null);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      }
    };

    fetchMovie();
  }, [params.movie]);

  if (error || !movie) {
    return (
      <MovieLayout>
        <main className="bg-[#1a0000] text-white min-h-screen flex items-center justify-center">
          <p className="text-red-500 font-semibold">
            {error || "Movie not found"}
          </p>
        </main>
      </MovieLayout>
    );
  }

  return (
    <MovieLayout>
      <main className="bg-[#1a0000] text-white min-h-screen p-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4">
          <h1 className="text-3xl font-light mb-0 text-red-600">
            {movie.title.toUpperCase()}
          </h1>

          <div className="relative w-full h-[500px]">
            <Image
              src={movie.img}
              alt={movie.title}
              fill
              className="object-fill rounded-2xl"
            />
          </div>

          <div className="border-t-1 pt-8">
            {movie.plot && (
              <p className="mb-6 text-gray-300 text-lg">
                <span className="font-bold">Overview:</span> {movie.plot}
              </p>
            )}

            <h1 className="text-2xl text-gray-300 font-semibold mb-4">
              {movie.title}
            </h1>

            {movie.rating && (
              <div className="mb-2 flex space-x-3 text-gray-300">
                <span className="font-semibold">iMDb Rating:</span>
                <div className="flex items-center space-x-2">
                  <Star className="h-3 w-3 text-yellow-400 mr-1" />
                  <span>{movie.rating.toFixed(1)}/10</span>
                </div>
              </div>
            )}

            {movie.released && (
              <p className="mb-2 text-gray-300">
                <span className="font-semibold">Released:</span>{" "}
                {movie.released}
              </p>
            )}

            {movie.language && (
              <p className="mb-2 text-gray-300">
                <span className="font-semibold">Language:</span>{" "}
                {movie.language}
              </p>
            )}

            {movie.genres && movie.genres.length > 0 && (
              <p className="mb-4 text-gray-300">
                <span className="font-semibold">Genres:</span>{" "}
                {movie.genres.join(" - ")}
              </p>
            )}

            <div className="flex gap-4 justify-center mt-10">
              {movie.trailer && (
                <a
                  href={movie.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
                >
                  ▶ Watch Trailer
                </a>
              )}
              {movie.link && (
                <a
                  href={movie.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    !movie.trailer
                      ? "bg-red-600 hover:bg-red-700 px-10"
                      : "bg-blue-600 hover:bg-blue-700 px-4"
                  } py-2 rounded-lg font-light`}
                >
                  Download now
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </MovieLayout>
  );
}
