"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SVGProps } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type IconProps = SVGProps<SVGSVGElement>;

type ActivityStatus = "Open Volunteer" | "Upcoming" | "Selesai";
type ActivityFilter = "Semua" | ActivityStatus;

type Activity = {
  id: number;
  title: string;
  category: string;
  status: ActivityStatus;
  date: string;
  location: string;
  description: string;
  registrationLink: string;
};

const filters: ActivityFilter[] = [
  "Semua",
  "Open Volunteer",
  "Upcoming",
  "Selesai",
];

const activities: Activity[] = [
  {
    id: 1,
    title: "Berbagi Takjil Ramadhan",
    category: "Charity",
    status: "Open Volunteer",
    date: "24 Maret 2026",
    location: "Area sekitar kota",
    description:
      "Kegiatan berbagi takjil dan makanan ringan untuk warga sekitar serta pengguna jalan menjelang waktu berbuka.",
    registrationLink: "/gabung",
  },
  {
    id: 2,
    title: "Kelas Ceria Anak",
    category: "Edukasi",
    status: "Upcoming",
    date: "12 April 2026",
    location: "Rumah belajar warga",
    description:
      "Kegiatan belajar santai bersama anak-anak melalui cerita, permainan edukatif, dan aktivitas kreatif.",
    registrationLink: "/gabung",
  },
  {
    id: 3,
    title: "Paket Kebaikan",
    category: "Sosial",
    status: "Selesai",
    date: "8 Mei 2026",
    location: "Lingkungan sekitar",
    description:
      "Penyaluran paket bantuan sederhana untuk warga sekitar yang membutuhkan bersama relawan YOLO.",
    registrationLink: "/gabung",
  },
  {
    id: 4,
    title: "Jumat Berbagi Makanan",
    category: "Berbagi Makanan",
    status: "Upcoming",
    date: "17 Mei 2026",
    location: "Masjid dan area warga",
    description:
      "Aksi berbagi makanan sederhana untuk warga sekitar sebagai bentuk kepedulian rutin komunitas.",
    registrationLink: "/gabung",
  },
  {
    id: 5,
    title: "Aksi Bersih Lingkungan",
    category: "Community",
    status: "Open Volunteer",
    date: "26 Mei 2026",
    location: "Area pemukiman warga",
    description:
      "Kegiatan gotong royong membersihkan lingkungan sekitar bersama warga dan relawan YOLO.",
    registrationLink: "/gabung",
  },
  {
    id: 6,
    title: "Belajar Bareng Anak-anak",
    category: "Edukasi",
    status: "Selesai",
    date: "2 Juni 2026",
    location: "Ruang belajar komunitas",
    description:
      "Dokumentasi kegiatan edukasi ringan bersama anak-anak melalui membaca, menulis, dan permainan.",
    registrationLink: "/gabung",
  },
];

export default function KegiatanPage() {
  const [activeFilter, setActiveFilter] = useState<ActivityFilter>("Semua");

  const filteredActivities = useMemo(() => {
    if (activeFilter === "Semua") {
      return activities;
    }

    return activities.filter((activity) => activity.status === activeFilter);
  }, [activeFilter]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <KegiatanHero />

      <section className="bg-[#fbf8ff]">
        <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-16">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
                Daftar Kegiatan
              </p>

              <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
                Jadwal, poster, dan dokumentasi aksi YOLO.
              </h2>

              <p className="mt-4 leading-8 text-[#3f4851]">
                Semua kegiatan YOLO akan ditampilkan di sini, mulai dari yang
                sedang membuka relawan, kegiatan mendatang, sampai dokumentasi
                kegiatan yang sudah selesai.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-5 py-3 text-sm font-bold transition active:scale-95 ${
                    activeFilter === filter
                      ? "bg-[#006399] text-white"
                      : "bg-white text-[#006399] ring-1 ring-[#e0e0ff] hover:bg-[#f4f2ff]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="rounded-[2rem] bg-white p-8 text-center ring-1 ring-[#e0e0ff]">
              <p className="font-semibold text-[#3f4851]">
                Belum ada kegiatan untuk kategori ini.
              </p>
            </div>
          )}
        </div>
      </section>

      <KegiatanCTA />

      <Footer />
    </main>
  );
}

