"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MovieCard({ movie }: { movie: any }) {
  const [active, setActive] = useState(false);

  return (
    <Link href={`/${movie._id}`} onClick={() => setActive(true)}>
      <div
        className={`rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition relative h-[180px] w-[120px] shrink-0 
        ${active ? "border-4 border-yellow-400" : "border-transparent "} 
        bg-[#2a0000]`}
      >
        <Image
          src={movie.img}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 150px, (max-width: 1200px) 200px, 300px"
          className="object-fill"
        />
        <div className="p-2 text-sm">
          ⭐ {movie.rating?.toFixed(1) ?? "N/A"}
        </div>
      </div>
    </Link>
  );
}
