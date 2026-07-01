import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  yoloContacts,
  yoloLinks,
  yoloMembers,
  yoloMissions,
  yoloProfile,
  yoloPrograms,
  yoloVision,
} from "@/data/yolo";
import type { Metadata } from "next";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { getYoloTeamMembers } from "@/lib/notion-team";
import type { YoloTeamMember } from "@/lib/notion-team";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tentang Kami - YOLO",
  description:
    "Kenali YOLO, Young Muslim's Life Community, komunitas kepemudaan yang bergerak di bidang pendidikan dan sosial.",
};

const featuredPrograms = yoloPrograms.slice(0, 6);

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default async function AboutPage() {
  const teamMembers = await getYoloTeamMembers();

  const activeTeam = teamMembers.filter(
    (member) => member.status.toLowerCase() === "aktif",
  );

  const demisionerTeam = teamMembers.filter(
    (member) => member.status.toLowerCase() === "demisioner",
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <AboutHero />
      <ProfileSection />
      <VisionMissionSection />
      <TeamSection activeTeam={activeTeam} demisionerTeam={demisionerTeam} />
      <MembersSection />
      <ProgramsSection />

      <Footer />
    </main>
  );
}

function AboutHero() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-16 md:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#006399]">
              Tentang Kami
            </p>

            <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-5xl md:leading-[1.08]">
              {yoloProfile.fullName}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#3f4851] md:text-lg md:leading-8">
              {yoloProfile.shortDescription} Berdiri sejak{" "}
              <span className="font-bold text-[#006399]">
                {yoloProfile.established}
              </span>
              , YOLO hadir sebagai ruang bagi pemuda muslim untuk tumbuh,
              bergerak, dan bermanfaat.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={yoloLinks.join}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
              >
                Gabung YOLO
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>

              <Link
                href={yoloLinks.askAdmin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#006399] bg-white px-6 py-3 text-sm font-bold text-[#006399] transition hover:bg-[#f4f2ff]"
              >
                Tanya Admin
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-5 -top-5 h-24 w-24 rounded-bl-[3rem] rounded-tr-[3rem] bg-[#006399]" />
            <div className="absolute -bottom-5 -left-5 h-20 w-20 rounded-br-[2.5rem] bg-[#df8400]/80" />

            <div className="relative overflow-hidden rounded-[2rem] border border-[#e0e0ff] bg-white p-3 shadow-sm">
              <img
                src="https://i.pinimg.com/736x/38/9f/45/389f458263ae257a6b9fce536b9da8c2.jpg"
                alt="Foto kegiatan YOLO"
                className="aspect-[16/10] w-full rounded-[1.5rem] object-cover"
              />

              <div className="mt-3 grid grid-cols-3 gap-2">
                <HeroInfo value={yoloProfile.established} label="Berdiri" />
                <HeroInfo value="Edukasi" label="Fokus" />
                <HeroInfo value="Sosial" label="Fokus" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroInfo({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-[#f4f2ff] px-4 py-3">
      <p className="text-lg font-bold text-[#006399]">{value}</p>
      <p className="mt-0.5 text-xs font-semibold text-[#3f4851]">{label}</p>
    </div>
  );
}

function ProfileSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-14 md:px-16 md:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="overflow-hidden rounded-[2rem] border border-[#e0e0ff] bg-[#f4f2ff] p-3">
          <img
            src="https://i.pinimg.com/736x/81/5a/65/815a65967682f0c90a7bfd35293ae370.jpg"
            alt="Foto komunitas YOLO"
            className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="YOLO Profile"
            title="Komunitas kepemudaan di bidang pendidikan dan sosial."
          />

          <div className="mt-5 space-y-4 leading-7 text-[#3f4851]">
            <p>{yoloProfile.shortDescription}</p>
            <p>{yoloProfile.longDescription}</p>
          </div>

          <div className="mt-7 rounded-[1.5rem] bg-[#fbf8ff] p-5 ring-1 ring-[#e0e0ff]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#006399]">
              Tagline
            </p>

            <p className="mt-2 text-2xl font-bold leading-tight text-[#000767]">
              {yoloProfile.tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisionMissionSection() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-16 md:py-16">
        <div className="mb-8">
          <SectionHeading
            eyebrow="Vision & Mission"
            title="Arah gerakan YOLO."
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.75rem] bg-[#006399] p-6 text-white md:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#95ccff]">
              Vision
            </p>

            <p className="mt-4 text-lg font-semibold leading-8 md:text-xl md:leading-9">
              “{yoloVision}”
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[#e0e0ff] bg-white p-6 md:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#006399]">
              Mission
            </p>

            <div className="mt-5 space-y-4">
              {yoloMissions.map((mission, index) => (
                <div key={mission} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#91f78e] text-sm font-bold text-[#00731e]">
                    {index + 1}
                  </div>

                  <p className="leading-7 text-[#3f4851]">{mission}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamSection({
  activeTeam,
  demisionerTeam,
}: {
  activeTeam: YoloTeamMember[];
  demisionerTeam: YoloTeamMember[];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-16 md:py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our Team"
            title="Tim inti YOLO."
            description="Struktur yang mengelola arah komunitas, program, media, relasi publik, dan pengembangan anggota."
          />

          <p className="text-sm font-semibold text-[#006399]">
            {activeTeam.length} Pengurus Aktif
          </p>
        </div>

        {activeTeam.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {activeTeam.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <EmptyState text="Data pengurus aktif belum tersedia." />
        )}

        <div className="mt-14">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Demisioner"
              title="Alumni pengurus YOLO."
              description="Mereka yang pernah ikut membangun perjalanan YOLO dan menjadi bagian dari perkembangan komunitas."
            />

            <p className="text-sm font-semibold text-[#006399]">
              {demisionerTeam.length} Alumni Pengurus
            </p>
          </div>

          {demisionerTeam.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {demisionerTeam.map((member) => (
                <TeamCard key={member.id} member={member} isDemisioner />
              ))}
            </div>
          ) : (
            <EmptyState text="Data demisioner belum tersedia." />
          )}
        </div>
      </div>
    </section>
  );
}

function TeamCard({
  member,
  isDemisioner = false,
}: {
  member: YoloTeamMember;
  isDemisioner?: boolean;
}) {
  return (
    <article
      className={`overflow-hidden rounded-[1.5rem] border border-[#e0e0ff] transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70 ${
        isDemisioner ? "bg-white" : "bg-[#fbf8ff]"
      }`}
    >
      <div className="aspect-[4/5] overflow-hidden bg-[#e0e0ff]">
        {member.photo ? (
          <img
            src={member.photo}
            alt={`Foto ${member.name}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#cde5ff] text-3xl font-bold text-[#006399]">
            {getInitials(member.name)}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {member.division ? (
            <span className="rounded-full bg-[#cde5ff] px-3 py-1 text-[11px] font-bold text-[#006399]">
              {member.division}
            </span>
          ) : null}

          {member.period ? (
            <span className="rounded-full bg-[#f4f2ff] px-3 py-1 text-[11px] font-bold text-[#3f4851]">
              {member.period}
            </span>
          ) : null}
        </div>

        <h3 className="text-base font-bold leading-tight text-[#000767]">
          {member.name}
        </h3>

        <p className="mt-1 text-sm font-semibold text-[#006399]">
          {member.role}
        </p>

        {member.description ? (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#3f4851]">
            {member.description}
          </p>
        ) : null}

        {member.instagram ? (
          <Link
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex text-sm font-bold text-[#006399] transition hover:text-[#1da1f2]"
          >
            Instagram
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function MembersSection() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-14 md:px-16 md:py-16 lg:grid-cols-[0.75fr_1.25fr]">
        <SectionHeading
          eyebrow="Anggota YOLO"
          title="Anggota aktif yang ikut bergerak."
          description="Selain struktur inti, YOLO juga didukung oleh anggota yang membantu kegiatan komunitas, sosial, edukasi, dan dokumentasi."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {yoloMembers.map((member) => (
            <div
              key={member}
              className="flex items-center gap-3 rounded-2xl border border-[#e0e0ff] bg-white p-3.5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#cde5ff] text-xs font-bold text-[#006399]">
                {getInitials(member)}
              </div>

              <p className="text-sm font-semibold text-[#3f4851]">{member}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-16 md:py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our Program"
            title="Program yang dijalankan YOLO."
            description="Beberapa program unggulan yang menjadi ruang belajar, kebersamaan, dan kebermanfaatan."
          />

          <Link
            href="/program"
            className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[#006399] transition hover:text-[#1da1f2]"
          >
            Lihat semua program
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPrograms.map((program) => (
            <article
              key={program.title}
              className="rounded-[1.5rem] border border-[#e0e0ff] bg-[#fbf8ff] p-5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006399]">
                {program.category}
              </p>

              <h3 className="mt-2 text-lg font-bold text-[#000767]">
                {program.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-[#cbd5e1] bg-[#fbf8ff] p-8 text-center">
      <p className="text-sm font-semibold text-[#3f4851]">{text}</p>
    </div>
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
