import {
  CarouselSkeleton,
  GridSkeleton,
  WideCardSkeleton,
} from "./components/Skeletons";

export default function LoadingPage() {
  return (
    <main className="bg-[#1a0000] text-white min-h-screen p-6">
      <section className="mb-10">
        <CarouselSkeleton />
      </section>
      <section className="mb-10">
        <GridSkeleton count={9} />
      </section>
      <section className="mb-10">
        <WideCardSkeleton count={2} />
      </section>
      <section className="mb-10">
        <GridSkeleton count={9} />
      </section>
    </main>
  );
}
