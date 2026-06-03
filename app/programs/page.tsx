import Link from "next/link";
import type { ReactNode, SVGProps } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type IconProps = SVGProps<SVGSVGElement>;

const programs = [
  {
    title: "Berbagi Makanan",
    label: "Social Charity",
    description:
      "Program berbagi makanan seperti takjil, nasi box, atau paket konsumsi sederhana untuk warga sekitar yang membutuhkan.",
    icon: <IconFood className="h-10 w-10" />,
    examples: [
      "Berbagi takjil saat Ramadan",
      "Jumat berbagi makanan",
      "Paket makan untuk warga sekitar",
    ],
  },
  {
    title: "Edukasi Anak",
    label: "Education",
    description:
      "Kegiatan belajar santai untuk anak-anak melalui materi ringan, permainan edukatif, cerita, dan aktivitas kreatif.",
    icon: <IconBook className="h-10 w-10" />,
    examples: [
      "Kelas membaca dan menulis",
      "Belajar sambil bermain",
      "Mentoring ringan untuk anak-anak",
    ],
  },
  {
    title: "Charity Sosial",
    label: "Donation",
    description:
      "Pengumpulan dan penyaluran bantuan sederhana untuk warga yang sedang membutuhkan, sesuai kondisi dan kemampuan komunitas.",
    icon: <IconBox className="h-10 w-10" />,
    examples: [
      "Donasi kebutuhan pokok",
      "Bantuan untuk warga sekitar",
      "Penggalangan dana kegiatan sosial",
    ],
  },
  {
    title: "Relawan Lapangan",
    label: "Volunteer",
    description:
      "Ruang untuk anak muda yang ingin ikut membantu secara langsung, mulai dari persiapan, pelaksanaan, dokumentasi, sampai evaluasi kegiatan.",
    icon: <IconPeople className="h-10 w-10" />,
    examples: [
      "Tim pelaksana kegiatan",
      "Tim dokumentasi",
      "Tim distribusi bantuan",
    ],
  },
];

const workFlow = [
  {
    title: "Rencanakan",
    description:
      "Tim YOLO menentukan kebutuhan, lokasi, bentuk kegiatan, dan kebutuhan relawan.",
  },
  {
    title: "Kumpulkan Dukungan",
    description:
      "Kegiatan didukung melalui relawan, donasi, bantuan barang, atau kolaborasi dengan warga.",
  },
  {
    title: "Turun Langsung",
    description:
      "Relawan bergerak ke lapangan untuk menjalankan kegiatan dan berinteraksi dengan warga.",
  },
  {
    title: "Dokumentasikan",
    description:
      "Setiap kegiatan dicatat sebagai dokumentasi dan bahan evaluasi agar program berikutnya lebih baik.",
  },
];

