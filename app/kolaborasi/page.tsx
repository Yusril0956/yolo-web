import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  HandHeart,
  Mail,
  Megaphone,
  MessageCircle,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnershipForm from "@/components/PartnershipForm";
import { yoloContacts, yoloLinks, yoloProfile } from "@/data/yolo";

export const metadata: Metadata = {
  title: "Kolaborasi - YOLO",
  description:
    "Ajakan kolaborasi bersama YOLO untuk program pendidikan, sosial, pembinaan, media partner, dan kegiatan komunitas.",
};

const partnershipLink =
  "https://wa.me/6285871786258?text=Assalamu%27alaikum%2C%20saya%20ingin%20mengajak%20YOLO%20untuk%20berkolaborasi.";

const collaborationTypes = [
  {
    title: "Kolaborasi Program",
    description:
      "Kerja sama dalam pelaksanaan program pendidikan, sosial, pembinaan, atau kegiatan komunitas.",
    icon: HandHeart,
  },
  {
    title: "Media Partner",
    description:
      "Kolaborasi publikasi kegiatan, kampanye sosial, dokumentasi, dan penyebaran informasi positif.",
    icon: Megaphone,
  },
  {
    title: "Dukungan Pendidikan",
    description:
      "Bentuk dukungan berupa kelas, pelatihan, mentoring, sharing session, atau fasilitas belajar.",
    icon: BookOpen,
  },
  {
    title: "Sponsorship Kegiatan",
    description:
      "Dukungan berupa dana, barang, konsumsi, tempat, perlengkapan, atau kebutuhan kegiatan.",
    icon: Building2,
  },
];

const partnerTargets = [
  "Komunitas sosial dan pendidikan",
  "Sekolah, kampus, atau lembaga pendidikan",
  "Brand atau UMKM yang punya kepedulian sosial",
  "Media partner dan creative team",
  "Lembaga zakat, donasi, atau filantropi",
  "Individu yang ingin berkontribusi",
];

const collaborationSteps = [
  {
    title: "Hubungi YOLO",
    description:
      "Partner dapat menghubungi admin YOLO melalui WhatsApp atau email untuk menyampaikan ide kerja sama.",
  },
  {
    title: "Diskusi kebutuhan",
    description:
      "Kita bahas bentuk kolaborasi, tujuan kegiatan, target peserta, waktu, dan kebutuhan teknis.",
  },
  {
    title: "Rancang konsep",
    description:
      "YOLO dan partner menyusun konsep kegiatan agar kerja sama berjalan jelas, rapi, dan berdampak.",
  },
  {
    title: "Eksekusi kegiatan",
    description:
      "Kegiatan dijalankan bersama dengan koordinasi, dokumentasi, dan evaluasi setelah program selesai.",
  },
];

export default function KolaborasiPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <HeroSection />
      <WhyCollaborateSection />
      <CollaborationTypesSection />
      <PartnershipFormSection />
      <PartnerTargetSection />
      <StepsSection />
      <ContactCTASection />

      <Footer />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#fbf8ff]">
      <div className="absolute -left-20 top-28 h-64 w-64 rounded-full bg-[#cde5ff] blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#ffdcbe] blur-3xl" />

      <div className="relative mx-auto grid max-w-[1280px] gap-10 px-4 py-16 md:px-16 md:py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#006399]">
            Partnership & Collaboration
          </p>

          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-5xl md:leading-[1.08]">
            Mari berkolaborasi untuk menghadirkan manfaat yang lebih luas.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#3f4851] md:text-lg md:leading-8">
            {yoloProfile.name} membuka ruang kerja sama dengan komunitas,
            lembaga, brand, sekolah, kampus, dan individu yang ingin ikut
            mendukung program pendidikan, sosial, dan pembinaan pemuda.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href={partnershipLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
            >
              Ajukan Kolaborasi
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>

            <Link
              href="/kegiatan"
              className="inline-flex items-center justify-center rounded-full border border-[#006399] bg-white px-6 py-3 text-sm font-bold text-[#006399] transition hover:bg-[#f4f2ff]"
            >
              Lihat Kegiatan YOLO
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-5 -top-5 h-24 w-24 rounded-bl-[3rem] rounded-tr-[3rem] bg-[#006399]" />
          <div className="absolute -bottom-5 -left-5 h-20 w-20 rounded-br-[2.5rem] bg-[#df8400]/80" />

          <div className="relative rounded-[2rem] border border-[#e0e0ff] bg-white p-5 shadow-sm">
            <div className="rounded-[1.5rem] bg-[#000767] p-7 text-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Sparkles className="h-7 w-7" strokeWidth={2.2} />
              </div>

              <p className="mt-8 text-sm font-bold uppercase tracking-[0.22em] text-[#95ccff]">
                Kolaborasi YOLO
              </p>

              <h2 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">
                Tumbuh, Bergerak, dan Bermanfaat.
              </h2>

              <p className="mt-4 leading-7 text-white/75">
                Setiap kolaborasi diarahkan untuk membangun ruang belajar,
                kepedulian sosial, dan gerakan positif untuk masyarakat.
              </p>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <HeroStat value="Sosial" label="Program" />
              <HeroStat value="Edukasi" label="Fokus" />
              <HeroStat value="Pemuda" label="Gerakan" />
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
      <p className="text-base font-bold text-[#006399]">{value}</p>
      <p className="mt-0.5 text-xs font-semibold text-[#3f4851]">{label}</p>
    </div>
  );
}

