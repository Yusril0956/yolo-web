import Link from "next/link";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BaseSectionHeading from "@/components/ui/SectionHeading";
import { yoloContacts, yoloLinks, yoloProfile } from "@/data/yolo";

export const metadata: Metadata = {
  title: "Kolaborasi - YOLO",
  description:
    "Ajakan kolaborasi bersama YOLO untuk program pendidikan, sosial, pembinaan, media partner, dan kegiatan komunitas.",
};

const collaborationTypes: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Kolaborasi Program",
    description:
      "Mengadakan kegiatan pendidikan, sosial, pembinaan, atau kelas bersama YOLO.",
    icon: HandHeart,
  },
  {
    title: "Media Partner",
    description:
      "Mendukung publikasi kegiatan, kampanye sosial, dokumentasi, dan penyebaran informasi positif.",
    icon: Megaphone,
  },
  {
    title: "Dukungan Pendidikan",
    description:
      "Berbagi ilmu melalui mentoring, sharing session, kelas, pelatihan, atau fasilitas belajar.",
    icon: BookOpen,
  },
  {
    title: "Sponsorship",
    description:
      "Mendukung kegiatan dalam bentuk dana, barang, konsumsi, tempat, perlengkapan, atau kebutuhan program.",
    icon: Building2,
  },
];

const partnerTargets = [
  "Komunitas sosial",
  "Sekolah atau kampus",
  "Brand dan UMKM",
  "Media partner",
  "Lembaga pendidikan",
  "Individu relawan",
];

const collaborationSteps = [
  {
    title: "Ajukan ide",
    description:
      "Ceritakan bentuk kolaborasi, tujuan, dan kebutuhan kegiatan melalui form pengajuan.",
  },
  {
    title: "Diskusi konsep",
    description:
      "Tim YOLO akan meninjau pengajuan dan berdiskusi untuk menyamakan kebutuhan.",
  },
  {
    title: "Rancang kegiatan",
    description:
      "Konsep, timeline, pembagian peran, dan kebutuhan teknis disusun bersama.",
  },
  {
    title: "Jalankan program",
    description:
      "Kegiatan dieksekusi, didokumentasikan, lalu dievaluasi untuk pengembangan berikutnya.",
  },
];

export default function KolaborasiPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <HeroSection />
      <CollaborationIntroSection />
      <CollaborationTypesSection />
      <PartnerSection />
      <ProcessSection />
      <FinalCTASection />

      <Footer />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1180px] px-4 py-14 md:px-8 md:py-20 lg:px-0">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#006399]">
              Partnership & Collaboration
            </p>

            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-[-0.03em] text-[#000767] md:text-6xl md:leading-[1.04]">
              Bersama membangun ruang belajar, sosial, dan kebermanfaatan.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#3f4851] md:text-lg">
              {yoloProfile.name} membuka ruang kolaborasi untuk komunitas,
              sekolah, kampus, brand, lembaga, dan individu yang ingin ikut
              menghadirkan program positif untuk masyarakat.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kolaborasi/form"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#1da1f2]"
              >
                Ajukan Kolaborasi
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </Link>

              <Link
                href={yoloLinks.askAdmin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#006399]/25 bg-white px-6 py-3 text-sm font-bold text-[#006399] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f4f2ff]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
                Tanya Admin
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#d9d9f5] bg-white p-5 shadow-sm">
            <div className="rounded-[1.5rem] bg-[#f7fbff] p-6">
              <div className="flex items-center justify-between gap-4 border-b border-[#d9d9f5] pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#006399]">
                    Collaboration Brief
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-[#000767]">
                    Untuk siapa?
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf7ff] text-[#006399]">
                  <Sparkles className="h-6 w-6" strokeWidth={2.4} />
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <BriefItem
                  label="Fokus"
                  value="Pendidikan, sosial, pembinaan"
                />
                <BriefItem
                  label="Bentuk"
                  value="Program, sponsor, media partner"
                />
                <BriefItem label="Target" value="Pemuda dan masyarakat" />
                <BriefItem
                  label="Follow up"
                  value="Form pengajuan atau WhatsApp"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BriefItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-5 rounded-2xl bg-white px-4 py-3">
      <p className="text-sm font-bold text-[#006399]">{label}</p>
      <p className="text-right text-sm font-semibold leading-6 text-[#3f4851]">
        {value}
      </p>
    </div>
  );
}

function CollaborationIntroSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1180px] px-4 py-14 md:px-8 md:py-16 lg:px-0">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow="Why Collaborate"
            title="Kolaborasi yang tidak berhenti di acara, tapi berlanjut menjadi dampak."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <IntroCard
              title="Komunitas aktif"
              description="YOLO bergerak bersama pemuda yang terlibat dalam kegiatan positif dan sosial."
            />
            <IntroCard
              title="Program relevan"
              description="Kolaborasi diarahkan ke kebutuhan pendidikan, pembinaan, dan kebermanfaatan."
            />
            <IntroCard
              title="Ruang tumbuh"
              description="Partner dapat ikut membangun kegiatan yang punya nilai sosial dan pengembangan diri."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function IntroCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="border-l border-[#d9d9f5] pl-5">
      <h3 className="text-lg font-bold text-[#000767]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#3f4851]">{description}</p>
    </article>
  );
}

