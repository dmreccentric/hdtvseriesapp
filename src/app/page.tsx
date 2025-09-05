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
  released?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
console.log("API_BASE:", API_BASE);

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
// async function getNewMovies(): Promise<Movie[]> {
//   try {
//     const res = await fetch(`${API_BASE}/api/v1/newmovie`, {
//       cache: "no-store", // ensures always fresh
//     });

//     if (!res.ok) throw new Error("Failed to fetch movies");

//     const raw = await res.json();
//     return raw.movies || [];

//     console.log("NewMovie API response:", raw);
//   } catch (err) {
//     console.error("getNewMovies error:", err);
//     return [];
//   }
// }

export default async function HomePage() {
  const movies = await getMovies();
  // const newMovies = await getNewMovies();
  // console.log(newMovies);

  // Slice & sort like before
  const carouselMovies = movies.sort(() => 0.5 - Math.random()).slice(0, 5);
  const popularMovies = movies
    .filter((m) => typeof m.rating === "number")
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 9);
  const trailers = movies.filter((m) => m.trailer).slice(0, 10);
  // const recentlyAdded = [...newMovies].slice(0, 10);
  const newReleases = [...movies]
    .filter((m) => m.released && !isNaN(new Date(m.released).getTime())) // ✅ only valid dates
    .sort(
      (a, b) =>
        new Date(b.released!).getTime() - new Date(a.released!).getTime()
    ) // ✅ newest first
    .slice(0, 10)
    .map((m) => ({
      ...m,
      released: new Date(m.released!).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }));

  return (
    <MainLayout>
      <main className="bg-[#1a0000] text-white min-h-screen">
        {/* Swiper Carousel */}
        <section className="mb-10">
          <Carousel movies={carouselMovies} />
        </section>

        {/* Popular Right Now */}
        <section className="mb-10 pt-4 border-b-1 border-t-2">
          <CardHeading title="POPULAR TV SHOWS" link="/series" tab="topRated" />
          <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar">
            {popularMovies.map((movie) => (
              <PopularMovies key={movie._id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Trailers */}
        <section className="mb-10 border-b-1">
          <CardHeading title="TRAILERS" link="/trailers" />
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth no-scrollbar">
            {trailers.map((movie) => (
              <Trailers key={movie._id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Recently Added */}
        <section className="mb-10">
          <CardHeading title="RECENTLY ADDED" link="/series" tab="recent" />
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth no-scrollbar">
            <RecentlyAdded />
          </div>
        </section>

        {/* Newly Released */}
        <section className="mb-10">
          <CardHeading title="NEWLY RELEASED" link="/series" tab="newRelease" />
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
