import Link from "next/link";
import Image from "next/image";

interface Movie {
  _id: string;
  title: string;
  subtitle: string;
  img: string;
  himg?: string;
  rating?: number;
  trailer?: string;
  createdAt?: string;
  released?: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

async function getNewMovies(): Promise<Movie[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/newmovie`, {
      cache: "no-store", // ensures always fresh
    });

    if (!res.ok) throw new Error("Failed to fetch movies");

    const raw = await res.json();
    const movies: Movie[] = raw.movies || [];

    // ✅ sort by createdAt (most recent first)
    return movies.sort((a, b) => {
      const dateA = new Date(a.createdAt ?? 0).getTime();
      const dateB = new Date(b.createdAt ?? 0).getTime();
      return dateB - dateA;
    });
  } catch (err) {
    console.error("getNewMovies error:", err);
    return [];
  }
}

function toTitleCase(str: string) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function MovieCard() {
  const NewMovie = await getNewMovies();

  if (NewMovie.length === 0) return <div>No movies found</div>;

  return (
    <>
      {NewMovie.map((movie) => (
        <Link key={movie._id} href={`/${movie._id}?source=newmovie`}>
          <div className="mt-3">
            <div className="relative w-[120px] md:w-[180px] lg:w-[200px] flex-shrink-0">
              {/* Rating Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md z-10">
                {movie.rating?.toFixed(1) ?? "N/A"}
              </div>

              {/* Image Card with active border */}
              <div
                className={`relative h-[180px] md:h-[270px] lg:h-[300px] rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition
              `}
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
              <div className="mt-2 px-2 py-1 rounded-lg  text-sm font-normal font-arvo text-left text-red-600">
                {toTitleCase(movie.title)}
              </div>
              {/* Sub Title */}
              <div className="mt-2 px-2 py-1 rounded-lg text-white text-[10px] font-normal font-arvo text-left">
                {toTitleCase(movie.subtitle)}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
