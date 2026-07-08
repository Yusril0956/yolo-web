import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import { yoloLinks, yoloPrograms, yoloProfile } from "@/data/yolo";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  Heart,
  HeartHandshake,
  MessageCircle,
  Sparkles,
  Sunrise,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Program - YOLO",
  description:
    "Lihat program YOLO dalam bidang pendidikan, sosial, pembinaan, komunitas, dan pengembangan pemuda.",
};

type Program = (typeof yoloPrograms)[number];

const programCategories = Array.from(
  new Set(yoloPrograms.map((program) => program.category)),
);

const categoryDescriptions: Record<string, string> = {
  Edukasi: "Program belajar, mengajar, dan pengembangan diri.",
  Sosial: "Program berbagi dan aksi kebermanfaatan untuk masyarakat.",
  Komunitas: "Program kebersamaan, relasi, dan penguatan komunitas.",
  Internal: "Program penguatan anggota dan pengurus YOLO.",
  Pembinaan: "Program penguatan nilai, karakter, dan spiritual.",
  "Sosial & Keagamaan": "Program sosial yang berjalan bersama nilai keagamaan.",
};

function getProgramsByCategory(category: string) {
  return yoloPrograms.filter((program) => program.category === category);
}

function getCategoryIcon(category: string) {
  if (category === "Edukasi")
    return <BookOpen className="h-5 w-5" strokeWidth={2.4} />;

  if (category === "Sosial")
    return <HeartHandshake className="h-5 w-5" strokeWidth={2.4} />;

  if (category === "Komunitas")
    return <UsersRound className="h-5 w-5" strokeWidth={2.4} />;

  if (category === "Internal")
    return <ClipboardList className="h-5 w-5" strokeWidth={2.4} />;

  if (category === "Pembinaan")
    return <Sunrise className="h-5 w-5" strokeWidth={2.4} />;

  if (category === "Sosial & Keagamaan")
    return <Heart className="h-5 w-5" strokeWidth={2.4} />;

  return <Sparkles className="h-5 w-5" strokeWidth={2.4} />;
}

export default function ProgramPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <ProgramHero />
      <ProgramCategories />
      <ProgramFlow />
      <ProgramCta />

      <Footer />
    </main>
  );
}

function ProgramHero() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 md:px-16 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#006399]">
            Program YOLO
          </p>

          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-5xl md:leading-[1.08]">
            Ruang gerak untuk belajar, berbagi, dan bertumbuh.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#3f4851] md:text-lg md:leading-8">
            Program YOLO bergerak di bidang pendidikan, sosial, pembinaan,
            komunitas, dan pengembangan pemuda muslim.
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
              href={yoloLinks.askAdmin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#006399] bg-white px-6 py-3 text-sm font-bold text-[#006399] transition hover:bg-[#f4f2ff]"
            >
              Tanya Program
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#e0e0ff] bg-white p-5 shadow-sm">
          <div className="rounded-[1.5rem] bg-[#006399] p-7 text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#95ccff]">
              <Sparkles className="h-6 w-6" strokeWidth={2.4} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#95ccff]">
              {yoloProfile.name}
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">
              {yoloProfile.tagline}
            </h2>

            <p className="mt-4 leading-7 text-white/80">
              Setiap program menjadi jalan kecil untuk membangun kepedulian,
              mengembangkan potensi, dan memberi manfaat untuk sekitar.
            </p>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <HeroStat value="14+" label="Program" />
            <HeroStat value="6" label="Kategori" />
            <HeroStat value="2022" label="Sejak" />
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

function ProgramCategories() {
  return (
    <section id="semua-program" className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-16 md:py-14">
        <div className="mb-8">
          <SectionHeading
            eyebrow="Semua Program"
            title="Daftar program YOLO dalam berbagai bidang."
            description="Daftar program YOLO dikelompokkan agar lebih mudah dibaca dan dipahami."
          />
        </div>

        <div className="grid gap-5">
          {programCategories.map((category) => {
            const programs = getProgramsByCategory(category);

            return (
              <CategoryGroup
                key={category}
                category={category}
                programs={programs}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CategoryGroup({
  category,
  programs,
}: {
  category: string;
  programs: Program[];
}) {
  return (
    <section className="rounded-[1.75rem] border border-[#e0e0ff] bg-white p-5 shadow-sm md:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#cde5ff] text-[#006399]">
            {getCategoryIcon(category)}
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#000767]">{category}</h3>
            <p className="mt-1 text-sm leading-6 text-[#3f4851]">
              {categoryDescriptions[category] || "Program YOLO."}
            </p>
          </div>
        </div>

        <span className="w-fit rounded-full bg-[#f4f2ff] px-4 py-2 text-xs font-bold text-[#006399]">
          {programs.length} program
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <article
            key={`${category}-${program.title}`}
            className="rounded-[1.25rem] bg-[#fbf8ff] p-4 ring-1 ring-[#e0e0ff]"
          >
            <h4 className="text-base font-bold leading-tight text-[#000767]">
              {program.title}
            </h4>

            <p className="mt-2 text-sm leading-6 text-[#3f4851]">
              {program.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProgramFlow() {
  const flows = [
    {
      title: "Dirancang",
      description:
        "Program disusun berdasarkan kebutuhan komunitas, anggota, dan masyarakat sekitar.",
    },
    {
      title: "Dikolaborasikan",
      description:
        "YOLO mengajak anggota, relawan, dan pihak terkait untuk ikut mendukung program.",
    },
    {
      title: "Dilaksanakan",
      description:
        "Program dijalankan dalam bentuk kegiatan pendidikan, sosial, pembinaan, atau komunitas.",
    },
    {
      title: "Dievaluasi",
      description:
        "Setiap kegiatan menjadi bahan pembelajaran agar program berikutnya lebih baik.",
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-16 md:py-14">
        <div className="mb-7">
          <SectionHeading
            eyebrow="Cara Program Berjalan"
            title="Dari ide sampai menjadi aksi nyata."
            description="Program YOLO tidak hanya dibuat, tapi juga dijalankan, dipelajari, dan dikembangkan."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {flows.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] border border-[#e0e0ff] bg-[#fbf8ff] p-5"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#006399] text-sm font-bold text-white">
                {index + 1}
              </div>

              <h3 className="text-lg font-bold text-[#000767]">{item.title}</h3>

              <p className="mt-2 text-sm leading-6 text-[#3f4851]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCta() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-16 md:py-14">
        <div className="rounded-[2rem] bg-[#28305F] p-7 text-white md:p-9">
          <div className="grid gap-7 md:grid-cols-[1fr_0.8fr] md:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#95ccff]">
                Ikut Bergerak
              </p>

              <h2 className="text-2xl font-bold leading-tight md:text-3xl">
                Mau ikut program YOLO?
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-white/70">
                Kamu bisa ikut kegiatan, menjadi relawan, atau bertanya dulu
                tentang program yang sedang berjalan.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              <Link
                href="/kegiatan"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#006399] transition hover:bg-[#ffdcbe]"
              >
                Lihat Kegiatan
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>

              <Link
                href={yoloLinks.askAdmin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
                Tanya Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

