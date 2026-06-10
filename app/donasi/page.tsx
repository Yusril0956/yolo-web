import Link from "next/link";
import type { ReactNode, SVGProps } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { yoloLinks } from "@/data/yolo";

type IconProps = SVGProps<SVGSVGElement>;

const donationMethods = [
  {
    title: "QRIS",
    description:
      "Scan QRIS untuk donasi cepat. Gambar QRIS bisa kamu pasang nanti.",
    value: "Coming Soon",
    icon: <IconQr className="h-8 w-8" />,
  },
  {
    title: "Transfer Bank",
    description: "Gunakan rekening komunitas untuk mendukung kegiatan YOLO.",
    value: "YOLO Community",
    icon: <IconBank className="h-8 w-8" />,
  },
  {
    title: "E-Wallet",
    description:
      "Bisa juga lewat e-wallet jika nanti komunitas sudah menyiapkannya.",
    value: "DANA / GoPay / OVO",
    icon: <IconWallet className="h-8 w-8" />,
  },
];

const donationUses = [
  {
    title: "Berbagi Makanan",
    description:
      "Membantu kebutuhan kegiatan berbagi takjil, nasi box, dan makanan sederhana untuk warga sekitar.",
    icon: <IconFood className="h-9 w-9" />,
  },
  {
    title: "Edukasi Anak",
    description:
      "Mendukung alat tulis, materi belajar, hadiah kecil, dan kebutuhan kegiatan edukasi anak.",
    icon: <IconBook className="h-9 w-9" />,
  },
  {
    title: "Bantuan Sosial",
    description:
      "Membantu pengadaan paket bantuan sederhana untuk warga sekitar yang membutuhkan.",
    icon: <IconBox className="h-9 w-9" />,
  },
];

const confirmationSteps = [
  "Lakukan donasi melalui metode yang tersedia.",
  "Simpan bukti transfer atau screenshot pembayaran.",
  "Kirim bukti donasi ke WhatsApp admin YOLO.",
  "Admin akan mencatat donasi untuk kebutuhan laporan kegiatan.",
];

export default function DonasiPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <DonasiHero />
      <DonationMethods />
      <DonationUse />
      <ConfirmationSection />
      <TransparencySection />
      <DonasiCTA />

      <Footer />
    </main>
  );
}

