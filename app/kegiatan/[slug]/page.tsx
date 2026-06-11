import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SafeImage from "@/components/SafeImage";
import { getYoloActivityBySlug } from "@/lib/notion";
import { yoloLinks } from "@/data/yolo";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Camera,
  ExternalLink,
  ImageIcon,
  MapPin,
  MessageCircle,
} from "lucide-react";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 300;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const activity = await getYoloActivityBySlug(slug);

  if (!activity) {
    return {
      title: "Kegiatan Tidak Ditemukan - YOLO",
      description: "Kegiatan YOLO yang kamu cari belum tersedia.",
    };
  }

  return {
    title: `${activity.title} - YOLO`,
    description:
      activity.description || "Detail kegiatan dan dokumentasi YOLO.",
    openGraph: {
      title: `${activity.title} - YOLO`,
      description:
        activity.description || "Detail kegiatan dan dokumentasi YOLO.",
      images: activity.poster
        ? [
            {
              url: activity.poster,
              width: 1200,
              height: 630,
              alt: activity.title,
            },
          ]
        : [],
    },
  };
}

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
        <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-16 md:py-16">
          <BackLink />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
            <article className="rounded-[2rem] border border-[#e0e0ff] bg-white p-6 shadow-sm md:p-8">
              <div className="mb-5 flex flex-wrap gap-2">
                <Badge>{activity.category || "Kegiatan"}</Badge>
                <Badge variant="green">{activity.status || "Published"}</Badge>
              </div>

              <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-[-0.02em] text-[#000767] md:text-5xl md:leading-[1.08]">
                {activity.title}
              </h1>

              <div className="mt-7 border-t border-[#e0e0ff] pt-7">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#006399]">
                  Deskripsi Kegiatan
                </p>

                <div className="space-y-5 whitespace-pre-line text-base leading-8 text-[#3f4851] md:text-sm md:leading-9">
                  {activity.description ||
                    "Deskripsi kegiatan belum tersedia."}
                </div>
              </div>
            </article>

            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] border border-[#e0e0ff] bg-white p-4 shadow-sm">
                <div className="overflow-hidden rounded-[1.5rem] bg-[#f4f2ff]">
                  <SafeImage
                    src={activity.poster}
                    alt={activity.title}
                    className="aspect-[4/5] w-full object-cover"
                    fallbackClassName="aspect-[4/5] w-full"
                    fallbackLabel="Poster belum tersedia"
                  />
                </div>

                <div className="mt-5 grid gap-3">
                  <InfoItem
                    icon={<CalendarDays className="h-5 w-5" strokeWidth={2.3} />}
                    label="Tanggal"
                    value={activity.date || "Tanggal menyusul"}
                  />

                  <InfoItem
                    icon={<MapPin className="h-5 w-5" strokeWidth={2.3} />}
                    label="Lokasi"
                    value={activity.location || "Lokasi menyusul"}
                  />
                </div>

                <div className="mt-5 grid gap-3">
                  {activity.registrationLink ? (
                    <Link
                      href={activity.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
                    >
                      Daftar Kegiatan
                      <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                    </Link>
                  ) : (
                    <Link
                      href={yoloLinks.askAdmin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1da1f2]"
                    >
                      <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
                      Tanya Admin
                    </Link>
                  )}

                  {activity.documentationLink && (
                    <Link
                      href={activity.documentationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#006399] bg-white px-5 py-3 text-sm font-bold text-[#006399] transition hover:bg-[#f4f2ff]"
                    >
                      Lihat Dokumentasi
                      <ExternalLink className="h-4 w-4" strokeWidth={2.4} />
                    </Link>
                  )}
                </div>
              </div>
            </aside>
          </div>

          <GallerySection images={galleryImages} title={activity.title} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function BackLink() {
  return (
    <Link
      href="/kegiatan"
      className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-[#006399] transition hover:text-[#1da1f2]"
    >
      <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
      Kembali ke Kegiatan
    </Link>
  );
}

function Badge({
  children,
  variant = "blue",
}: {
  children: ReactNode;
  variant?: "blue" | "green";
}) {
  const className =
    variant === "green"
      ? "bg-[#91f78e] text-[#00731e]"
      : "bg-[#cde5ff] text-[#006399]";

  return (
    <span
      className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${className}`}
    >
      {children}
    </span>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-[1.25rem] bg-[#fbf8ff] p-4 ring-1 ring-[#e0e0ff]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#cde5ff] text-[#006399]">
        {icon}
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006399]">
          {label}
        </p>

        <p className="mt-1 text-sm font-bold leading-6 text-[#000767]">
          {value}
        </p>
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
    <section className="mt-12">
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#006399]">
            Galeri
          </p>

          <h2 className="text-2xl font-bold leading-tight text-[#000767] md:text-3xl">
            Dokumentasi kegiatan.
          </h2>
        </div>

        {images.length > 0 && (
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#3f4851] ring-1 ring-[#e0e0ff]">
            <Camera className="h-4 w-4 text-[#006399]" strokeWidth={2.3} />
            {images.length} gambar ditampilkan
          </p>
        )}
      </div>

      {images.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <article
              key={`${image}-${index}`}
              className="overflow-hidden rounded-[1.75rem] border border-[#e0e0ff] bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70"
            >
              <SafeImage
                src={image}
                alt={`${title} ${index + 1}`}
                className="aspect-[4/3] w-full rounded-[1.25rem] object-cover"
                fallbackClassName="aspect-[4/3] w-full rounded-[1.25rem]"
                fallbackLabel="Gambar tidak tersedia"
              />
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-[#e0e0ff] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#cde5ff] text-[#006399]">
            <ImageIcon className="h-7 w-7" strokeWidth={2.3} />
          </div>

          <h3 className="mt-5 text-xl font-bold text-[#000767]">
            Galeri belum tersedia.
          </h3>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-[#3f4851]">
            Tambahkan gambar pada kolom Galeri di Notion, lalu halaman ini akan
            menampilkannya otomatis.
          </p>
        </div>
      )}
    </section>
  );
}