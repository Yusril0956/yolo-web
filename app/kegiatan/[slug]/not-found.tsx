import Link from "next/link";
import type { SVGProps } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { yoloLinks } from "@/data/yolo";

type IconProps = SVGProps<SVGSVGElement>;

export default function KegiatanNotFound() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <section className="bg-[#fbf8ff]">
        <div className="mx-auto flex min-h-[70vh] max-w-[1280px] items-center px-4 py-16 md:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#cde5ff] text-[#006399]">
              <IconSearch className="h-12 w-12" />
            </div>

            <span className="mb-5 inline-block rounded-full bg-[#91f78e] px-4 py-1.5 text-xs font-semibold text-[#00731e]">
              Kegiatan Tidak Ditemukan
            </span>

            <h1 className="text-4xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-5xl">
              Kegiatan ini belum tersedia.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#3f4851]">
              Kegiatan yang kamu cari belum tersedia atau mungkin sudah dihapus. Jangan khawatir, kamu bisa melihat kegiatan lainnya atau menghubungi admin YOLO untuk informasi lebih lanjut.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/kegiatan"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
              >
                Lihat Semua Kegiatan
                <IconArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href={yoloLinks.askAdmin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#006399] bg-white px-7 py-4 text-sm font-bold text-[#006399] transition hover:bg-[#e0e0ff]"
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

function IconSearch(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <circle
        cx="28"
        cy="28"
        r="17"
        stroke="currentColor"
        strokeWidth="7"
      />
      <path
        d="M41 41l13 13"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M22 26h12"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}