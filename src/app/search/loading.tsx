import {
  CarouselSkeleton,
  SearchSkeleton,
  WideCardSkeleton,
} from "../components/Skeletons";

export default function LoadingPage() {
  return (
    <main className="bg-[#1a0000] text-white min-h-screen p-6">
      <section className="mb-10">
        <CarouselSkeleton />
      </section>
      <section className="mb-10">
        <SearchSkeleton count={4} />
      </section>
      <section className="mb-10">
        <SearchSkeleton count={4} />
      </section>
    </main>
  );
}
