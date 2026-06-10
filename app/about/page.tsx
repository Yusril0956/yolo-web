import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  yoloLinks,
  yoloMembers,
  yoloMissions,
  yoloProfile,
  yoloTeam,
  yoloVision,
} from "@/data/yolo";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <AboutHero />
      <ProfileSection />
      <VisionMissionSection />
      <TeamSection />
      <MembersSection />
      <AboutCTA />

      <Footer />
    </main>
  );
}

function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#f4f2ff]">
      <div className="absolute left-[-120px] top-20 h-80 w-80 rounded-full bg-[#1da1f2]/15 blur-3xl" />
      <div className="absolute right-[-120px] bottom-10 h-80 w-80 rounded-full bg-[#df8400]/15 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-4 py-20 md:px-16 md:py-28">
        <div className="max-w-3xl">
          <span className="mb-6 inline-block rounded-full bg-[#91f78e] px-4 py-1.5 text-xs font-semibold text-[#00731e]">
            About YOLO
          </span>

          <h1 className="text-4xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-6xl md:leading-[1.1]">
            {yoloProfile.fullName}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3f4851]">
            {yoloProfile.shortDescription} Berdiri pada tahun{" "}
            <span className="font-bold text-[#006399]">
              {yoloProfile.established}
            </span>
            , YOLO hadir sebagai wadah bagi pemuda muslim untuk tumbuh,
            bergerak, dan bermanfaat.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProfileSection() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-20 md:grid-cols-[0.9fr_1.1fr] md:px-16">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
            YOLO Profile
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
            Komunitas kepemudaan yang bergerak di pendidikan dan sosial.
          </h2>
        </div>

        <div className="space-y-5 text-base leading-8 text-[#3f4851]">
          <p>{yoloProfile.shortDescription}</p>

          <p>{yoloProfile.longDescription}</p>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-[#e0e0ff]">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
              Tagline
            </p>

            <p className="mt-3 text-2xl font-bold leading-tight text-[#000767]">
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
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-16">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
            Vision & Mission
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
            Arah gerakan YOLO.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] bg-[#006399] p-8 text-white">
            <h3 className="text-2xl font-bold">Vision</h3>

            <p className="mt-4 leading-8 text-white/90">{yoloVision}</p>
          </div>

          <div className="rounded-[2rem] bg-[#f4f2ff] p-8">
            <h3 className="text-2xl font-bold text-[#000767]">Mission</h3>

            <div className="mt-6 grid gap-4">
              {yoloMissions.map((mission, index) => (
                <div
                  key={mission}
                  className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"
                >
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

function TeamSection() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-16">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
            Our Team
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
            Orang-orang di balik gerakan YOLO.
          </h2>

          <p className="mt-4 leading-8 text-[#3f4851]">
            YOLO berjalan karena ada tim yang mengelola arah komunitas, program,
            relasi publik, media, dan pengembangan anggota.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {yoloTeam.map((member) => (
            <article
              key={`${member.name}-${member.role}`}
              className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-[#e0e0ff] transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#cde5ff] text-xl font-bold text-[#006399]">
                {getInitials(member.name)}
              </div>

              <h3 className="text-xl font-bold text-[#000767]">
                {member.name}
              </h3>

              <p className="mt-1 text-sm font-semibold text-[#006399]">
                {member.role}
              </p>

              <p className="mt-4 leading-7 text-[#3f4851]">
                Bagian dari tim YOLO yang ikut menjaga komunitas tetap tumbuh,
                bergerak, dan bermanfaat.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MembersSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-20 md:grid-cols-[0.85fr_1.15fr] md:px-16">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
            Anggota YOLO
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
            Didukung oleh anggota aktif yang ikut bergerak.
          </h2>

          <p className="mt-4 leading-8 text-[#3f4851]">
            Selain struktur inti, YOLO juga didukung oleh anggota yang ikut
            membantu kegiatan komunitas, sosial, edukasi, dan dokumentasi.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {yoloMembers.map((member) => (
            <div
              key={member}
              className="flex items-center gap-3 rounded-2xl bg-[#fbf8ff] p-4 ring-1 ring-[#e0e0ff]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#cde5ff] text-sm font-bold text-[#006399]">
                {getInitials(member)}
              </div>

              <p className="font-semibold text-[#3f4851]">{member}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutCTA() {
  return (
    <section className="bg-[#006399]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-4 py-16 text-white md:flex-row md:items-center md:px-16">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#95ccff]">
            Ikut Bergerak
          </p>

          <h2 className="max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
            Mau menjadi bagian dari komunitas YOLO?
          </h2>

          <p className="mt-4 max-w-2xl leading-8 text-white/80">
            Gabung bersama YOLO dan ikut dalam kegiatan pendidikan, sosial, dan
            pembinaan yang bermanfaat untuk masyarakat.
          </p>
        </div>

        <Link
          href={yoloLinks.join}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#006399] transition hover:bg-[#ffdcbe]"
        >
          Gabung YOLO
        </Link>
      </div>
    </section>
  );
}
