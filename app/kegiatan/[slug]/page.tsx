import Link from "next/link";
import { notFound } from "next/navigation";
import type { SVGProps } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getYoloActivityBySlug } from "@/lib/notion";
import { yoloLinks } from "@/data/yolo";

type IconProps = SVGProps<SVGSVGElement>;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 300;

export default async function KegiatanDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const activity = await getYoloActivityBySlug(slug);

  if (!activity) {
    notFound();
  }

  const galleryImages = activity.gallery.slice(0, 6);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] text-[#000767]">
      <Navbar />

      <section className="bg-[#fbf8ff]">
        <div className="mx-auto max-w-[1280px] px-4 py-16 md:px-16 md:py-20">
          <Link
            href="/kegiatan"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#006399] transition hover:text-[#1da1f2]"
          >
            <IconArrowLeft className="h-4 w-4" />
            Kembali ke Kegiatan
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
            <div>
              <div className="mb-5 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#cde5ff] px-4 py-2 text-xs font-bold text-[#006399]">
                  {activity.category || "Kegiatan"}
                </span>

                <span className="rounded-full bg-[#91f78e] px-4 py-2 text-xs font-bold text-[#00731e]">
                  {activity.status || "Published"}
                </span>
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-5xl">
                {activity.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#3f4851]">
                {activity.description || "Deskripsi kegiatan belum tersedia."}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <InfoCard
                  icon={<IconCalendar className="h-6 w-6" />}
                  label="Tanggal"
                  value={activity.date}
                />

                <InfoCard
                  icon={<IconPin className="h-6 w-6" />}
                  label="Lokasi"
                  value={activity.location || "Lokasi menyusul"}
                />
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {activity.registrationLink ? (
                  <Link
                    href={activity.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
                  >
                    Daftar Kegiatan
                    <IconArrowRight className="h-5 w-5" />
                  </Link>
                ) : (
                  <Link
                    href={yoloLinks.askAdmin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
                  >
                    Tanya Admin
                    <IconArrowRight className="h-5 w-5" />
                  </Link>
                )}

                {activity.documentationLink && (
                  <Link
                    href={activity.documentationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border-2 border-[#006399] bg-white px-7 py-4 text-sm font-bold text-[#006399] transition hover:bg-[#e0e0ff]"
                  >
                    Lihat Dokumentasi
                  </Link>
                )}
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-white p-5 shadow-sm ring-1 ring-[#e0e0ff]">
              <div className="overflow-hidden rounded-[2rem] bg-[#f4f2ff]">
                {activity.poster ? (
                  <img
                    src={activity.poster}
                    alt={activity.title}
                    className="h-[420px] w-full object-cover"
                  />
                ) : (
                  <div className="flex h-[420px] items-center justify-center p-8 text-center">
                    <div>
                      <IconImage className="mx-auto h-16 w-16 text-[#006399]" />
                      <p className="mt-4 font-bold text-[#006399]">
                        Poster belum tersedia
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <GallerySection images={galleryImages} title={activity.title} />

        </div>
      </section>

      <Footer />
    </main>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-[#e0e0ff]">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#cde5ff] text-[#006399]">
          {icon}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006399]">
            {label}
          </p>

          <p className="mt-1 font-bold text-[#000767]">{value}</p>
        </div>
      </div>
    </div>
  );
}

function GallerySection({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  return (
    <section className="mt-16">
      <div className="mb-8 max-w-2xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
          Galeri Kegiatan
        </p>

        <h2 className="text-3xl font-bold leading-tight text-[#000767] md:text-4xl">
          Dokumentasi kegiatan.
        </h2>

        <p className="mt-4 leading-8 text-[#3f4851]">
          Maksimal 6 gambar dari galeri Notion akan ditampilkan di bagian ini.
        </p>
      </div>

      {images.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <article
              key={`${image}-${index}`}
              className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-[#e0e0ff]"
            >
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                className="h-64 w-full rounded-[1.5rem] object-cover"
              />
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[2.5rem] bg-white p-8 text-center shadow-sm ring-1 ring-[#e0e0ff]">
          <IconImage className="mx-auto h-14 w-14 text-[#006399]" />

          <h3 className="mt-5 text-2xl font-bold text-[#000767]">
            Galeri belum tersedia.
          </h3>

          <p className="mx-auto mt-3 max-w-xl leading-8 text-[#3f4851]">
            Tambahkan gambar pada kolom Galeri di Notion, lalu halaman ini akan
            menampilkannya otomatis.
          </p>
        </div>
      )}
    </section>
  );
}

/* SVG Icons */

function IconArrowLeft(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      {...props}
    >
      <path
        d="M19 12H5M11 6l-6 6 6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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

function IconCalendar(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="4" y="5" width="16" height="15" rx="3" fill="currentColor" />
      <path
        d="M8 3v4M16 3v4M7 11h10"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 22s7-6 7-13a7 7 0 10-14 0c0 7 7 13 7 13z"
        fill="currentColor"
      />
      <circle cx="12" cy="9" r="2.5" fill="white" />
    </svg>
  );
}

function IconImage(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <rect x="8" y="12" width="48" height="40" rx="8" fill="currentColor" />
      <circle cx="24" cy="26" r="5" fill="white" />
      <path d="M16 44l12-12 9 9 6-6 7 9H16z" fill="white" opacity="0.9" />
    </svg>
  );
}
