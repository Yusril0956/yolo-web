import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  {
    title: "Peduli",
    description:
      "Kami hadir untuk lebih peka terhadap kebutuhan warga sekitar dan membantu sesuai kemampuan.",
  },
  {
    title: "Bergerak",
    description:
      "Kebaikan tidak berhenti di niat. YOLO mendorong aksi nyata yang bisa dirasakan langsung.",
  },
  {
    title: "Berkolaborasi",
    description:
      "Setiap kegiatan dijalankan bersama relawan, warga, dan pihak yang ingin ikut memberi manfaat.",
  },
  {
    title: "Bermanfaat",
    description:
      "Setiap program diarahkan agar memberi dampak sederhana, dekat, dan berkelanjutan.",
  },
];

const missions = [
  "Menyelenggarakan kegiatan sosial seperti berbagi makanan, takjil, dan bantuan sederhana.",
  "Membuat ruang edukasi untuk anak-anak melalui kegiatan belajar yang ringan dan menyenangkan.",
  "Mengajak anak muda untuk ikut berkontribusi sebagai relawan dalam kegiatan sosial.",
  "Membangun komunitas yang aktif, positif, dan peduli terhadap lingkungan sekitar.",
];

const teamMembers = [
  {
    name: "Nama Anggota",
    role: "Founder / Ketua YOLO",
    initials: "NA",
    description:
      "Mengatur arah komunitas, menjaga visi kegiatan, dan memastikan program YOLO berjalan dengan baik.",
  },
  {
    name: "Nama Anggota",
    role: "Koordinator Charity",
    initials: "NA",
    description:
      "Mengelola kegiatan berbagi makanan, donasi sosial, dan penyaluran bantuan untuk warga sekitar.",
  },
  {
    name: "Nama Anggota",
    role: "Koordinator Edukasi",
    initials: "NA",
    description:
      "Menyusun kegiatan belajar, mentoring, dan aktivitas edukasi kreatif untuk anak-anak.",
  },
  {
    name: "Nama Anggota",
    role: "Dokumentasi & Media",
    initials: "NA",
    description:
      "Mengabadikan kegiatan YOLO dan mengelola konten untuk Instagram, TikTok, serta publikasi komunitas.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#f4f2ff]">
        <div className="absolute left-[-120px] top-20 h-80 w-80 rounded-full bg-[#1da1f2]/15 blur-3xl" />
        <div className="absolute right-[-120px] bottom-10 h-80 w-80 rounded-full bg-[#df8400]/15 blur-3xl" />

        <div className="relative mx-auto max-w-[1280px] px-4 py-20 md:px-16 md:py-28">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block rounded-full bg-[#91f78e] px-4 py-1.5 text-xs font-semibold text-[#00731e]">
              About YOLO
            </span>

            <h1 className="text-4xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-6xl md:leading-[1.1]">
              Ruang anak muda untuk hadir, peduli, dan membantu.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3f4851]">
              YOLO adalah komunitas sosial yang bergerak untuk membantu warga
              sekitar melalui kegiatan berbagi, edukasi, dan aksi kepedulian.
              Kami percaya perubahan baik bisa dimulai dari langkah kecil yang
              dilakukan bersama.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8ff]">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-20 md:grid-cols-[0.9fr_1.1fr] md:px-16">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
              Cerita Kami
            </p>

            <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
              Berawal dari kepedulian sederhana untuk sekitar.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-[#3f4851]">
            <p>
              YOLO hadir sebagai tempat bagi anak muda yang ingin ikut bergerak
              dalam kegiatan sosial. Bentuk kegiatannya sederhana, seperti
              berbagi makanan, mengajar anak-anak, membantu warga sekitar, dan
              membuka ruang kolaborasi bagi relawan.
            </p>

            <p>
              Bagi kami, kegiatan sosial tidak harus selalu besar. Hal kecil
              yang dilakukan dengan konsisten tetap bisa memberi dampak bagi
              orang lain. Karena itu, YOLO berusaha menjadi komunitas yang dekat
              dengan warga dan mudah diikuti oleh siapa saja.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-16">
          <div className="mb-10 max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
              Visi & Misi
            </p>

            <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
              Menjadi komunitas yang membawa manfaat nyata.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[2rem] bg-[#006399] p-8 text-white">
              <h3 className="text-2xl font-bold">Visi</h3>

              <p className="mt-4 leading-8 text-white/90">
                Menjadi komunitas sosial anak muda yang aktif, peduli, dan mampu
                memberi dampak positif bagi warga sekitar melalui aksi nyata.
              </p>
            </div>

            <div className="rounded-[2rem] bg-[#f4f2ff] p-8">
              <h3 className="text-2xl font-bold text-[#000767]">Misi</h3>

              <div className="mt-6 grid gap-4">
                {missions.map((mission, index) => (
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

      <section className="bg-[#fbf8ff]">
        <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-16">
          <div className="mb-10 max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
              Nilai Komunitas
            </p>

            <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
              Prinsip yang jadi arah setiap kegiatan YOLO.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-[#e0e0ff]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#cde5ff] text-xl font-bold text-[#006399]">
                  {value.title.charAt(0)}
                </div>

                <h3 className="text-xl font-bold text-[#000767]">
                  {value.title}
                </h3>

                <p className="mt-3 leading-7 text-[#3f4851]">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TeamSection />

      <section className="bg-[#006399]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-4 py-16 text-white md:flex-row md:items-center md:px-16">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#95ccff]">
              Ikut Bergerak
            </p>

            <h2 className="max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
              Mau jadi bagian dari kegiatan sosial YOLO berikutnya?
            </h2>
          </div>

          <a
            href="/gabung"
            className="rounded-full bg-white px-8 py-4 text-sm font-bold text-[#006399] transition hover:bg-[#ffdcbe]"
          >
            Gabung Relawan
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function TeamSection() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-16">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
            Orang di Balik YOLO
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
            Mereka yang ikut menjaga gerakan ini tetap berjalan.
          </h2>

          <p className="mt-4 leading-8 text-[#3f4851]">
            YOLO berjalan karena ada orang-orang yang bergerak di balik layar,
            mulai dari menyusun kegiatan, menghubungi relawan, mengatur donasi,
            sampai mendokumentasikan setiap aksi.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <article
              key={`${member.name}-${member.role}`}
              className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-[#e0e0ff] transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#cde5ff] text-xl font-bold text-[#006399]">
                {member.initials}
              </div>

              <h3 className="text-xl font-bold text-[#000767]">
                {member.name}
              </h3>

              <p className="mt-1 text-sm font-semibold text-[#006399]">
                {member.role}
              </p>

              <p className="mt-4 leading-7 text-[#3f4851]">
                {member.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}