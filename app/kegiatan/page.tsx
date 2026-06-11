import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SafeImage from "@/components/SafeImage";
import { getYoloActivities } from "@/lib/notion";
import { yoloLinks } from "@/data/yolo";
import {
  ArrowRight,
  CalendarDays,
  ImageIcon,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Kegiatan - YOLO",
  description:
    "Lihat kegiatan terbaru YOLO, dokumentasi kegiatan, program sosial, dan kegiatan pendidikan komunitas.",
};

type Activity = Awaited<ReturnType<typeof getYoloActivities>>[number];

export default async function KegiatanPage() {
  const activities = await getYoloActivities();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <section className="bg-[#fbf8ff]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-16 md:py-16">
          <PageHeader total={activities.length} />

          {activities.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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

function PageHeader({ total }: { total: number }) {
  return (
    <div className="mb-9 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#006399]">
          Kegiatan YOLO
        </p>

        <h1 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-4xl">
          Kegiatan dan dokumentasi YOLO.
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-[#3f4851]">
          Lihat agenda, dokumentasi, dan kegiatan YOLO mulai dari pendidikan,
          sosial, pembinaan, sampai kegiatan komunitas.
        </p>
      </div>

    </div>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  const detailUrl = `/kegiatan/${activity.slug}`;

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-[#e0e0ff] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70">
      <Link href={detailUrl} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#e0e0ff]">
          <SafeImage
            src={activity.poster}
            alt={activity.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            fallbackClassName="h-full w-full"
            fallbackLabel="Poster belum tersedia"
          />

          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />

          <div className="absolute left-4 top-4">
            <Badge>{activity.category || "Kegiatan"}</Badge>
          </div>

          <div className="absolute bottom-4 left-4">
            <Badge variant="green">{activity.status || "Published"}</Badge>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link href={detailUrl}>
          <h2 className="line-clamp-2 text-xl font-bold leading-tight text-[#000767] transition hover:text-[#006399]">
            {activity.title}
          </h2>
        </Link>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#3f4851]">
          {activity.description || "Deskripsi kegiatan belum tersedia."}
        </p>

        <div className="mt-5 grid gap-3">
          <InfoItem
            icon={<CalendarDays className="h-4 w-4" strokeWidth={2.4} />}
            value={activity.date || "Tanggal menyusul"}
          />

          <InfoItem
            icon={<MapPin className="h-4 w-4" strokeWidth={2.4} />}
            value={activity.location || "Lokasi menyusul"}
          />
        </div>

        <Link
          href={detailUrl}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
        >
          Lihat Detail
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </div>
    </article>
  );
}

function Badge({
  children,
  variant = "blue",
}: {
  children: ReactNode;
  variant?: "blue" | "green";
}) {
  const className =
    variant === "green"
      ? "bg-[#91f78e] text-[#00731e]"
      : "bg-white/90 text-[#006399] backdrop-blur";

  return (
    <span
      className={`inline-flex rounded-full px-3.5 py-1.5 text-xs font-bold shadow-sm ${className}`}
    >
      {children}
    </span>
  );
}

function InfoItem({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-[#3f4851]">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#f4f2ff] text-[#006399]">
        {icon}
      </span>

      <span className="line-clamp-1">{value}</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[2rem] border border-[#e0e0ff] bg-white p-8 text-center shadow-sm md:p-12">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#cde5ff] text-[#006399]">
        <ImageIcon className="h-8 w-8" strokeWidth={2.3} />
      </div>

      <h2 className="mt-5 text-2xl font-bold text-[#000767]">
        Belum ada kegiatan yang dipublikasikan.
      </h2>

      <p className="mx-auto mt-3 max-w-xl leading-7 text-[#3f4851]">
        Tambahkan kegiatan di Notion, centang Published, lalu halaman ini akan
        otomatis menampilkan datanya.
      </p>

      <Link
        href={yoloLinks.askAdmin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
        Tanya Admin YOLO
      </Link>
    </div>
  );
}
