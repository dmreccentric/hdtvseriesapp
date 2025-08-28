import {
  CarouselSkeleton,
  GridSkeleton,
  WideCardSkeleton,
} from "../components/Skeletons";

export default function LoadingPage() {
  return (
    <main className="bg-[#1a0000] text-white min-h-screen p-6">
      <div className="w-[70%] h-6 bg-gray-800 animate-pulse rounded-2xl px-5 pt-22 mb-12" />
      <section className="mb-10">
        <GridSkeleton count={4} />
      </section>
      <section className="mb-10">
        <GridSkeleton count={4} />
      </section>
    </main>
  );
}
