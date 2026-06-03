"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="max-w-xl rounded-3xl border border-red-500/20 bg-red-950/30 p-8 shadow-2xl shadow-black/30">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-red-200/80">
          Notion setup error
        </p>
        <h1 className="mt-4 text-2xl font-semibold text-white">
          Data Notion belum bisa dimuat.
        </h1>
        <p className="mt-3 leading-7 text-red-100/80">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-white/90"
        >
          Coba lagi
        </button>
      </div>
    </main>
  );
}
