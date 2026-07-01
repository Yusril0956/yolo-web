import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Mail,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnershipForm from "@/components/PartnershipForm";
import { yoloContacts, yoloLinks } from "@/data/yolo";

export const metadata: Metadata = {
  title: "Ajukan Kolaborasi - YOLO",
  description:
    "Isi form pengajuan kolaborasi bersama YOLO untuk program pendidikan, sosial, media partner, sponsorship, dan kegiatan komunitas.",
};

const formNotes = [
  {
    title: "Ditinjau oleh tim YOLO",
    description:
      "Pengajuan yang masuk akan dibaca terlebih dahulu sebelum ditindaklanjuti.",
    icon: ShieldCheck,
  },
  {
    title: "Respon melalui kontak",
    description:
      "Pastikan WhatsApp dan email aktif agar tim YOLO mudah menghubungi kembali.",
    icon: MessageCircle,
  },
  {
    title: "Isi dengan jelas",
    description:
      "Semakin jelas konsep kegiatan, semakin mudah untuk menentukan bentuk kerja sama.",
    icon: CheckCircle2,
  },
];

export default function AjukanKolaborasiPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <section className="bg-[#fbf8ff]">
        <div className="mx-auto max-w-[1180px] px-4 py-10 md:px-8 md:py-14 lg:px-0">
          <Link
            href="/kolaborasi"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#006399] transition hover:text-[#1da1f2]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
            Kembali ke halaman kolaborasi
          </Link>

          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <div className="rounded-[2rem] border border-[#d9d9f5] bg-white p-6 shadow-sm md:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#006399]">
                  Form Kolaborasi
                </p>

                <h1 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-5xl md:leading-[1.08]">
                  Ajukan kerja sama dengan YOLO.
                </h1>

                <p className="mt-5 leading-8 text-[#3f4851]">
                  Isi form berikut agar tim YOLO dapat memahami ide, kebutuhan,
                  target waktu, dan bentuk kolaborasi yang ingin diajukan.
                </p>

                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#f7fbff] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaf7ff] text-[#006399]">
                    <Clock3 className="h-5 w-5" strokeWidth={2.4} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#000767]">
                      Estimasi follow up
                    </p>
                    <p className="mt-0.5 text-sm leading-6 text-[#3f4851]">
                      Tim YOLO akan meninjau pengajuan terlebih dahulu.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {formNotes.map((note) => {
                  const Icon = note.icon;

                  return (
                    <div
                      key={note.title}
                      className="rounded-[1.5rem] border border-[#d9d9f5] bg-white p-4"
                    >
                      <div className="flex gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf7ff] text-[#006399]">
                          <Icon className="h-4 w-4" strokeWidth={2.4} />
                        </div>

                        <div>
                          <h2 className="text-sm font-bold text-[#000767]">
                            {note.title}
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-[#3f4851]">
                            {note.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-[#d9d9f5] bg-[#f7fbff] p-5">
                <p className="text-sm font-bold text-[#000767]">
                  Mau diskusi cepat?
                </p>

                <div className="mt-4 grid gap-3">
                  <Link
                    href={yoloLinks.askAdmin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
                  >
                    <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
                    WhatsApp Admin
                  </Link>

                  <Link
                    href={`mailto:${yoloContacts.email}?subject=Ajakan Kolaborasi bersama YOLO`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#006399]/25 bg-white px-5 py-3 text-sm font-bold text-[#006399] transition hover:bg-[#f4f2ff]"
                  >
                    <Mail className="h-4 w-4" strokeWidth={2.4} />
                    Email YOLO
                  </Link>
                </div>
              </div>
            </aside>

            <div>
              <PartnershipForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