function CollaborationTypesSection() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1180px] px-4 py-14 md:px-8 md:py-16 lg:px-0">
        <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Collaboration Type"
            title="Bentuk kerja sama yang bisa diajukan."
            description="Pilih bentuk kolaborasi yang paling sesuai dengan kebutuhan, kapasitas, dan tujuan kegiatan."
          />

          <Link
            href="/kolaborasi/form"
            className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[#006399] transition hover:text-[#1da1f2]"
          >
            Mulai pengajuan
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {collaborationTypes.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group grid gap-5 rounded-[1.5rem] border border-[#d9d9f5] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#006399]/25 hover:shadow-lg hover:shadow-[#000767]/5 sm:grid-cols-[auto_1fr]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf7ff] text-[#006399] transition group-hover:bg-[#006399] group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={2.4} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#000767]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#3f4851]">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PartnerSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-14 md:px-8 md:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:px-0">
        <SectionHeading
          eyebrow="Partner"
          title="Terbuka untuk berbagai pihak yang ingin bergerak bersama."
          description="Kolaborasi bisa datang dari komunitas kecil, sekolah, kampus, brand, media, atau individu yang punya semangat kebaikan."
        />

        <div className="flex flex-wrap gap-3">
          {partnerTargets.map((target) => (
            <span
              key={target}
              className="inline-flex items-center gap-2 rounded-full border border-[#d9d9f5] bg-[#fbf8ff] px-4 py-2 text-sm font-bold text-[#3f4851]"
            >
              <CheckCircle2
                className="h-4 w-4 text-[#006399]"
                strokeWidth={2.5}
              />
              {target}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1180px] px-4 py-14 md:px-8 md:py-16 lg:px-0">
        <div className="mb-9">
          <SectionHeading
            eyebrow="Flow"
            title="Alur kerja sama dibuat sederhana dan jelas."
            description="Supaya tidak berhenti di obrolan, setiap pengajuan diarahkan ke proses yang rapi."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {collaborationSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[1.5rem] border border-[#d9d9f5] bg-white p-5"
            >
              <p className="text-sm font-bold text-[#006399]">0{index + 1}</p>

              <h3 className="mt-4 text-lg font-bold text-[#000767]">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#3f4851]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1180px] px-4 py-14 md:px-8 md:py-16 lg:px-0">
        <div className="rounded-[2rem] border border-[#d9d9f5] bg-[#f7fbff] p-6 md:p-8">
          <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006399]">
                Let&apos;s Collaborate
              </p>

              <h2 className="mt-3 text-2xl font-bold leading-tight text-[#000767] md:text-3xl">
                Siap mengajukan kerja sama dengan YOLO?
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-[#3f4851]">
                Isi form pengajuan agar tim YOLO bisa memahami ide, kebutuhan,
                dan bentuk kolaborasi yang ingin dijalankan.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link
                href="/kolaborasi/form"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
              >
                Isi Form Pengajuan
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </Link>

              <Link
                href={`mailto:${yoloContacts.email}?subject=Ajakan Kolaborasi bersama YOLO`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#006399]/25 bg-white px-6 py-3 text-sm font-bold text-[#006399] transition hover:bg-[#f4f2ff]"
              >
                <Mail className="h-4 w-4" strokeWidth={2.4} />
                Email YOLO
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
    <BaseSectionHeading
      eyebrow={eyebrow}
      title={title}
      description={description}
      titleClassName="md:text-4xl md:leading-[1.14]"
      descriptionMarginClassName="mt-4"
    />
  );
}
