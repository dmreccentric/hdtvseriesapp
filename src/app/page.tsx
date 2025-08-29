import Carousel from "./components/Carousel"; // client component
import MainLayout from "./components/layout/MainLayout";
import CardHeading from "./components/CardHeading";
import NewlyReleased from "./components/card/NewlyReleased";
import PopularMovies from "./components/card/PopularMovies";
import RecentlyAdded from "./components/card/RecentlyAdded";
import Trailers from "./components/card/TrailersComponent";

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
              <PopularMovies key={movie._id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Trailers */}
        <section className="mb-10 border-b-1">
          <CardHeading title="TRAILERS" />
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth no-scrollbar">
            {trailers.map((movie) => (
              <Trailers key={movie._id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Recently Added */}
        <section className="mb-10">
          <CardHeading title="RECENTLY ADDED" />
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth no-scrollbar">
            {recentlyAdded.map((movie) => (
              <RecentlyAdded key={movie._id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Newly Released */}
        <section className="mb-10">
          <CardHeading title="NEWLY RELEASED" />
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth no-scrollbar">
            {newReleases.map((movie) => (
              <NewlyReleased key={movie._id} movie={movie} />
            ))}
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
