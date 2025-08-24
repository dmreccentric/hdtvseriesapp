"use client";

export function CarouselSkeleton() {
  return (
    <div className="w-full h-[420px] md:h-[470px] lg:h-[500px] bg-gray-800 animate-pulse rounded-2xl" />
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-[180px] w-[120px] bg-gray-800 animate-pulse rounded-2xl shrink-0"
        />
      ))}
    </div>
  );
}
export function SearchSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-[70px] w-[25%] bg-gray-800 animate-pulse rounded-2xl shrink-0"
        />
      ))}
    </div>
  );
}
export function AdminMovieSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-200 rounded-xl overflow-hidden shadow"
        >
          {/* Image placeholder */}
          <div className="h-48 bg-gray-300"></div>
          <div className="p-3 space-y-2">
            {/* Title placeholder */}
            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            {/* Genres placeholder */}
            <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
            {/* Rating placeholder */}
            <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function WideCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-[200px] w-[360px] md:w-[400px] bg-gray-800 animate-pulse shrink-0"
        />
      ))}
    </div>
  );
}
