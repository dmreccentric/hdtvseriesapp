"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { toTitleCase } from "./card/RecentlyAdded";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Movie {
  _id: string;
  title: string;
  img: string;
  plot?: string;
  rating?: number;
  released?: string;
  genres?: string[];
}

interface CarouselProps {
  movies: Movie[];
}

export default function Carousel({ movies }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Slider Section */}
      <div className="relative w-full md:w-xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          navigation
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-[500px] rounded-2xl overflow-hidden"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie._id}>
              <Link href={`/${movie._id}`}>
                <div className="relative w-full h-[500px]">
                  <Image
                    src={movie.img}
                    alt={movie.title}
                    fill
                    className="object-fill"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                  <h2 className="absolute bottom-4 left-4 text-lg font-bold text-white">
                    {toTitleCase(movie.title)}
                  </h2>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Details Section (desktop only) */}
      <div className="hidden md:flex md:w-1/3 flex-col justify-center text-white p-4 bg-[#1a0000]/50 rounded-2xl">
        {movies[activeIndex] && (
          <>
            <h2 className="text-2xl font-bold mb-2">
              {toTitleCase(movies[activeIndex].title)}
            </h2>
            <p className="text-sm text-gray-300 mb-4">
              {movies[activeIndex].plot || "No description available."}
            </p>
            <div className="text-sm space-y-1">
              <p>
                <span className="font-semibold">Rating:</span>{" "}
                {movies[activeIndex].rating ?? "N/A"}
              </p>
              <p>
                <span className="font-semibold">Released:</span>{" "}
                {movies[activeIndex].released
                  ? new Date(movies[activeIndex].released).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "Unknown"}
              </p>

              <p>
                <span className="font-semibold">Genres:</span>{" "}
                {movies[activeIndex].genres?.join(", ") || "Not specified"}
              </p>
              <Link
                href={`/${movies[activeIndex]._id}`}
                className="bg-white text-black font-semibold py-2 px-4 rounded-3xl mt-3"
              >
                Watch
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Swiper custom styles */}
      <style jsx global>{`
        .swiper-pagination {
          position: relative !important;
          margin-top: 16px;
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #ccc;
          opacity: 1;
          border-radius: 50%;
        }
        .swiper-pagination-bullet-active {
          background: #ef4444;
        }
        .swiper-button-prev,
        .swiper-button-next {
          color: white;
          width: 36px;
          height: 36px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 9999px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 16px !important;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
