import Link from "next/link";
import { Home, Film, Tv, PlayCircle, Sliders } from "lucide-react";

const Nav = () => {
  return (
    <nav className="flex ">
      <Link
        href="/"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition"
      >
        <Home className="h-5 w-5" /> Home
      </Link>
      <Link
        href="/movies"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition"
      >
        <Film className="h-5 w-5" /> Movies
      </Link>
      <Link
        href="/series"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition"
      >
        <Tv className="h-5 w-5" /> Series
      </Link>
      <Link
        href="/trailers"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition"
      >
        <PlayCircle className="h-5 w-5" /> Trailers
      </Link>
      <Link
        href="/search"
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition whitespace-nowrap"
      >
        <Sliders className="h-5 w-5 shrink-0" /> Filter
      </Link>
    </nav>
  );
};

export default Nav;
