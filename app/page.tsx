import Link from "next/link";
import type { SVGProps } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  yoloPrograms,
  yoloProfile,
  yoloVision,
} from "@/data/yolo";
import type { Metadata } from "next";

type IconProps = SVGProps<SVGSVGElement>;

const featuredPrograms = yoloPrograms.slice(0, 4);

export const metadata: Metadata = {
  title: "Home",
  description:
    "YOLO adalah komunitas kepemudaan yang menjadi ruang tumbuh, bergerak, dan bermanfaat melalui kegiatan pendidikan dan sosial.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <HeroSection />
      <ProfilePreview />
      <VisionPreview />
      <ImpactSection />
      <ProgramPreview />
      
      <Footer />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f4f2ff]">
      <div className="absolute left-[-120px] top-20 h-80 w-80 rounded-full bg-[#1da1f2]/15 blur-3xl" />
      <div className="absolute right-[-120px] bottom-10 h-80 w-80 rounded-full bg-[#df8400]/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-4 py-20 md:px-16 md:py-28 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <span className="mb-6 inline-block rounded-full bg-[#91f78e] px-4 py-1.5 text-xs font-semibold text-[#00731e]">
            {yoloProfile.fullName}
          </span>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-6xl md:leading-[1.1]">
            Tumbuh, bergerak, dan bermanfaat bersama YOLO.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3f4851]">
            {yoloProfile.longDescription}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kegiatan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
            >
              Ikut Kegiatan
              <IconArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/donasi"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#006399] bg-white px-7 py-4 text-sm font-bold text-[#006399] transition hover:bg-[#e0e0ff]"
            >
              Donasi & Dukungan
              <IconArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="rounded-[2.5rem] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-[#e0e0ff]">
          <div className="rounded-[2rem] bg-[#006399] p-8 text-white">
            <IconCommunity className="h-20 w-20 text-[#95ccff]" />

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#95ccff]">
              YOLO Since {yoloProfile.established}
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight">
              {yoloProfile.tagline}
            </h2>

            <p className="mt-4 leading-8 text-white/85">
              Ruang pemuda muslim untuk aktif dalam kegiatan positif,
              membangun, dan memberi manfaat untuk masyarakat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfilePreview() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-20 md:grid-cols-[0.85fr_1.15fr] md:px-16">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
            Tentang YOLO
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
            Komunitas kepemudaan yang bergerak di bidang pendidikan dan sosial.
          </h2>
        </div>

        <div className="space-y-5 leading-8 text-[#3f4851]">
          <p>{yoloProfile.shortDescription}</p>

          <p>{yoloProfile.longDescription}</p>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-bold text-[#006399] transition hover:text-[#1da1f2]"
          >
            Kenal YOLO lebih jauh
            <IconArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function VisionPreview() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-20 md:grid-cols-[0.9fr_1.1fr] md:px-16">
        <div className="rounded-[2rem] bg-[#006399] p-8 text-white">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#95ccff]">
            Vision
          </p>

          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            Arah gerakan YOLO.
          </h2>
        </div>

        <div className="rounded-[2rem] bg-[#f4f2ff] p-8">
          <p className="text-xl font-semibold leading-9 text-[#000767]">
            “{yoloVision}”
          </p>
        </div>
      </div>
    </section>
  );
}

function ProgramPreview() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-16">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
              Program Unggulan
            </p>

            <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
              Program pendidikan, sosial, dan komunitas.
            </h2>

            <p className="mt-4 leading-8 text-[#3f4851]">
              YOLO memiliki berbagai program seperti Pemuda Mengajar, Kelas
              Tumbuh, YOLO Camp, Jumat Action, dan kegiatan sosial lainnya.
            </p>
          </div>

          <Link
            href="/program"
            className="inline-flex items-center gap-2 font-bold text-[#006399] transition hover:text-[#1da1f2]"
          >
            Semua Program
            <IconArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredPrograms.map((program) => (
            <article
              key={program.title}
              className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-[#e0e0ff] transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#cde5ff] text-[#006399]">
                <IconSpark className="h-7 w-7" />
              </div>

              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#006399]">
                {program.category}
              </p>

              <h3 className="text-xl font-bold text-[#000767]">
                {program.title}
              </h3>

              <p className="mt-3 leading-7 text-[#3f4851]">
                {program.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  const impacts = [
    {
      number: "2022",
      label: "Tahun berdiri",
    },
    {
      number: "14+",
      label: "Program komunitas",
    },
    {
      number: "3",
      label: "Fokus utama",
    },
  ];

  return (
    <section className="bg-[#28305F]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-20 text-white md:grid-cols-[0.9fr_1.1fr] md:px-16">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#95ccff]">
            Gerakan YOLO
          </p>

          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            Dibangun untuk menjadi ruang tumbuh dan bergerak.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {impacts.map((item) => (
            <div
              key={item.label}
              className="rounded-[2rem] bg-white/10 p-6 backdrop-blur"
            >
              <p className="text-4xl font-bold text-white">{item.number}</p>
              <p className="mt-2 font-semibold text-white/75">{item.label}</p>
            </div>
          ))}
        </div>
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

function IconCommunity(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <circle cx="24" cy="24" r="10" fill="currentColor" />
      <circle cx="44" cy="28" r="8" fill="currentColor" opacity="0.6" />
      <path
        d="M8 56c2-13 9-20 18-20s16 7 18 20H8z"
        fill="currentColor"
      />
      <path
        d="M34 56c1-9 6-15 13-15 6 0 11 6 13 15H34z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

function IconSpark(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M32 4l5.8 18.2L56 28l-18.2 5.8L32 52l-5.8-18.2L8 28l18.2-5.8L32 4z"
        fill="currentColor"
      />
    </svg>
  );
}