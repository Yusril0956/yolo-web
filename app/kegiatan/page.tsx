import Link from "next/link";
import type { Metadata } from "next";
import type { SVGProps } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SafeImage from "@/components/SafeImage";
import { getYoloActivities } from "@/lib/notion";
import { yoloLinks } from "@/data/yolo";

type IconProps = SVGProps<SVGSVGElement>;

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Kegiatan",
  description:
    "Lihat kegiatan terbaru YOLO, dokumentasi kegiatan, program sosial, dan kegiatan pendidikan komunitas.",
};

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

        </div>
      </section>

      <Footer />
    </main>
  );
}

function PageHeader() {
  return (
    <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-3xl">
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
    <article className="group overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-[#e0e0ff] transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70">
      <Link href={detailUrl} className="block">
        <div className="relative h-56 overflow-hidden bg-[#e0e0ff]">
          <SafeImage
            src={activity.poster}
            alt={activity.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            fallbackClassName="h-full w-full"
            fallbackLabel="Poster belum tersedia"
          />

          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />

          <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#006399] shadow-sm backdrop-blur">
            {activity.category || "Kegiatan"}
          </div>

          <div className="absolute bottom-5 left-5 rounded-full bg-[#91f78e] px-4 py-2 text-xs font-bold text-[#00731e] shadow-sm">
            {activity.status || "Published"}
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link href={detailUrl}>
          <h2 className="line-clamp-2 text-2xl font-bold leading-tight text-[#000767] transition hover:text-[#006399]">
            {activity.title}
          </h2>
        </Link>

        <p className="mt-3 line-clamp-2 leading-7 text-[#3f4851]">
          {activity.description || "Deskripsi kegiatan belum tersedia."}
        </p>

        <div className="mt-6 grid gap-3 text-sm font-semibold text-[#3f4851]">
          <div className="flex items-center gap-2">
            <IconCalendar className="h-5 w-5 shrink-0 text-[#df8400]" />
            <span>{activity.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <IconPin className="h-5 w-5 shrink-0 text-[#006e1c]" />
            <span>{activity.location || "Lokasi menyusul"}</span>
          </div>
        </div>

        <Link
          href={detailUrl}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
        >
          Lihat Detail
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[2.5rem] bg-white p-8 text-center shadow-sm ring-1 ring-[#e0e0ff] md:p-12">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#cde5ff] text-[#006399]">
        <IconCalendar className="h-8 w-8" />
      </div>

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
