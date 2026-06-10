"use client";

import Link from "next/link";
import type { SVGProps } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { yoloLinks } from "@/data/yolo";

type IconProps = SVGProps<SVGSVGElement>;

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function KegiatanError({ error, reset }: ErrorPageProps) {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <section className="bg-[#fbf8ff]">
        <div className="mx-auto flex min-h-[70vh] max-w-[1280px] items-center px-4 py-16 md:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#ffdcbe] text-[#693c00]">
              <IconWarning className="h-12 w-12" />
            </div>

            <span className="mb-5 inline-block rounded-full bg-[#ffdcbe] px-4 py-1.5 text-xs font-semibold text-[#693c00]">
              Notion Setup Error
            </span>

            <h1 className="text-4xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-5xl">
              Data kegiatan belum bisa dimuat.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#3f4851]">
              Ada masalah saat mengambil data kegiatan dari Notion. Biasanya ini
              terjadi karena token salah, data source belum dibagikan ke
              integration, nama kolom tidak sesuai, atau environment variable
              belum terbaca.
            </p>

            {isDevelopment && (
              <div className="mt-8 rounded-[2rem] bg-white p-5 text-left shadow-sm ring-1 ring-[#e0e0ff]">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#006399]">
                  Detail Error
                </p>

                <pre className="max-h-56 overflow-auto whitespace-pre-wrap rounded-[1.5rem] bg-[#f4f2ff] p-4 text-sm leading-7 text-[#3f4851]">
                  {error.message}
                </pre>
              </div>
            )}

            <div className="mt-8 grid gap-4 rounded-[2rem] bg-white p-6 text-left shadow-sm ring-1 ring-[#e0e0ff]">
              <ChecklistItem text="Pastikan NOTION_TOKEN sudah benar di .env.local." />
              <ChecklistItem text="Pastikan NOTION_DATA_SOURCE_ID sudah benar." />
              <ChecklistItem text="Pastikan database Notion sudah di-share ke integration YOLO." />
              <ChecklistItem text="Pastikan kolom Notion sesuai: Judul, Slug, Kategori, Status, Tanggal, Lokasi, Deskripsi, Poster, Galeri, Link Daftar, Link Dokumentasi, Published." />
              <ChecklistItem text="Restart server setelah mengubah .env.local." />
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
              >
                Coba Muat Ulang
                <IconRefresh className="h-5 w-5" />
              </button>

              <Link
                href={yoloLinks.askAdmin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#006399] bg-white px-7 py-4 text-sm font-bold text-[#006399] transition hover:bg-[#e0e0ff]"
              >
                Tanya Admin
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-[#f4f2ff] px-7 py-4 text-sm font-bold text-[#006399] transition hover:bg-[#e0e0ff]"
              >
                Kembali ke Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#91f78e] text-[#00731e]">
        <IconCheck className="h-3.5 w-3.5" />
      </div>

      <p className="leading-7 text-[#3f4851]">{text}</p>
    </div>
  );
}

function IconWarning(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M32 7l27 50H5L32 7z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M32 24v14M32 47h.01"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCheck(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      {...props}
    >
      <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconRefresh(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      {...props}
    >
      <path
        d="M20 12a8 8 0 11-2.34-5.66M20 4v6h-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}