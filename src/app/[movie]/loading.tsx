// app/[movie]/loading.tsx
import MovieLayout from "../components/layout/MovieLayout";

export default function LoadingMoviePage() {
  return (
    <MovieLayout>
      <main className="bg-[#1a0000] text-white min-h-screen flex flex-col items-center justify-center gap-4 p-6">
        {/* Skeleton for image */}
        <div className="w-full max-w-5xl h-[500px] bg-gray-800 animate-pulse rounded-2xl mb-6" />

        {/* Skeleton for title */}
        <div className="w-3/4 h-8 bg-gray-700 animate-pulse rounded mb-4" />

        {/* Skeleton for plot */}
        <div className="w-full h-20 bg-gray-700 animate-pulse rounded mb-4" />

        {/* Skeleton for ratings and metadata */}
        <div className="flex flex-col gap-2 w-1/2 ">
          <div className="h-4 bg-gray-700 animate-pulse rounded" />
          <div className="h-4 bg-gray-700 animate-pulse rounded" />
          <div className="h-4 bg-gray-700 animate-pulse rounded" />
        </div>

        {/* Skeleton buttons */}
        <div className="flex gap-4 mt-6">
          <div className="w-32 h-10 bg-gray-700 animate-pulse rounded-lg" />
          <div className="w-32 h-10 bg-gray-700 animate-pulse rounded-lg" />
        </div>
      </main>
    </MovieLayout>
  );
}
