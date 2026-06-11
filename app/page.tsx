import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SafeImage from "@/components/SafeImage";
import { getYoloActivities } from "@/lib/notion";
import {
  yoloContacts,
  yoloLinks,
  yoloPrograms,
  yoloProfile,
} from "@/data/yolo";
import {
  ArrowRight,
  CalendarDays,
  HandHeart,
  ImageIcon,
  MapPin,
  MessageCircle,
  Sparkles,
  UsersRound,
  Handshake,
} from "lucide-react";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Home - YOLO",
  description:
    "YOLO adalah komunitas kepemudaan yang menjadi ruang tumbuh, bergerak, dan bermanfaat melalui kegiatan pendidikan dan sosial.",
};

const featuredPrograms = yoloPrograms.slice(0, 4);

const homeImages = {
  hero: "https://i.pinimg.com/control1/1200x/f1/c7/6e/f1c76e928249c329884bb3f68d710062.jpg",
};

type Activity = Awaited<ReturnType<typeof getYoloActivities>>[number];

export default async function HomePage() {
  const latestActivities = (await getYoloActivities()).slice(0, 3);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <HeroSection />
      <ActionSection />
      <LatestActivitiesSection activities={latestActivities} />
      <ProgramPreview />
      <TaglineSection />
      <ContactSection />

      <Footer />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-4 py-14 md:px-16 md:py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#006399]">
            {yoloProfile.fullName}
          </p>

          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-5xl md:leading-[1.08]">
            Tumbuh bareng, bergerak bareng, bermanfaat bareng.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#3f4851] md:text-lg md:leading-8">
            YOLO adalah ruang pemuda muslim untuk belajar, berbagi, dan ikut
            dalam kegiatan positif bersama.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kegiatan"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
            >
              Lihat Kegiatan
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#006399] bg-white px-6 py-3 text-sm font-bold text-[#006399] transition hover:bg-[#f4f2ff]"
            >
              Tentang YOLO
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-bl-[3rem] rounded-tr-[3rem] bg-[#006399]" />
          <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-br-[2.5rem] bg-[#df8400]/80" />

          <div className="relative overflow-hidden rounded-[2rem] border border-[#e0e0ff] bg-white p-3 shadow-sm">
            <SafeImage
              src={homeImages.hero}
              alt="Foto kegiatan YOLO"
              className="aspect-[16/10] w-full rounded-[1.5rem] object-cover"
              fallbackClassName="aspect-[16/10] w-full rounded-[1.5rem]"
              fallbackLabel="Foto kegiatan YOLO"
            />

            <div className="mt-3 grid grid-cols-3 gap-2">
              <HeroStat value={yoloProfile.established} label="Berdiri" />
              <HeroStat value="14+" label="Program" />
              <HeroStat value="3" label="Fokus" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-[#f4f2ff] px-4 py-3">
      <p className="text-lg font-bold text-[#006399]">{value}</p>
      <p className="mt-0.5 text-xs font-semibold text-[#3f4851]">{label}</p>
    </div>
  );
}

function ActionSection() {
  const actions = [
    {
      title: "Ikut Kegiatan",
      description: "Lihat agenda, dokumentasi, dan kegiatan YOLO terbaru.",
      href: "/kegiatan",
      icon: <CalendarDays className="h-5 w-5" strokeWidth={2.4} />,
    },
    {
      title: "Kerja Sama",
      description: "Ajukan kolaborasi program dengan YOLO atau jadi partnership.",
      href: yoloLinks.askAdmin,
      external: true,
      icon: <Handshake className="h-5 w-5" strokeWidth={2.4} />,
    },
    {
      title: "Dukung Donasi",
      description: "Bantu program sosial dan pendidikan YOLO berjalan.",
      href: "/donasi",
      icon: <HandHeart className="h-5 w-5" strokeWidth={2.4} />,
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-16 md:py-14">
        <div className="mb-7">
          <SectionHeading
            eyebrow="Mulai dari sini"
            title="Mau ikut bagian yang mana?"
            description="Pilih jalur yang paling sesuai: ikut kegiatan, bergabung, atau mendukung program YOLO."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {actions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noopener noreferrer" : undefined}
              className="group rounded-[1.5rem] border border-[#e0e0ff] bg-[#fbf8ff] p-5 transition hover:-translate-y-1 hover:bg-[#f4f2ff] hover:shadow-lg hover:shadow-slate-200/70"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#cde5ff] text-[#006399]">
                {action.icon}
              </div>

              <h3 className="text-lg font-bold text-[#000767]">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#3f4851]">
                {action.description}
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#006399]">
                Buka
                <ArrowRight
                  className="h-4 w-4 transition group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestActivitiesSection({ activities }: { activities: Activity[] }) {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-16 md:py-14">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Kegiatan Terbaru"
            title="Agenda dan dokumentasi terbaru dari YOLO."
            description="Lihat kegiatan terbaru YOLO, mulai dari pendidikan, sosial, pembinaan, sampai kegiatan komunitas."
          />

          <Link
            href="/kegiatan"
            className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[#006399] transition hover:text-[#1da1f2]"
          >
            Semua Kegiatan
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>

        {activities.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <LatestActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-[#e0e0ff] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#cde5ff] text-[#006399]">
              <ImageIcon className="h-7 w-7" strokeWidth={2.3} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#000767]">
              Belum ada kegiatan terbaru.
            </h3>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-[#3f4851]">
              Kegiatan yang sudah dipublikasikan dari Notion akan tampil di
              bagian ini secara otomatis.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function LatestActivityCard({ activity }: { activity: Activity }) {
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

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />

          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-[#006399] shadow-sm backdrop-blur">
            {activity.category || "Kegiatan"}
          </div>

          <div className="absolute bottom-4 left-4 rounded-full bg-[#91f78e] px-3.5 py-1.5 text-xs font-bold text-[#00731e] shadow-sm">
            {activity.status || "Published"}
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link href={detailUrl}>
          <h3 className="line-clamp-2 text-xl font-bold leading-tight text-[#000767] transition hover:text-[#006399]">
            {activity.title}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#3f4851]">
          {activity.description || "Deskripsi kegiatan belum tersedia."}
        </p>

        <div className="mt-5 grid gap-2">
          <ActivityMeta
            icon={<CalendarDays className="h-4 w-4" strokeWidth={2.4} />}
            text={activity.date || "Tanggal menyusul"}
          />

          <ActivityMeta
            icon={<MapPin className="h-4 w-4" strokeWidth={2.4} />}
            text={activity.location || "Lokasi menyusul"}
          />
        </div>

        <Link
          href={detailUrl}
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#006399] transition hover:text-[#1da1f2]"
        >
          Lihat Detail
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </div>
    </article>
  );
}

function ActivityMeta({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-[#3f4851]">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#f4f2ff] text-[#006399]">
        {icon}
      </span>

      <span className="line-clamp-1">{text}</span>
    </div>
  );
}

function ProgramPreview() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-16 md:py-14">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Program YOLO"
            title="Beberapa ruang gerak YOLO."
            description="Program dibuat sebagai ruang belajar, kebersamaan, pembinaan, dan kebermanfaatan."
          />

          <Link
            href="/program"
            className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[#006399] transition hover:text-[#1da1f2]"
          >
            Semua Program
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featuredPrograms.map((program) => (
            <article
              key={program.title}
              className="rounded-[1.5rem] border border-[#e0e0ff] bg-[#fbf8ff] p-5 transition hover:-translate-y-1 hover:bg-[#f4f2ff]"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#cde5ff] text-[#006399]">
                <Sparkles className="h-5 w-5" strokeWidth={2.5} />
              </div>

              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#006399]">
                {program.category}
              </p>

              <h3 className="text-lg font-bold leading-tight text-[#000767]">
                {program.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#3f4851]">
                {program.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TaglineSection() {
  return (
    <section className="bg-[#28305F]">
      <div className="mx-auto max-w-[1280px] px-4 py-14 text-white md:px-16 md:py-16">
        <div className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#95ccff]">
              YOLO!
            </p>

            <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
              {yoloProfile.tagline}
            </h2>
          </div>

          <p className="max-w-xl leading-7 text-white/70">
            Sebuah ajakan untuk terus tumbuh dalam nilai, bergerak dalam aksi,
            dan memberi manfaat bagi sekitar.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-16 md:py-14">
        <div className="rounded-[2rem] border border-[#e0e0ff] bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-7 md:grid-cols-[1fr_0.8fr] md:items-center">
            <div>
              <SectionHeading
                eyebrow="Hubungi YOLO"
                title="Ada yang ingin ditanyakan?"
                description="Chat admin YOLO untuk bertanya tentang kegiatan, relawan, kolaborasi, atau informasi komunitas."
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              <Link
                href={yoloLinks.askAdmin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
                Chat Admin
              </Link>

              <Link
                href={yoloContacts.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#006399] bg-white px-5 py-3 text-sm font-bold text-[#006399] transition hover:bg-[#f4f2ff]"
              >
                Instagram YOLO
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#006399]">
        {eyebrow}
      </p>

      <h2 className="max-w-xl text-2xl font-bold leading-tight text-[#000767] md:text-3xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-3 max-w-xl leading-7 text-[#3f4851]">{description}</p>
      ) : null}
    </div>
  );
}
