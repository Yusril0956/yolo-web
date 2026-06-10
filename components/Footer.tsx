import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/data/navigation";
import { yoloContacts, yoloProfile } from "@/data/yolo";

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
                className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#006399] transition hover:bg-[#ffdcbe]"
              >
                WhatsApp
              </Link>

              <Link
                href={yoloContacts.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Instagram
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

              <FooterContact label="Instagram" value={yoloContacts.instagram} />

              <FooterContact label="Email" value={yoloContacts.email} />
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

function FooterContact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
        {label}
      </p>

      <p className="mt-1 font-semibold text-white/75">{value}</p>
    </div>
  );
}
