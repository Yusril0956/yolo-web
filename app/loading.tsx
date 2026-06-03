export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-6xl space-y-8">
        <div className="space-y-4">
          <div className="h-6 w-40 rounded-full bg-white/10 animate-pulse" />
          <div className="h-16 w-full max-w-3xl rounded-3xl bg-white/10 animate-pulse" />
          <div className="h-6 w-full max-w-2xl rounded-full bg-white/10 animate-pulse" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-72 rounded-3xl border border-white/10 bg-white/5 animate-pulse" />
          <div className="h-72 rounded-3xl border border-white/10 bg-white/5 animate-pulse" />
        </div>
      </div>
    </main>
  );
}
