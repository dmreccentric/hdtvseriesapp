// components/TrailerImages.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { BsFillPlayBtnFill } from "react-icons/bs";

interface Movie {
  _id: string;
  title: string;
  img: string;
  trailer?: string;
}

export default function TrailerImages({ trailer }: { trailer: Movie[] }) {
  return (
    <>
      {trailer.map((trailer) => (
        <div key={trailer._id} className="flex flex-col items-start">
          <Link
            href={`${trailer.trailer}`}
            className="relative h-[160px]  overflow-hidden flex"
          >
            <Image
              src={
                trailer.img ||
                "https://res.cloudinary.com/dzhhpr7f1/image/upload/v1755449997/images-not-found_qq0m2f.jpg"
              }
              alt={trailer.title}
              fill
              sizes=""
              className="object-fill rounded-2xl"
            />

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <BsFillPlayBtnFill className="text-4xl text-gray-200 " />
            </div>
          </Link>
          <div className="mt-2 px-2 py-1 rounded-lg text-white text-xs font-normal font-arvo text-left">
            {trailer.title}
          </div>
        </div>
      ))}
    </>
  );
}
