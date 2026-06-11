import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/data/navigation";
import { yoloContacts, yoloProfile } from "@/data/yolo";
import { Mail } from "lucide-react";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="overflow-hidden rounded-t-[3rem] md:rounded-t-[4rem] bg-[#0f1744] text-white shadow-[0_-20px_60px_rgba(15,23,68,0.12)] md:rounded-t-[3.5rem]">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.7fr_0.9fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-4">
              <Image
                src="/images/logo.jpg"
                alt="YOLO Logo"
                width={48}
                height={48}
                className="rounded-full object-contain"
              />

              <div>
                <p className="text-xl font-bold leading-none">
                  {yoloProfile.name}
                </p>
                <p className="mt-1 text-sm font-medium text-white/65">
                  {yoloProfile.fullName}
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md leading-8 text-white/70">
              {yoloProfile.shortDescription} Ruang untuk tumbuh, bergerak, dan
              bermanfaat melalui pendidikan, sosial, dan kegiatan komunitas.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <Link
                href={yoloContacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-2.5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <span
                  aria-hidden="true"
                  className="h-[18px] w-[18px] bg-white"
                  style={{
                    WebkitMask:
                      "url('/icons/social/whatsapp.svg') center / contain no-repeat",
                    mask: "url('/icons/social/whatsapp.svg') center / contain no-repeat",
                  }}
                />
              </Link>

              <Link
                href={yoloContacts.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-2.5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <span
                  aria-hidden="true"
                  className="h-[18px] w-[18px] bg-white"
                  style={{
                    WebkitMask:
                      "url('/icons/social/instagram.svg') center / contain no-repeat",
                    mask: "url('/icons/social/instagram.svg') center / contain no-repeat",
                  }}
                />
              </Link>

              <Link
                href={`mailto:${yoloContacts.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-2.5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <Mail size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#95ccff]">
              Menu
            </h3>

            <div className="mt-5 grid gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold text-white/70 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#95ccff]">
              Kontak
            </h3>

            <div className="mt-5 grid gap-5">
              <FooterContact label="Telepon" value={yoloContacts.phone} />

              <FooterContact label="Instagram" value={yoloContacts.instagram} href={yoloContacts.instagramUrl} />

              <FooterContact label="Email" value={yoloContacts.email} href={`mailto:${yoloContacts.email}`} />

            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} {yoloProfile.name}. All rights reserved.
          </p>

          <p>{yoloProfile.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterContact({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
        {label}
      </p>

      {href ? (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 font-semibold text-white/75 hover:text-white"
        >
          {value}
        </Link>
      ) : (
        <p className="mt-1 font-semibold text-white/75">{value}</p>
      )}
    </div>
  );
}
