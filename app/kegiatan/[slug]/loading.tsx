import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function KegiatanDetailLoading() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <section className="bg-[#fbf8ff]">
        <div className="mx-auto max-w-[1280px] px-4 py-16 md:px-16 md:py-20">
          <div className="mb-8 h-5 w-44 animate-pulse rounded-full bg-[#e0e0ff]" />

          <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
            <div>
              <div className="mb-5 flex gap-3">
                <div className="h-9 w-28 animate-pulse rounded-full bg-[#e0e0ff]" />
                <div className="h-9 w-28 animate-pulse rounded-full bg-[#e0e0ff]" />
              </div>

              <div className="h-14 w-full max-w-3xl animate-pulse rounded-2xl bg-[#e0e0ff]" />
              <div className="mt-4 h-14 w-full max-w-2xl animate-pulse rounded-2xl bg-[#e0e0ff]" />

              <div className="mt-6 space-y-3">
                <div className="h-5 w-full max-w-3xl animate-pulse rounded-full bg-[#e0e0ff]" />
                <div className="h-5 w-full max-w-2xl animate-pulse rounded-full bg-[#e0e0ff]" />
                <div className="h-5 w-full max-w-xl animate-pulse rounded-full bg-[#e0e0ff]" />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <InfoSkeleton />
                <InfoSkeleton />
              </div>

              <div className="mt-8 flex gap-3">
                <div className="h-12 w-40 animate-pulse rounded-full bg-[#e0e0ff]" />
                <div className="h-12 w-44 animate-pulse rounded-full bg-[#e0e0ff]" />
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-white p-5 shadow-sm ring-1 ring-[#e0e0ff]">
              <div className="h-[420px] animate-pulse rounded-[2rem] bg-[#e0e0ff]" />
            </div>
          </div>

          <section className="mt-16">
            <div className="mb-8 max-w-2xl">
              <div className="mb-4 h-5 w-44 animate-pulse rounded-full bg-[#e0e0ff]" />
              <div className="h-10 w-full max-w-md animate-pulse rounded-2xl bg-[#e0e0ff]" />
              <div className="mt-4 h-5 w-full max-w-xl animate-pulse rounded-full bg-[#e0e0ff]" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-[#e0e0ff]"
                >
                  <div className="h-64 animate-pulse rounded-[1.5rem] bg-[#e0e0ff]" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function InfoSkeleton() {
  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-[#e0e0ff]">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 animate-pulse rounded-2xl bg-[#e0e0ff]" />

        <div className="flex-1">
          <div className="h-4 w-24 animate-pulse rounded-full bg-[#e0e0ff]" />
          <div className="mt-2 h-5 w-36 animate-pulse rounded-full bg-[#e0e0ff]" />
        </div>
      </div>
    </div>
  );
}