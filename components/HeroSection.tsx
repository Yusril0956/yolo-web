import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconVolunteer } from "@/components/Icons";

export default function HeroSection() {
  return (
    <header className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-[#f4f2ff]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-volunteer.jpg"
          alt="Relawan YOLO berbagi makanan"
          fill
          className="object-cover opacity-80"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#fbf8ff] via-[#fbf8ff]/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-start justify-center gap-8 px-4 py-20 md:px-16">
        <div className="max-w-2xl">
          <span className="mb-6 inline-block rounded-full bg-[#91f78e] px-4 py-1.5 text-xs font-medium text-[#00731e]">
            Active Compassion
          </span>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-[-0.01em] text-[#000767] md:text-5xl md:leading-[56px] md:tracking-[-0.02em]">
            Membangun Kebaikan Bersama
          </h1>

          <p className="mb-10 max-w-xl text-lg leading-7 text-[#3f4851]">
            Bergabunglah bersama YOLO dalam menebar manfaat. Melalui kolaborasi
            dan semangat jiwa muda, kita wujudkan aksi nyata untuk masyarakat
            yang lebih baik.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/donasi"
              className="flex items-center justify-center gap-2 rounded-full bg-[#df8400] px-8 py-4 text-sm font-semibold text-[#4c2a00] shadow-md transition hover:bg-[#8b5000] hover:text-white hover:shadow-lg active:scale-95"
            >
              Donasi Sekarang
              <IconVolunteer className="h-5 w-5" />
            </Link>

            <Link
              href="/about"
              className="flex items-center justify-center gap-2 rounded-full border-2 border-[#006399] bg-[#fbf8ff] px-8 py-4 text-sm font-semibold text-[#006399] transition hover:bg-[#e0e0ff] active:scale-95"
            >
              Pelajari Lebih Lanjut
              <IconArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
