import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function KegiatanLoading() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <section className="bg-[#fbf8ff]">
        <div className="mx-auto max-w-[1280px] px-4 py-16 md:px-16 md:py-20">
          <div className="mb-10 max-w-3xl">
            <div className="mb-5 h-8 w-36 animate-pulse rounded-full bg-[#e0e0ff]" />

            <div className="h-12 w-full max-w-xl animate-pulse rounded-2xl bg-[#e0e0ff] md:h-14" />

            <div className="mt-5 space-y-3">
              <div className="h-5 w-full max-w-2xl animate-pulse rounded-full bg-[#e0e0ff]" />
              <div className="h-5 w-full max-w-xl animate-pulse rounded-full bg-[#e0e0ff]" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ActivitySkeleton key={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ActivitySkeleton() {
  return (
    <article className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-[#e0e0ff]">
      <div className="h-56 animate-pulse bg-[#e0e0ff]" />

      <div className="p-6">
        <div className="mb-4 h-7 w-3/4 animate-pulse rounded-full bg-[#e0e0ff]" />

        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded-full bg-[#e0e0ff]" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-[#e0e0ff]" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-[#e0e0ff]" />
        </div>

        <div className="mt-6 grid gap-3">
          <div className="h-5 w-40 animate-pulse rounded-full bg-[#e0e0ff]" />
          <div className="h-5 w-48 animate-pulse rounded-full bg-[#e0e0ff]" />
        </div>

        <div className="mt-6 flex gap-3">
          <div className="h-11 w-32 animate-pulse rounded-full bg-[#e0e0ff]" />
          <div className="h-11 w-28 animate-pulse rounded-full bg-[#e0e0ff]" />
        </div>
      </div>
    </article>
  );
}