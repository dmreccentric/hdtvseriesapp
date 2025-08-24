import MovieGrid from "./MovieGrid";
import SearchLayout from "../components/layout/SearchLayout";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

async function getMovies() {
  try {
    const res = await fetch(`${API_BASE}/api/v1/movie`, {
      cache: "no-store", // always fresh
    });

    if (!res.ok) throw new Error("Failed to fetch movies");

    const raw = await res.json();
    return raw.movies || [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function SearchPage() {
  const movies = await getMovies();

  return (
    <SearchLayout>
      <div className="p-4 bg-[#1a0000] min-h-screen text-white">
        <h1 className="text-lg font-bold mb-4">Available TV Shows</h1>
        <MovieGrid movies={movies} />
      </div>
    </SearchLayout>
  );
}
