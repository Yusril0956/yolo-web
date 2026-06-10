import Link from "next/link";
import type { SVGProps } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getYoloActivities } from "@/lib/notion";
import { yoloLinks } from "@/data/yolo";

type IconProps = SVGProps<SVGSVGElement>;

export const revalidate = 300;

export default async function KegiatanPage() {
  const activities = await getYoloActivities();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <section className="bg-[#fbf8ff]">
        <div className="mx-auto max-w-[1280px] px-4 py-16 md:px-16 md:py-20">
          <PageHeader />

          {activities.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}

          <BottomCTA />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function PageHeader() {
  return (
    <div className="mb-10 max-w-3xl">
      <span className="mb-5 inline-block rounded-full bg-[#91f78e] px-4 py-1.5 text-xs font-semibold text-[#00731e]">
        Kegiatan YOLO
      </span>

      <h1 className="text-4xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-5xl">
        Kegiatan dan dokumentasi YOLO.
      </h1>

      <p className="mt-5 max-w-2xl text-lg leading-8 text-[#3f4851]">
        Lihat kegiatan terbaru YOLO, mulai dari program pendidikan, sosial,
        pembinaan, sampai dokumentasi kegiatan yang sudah terlaksana.
      </p>
    </div>
  );
}

function ActivityCard({
  activity,
}: {
  activity: Awaited<ReturnType<typeof getYoloActivities>>[number];
}) {
  const detailUrl = `/kegiatan/${activity.slug}`;

  return (
    <article className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-[#e0e0ff] transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70">
      <Link href={detailUrl} className="block">
        <div className="relative h-56 bg-[#e0e0ff]">
          {activity.poster ? (
            <img
              src={activity.poster}
              alt={activity.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#f4f2ff] p-6 text-center">
              <div>
                <IconImage className="mx-auto h-12 w-12 text-[#006399]" />
                <p className="mt-3 text-sm font-bold text-[#006399]">
                  Poster belum tersedia
                </p>
              </div>
            </div>
          )}

          <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#006399] shadow-sm">
            {activity.category || "Kegiatan"}
          </div>

          <div className="absolute right-5 top-5 rounded-full bg-[#91f78e] px-4 py-2 text-xs font-bold text-[#00731e] shadow-sm">
            {activity.status || "Published"}
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link href={detailUrl}>
          <h2 className="text-2xl font-bold leading-tight text-[#000767] transition hover:text-[#006399]">
            {activity.title}
          </h2>
        </Link>

        <p className="mt-3 line-clamp-3 leading-7 text-[#3f4851]">
          {activity.description || "Deskripsi kegiatan belum tersedia."}
        </p>

        <div className="mt-6 grid gap-3 text-sm font-semibold text-[#3f4851]">
          <div className="flex items-center gap-2">
            <IconCalendar className="h-5 w-5 text-[#df8400]" />
            {activity.date}
          </div>

          <div className="flex items-center gap-2">
            <IconPin className="h-5 w-5 text-[#006e1c]" />
            {activity.location || "Lokasi menyusul"}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={detailUrl}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
          >
            Lihat Detail
            <IconArrowRight className="h-4 w-4" />
          </Link>

          {activity.registrationLink ? (
            <Link
              href={activity.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#f4f2ff] px-5 py-3 text-sm font-bold text-[#006399] transition hover:bg-[#e0e0ff]"
            >
              Daftar
            </Link>
          ) : (
            <Link
              href={yoloLinks.askAdmin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#f4f2ff] px-5 py-3 text-sm font-bold text-[#006399] transition hover:bg-[#e0e0ff]"
            >
              Tanya Admin
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[2.5rem] bg-white p-8 text-center shadow-sm ring-1 ring-[#e0e0ff] md:p-12">
      <IconImage className="mx-auto h-14 w-14 text-[#006399]" />

      <h2 className="mt-5 text-2xl font-bold text-[#000767]">
        Belum ada kegiatan yang dipublikasikan.
      </h2>

      <p className="mx-auto mt-3 max-w-xl leading-8 text-[#3f4851]">
        Tambahkan kegiatan di Notion, centang Published, lalu halaman ini akan
        otomatis menampilkan datanya.
      </p>

      <Link
        href={yoloLinks.askAdmin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-[#006399] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
      >
        Tanya Admin YOLO
      </Link>
    </div>
  );
}

function BottomCTA() {
  return (
    <div className="mt-10 rounded-[2.5rem] bg-[#006399] p-8 text-white md:p-10">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#95ccff]">
            Ikut Bergerak
          </p>

          <h2 className="max-w-2xl text-2xl font-bold leading-tight md:text-3xl">
            Mau ikut dalam kegiatan YOLO berikutnya?
          </h2>

          <p className="mt-3 max-w-2xl leading-8 text-white/80">
            Hubungi admin untuk bertanya tentang kegiatan, relawan, atau program
            yang sedang berjalan.
          </p>
        </div>

        <Link
          href={yoloLinks.volunteer}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#006399] transition hover:bg-[#ffdcbe]"
        >
          Gabung Relawan
        </Link>
      </div>
    </div>
  );
}

/* SVG Icons */

function IconArrowRight(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      {...props}
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCalendar(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="4" y="5" width="16" height="15" rx="3" fill="currentColor" />
      <path
        d="M8 3v4M16 3v4M7 11h10"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 22s7-6 7-13a7 7 0 10-14 0c0 7 7 13 7 13z"
        fill="currentColor"
      />
      <circle cx="12" cy="9" r="2.5" fill="white" />
    </svg>
  );
}

function IconImage(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <rect x="8" y="12" width="48" height="40" rx="8" fill="currentColor" />
      <circle cx="24" cy="26" r="5" fill="white" />
      <path d="M16 44l12-12 9 9 6-6 7 9H16z" fill="white" opacity="0.9" />
    </svg>
  );
}
