// components/TrailerImages.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { BsFillPlayBtnFill } from "react-icons/bs";
import { toTitleCase } from "../card/RecentlyAdded";
import Pagination from "../common/Pagination";

interface Movie {
  _id: string;
  title: string;
  img: string;
  trailer?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

function MovieSkeleton() {
  return (
    <div className="relative w-full md:w-[180px] lg:w-[200px] flex-shrink-0">
      <div className="relative h-[170px]  rounded-2xl overflow-hidden bg-gray-500 animate-pulse" />
      <div className="mt-2 px-2 py-1">
        <div className="h-4 bg-gray-500 rounded w-3/4 animate-pulse"></div>
      </div>
    </div>
  );
}

export default function TrailerImages() {
  const [trailer, setTrailers] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 28;

  useEffect(() => {
    async function fetchTrailers() {
      try {
        const res = await fetch(`${API_BASE}/api/v1/movie`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch data");

        const raw = await res.json();
        const filtered = (raw.movies || []).filter((m: any) => m.trailer);
        setTrailers(filtered);
      } catch (error) {
        console.error(error);
        return [];
      } finally {
        setLoading(false);
      }
    }

    fetchTrailers();
  }, []);

  const totalPages = Math.ceil(trailer.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentMovies = trailer.slice(indexOfFirstCard, indexOfLastCard);

  if (loading) {
    return (
      <div className="flex flex-col px-4">
        <div className="grid gap-4 grid-cols-4">
          {Array.from({ length: 12 }).map((_, idx) => (
            <MovieSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 overflow-auto  px-5 scrollbar-custom">
          {trailer.map((trailer) => (
            <div key={trailer._id} className="flex flex-col items-start ">
              <Link
                href={`${trailer.trailer}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full h-[160px]  overflow-hidden flex"
              >
                <Image
                  src={
                    trailer.img ||
                    "https://res.cloudinary.com/dzhhpr7f1/image/upload/v1755449997/images-not-found_qq0m2f.jpg"
                  }
                  alt={trailer.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-fill rounded-2xl"
                />

                <div className="absolute inset-0 bg-black/30"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <BsFillPlayBtnFill className="text-4xl text-gray-200 " />
                </div>
              </Link>
              <div className="mt-2 px-2 py-1 rounded-lg text-white text-xs font-normal font-arvo text-left">
                {toTitleCase(trailer.title)}
              </div>
            </div>
          ))}
        </div>
        {/*Reuseable Pagination */}
        <Pagination
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}
