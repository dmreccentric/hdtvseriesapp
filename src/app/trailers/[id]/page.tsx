"use client";

import Image from "next/image";
import Link from "next/link";
import { IoPlayCircleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";

interface TrailerPageProps {
  params: { id: string };
}

interface Movie {
  _id: string;
  title: string;
  himg?: string;
  genres?: string[];
  trailer?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function TrailerPage({ params }: TrailerPageProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [related, setRelated] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // Fetch trailer by ID
        const res = await fetch(`${API_BASE}/api/v1/movie/${params.id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        setMovie(data);

        // Fetch related trailers if genres exist
        if (data?.genre || (data?.genres && data.genres.length > 0)) {
          const genre = encodeURIComponent(data.genre || data.genres[0]);
          const relatedRes = await fetch(
            `${API_BASE}/api/v1/movie?genre=${genre}&limit=4`,
            { cache: "no-store" }
          );
          const relatedJson = relatedRes.ok
            ? await relatedRes.json()
            : { data: [] };
          setRelated(relatedJson.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [params.id]);

  if (loading) {
    return (
      <main className="bg-[#1a0000] text-white min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="bg-[#1a0000] text-white min-h-screen flex items-center justify-center">
        <p>Movie not found</p>
      </main>
    );
  }

  return (
    <main className="bg-[#1a0000] text-white min-h-screen px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="text-lg">
          &larr;
        </Link>
        <h1 className="text-xl font-bold">WATCH TRAILER</h1>
        <div className="flex space-x-3">
          <button className="text-lg">📺</button>
          <Link href="/" className="text-lg">
            🏠
          </Link>
        </div>
      </div>

      {/* Main Trailer */}
      <div className="relative w-full max-w-4xl mx-auto mb-8">
        <video
          controls
          className="w-full rounded-lg shadow-lg"
          poster={movie.himg}
        >
          <source src={movie.trailer} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* More Trailers */}
      {related.length > 0 && (
        <section className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">More Trailers</h2>
            <button className="px-3 py-1 border rounded-md text-sm hover:bg-white hover:text-black transition">
              See All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related
              .filter((r) => r._id !== movie._id) // exclude current movie
              .map((trailer) => (
                <Link key={trailer._id} href={`/trailers/${trailer._id}`}>
                  <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-md hover:scale-105 transition">
                    <Image
                      src={
                        trailer.himg ||
                        "https://res.cloudinary.com/dzhhpr7f1/image/upload/v1755449997/images-not-found_qq0m2f.jpg"
                      }
                      alt={trailer.title}
                      fill
                      className="object-cover"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <IoPlayCircleOutline className="text-white text-4xl" />
                    </div>
                    <p className="absolute bottom-2 left-2 text-xs font-semibold drop-shadow-md">
                      {trailer.title}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      )}
    </main>
  );
}