function DonasiHero() {
  return (
    <section className="relative overflow-hidden bg-[#f4f2ff]">
      <div className="absolute left-[-120px] top-20 h-80 w-80 rounded-full bg-[#1da1f2]/15 blur-3xl" />
      <div className="absolute right-[-120px] bottom-10 h-80 w-80 rounded-full bg-[#df8400]/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-4 py-20 md:px-16 md:py-28 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <span className="mb-6 inline-block rounded-full bg-[#91f78e] px-4 py-1.5 text-xs font-semibold text-[#00731e]">
            Donasi YOLO
          </span>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-6xl md:leading-[1.1]">
            Dukung aksi sosial yang berdampak untuk sekitar.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3f4851]">
            Donasi yang terkumpul akan digunakan untuk mendukung kegiatan
            berbagi makanan, edukasi anak, dan bantuan sosial untuk warga
            sekitar.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#metode-donasi"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
            >
              Lihat Metode Donasi
              <IconArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href={yoloLinks.donationConfirmation}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#006399] bg-white px-7 py-4 text-sm font-bold text-[#006399] transition hover:bg-[#e0e0ff]"
            >
              Konfirmasi WhatsApp
            </Link>
          </div>
        </div>

        <div className="rounded-[2.5rem] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-[#e0e0ff]">
          <div className="rounded-[2rem] bg-[#006399] p-8 text-white">
            <IconDonate className="h-20 w-20 text-[#95ccff]" />

            <h2 className="mt-8 text-3xl font-bold leading-tight">
              Bantuan kecil bisa jadi langkah besar ketika dikumpulkan bersama.
            </h2>

            <p className="mt-4 leading-8 text-white/85">
              Setiap dukungan akan membantu YOLO menjaga kegiatan sosial tetap
              berjalan dan menjangkau lebih banyak warga sekitar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DonationMethods() {
  return (
    <section id="metode-donasi" className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-16">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
            Metode Donasi
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
            Pilih cara donasi yang paling mudah.
          </h2>

          <p className="mt-4 leading-8 text-[#3f4851]">
            Untuk tahap awal, sistem donasi YOLO dibuat manual agar mudah
            dikelola oleh komunitas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {donationMethods.map((method) => (
            <article
              key={method.title}
              className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-[#e0e0ff] transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#cde5ff] text-[#006399]">
                {method.icon}
              </div>

              <h3 className="text-2xl font-bold text-[#000767]">
                {method.title}
              </h3>

              <p className="mt-3 leading-7 text-[#3f4851]">
                {method.description}
              </p>

              <div className="mt-6 rounded-2xl bg-[#f4f2ff] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006399]">
                  Informasi
                </p>

                <p className="mt-2 font-bold text-[#000767]">{method.value}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DonationUse() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-20 md:grid-cols-[0.9fr_1.1fr] md:px-16">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
            Penggunaan Donasi
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
            Donasi digunakan untuk kegiatan yang dekat dengan warga.
          </h2>

          <p className="mt-4 leading-8 text-[#3f4851]">
            Setiap dukungan diarahkan untuk membantu kebutuhan kegiatan sosial
            YOLO, mulai dari konsumsi, perlengkapan edukasi, sampai bantuan
            sederhana untuk warga sekitar.
          </p>
        </div>

        <div className="grid gap-5">
          {donationUses.map((item) => (
            <article
              key={item.title}
              className="flex gap-5 rounded-[2rem] bg-[#fbf8ff] p-6 ring-1 ring-[#e0e0ff]"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#cde5ff] text-[#006399]">
                {item.icon}
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#000767]">
                  {item.title}
                </h3>

                <p className="mt-2 leading-7 text-[#3f4851]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConfirmationSection() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-16">
        <div className="grid gap-8 rounded-[2.5rem] bg-white p-8 shadow-sm ring-1 ring-[#e0e0ff] md:grid-cols-[0.9fr_1.1fr] md:p-12">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
              Konfirmasi Donasi
            </p>

            <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
              Setelah donasi, kirim bukti ke admin YOLO.
            </h2>

            <p className="mt-4 leading-8 text-[#3f4851]">
              Konfirmasi membantu admin mencatat donasi dan menyusun laporan
              kegiatan dengan lebih rapi.
            </p>

            <Link
              href="https://wa.me/6281234567890"
              target="_blank"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
            >
              Konfirmasi via WhatsApp
              <IconArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid gap-4">
            {confirmationSteps.map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-2xl bg-[#f4f2ff] p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#91f78e] text-sm font-bold text-[#00731e]">
                  {index + 1}
                </div>

                <p className="leading-7 text-[#3f4851]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TransparencySection() {
  return (
    <section className="bg-[#28305F]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-20 text-white md:grid-cols-[0.9fr_1.1fr] md:px-16">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#95ccff]">
            Transparansi
          </p>

          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            Donasi dicatat untuk mendukung kegiatan komunitas.
          </h2>
        </div>

        <div>
          <p className="leading-8 text-white/80">
            YOLO dapat membuat rekap sederhana setelah kegiatan selesai, seperti
            jumlah donasi terkumpul, kebutuhan yang dibeli, dan dokumentasi
            penyaluran. Bagian ini nanti bisa dikembangkan menjadi laporan
            kegiatan atau update di halaman kegiatan.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <MiniInfo number="01" label="Donasi masuk" />
            <MiniInfo number="02" label="Kegiatan berjalan" />
            <MiniInfo number="03" label="Dokumentasi dibuat" />
          </div>
        </div>
      </div>
    </section>
  );
}

function DonasiCTA() {
  return (
    <section className="bg-[#fbf8ff]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-16">
        <div className="rounded-[2.5rem] bg-[#006399] p-8 text-white md:p-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#95ccff]">
                Ikut Mendukung
              </p>

              <h2 className="max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
                Mau bantu selain donasi uang?
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-white/80">
                Kamu juga bisa ikut sebagai relawan, bantu dokumentasi,
                menyebarkan info kegiatan, atau memberi ide program.
              </p>
            </div>

            <Link
              href={yoloLinks.volunteer}
              target="_blank"
              rel="noopener noreferrer"
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

function MiniInfo({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-[1.5rem] bg-white/10 p-5 backdrop-blur">
      <p className="text-2xl font-bold text-white">{number}</p>
      <p className="mt-2 text-sm font-semibold text-white/75">{label}</p>
    </div>
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

function IconDonate(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M32 55S12 43 12 27c0-8 6-14 14-14 4 0 7 2 9 5 2-3 5-5 9-5 8 0 14 6 14 14 0 16-26 28-26 28z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M22 43h20"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconQr(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <rect x="10" y="10" width="16" height="16" rx="3" fill="currentColor" />
      <rect x="38" y="10" width="16" height="16" rx="3" fill="currentColor" />
      <rect x="10" y="38" width="16" height="16" rx="3" fill="currentColor" />
      <path
        d="M38 38h6v6h-6v-6zM48 38h6v16H38v-6h10V38zM30 30h6v6h-6v-6z"
        fill="currentColor"
        opacity="0.65"
      />
    </svg>
  );
}

function IconBank(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path d="M8 24L32 10l24 14H8z" fill="currentColor" />
      <path
        d="M14 28h8v20h-8V28zM28 28h8v20h-8V28zM42 28h8v20h-8V28zM10 52h44"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconWallet(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M10 18c0-4 3-7 7-7h32c3 0 5 2 5 5v6H17c-4 0-7 3-7 7V18z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M10 26c0-4 3-7 7-7h36c4 0 7 3 7 7v23c0 4-3 7-7 7H17c-4 0-7-3-7-7V26z"
        fill="currentColor"
      />
      <circle cx="48" cy="38" r="4" fill="white" />
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
      <path d="M52 22v22L32 54V32l20-10z" fill="currentColor" opacity="0.55" />
    </svg>
  );
}
