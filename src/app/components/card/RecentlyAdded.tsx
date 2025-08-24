"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MovieCard({ movie }: { movie: any }) {
  const [active, setActive] = useState(false);

  return (
    <Link href={`/${movie._id}`} onClick={() => setActive(true)}>
      <div className="mt-3">
        <div className="relative w-[120px] md:w-[180px] lg:w-[200px] flex-shrink-0">
          {/* Rating Badge */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md z-10">
            {movie.rating?.toFixed(1) ?? "N/A"}
          </div>

          {/* Image Card with active border */}
          <div
            className={`relative h-[180px] md:h-[270px] lg:h-[300px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition
              ${
                active
                  ? "border-4 border-yellow-400"
                  : "border-4 border-transparent"
              }`}
          >
            <Image
              src={movie.img}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 180px, (max-width: 1024px) 200px, 300px"
            />
          </div>

          {/* Title */}
          <div className="mt-2 px-2 py-1 rounded-lg text-white text-xs font-normal font-arvo text-left">
            {movie.title}
          </div>
        </div>
      </div>
    </Link>
  );
}