function KegiatanHero() {
  return (
    <section className="relative overflow-hidden bg-[#f4f2ff]">
      <div className="absolute left-[-120px] top-20 h-80 w-80 rounded-full bg-[#1da1f2]/15 blur-3xl" />
      <div className="absolute right-[-120px] bottom-10 h-80 w-80 rounded-full bg-[#df8400]/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-4 py-20 md:px-16 md:py-28 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <span className="mb-6 inline-block rounded-full bg-[#91f78e] px-4 py-1.5 text-xs font-semibold text-[#00731e]">
            Kegiatan YOLO
          </span>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-6xl md:leading-[1.1]">
            Ikuti aksi sosial yang sedang berjalan.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3f4851]">
            Lihat jadwal kegiatan YOLO, daftar sebagai relawan, atau cek
            dokumentasi kegiatan yang sudah dilakukan bersama warga sekitar.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/gabung"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
            >
              Gabung Relawan
              <IconArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/donasi"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#006399] bg-white px-7 py-4 text-sm font-bold text-[#006399] transition hover:bg-[#e0e0ff]"
            >
              Dukung Donasi
            </Link>
          </div>
        </div>

        <div className="rounded-[2.5rem] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-[#e0e0ff]">
          <div className="rounded-[2rem] bg-[#006399] p-8 text-white">
            <IconCalendar className="h-20 w-20 text-[#95ccff]" />

            <h2 className="mt-8 text-3xl font-bold leading-tight">
              Setiap kegiatan adalah ruang untuk hadir dan membantu.
            </h2>

            <p className="mt-4 leading-8 text-white/85">
              Kamu bisa ikut sebagai relawan, membantu dokumentasi, mendukung
              donasi, atau membagikan informasi kegiatan kepada orang lain.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  const statusClass =
    activity.status === "Open Volunteer"
      ? "bg-[#91f78e] text-[#00731e]"
      : activity.status === "Upcoming"
        ? "bg-[#ffdcbe] text-[#693c00]"
        : "bg-[#cde5ff] text-[#004a75]";

  return (
    <article className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-[#e0e0ff] transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70">
      <div className="relative flex min-h-56 items-center justify-center bg-[#e0e0ff] p-8">
        <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#006399]">
          {activity.category}
        </div>

        <PosterMockup title={activity.title} status={activity.status} />
      </div>

      <div className="p-6">
        <span
          className={`mb-4 inline-flex rounded-full px-4 py-2 text-xs font-bold ${statusClass}`}
        >
          {activity.status}
        </span>

        <h3 className="text-2xl font-bold leading-tight text-[#000767]">
          {activity.title}
        </h3>

        <p className="mt-3 leading-7 text-[#3f4851]">
          {activity.description}
        </p>

        <div className="mt-6 grid gap-3 text-sm font-semibold text-[#3f4851]">
          <div className="flex items-center gap-2">
            <IconCalendar className="h-5 w-5 text-[#df8400]" />
            {activity.date}
          </div>

          <div className="flex items-center gap-2">
            <IconPin className="h-5 w-5 text-[#006e1c]" />
            {activity.location}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={activity.registrationLink}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
          >
            {activity.status === "Selesai" ? "Lihat Detail" : "Daftar Ikut"}
            <IconArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/kontak"
            className="inline-flex items-center justify-center rounded-full bg-[#f4f2ff] px-5 py-3 text-sm font-bold text-[#006399] transition hover:bg-[#e0e0ff]"
          >
            Tanya Admin
          </Link>
        </div>
      </div>
    </article>
  );
}

function PosterMockup({
  title,
  status,
}: {
  title: string;
  status: ActivityStatus;
}) {
  return (
    <div className="w-full max-w-[240px] rotate-[-2deg] rounded-[1.5rem] bg-white p-4 shadow-lg">
      <div className="rounded-[1.2rem] bg-[#006399] p-5 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#95ccff]">
          YOLO Event
        </p>

        <h4 className="mt-8 text-2xl font-bold leading-tight">{title}</h4>

        <div className="mt-8 rounded-full bg-white px-4 py-2 text-center text-xs font-bold text-[#006399]">
          {status}
        </div>
      </div>
    </div>
  );
}

function KegiatanCTA() {
  return (
    <section className="bg-[#006399]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-4 py-16 text-white md:flex-row md:items-center md:px-16">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#95ccff]">
            Ikut Bergerak
          </p>

          <h2 className="max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
            Mau ikut di kegiatan sosial YOLO berikutnya?
          </h2>

          <p className="mt-4 max-w-2xl leading-8 text-white/80">
            Daftar sebagai relawan dan bantu sesuai kemampuanmu. Bisa lewat
            tenaga, ide, dokumentasi, donasi, atau dukungan sederhana lainnya.
          </p>
        </div>

        <Link
          href="/gabung"
          className="shrink-0 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#006399] transition hover:bg-[#ffdcbe]"
        >
          Gabung Relawan
        </Link>
      </div>
    </section>
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