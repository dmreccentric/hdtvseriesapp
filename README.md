This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import Carousel from "./components/Carousel"; // client component
// import MainLayout from "./components/MainLayout";
// import { IoPlayCircleOutline } from "react-icons/io5";
// import CardHeading from "./components/CardHeading";
// import { useEffect, useState } from "react";

// interface Movie {
// \_id: string;
// title: string;
// img: string;
// himg?: string;
// rating?: number;
// trailer?: string;
// createdAt?: string;
// released?: number;
// }

// const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// export default function HomePage() {
// const [movies, setMovies] = useState<Movie[]>([]);
// const [error, setError] = useState<string | null>(null);

// useEffect(() => {
// const fetchMovies = async () => {
// try {
// const res = await fetch(`${API_BASE}/api/v1/movie`, {
// cache: "no-store",
// });
// if (!res.ok) throw new Error("Failed to fetch movies");
// const raw = await res.json();
// setMovies(raw.movies || []);
// } catch (err: any) {
// setError(err.message || "Something went wrong");
// }
// };

// fetchMovies();
// }, []);

// if (error) {
// return (
// <MainLayout>
// <main className="bg-[#1a0000] text-white min-h-screen flex items-center justify-center">
// <p className="text-red-500 font-semibold">{error}</p>
// console.log(console.error(); );
// </main>
// </MainLayout>
// );
// }

// const carouselMovies = movies.sort(() => 0.5 - Math.random()).slice(0, 5);
// const popularMovies = movies
// .filter((m) => typeof m.rating === "number")
// .sort((a, b) => (b.rating || 0) - (a.rating || 0))
// .slice(0, 9);
// const trailers = movies.filter((m) => m.trailer).slice(0, 10);
// const recentlyAdded = [...movies]
// .sort((a, b) => {
// const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
// const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
// return bDate - aDate;
// })
// .slice(0, 10);
// const newReleases = [...movies]
// .filter((m) => typeof m.released === "number") // only movies with a year
// .sort((a, b) => (b.released || 0) - (a.released || 0))
// .slice(0, 10); // adjust number as needed
// return (
// <MainLayout>
// <main className="bg-[#1a0000] text-white min-h-screen">
// {/_ Swiper Carousel _/}
// <section className="mb-10">
// <Carousel movies={carouselMovies} />
// </section>

// {/_ Popular Right Now _/}
// <section className="mb-10 pt-4 border-b-1 border-t-2">
// <CardHeading title="POPULAR TV SHOWS" />
// <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar">
// {popularMovies.map((movie) => (
// <Link key={movie.\_id} href={`/${movie._id}`}>
// <div className="bg-[#2a0000] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition relative h-[180px] w-[120px] shrink-0">
// <Image
// src={movie.img}
// alt={movie.title}
// fill
// sizes="(max-width: 768px) 150px, (max-width: 1200px) 200px, 300px"
// className="object-fill"
// />

// <div className="p-2 text-sm">
// ⭐ {movie.rating?.toFixed(1) ?? "N/A"}
// </div>
// </div>
// </Link>
// ))}
// </div>
// </section>

// {/_ Trailers _/}
// <section className="mb-10 border-b-1">
// <CardHeading title="TRAILERS" />
// <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth no-scrollbar">
// {trailers.map((movie) => (
// <Link key={movie.\_id} href={`${movie.trailer}`}>
// <div
// key={movie.\_id}
// className="relative w-[350px] md:w-[350px] lg:w-[400px] h-[200px] md:h-[250px] lg:h-[300px] flex-shrink-0 overflow-hidden shadow-lg hover:scale-105 transition"
// >
// <Image
// src={
// movie.himg ||
// "https://res.cloudinary.com/dzhhpr7f1/image/upload/v1755449997/images-not-found_qq0m2f.jpg"
// }
// alt={movie.title}
// fill
// sizes="(max-width: 768px) 250px, (max-width: 1024px) 300px, 350px"
// className="object-cover"
// />

// <div className="absolute bottom-2 right-[-20%] -translate-x-1/2  px-3 py-1 rounded-lg items-center text-white text-sm font-semibold flex space-x-2">
// <IoPlayCircleOutline className="text-yellow-500 text-4xl font-bold" />
// <span> WATCH TRAILER</span>
// </div>
// </div>
// </Link>
// ))}
// </div>
// </section>

// {/_ New Releases _/}

// <section className="mb-10">
// <CardHeading title="RECENTLY ADDED" />
// <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth no-scrollbar">
// {recentlyAdded.map((movie) => (
// <Link key={movie.\_id} href={`/${movie._id}`}>
// <div className="mt-3">
// <div className="relative w-[120px] md:w-[180px] lg:w-[200px] flex-shrink-0">
// {/_ Rating badge _/}
// <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md z-10">
// {movie.rating?.toFixed(1) ?? "N/A"}
// </div>

// {/_ Image _/}
// <div className="relative h-[180px] md:h-[270px] lg:h-[300px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition">
// <Image
// src={movie.img}
// alt={movie.title}
// fill
// className="object-cover"
// sizes="(max-width: 768px) 180px, (max-width: 1024px) 200px, 300px"
// />
// </div>

// {/_ Title _/}
// <div className="mt-2 px-2 py-1 rounded-lg text-white text-xs font-normal font-arvo text-left">
// {movie.title}
// </div>
// </div>
// </div>
// </Link>
// ))}
// </div>
// </section>
// <section className="mb-10">
// <CardHeading title="NEWLY RELEASED" />
// <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth no-scrollbar">
// {newReleases.map((movie) => (
// <Link key={movie.\_id} href={`/${movie._id}`}>
// <div className="mt-3">
// <div className="relative w-[120px] md:w-[180px] lg:w-[200px] flex-shrink-0">
// {/_ Top badges in flex row _/}
// <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
// <div className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
// {movie.rating?.toFixed(1) ?? "N/A"}
// </div>
// <div className="bg-white text-black text-xs font-semibold px-1 place-content-center rounded-full shadow-md">
// {movie.released}
// </div>
// </div>

// {/_ Image _/}
// <div className="relative h-[180px] md:h-[270px] lg:h-[300px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition">
// <Image
// src={movie.img}
// alt={movie.title}
// fill
// className="object-cover"
// sizes="(max-width: 768px) 180px, (max-width: 1024px) 200px, 300px"
// />
// </div>

// {/_ Title _/}
// <div className="mt-2 px-2 py-1 rounded-lg text-white text-xs  text-left font-arvo">
// {movie.title}
// </div>
// </div>
// </div>
// </Link>
// ))}
// </div>
// </section>
// </main>
// </MainLayout>
// );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MovieLayout from "../components/MovieLayout";
import { Star } from "lucide-react";

interface Movie {
\_id: string;
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
