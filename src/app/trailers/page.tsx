import MovieLayout from "../components/layout/MovieLayout";
import TrailerComp from "../components/client/TrailerComp";

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

export default async function TrailersIndex() {
  return (
    <MovieLayout>
      <main className="bg-[#1a0000] text-white min-h-screen ">
        <h1 className="text-3xl font-light mb-0 text-white font-arvo py-4 underline px-5">
          WATCH TRAILER
        </h1>
        <hr className="pb-5  " />
        <div className="">
          <TrailerComp />
        </div>
      </main>
    </MovieLayout>
  );
}
