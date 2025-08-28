"use client";

import Image from "next/image";
import MovieLayout from "../components/layout/MovieLayout";
import TrailerComp from "../components/client/TrailerComp";
import Link from "next/link";
import { BsFillPlayBtnFill } from "react-icons/bs";

interface Movie {
  _id: string;
  title: string;
  img: string;
  himg?: string;
  rating?: number;
  trailer?: string;
  createdAt?: string;
  released?: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

async function getTrailers(): Promise<Movie[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/movie`, { cache: "no-store" });

    if (!res.ok) throw new Error("Failed to fetch data");

    const raw = await res.json();
    return raw.movies || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function TrailersIndex() {
  const movies = await getTrailers();

  const trailer = movies.filter((m) => m.trailer);

  return (
    <MovieLayout>
      <main className="bg-[#1a0000] text-white min-h-screen ">
        <h1 className="text-3xl font-light mb-0 text-white font-arvo py-4 underline px-5">
          WATCH TRAILER
        </h1>
        <hr className="pb-5  " />
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 overflow-auto  px-5 scrollbar-custom">
          <TrailerComp trailer={trailer} />
        </div>
      </main>
    </MovieLayout>
  );
}