function WhyCollaborateSection() {
  const items = [
    {
      title: "Berbasis komunitas",
      description:
        "YOLO bergerak bersama anak muda yang aktif dalam kegiatan positif dan bermanfaat.",
      icon: Users,
    },
    {
      title: "Fokus pada dampak",
      description:
        "Kolaborasi diarahkan untuk memberi manfaat nyata melalui pendidikan, sosial, dan pembinaan.",
      icon: Target,
    },
    {
      title: "Terbuka untuk banyak bentuk kerja sama",
      description:
        "Kolaborasi bisa berupa program, dukungan kegiatan, media partner, sponsorship, atau volunteering.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-16 md:py-16">
        <div className="mb-8">
          <SectionHeading
            eyebrow="Why Collaborate"
            title="Kenapa berkolaborasi dengan YOLO?"
            description="YOLO menjadi ruang yang menghubungkan semangat pemuda, program sosial, dan kontribusi nyata untuk masyarakat."
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-[#e0e0ff] bg-[#fbf8ff] p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#cde5ff] text-[#006399]">
                  <Icon className="h-6 w-6" strokeWidth={2.3} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#000767]">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-[#3f4851]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CollaborationTypesSection() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-16 md:py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Collaboration Type"
            title="Bentuk kerja sama yang bisa dilakukan."
            description="Partner dapat memilih bentuk kolaborasi sesuai kebutuhan program, kapasitas, dan tujuan kegiatan."
          />

          <Link
            href={partnershipLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[#006399] transition hover:text-[#1da1f2]"
          >
            Diskusi dengan admin
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collaborationTypes.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-[#e0e0ff] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#006399] text-white">
                  <Icon className="h-6 w-6" strokeWidth={2.3} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#000767]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#3f4851]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PartnershipFormSection() {
  return (
    <section id="form-kolaborasi" className="bg-white">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-14 md:px-16 md:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <SectionHeading
          eyebrow="Form Kolaborasi"
          title="Ajukan kerja sama dengan YOLO."
          description="Isi form berikut agar tim YOLO bisa memahami kebutuhan, bentuk kolaborasi, dan rencana kegiatan yang ingin diajukan."
        />

        <PartnershipForm />
      </div>
    </section>
  );
}

function PartnerTargetSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-14 md:px-16 md:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <SectionHeading
          eyebrow="Partner"
          title="Siapa saja yang bisa berkolaborasi?"
          description="YOLO terbuka untuk berbagai pihak yang memiliki semangat kebaikan, pendidikan, sosial, dan pengembangan pemuda."
        />

        <div className="grid gap-3 sm:grid-cols-2">
          {partnerTargets.map((target) => (
            <div
              key={target}
              className="flex items-center gap-3 rounded-2xl border border-[#e0e0ff] bg-[#fbf8ff] p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#91f78e] text-[#00731e]">
                <CheckCircle2 className="h-5 w-5" strokeWidth={2.5} />
              </div>

              <p className="text-sm font-semibold leading-6 text-[#3f4851]">
                {target}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepsSection() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-16 md:py-16">
        <div className="mb-8">
          <SectionHeading
            eyebrow="Collaboration Flow"
            title="Alur pengajuan kolaborasi."
            description="Supaya kerja sama lebih rapi, YOLO menggunakan alur sederhana dari komunikasi awal sampai evaluasi kegiatan."
          />
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {collaborationSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[1.5rem] border border-[#e0e0ff] bg-white p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#006399] text-sm font-bold text-white">
                {index + 1}
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#000767]">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#3f4851]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTASection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-16 md:py-16">
        <div className="rounded-[2rem] bg-[#0f1744] p-7 text-white md:p-9">
          <div className="grid gap-7 md:grid-cols-[1fr_0.75fr] md:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#95ccff]">
                Let&apos;s Collaborate
              </p>

              <h2 className="text-2xl font-bold leading-tight md:text-3xl">
                Punya ide kerja sama dengan YOLO?
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-white/70">
                Ceritakan kebutuhan kolaborasi kamu. Tim YOLO akan membantu
                mengarahkan bentuk kerja sama yang paling sesuai.
              </p>
            </div>

            <div className="grid gap-3">
              <Link
                href={partnershipLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#006399] transition hover:bg-[#ffdcbe]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2.3} />
                Hubungi via WhatsApp
              </Link>

              <Link
                href={`mailto:${yoloContacts.email}?subject=Ajakan Kolaborasi bersama YOLO`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <Mail className="h-4 w-4" strokeWidth={2.3} />
                Kirim Email
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Kenali YOLO
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
        <p className="mt-3 max-w-xl leading-7 text-[#3f4851]">
          {description}
        </p>
      ) : null}
    </div>
  );
}