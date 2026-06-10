import Link from "next/link";
import type { SVGProps } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { yoloPrograms, yoloProfile, yoloLinks } from "@/data/yolo";

type IconProps = SVGProps<SVGSVGElement>;

const categories = [
  "Semua",
  "Edukasi",
  "Sosial",
  "Komunitas",
  "Internal",
  "Pembinaan",
  "Sosial & Keagamaan",
];

function getProgramsByCategory(category: string) {
  if (category === "Semua") {
    return yoloPrograms;
  }

  return yoloPrograms.filter((program) => program.category === category);
}

function getCategoryIcon(category: string) {
  if (category === "Edukasi") return <IconBook className="h-8 w-8" />;
  if (category === "Sosial") return <IconHands className="h-8 w-8" />;
  if (category === "Komunitas") return <IconPeople className="h-8 w-8" />;
  if (category === "Internal") return <IconTeam className="h-8 w-8" />;
  if (category === "Pembinaan") return <IconSunrise className="h-8 w-8" />;
  if (category === "Sosial & Keagamaan")
    return <IconHeart className="h-8 w-8" />;

  return <IconSpark className="h-8 w-8" />;
}

export default function ProgramPage() {
  const featuredPrograms = yoloPrograms.slice(0, 6);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <ProgramHero />

      <FeaturedPrograms programs={featuredPrograms} />

      <ProgramCategories />

      <ProgramFlow />

      <ProgramCTA />

      <Footer />
    </main>
  );
}

