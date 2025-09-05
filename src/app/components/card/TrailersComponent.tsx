"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoPlayCircleOutline } from "react-icons/io5";

export default function MovieCard({ movie }: { movie: any }) {
  const [active, setActive] = useState(false);

  return (
    <Link href={`${movie.trailer}`} onClick={() => setActive(true)}>
      <div
        className={`relative w-[350px] md:w-[350px] lg:w-[400px] h-[200px] md:h-[250px] lg:h-[300px] flex-shrink-0 overflow-hidden shadow-lg hover:scale-105 transition
          ${
            active
              ? "border-4 border-yellow-400"
              : "border-4 border-transparent"
          }`}
      >
        <Image
          src={
            movie.himg ||
            "https://res.cloudinary.com/dzhhpr7f1/image/upload/v1755449997/images-not-found_qq0m2f.jpg"
          }
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 250px, (max-width: 1024px) 300px, 350px"
          className="object-fill"
        />

        {/* Watch Trailer Button */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/50 px-3 py-2 rounded-lg text-white text-sm font-semibold">
          <IoPlayCircleOutline className="text-yellow-500 text-3xl" />
          <span>WATCH TRAILER</span>
        </div>
      </div>
    </Link>
  );
}
