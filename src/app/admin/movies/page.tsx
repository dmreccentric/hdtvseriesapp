// import Image from "next/image";
// import Link from "next/link";

// interface Movie {
//   _id: string;
//   title: string;
//   img: string;
//   rating?: number;
//   released?: number;
//   language?: string;
//   genres?: string[];
//   plot?: string;
//   trailer?: string;
//   link?: string;
// }

// const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// export default async function MoviePage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   let movie: Movie | null = null;
//   let error: string | null = null;

//   try {
//     const res = await fetch(`${API_BASE}/api/v1/movie/${id}`, {
//       cache: "no-store",
//     });
//     if (!res.ok) throw new Error("Failed to fetch movie");
//     const raw = await res.json();
//     movie = raw.movie || null;
//   } catch (err: any) {
//     error = err.message || "Something went wrong";
//   }

//   if (error || !movie) {
//     return (
//       <main className="bg-[#1a0000] text-white min-h-screen flex items-center justify-center">
//         <p className="text-red-500 font-semibold">
//           {error || "Movie not found"}
//         </p>
//       </main>
//     );
//   }

//   return (
//     <main className="bg-[#1a0000] text-white min-h-screen p-6">
//       <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
//         {/* Movie Poster */}
//         <div className="relative w-full h-[500px]">
//           <Image
//             src={movie.img}
//             alt={movie.title}
//             fill
//             className="object-cover rounded-2xl"
//           />
//         </div>

//         {/* Movie Info */}
//         <div>
//           <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
//           {movie.rating && (
//             <p className="mb-2 text-lg">⭐ {movie.rating.toFixed(1)}</p>
//           )}
//           {movie.released && <p className="mb-2">Released: {movie.released}</p>}
//           {movie.language && <p className="mb-2">Language: {movie.language}</p>}
//           {movie.genres && movie.genres.length > 0 && (
//             <p className="mb-4">Genres: {movie.genres.join(", ")}</p>
//           )}

//           {movie.plot && <p className="mb-6 text-gray-300">{movie.plot}</p>}

//           {/* Watch Links */}
//           <div className="flex gap-4">
//             {movie.trailer && (
//               <a
//                 href={movie.trailer}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
//               >
//                 ▶ Watch Trailer
//               </a>
//             )}
//             {movie.link && (
//               <a
//                 href={movie.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold"
//               >
//                 🎬 Watch Movie
//               </a>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Back button */}
//       <div className="mt-10 text-center">
//         <Link href="/" className="underline hover:text-red-400">
//           ← Back to Home
//         </Link>
//       </div>
//     </main>
//   );
// }

import Image from "next/image";
import Link from "next/link";

interface Movie {
  _id: string;
  title: string;
  img: string;
  rating?: number;
  released?: number;
  language?: string;
  genres?: string[];
  plot?: string;
  trailer?: string;
  link?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  let movie: Movie | null = null;
  let error: string | null = null;

  try {
    const res = await fetch(`${API_BASE}/api/v1/movie/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch movie");
    const raw = await res.json();
    movie = raw.movie || null;
  } catch (err: any) {
    error = err.message || "Something went wrong";
  }

  if (error || !movie) {
    return (
      <main className="bg-[#1a0000] text-white min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold">
          {error || "Movie not found"}
        </p>
      </main>
    );
  }

  return (
    <main className="bg-[#1a0000] text-white min-h-screen p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Movie Poster */}
        <div className="relative w-full h-[500px]">
          <Image
            src={movie.img}
            alt={movie.title}
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        {/* Movie Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          {movie.rating && (
            <p className="mb-2 text-lg">⭐ {movie.rating.toFixed(1)}</p>
          )}
          {movie.released && <p className="mb-2">Released: {movie.released}</p>}
          {movie.language && <p className="mb-2">Language: {movie.language}</p>}
          {movie.genres && movie.genres.length > 0 && (
            <p className="mb-4">Genres: {movie.genres.join(", ")}</p>
          )}
          {movie.plot && <p className="mb-6 text-gray-300">{movie.plot}</p>}

          {/* Watch Links */}
          <div className="flex gap-4">
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
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold"
              >
                🎬 Watch Movie
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="mt-10 text-center">
        <Link href="/" className="underline hover:text-red-400">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