function ProgramHero() {
  return (
    <section className="relative overflow-hidden bg-[#f4f2ff]">
      <div className="absolute left-[-120px] top-20 h-80 w-80 rounded-full bg-[#1da1f2]/15 blur-3xl" />
      <div className="absolute right-[-120px] bottom-10 h-80 w-80 rounded-full bg-[#df8400]/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-4 py-20 md:px-16 md:py-28 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <span className="mb-6 inline-block rounded-full bg-[#91f78e] px-4 py-1.5 text-xs font-semibold text-[#00731e]">
            Program YOLO
          </span>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-6xl md:leading-[1.1]">
            Program pendidikan dan sosial untuk tumbuh bersama.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3f4851]">
            YOLO bergerak melalui program-program positif di bidang pendidikan,
            sosial, pembinaan, dan komunitas. Seluruh program diarahkan untuk
            menjadi ruang tumbuh, bergerak, dan bermanfaat.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kegiatan"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
            >
              Lihat Kegiatan
              <IconArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href={yoloLinks.join}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#006399] bg-white px-7 py-4 text-sm font-bold text-[#006399] transition hover:bg-[#e0e0ff]"
            >
              Gabung YOLO
            </Link>
          </div>
        </div>

        <div className="rounded-[2.5rem] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-[#e0e0ff]">
          <div className="rounded-[2rem] bg-[#006399] p-8 text-white">
            <IconSpark className="h-20 w-20 text-[#95ccff]" />

            <h2 className="mt-8 text-3xl font-bold leading-tight">
              {yoloProfile.tagline}
            </h2>

            <p className="mt-4 leading-8 text-white/85">
              Setiap program menjadi ruang bagi pemuda muslim untuk
              mengembangkan potensi, memperkuat kepedulian, dan memberi manfaat
              untuk masyarakat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedPrograms({ programs }: { programs: typeof yoloPrograms }) {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-16">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
            Program Unggulan
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
            Beberapa program utama YOLO.
          </h2>

          <p className="mt-4 leading-8 text-[#3f4851]">
            Program-program ini menjadi wajah gerakan YOLO dalam pendidikan,
            sosial, dan pengembangan komunitas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.title} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCategories() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-16">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
            Semua Program
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
            Program YOLO berdasarkan kategori.
          </h2>

          <p className="mt-4 leading-8 text-[#3f4851]">
            Daftar program ini bisa kamu tampilkan dulu secara statis. Nanti
            kalau sudah pakai Notion, bagian ini bisa dibuat lebih dinamis.
          </p>
        </div>

        <div className="grid gap-10">
          {categories.map((category) => {
            const programs = getProgramsByCategory(category);

            if (programs.length === 0) return null;

            return (
              <div key={category}>
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#cde5ff] text-[#006399]">
                    {getCategoryIcon(category)}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-[#000767]">
                      {category}
                    </h3>

                    <p className="text-sm font-semibold text-[#3f4851]">
                      {programs.length} program
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {programs.map((program) => (
                    <article
                      key={`${category}-${program.title}`}
                      className="rounded-[1.5rem] bg-[#fbf8ff] p-5 ring-1 ring-[#e0e0ff]"
                    >
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#006399]">
                        {program.category}
                      </p>

                      <h4 className="text-xl font-bold text-[#000767]">
                        {program.title}
                      </h4>

                      <p className="mt-3 leading-7 text-[#3f4851]">
                        {program.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ program }: { program: (typeof yoloPrograms)[number] }) {
  return (
    <article className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-[#e0e0ff] transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#cde5ff] text-[#006399]">
          {getCategoryIcon(program.category)}
        </div>

        <span className="rounded-full bg-[#f4f2ff] px-4 py-2 text-xs font-bold text-[#006399]">
          {program.category}
        </span>
      </div>

      <h3 className="text-2xl font-bold text-[#000767]">{program.title}</h3>

      <p className="mt-4 leading-8 text-[#3f4851]">{program.description}</p>
    </article>
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
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-16">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
            Cara Program Berjalan
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
            Dari ide sampai menjadi aksi nyata.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {flows.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-[#e0e0ff]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#006399] text-sm font-bold text-white">
                {index + 1}
              </div>

              <h3 className="text-xl font-bold text-[#000767]">{item.title}</h3>

              <p className="mt-3 leading-7 text-[#3f4851]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCTA() {
  return (
    <section className="bg-[#006399]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-4 py-16 text-white md:flex-row md:items-center md:px-16">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#95ccff]">
            Ikut Program
          </p>

          <h2 className="max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
            Mau ikut tumbuh dan bergerak bersama YOLO?
          </h2>

          <p className="mt-4 max-w-2xl leading-8 text-white/80">
            Bergabung sebagai anggota atau relawan untuk ikut dalam program
            pendidikan, sosial, pembinaan, dan komunitas YOLO.
          </p>
        </div>

        <Link
          href={yoloLinks.join}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#006399] transition hover:bg-[#ffdcbe]"
        >
          Gabung Sekarang
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

function IconBook(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M10 14c0-4 3-7 7-7h12c5 0 9 4 9 9v38c0-5-4-9-9-9H17c-4 0-7 3-7 7V14z"
        fill="currentColor"
      />
      <path
        d="M54 14c0-4-3-7-7-7H35c-5 0-9 4-9 9v38c0-5 4-9 9-9h12c4 0 7 3 7 7V14z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

function IconHands(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M20 36l10 10c3 3 7 3 10 0l11-11c3-3 3-8 0-11s-8-3-11 0l-2 2-2-2c-3-3-8-3-11 0s-3 8 0 11"
        fill="currentColor"
      />
      <path
        d="M8 34l12 12M56 34L44 46M18 50h28"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPeople(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <circle cx="24" cy="22" r="10" fill="currentColor" />
      <circle cx="44" cy="26" r="8" fill="currentColor" opacity="0.6" />
      <path d="M8 55c2-12 9-18 18-18s16 6 18 18H8z" fill="currentColor" />
      <path
        d="M34 55c1-8 6-13 13-13 6 0 11 5 13 13H34z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

function IconTeam(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <rect x="10" y="12" width="44" height="40" rx="8" fill="currentColor" />
      <path
        d="M22 28h20M22 38h14"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSunrise(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M12 44a20 20 0 0140 0"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M8 48h48M32 10v10M14 18l7 7M50 18l-7 7"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconHeart(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M32 54S10 41 10 24c0-8 6-14 14-14 5 0 8 2 10 6 2-4 6-6 10-6 8 0 14 6 14 14 0 17-26 30-26 30z"
        fill="currentColor"
      />
    </svg>
  );
}