export default function ProgramPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <ProgramHero />
      <ProgramList />
      <HowItWorks />
      <ImpactPreview />
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
            Aksi sosial yang dekat dengan warga sekitar.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3f4851]">
            Program YOLO berfokus pada kegiatan berbagi, edukasi, charity, dan
            relawan. Semua dirancang agar anak muda bisa ikut membantu dengan
            cara yang sederhana, terarah, dan bermanfaat.
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
              href="/kegiatan"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#006399] bg-white px-7 py-4 text-sm font-bold text-[#006399] transition hover:bg-[#e0e0ff]"
            >
              Lihat Kegiatan
            </Link>
          </div>
        </div>

        <div className="rounded-[2.5rem] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-[#e0e0ff]">
          <div className="rounded-[2rem] bg-[#006399] p-8 text-white">
            <IconHands className="h-20 w-20 text-[#95ccff]" />

            <h2 className="mt-8 text-3xl font-bold leading-tight">
              Kebaikan tidak harus besar untuk bisa berarti.
            </h2>

            <p className="mt-4 leading-8 text-white/85">
              Satu makanan yang dibagikan, satu anak yang dibantu belajar, dan
              satu relawan yang hadir bisa menjadi awal dari dampak yang lebih
              luas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramList() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-16">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
            Fokus Program
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
            Empat cara YOLO bergerak.
          </h2>

          <p className="mt-4 leading-8 text-[#3f4851]">
            Setiap program dibuat agar mudah diikuti oleh relawan dan tetap
            memberi manfaat nyata untuk warga sekitar.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {programs.map((program) => (
            <ProgramCard key={program.title} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCard({
  program,
}: {
  program: {
    title: string;
    label: string;
    description: string;
    icon: ReactNode;
    examples: string[];
  };
}) {
  return (
    <article className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-[#e0e0ff] transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#cde5ff] text-[#006399]">
          {program.icon}
        </div>

        <span className="rounded-full bg-[#f4f2ff] px-4 py-2 text-xs font-bold text-[#006399]">
          {program.label}
        </span>
      </div>

      <h3 className="text-2xl font-bold text-[#000767]">{program.title}</h3>

      <p className="mt-4 leading-8 text-[#3f4851]">{program.description}</p>

      <div className="mt-6 grid gap-3">
        {program.examples.map((example) => (
          <div key={example} className="flex items-start gap-3">
            <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#91f78e] text-[#00731e]">
              <IconCheck className="h-3.5 w-3.5" />
            </div>

            <p className="text-sm font-medium leading-6 text-[#3f4851]">
              {example}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function HowItWorks() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-16">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
            Cara Kerja
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
            Dari ide kecil sampai jadi aksi di lapangan.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {workFlow.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[2rem] bg-[#fbf8ff] p-6 ring-1 ring-[#e0e0ff]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#006399] text-sm font-bold text-white">
                {index + 1}
              </div>

              <h3 className="text-xl font-bold text-[#000767]">
                {item.title}
              </h3>

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

function ImpactPreview() {
  const impacts = [
    {
      number: "120+",
      label: "Relawan",
    },
    {
      number: "35+",
      label: "Kegiatan",
    },
    {
      number: "800+",
      label: "Paket bantuan",
    },
    {
      number: "12+",
      label: "Kelas edukasi",
    },
  ];

  return (
    <section className="bg-[#28305F]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 text-white md:px-16">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#95ccff]">
            Dampak Program
          </p>

          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            Setiap program diarahkan untuk memberi manfaat yang terasa.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {impacts.map((item) => (
            <div
              key={item.label}
              className="rounded-[2rem] bg-white/10 p-6 backdrop-blur"
            >
              <p className="text-4xl font-bold text-white">{item.number}</p>

              <p className="mt-2 font-semibold text-white/75">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCTA() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-16">
        <div className="rounded-[2.5rem] bg-[#006399] p-8 text-white md:p-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#95ccff]">
                Ikut Program
              </p>

              <h2 className="max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
                Punya waktu, tenaga, atau ide untuk bantu kegiatan YOLO?
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-white/80">
                Kamu bisa ikut menjadi relawan, membantu dokumentasi,
                menyebarkan informasi, atau mendukung kegiatan lewat donasi.
              </p>
            </div>

            <Link
              href="/gabung"
              className="shrink-0 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#006399] transition hover:bg-[#ffdcbe]"
            >
              Gabung Relawan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* SVG ICONS */

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

function IconCheck(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      {...props}
    >
      <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconFood(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path d="M14 30c0 13 8 22 18 22s18-9 18-22H14z" fill="currentColor" />
      <path
        d="M19 30c1-10 7-16 13-16s12 6 13 16"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
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

function IconBox(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M12 22l20-10 20 10-20 10-20-10z"
        fill="currentColor"
        opacity="0.75"
      />
      <path d="M12 22v22l20 10V32L12 22z" fill="currentColor" />
      <path
        d="M52 22v22L32 54V32l20-10z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

function IconPeople(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <circle cx="24" cy="22" r="10" fill="currentColor" />
      <circle cx="44" cy="26" r="8" fill="currentColor" opacity="0.6" />
      <path
        d="M8 55c2-12 9-18 18-18s16 6 18 18H8z"
        fill="currentColor"
      />
      <path
        d="M34 55c1-8 6-13 13-13 6 0 11 5 13 13H34z"
        fill="currentColor"
        opacity="0.6"
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