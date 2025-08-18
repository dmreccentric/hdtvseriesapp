// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import Carousel from "./components/Carousel"; // client component
// import MainLayout from "./components/MainLayout";
// import { IoPlayCircleOutline } from "react-icons/io5";
// import CardHeading from "./components/CardHeading";
// import { useEffect, useState } from "react";

// interface Movie {
//   _id: string;
//   title: string;
//   img: string;
//   himg?: string;
//   rating?: number;
//   trailer?: string;
//   createdAt?: string;
//   released?: number;
// }

// const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// export default function HomePage() {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const res = await fetch(`${API_BASE}/api/v1/movie`, {
//           cache: "no-store",
//         });
//         if (!res.ok) throw new Error("Failed to fetch movies");
//         const raw = await res.json();
//         setMovies(raw.movies || []);
//       } catch (err: any) {
//         setError(err.message || "Something went wrong");
//       }
//     };

//     fetchMovies();
//   }, []);

//   if (error) {
//     return (
//       <MainLayout>
//         <main className="bg-[#1a0000] text-white min-h-screen flex items-center justify-center">
//           <p className="text-red-500 font-semibold">{error}</p>
//           console.log(console.error(); );
//         </main>
//       </MainLayout>
//     );
//   }

//   const carouselMovies = movies.sort(() => 0.5 - Math.random()).slice(0, 5);
//   const popularMovies = movies
//     .filter((m) => typeof m.rating === "number")
//     .sort((a, b) => (b.rating || 0) - (a.rating || 0))
//     .slice(0, 9);
//   const trailers = movies.filter((m) => m.trailer).slice(0, 10);
//   const recentlyAdded = [...movies]
//     .sort((a, b) => {
//       const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
//       const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
//       return bDate - aDate;
//     })
//     .slice(0, 10);
//   const newReleases = [...movies]
//     .filter((m) => typeof m.released === "number") // only movies with a year
//     .sort((a, b) => (b.released || 0) - (a.released || 0))
//     .slice(0, 10); // adjust number as needed
//   return (
//     <MainLayout>
//       <main className="bg-[#1a0000] text-white min-h-screen">
//         {/* Swiper Carousel */}
//         <section className="mb-10">
//           <Carousel movies={carouselMovies} />
//         </section>

//         {/* Popular Right Now */}
//         <section className="mb-10 pt-4 border-b-1 border-t-2">
//           <CardHeading title="POPULAR TV SHOWS" />
//           <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar">
//             {popularMovies.map((movie) => (
//               <Link key={movie._id} href={`/${movie._id}`}>
//                 <div className="bg-[#2a0000] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition relative h-[180px] w-[120px] shrink-0">
//                   <Image
//                     src={movie.img}
//                     alt={movie.title}
//                     fill
//                     sizes="(max-width: 768px) 150px, (max-width: 1200px) 200px, 300px"
//                     className="object-fill"
//                   />

//                   <div className="p-2 text-sm">
//                     ⭐ {movie.rating?.toFixed(1) ?? "N/A"}
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>

//         {/* Trailers */}
//         <section className="mb-10 border-b-1">
//           <CardHeading title="TRAILERS" />
//           <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth no-scrollbar">
//             {trailers.map((movie) => (
//               <Link key={movie._id} href={`${movie.trailer}`}>
//                 <div
//                   key={movie._id}
//                   className="relative w-[350px] md:w-[350px] lg:w-[400px] h-[200px] md:h-[250px] lg:h-[300px] flex-shrink-0  overflow-hidden shadow-lg hover:scale-105 transition"
//                 >
//                   <Image
//                     src={
//                       movie.himg ||
//                       "https://res.cloudinary.com/dzhhpr7f1/image/upload/v1755449997/images-not-found_qq0m2f.jpg"
//                     }
//                     alt={movie.title}
//                     fill
//                     sizes="(max-width: 768px) 250px, (max-width: 1024px) 300px, 350px"
//                     className="object-cover"
//                   />

//                   <div className="absolute bottom-2 right-[-20%] -translate-x-1/2  px-3 py-1 rounded-lg items-center text-white text-sm font-semibold flex space-x-2">
//                     <IoPlayCircleOutline className="text-yellow-500 text-4xl font-bold" />
//                     <span> WATCH TRAILER</span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>

//         {/* New Releases */}

//         <section className="mb-10">
//           <CardHeading title="RECENTLY ADDED" />
//           <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth no-scrollbar">
//             {recentlyAdded.map((movie) => (
//               <Link key={movie._id} href={`/${movie._id}`}>
//                 <div className="mt-3">
//                   <div className="relative w-[120px] md:w-[180px] lg:w-[200px] flex-shrink-0">
//                     {/* Rating badge */}
//                     <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md z-10">
//                       {movie.rating?.toFixed(1) ?? "N/A"}
//                     </div>

//                     {/* Image */}
//                     <div className="relative h-[180px] md:h-[270px] lg:h-[300px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition">
//                       <Image
//                         src={movie.img}
//                         alt={movie.title}
//                         fill
//                         className="object-cover"
//                         sizes="(max-width: 768px) 180px, (max-width: 1024px) 200px, 300px"
//                       />
//                     </div>

//                     {/* Title */}
//                     <div className="mt-2 px-2 py-1 rounded-lg text-white text-xs font-normal font-arvo text-left">
//                       {movie.title}
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>
//         <section className="mb-10">
//           <CardHeading title="NEWLY RELEASED" />
//           <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth no-scrollbar">
//             {newReleases.map((movie) => (
//               <Link key={movie._id} href={`/${movie._id}`}>
//                 <div className="mt-3">
//                   <div className="relative w-[120px] md:w-[180px] lg:w-[200px] flex-shrink-0">
//                     {/* Top badges in flex row */}
//                     <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
//                       <div className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
//                         {movie.rating?.toFixed(1) ?? "N/A"}
//                       </div>
//                       <div className="bg-white text-black text-xs font-semibold px-1 place-content-center rounded-full shadow-md">
//                         {movie.released}
//                       </div>
//                     </div>

