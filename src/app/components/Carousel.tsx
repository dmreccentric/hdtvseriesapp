"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Movie {
  _id: string;
  title: string;
  img: string;
}

interface CarouselProps {
  movies: Movie[];
}

export default function Carousel({ movies }: CarouselProps) {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
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
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Style navigation + pagination */}
      <style jsx global>{`
        /* Pagination (dots) */
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
          background: #ef4444; /* red-500 */
        }

        /* Navigation arrows */
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

        /* Remove Swiper's huge default arrow icons */
        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 16px !important;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
