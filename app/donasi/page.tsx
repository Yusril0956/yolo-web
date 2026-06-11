import Link from "next/link";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { yoloLinks, yoloProfile } from "@/data/yolo";
import type { Metadata } from "next";
import { ArrowRight, WalletMinimal, Landmark, CircleCheckBig } from "lucide-react";

type PaymentMethod = {
  name: string;
  number: string;
  accountName: string;
  note: string;
  icon: ReactNode;
};

const paymentMethods: PaymentMethod[] = [
  {
    name: "DANA",
    number: "085797148636",
    accountName: "Annisa Pebriani",
    note: "Gunakan nomor ini untuk donasi melalui DANA.",
    icon: <WalletMinimal className="h-8 w-8" />,
  },
  {
    name: "BCA",
    number: "6395827557",
    accountName: "Annisa Pebriani",
    note: "Gunakan rekening ini untuk donasi melalui transfer BCA.",
    icon: <Landmark className="h-8 w-8" />,
  },
];

const donationUses = [
  "Kegiatan pendidikan dan pembinaan.",
  "Program sosial dan berbagi untuk masyarakat.",
  "Kebutuhan operasional kegiatan komunitas.",
];

const donationSteps = [
  "Pilih metode donasi yang tersedia.",
  "Lakukan transfer sesuai nominal yang ingin didonasikan.",
  "Simpan bukti transfer atau screenshot pembayaran.",
  "Kirim bukti donasi ke admin YOLO melalui WhatsApp.",
];

export const metadata: Metadata = {
  title: "Donasi - YOLO",
  description:
    "Dukung kegiatan pendidikan, sosial, dan pembinaan komunitas YOLO melalui donasi.",
};

export default function DonasiPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <section className="bg-[#fbf8ff]">
        <div className="mx-auto max-w-[1280px] px-4 py-16 md:px-16 md:py-20">
          <PageHeader />
          <PaymentSection />
          <DonationInfoSection />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function PageHeader() {
  return (
    <div className="mb-10 max-w-3xl">
      <span className="mb-5 inline-block rounded-full bg-[#91f78e] px-4 py-1.5 text-xs font-semibold text-[#00731e]">
        Donasi YOLO
      </span>

      <h1 className="text-4xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-5xl">
        Dukung kegiatan {yoloProfile.name}.
      </h1>

      <p className="mt-5 max-w-2xl text-lg leading-8 text-[#3f4851]">
        Donasi yang masuk akan digunakan untuk mendukung kegiatan pendidikan,
        sosial, dan program komunitas YOLO.
      </p>
    </div>
  );
}

function PaymentSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[2.5rem] bg-white p-6 shadow-sm ring-1 ring-[#e0e0ff] md:p-8">
        <div className="mb-6">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
            Metode Pembayaran
          </p>

          <h2 className="text-2xl font-bold text-[#000767] md:text-3xl">
            Pilih salah satu metode donasi.
          </h2>
        </div>

        <div className="grid gap-5">
          {paymentMethods.map((method) => (
            <PaymentCard key={method.name} method={method} />
          ))}
        </div>

        <div className="mt-6 rounded-[1.5rem] bg-[#f4f2ff] p-5">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#006399]">
            Catatan
          </p>

          <p className="mt-2 leading-7 text-[#3f4851]">
            Setelah donasi, kirim bukti transfer ke admin YOLO agar donasi bisa
            dicatat dengan rapi.
          </p>
        </div>
      </div>

      <DonationSteps />
    </div>
  );
}

function PaymentCard({ method }: { method: PaymentMethod }) {
  return (
    <article className="rounded-[2rem] border border-[#e0e0ff] bg-[#fbf8ff] p-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#cde5ff] text-[#006399]">
            {method.icon}
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#000767]">{method.name}</h3>

            <p className="mt-2 text-sm leading-6 text-[#3f4851]">
              {method.note}
            </p>
          </div>
        </div>

        <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-bold text-[#006399] ring-1 ring-[#e0e0ff]">
          Donasi
        </span>
      </div>

      <div className="mt-5 grid gap-3 rounded-[1.5rem] bg-white p-5 ring-1 ring-[#e0e0ff]">
        <InfoRow label="Nomor" value={method.number} />
        <InfoRow label="Atas Nama" value={method.accountName} />
      </div>
    </article>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-semibold text-[#3f4851]">{label}</p>

      <p className="font-bold tracking-wide text-[#000767]">{value}</p>
    </div>
  );
}

function DonationSteps() {
  return (
    <div className="rounded-[2.5rem] bg-[#006399] p-6 text-white shadow-sm md:p-8">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#95ccff]">
        Alur Donasi
      </p>

      <h2 className="text-2xl font-bold leading-tight md:text-3xl">
        Donasi sederhana, konfirmasi tetap rapi.
      </h2>

      <div className="mt-7 grid gap-4">
        {donationSteps.map((step, index) => (
          <div key={step} className="flex gap-4 rounded-2xl bg-white/10 p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-[#006399]">
              {index + 1}
            </div>

            <p className="leading-7 text-white/85">{step}</p>
          </div>
        ))}
      </div>

      <Link
        href={yoloLinks.donationConfirmation}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#006399] transition hover:bg-[#ffdcbe]"
      >
        Konfirmasi Donasi
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function DonationInfoSection() {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-[#e0e0ff] md:p-8">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
          Penggunaan Donasi
        </p>

        <h2 className="text-2xl font-bold text-[#000767]">
          Donasi digunakan untuk kegiatan YOLO.
        </h2>

        <div className="mt-6 grid gap-3">
          {donationUses.map((item) => (
            <div key={item} className="flex gap-3">
              <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#91f78e] text-[#00731e]">
                <CircleCheckBig className="h-4 w-4" />
              </div>

              <p className="leading-7 text-[#3f4851]">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] bg-[#ffdcbe] p-6 ring-1 ring-[#f3c38e] md:p-8">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#693c00]">
          Penting
        </p>

        <h2 className="text-2xl font-bold text-[#000767]">
          Pastikan data transfer sesuai.
        </h2>

        <p className="mt-4 leading-8 text-[#3f4851]">
          Sebelum transfer, pastikan nomor DANA atau rekening BCA dan nama
          penerima sudah sesuai. Setelah itu, kirim bukti donasi ke admin YOLO
          melalui WhatsApp.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={yoloLinks.askAdmin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#006399] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
          >
            Tanya Admin
          </Link>

          <Link
            href="/kegiatan"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-[#006399] transition hover:bg-[#f4f2ff]"
          >
            Lihat Kegiatan
          </Link>
        </div>
      </div>
    </div>
  );
}