//                     {/* Image */}
//                     <div className="relative h-[180px] md:h-[270px] lg:h-[300px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition">
//                       <Image
//                         src={movie.img}
//                         alt={movie.title}
//                         fill
//                         className="object-cover"
//                         sizes="(max-width: 768px) 180px, (max-width: 1024px) 200px, 300px"
//                       />
//                     </div>

//                     {/* Title */}
//                     <div className="mt-2 px-2 py-1 rounded-lg text-white text-xs  text-left font-arvo">
//                       {movie.title}
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>
//       </main>
//     </MainLayout>
//   );
// }

import Link from "next/link";
import Image from "next/image";
import Carousel from "./components/Carousel"; // client component
import MainLayout from "./components/MainLayout";
import { IoPlayCircleOutline } from "react-icons/io5";
import CardHeading from "./components/CardHeading";

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

async function getMovies(): Promise<Movie[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/movie`, {
      cache: "no-store", // ensures always fresh
    });

    if (!res.ok) throw new Error("Failed to fetch movies");

    const raw = await res.json();
    return raw.movies || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function HomePage() {
  const movies = await getMovies();

  // Slice & sort like before
  const carouselMovies = movies.sort(() => 0.5 - Math.random()).slice(0, 5);
  const popularMovies = movies
    .filter((m) => typeof m.rating === "number")
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 9);
  const trailers = movies.filter((m) => m.trailer).slice(0, 10);
  const recentlyAdded = [...movies]
    .sort((a, b) => {
      const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bDate - aDate;
    })
    .slice(0, 10);
  const newReleases = [...movies]
    .filter((m) => typeof m.released === "number")
    .sort((a, b) => (b.released || 0) - (a.released || 0))
    .slice(0, 10);

  return (
    <MainLayout>
      <main className="bg-[#1a0000] text-white min-h-screen">
        {/* Swiper Carousel */}
        <section className="mb-10">
          <Carousel movies={carouselMovies} />
        </section>

        {/* Popular Right Now */}
        <section className="mb-10 pt-4 border-b-1 border-t-2">
          <CardHeading title="POPULAR TV SHOWS" />
          <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar">
            {popularMovies.map((movie) => (
              <Link key={movie._id} href={`/${movie._id}`}>
                <div className="bg-[#2a0000] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition relative h-[180px] w-[120px] shrink-0">
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
            ))}
          </div>
        </section>

        {/* Trailers */}
        <section className="mb-10 border-b-1">
          <CardHeading title="TRAILERS" />
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth no-scrollbar">
            {trailers.map((movie) => (
              <Link key={movie._id} href={`${movie.trailer}`}>
                <div className="relative w-[350px] md:w-[350px] lg:w-[400px] h-[200px] md:h-[250px] lg:h-[300px] flex-shrink-0 overflow-hidden shadow-lg hover:scale-105 transition">
                  <Image
                    src={
                      movie.himg ||
                      "https://res.cloudinary.com/dzhhpr7f1/image/upload/v1755449997/images-not-found_qq0m2f.jpg"
                    }
                    alt={movie.title}
                    fill
                    sizes="(max-width: 768px) 250px, (max-width: 1024px) 300px, 350px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 right-[-20%] -translate-x-1/2 px-3 py-1 rounded-lg items-center text-white text-sm font-semibold flex space-x-2">
                    <IoPlayCircleOutline className="text-yellow-500 text-4xl font-bold" />
                    <span> WATCH TRAILER</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recently Added */}
        <section className="mb-10">
          <CardHeading title="RECENTLY ADDED" />
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth no-scrollbar">
            {recentlyAdded.map((movie) => (
              <Link key={movie._id} href={`/${movie._id}`}>
                <div className="mt-3">
                  <div className="relative w-[120px] md:w-[180px] lg:w-[200px] flex-shrink-0">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md z-10">
                      {movie.rating?.toFixed(1) ?? "N/A"}
                    </div>
                    <div className="relative h-[180px] md:h-[270px] lg:h-[300px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition">
                      <Image
                        src={movie.img}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 180px, (max-width: 1024px) 200px, 300px"
                      />
                    </div>
                    <div className="mt-2 px-2 py-1 rounded-lg text-white text-xs font-normal font-arvo text-left">
                      {movie.title}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Newly Released */}
        <section className="mb-10">
          <CardHeading title="NEWLY RELEASED" />
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth no-scrollbar">
            {newReleases.map((movie) => (
              <Link key={movie._id} href={`/${movie._id}`}>
                <div className="mt-3">
                  <div className="relative w-[120px] md:w-[180px] lg:w-[200px] flex-shrink-0">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
                      <div className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                        {movie.rating?.toFixed(1) ?? "N/A"}
                      </div>
                      <div className="bg-white text-black text-xs font-semibold px-1 place-content-center rounded-full shadow-md">
                        {movie.released}
                      </div>
                    </div>
                    <div className="relative h-[180px] md:h-[270px] lg:h-[300px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition">
                      <Image
                        src={movie.img}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 180px, (max-width: 1024px) 200px, 300px"
                      />
                    </div>
                    <div className="mt-2 px-2 py-1 rounded-lg text-white text-xs text-left font-arvo">
                      {movie.title}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
