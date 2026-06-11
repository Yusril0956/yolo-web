import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { yoloLinks } from "@/data/yolo";
import { Compass, ArrowRight } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <section className="bg-[#fbf8ff]">
        <div className="mx-auto flex min-h-[70vh] max-w-[1280px] items-center px-4 py-16 md:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#cde5ff] text-[#006399]">
              <Compass size={32} />
            </div>

            <span className="mb-5 inline-block rounded-full bg-[#91f78e] px-4 py-1.5 text-xs font-semibold text-[#00731e]">
              404 Not Found
            </span>

            <h1 className="text-4xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-5xl">
              Halaman tidak ditemukan.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#3f4851]">
              Link yang kamu buka mungkin salah, sudah dipindahkan, atau belum
              tersedia di website YOLO.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
              >
                Kembali ke Home
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/kegiatan"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#006399] bg-white px-7 py-4 text-sm font-bold text-[#006399] transition hover:bg-[#e0e0ff]"
              >
                Lihat Kegiatan
              </Link>

              <Link
                href={yoloLinks.askAdmin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#f4f2ff] px-7 py-4 text-sm font-bold text-[#006399] transition hover:bg-[#e0e0ff]"
              >
                Tanya Admin
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}