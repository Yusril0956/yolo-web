import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/data/navigation";
import { yoloContacts, yoloProfile } from "@/data/yolo";
import { Mail } from "lucide-react";

const currentYear = new Date().getFullYear();

function SocialIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden="true"
      className="h-[18px] w-[18px] bg-[#006399]"
      style={{
        WebkitMask: `url('${src}') center / contain no-repeat`,
        mask: `url('${src}') center / contain no-repeat`,
      }}
    />
  );
}

export default function Footer() {
  return (
    <footer className="overflow-hidden rounded-t-[3rem] border-t border-[#d9d9f5] bg-gradient-to-br from-[#eaf7ff] via-[#fbf8ff] to-[#f4f2ff] text-[#000767] shadow-[0_-20px_60px_rgba(0,99,153,0.08)] md:rounded-t-[3.5rem]">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.7fr_0.9fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="YOLO Homepage"
            >
              <div className="relative h-12 w-[152px] md:h-14 md:w-[178px]">
                <Image
                  src="/images/logo_yolo.png"
                  alt="YOLO Logo"
                  fill
                  sizes="(max-width: 768px) 152px, 178px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <p className="mt-6 max-w-md leading-8 text-[#3f4851]">
              {yoloProfile.shortDescription} Ruang untuk tumbuh, bergerak, dan
              bermanfaat melalui pendidikan, sosial, dan kegiatan komunitas.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={yoloContacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp YOLO"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#006399]/20 bg-white text-[#006399] shadow-sm transition hover:-translate-y-0.5 hover:border-[#006399] hover:bg-[#f4f2ff]"
              >
                <SocialIcon src="/icons/social/whatsapp.svg" />
              </Link>

              <Link
                href={yoloContacts.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram YOLO"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#006399]/20 bg-white text-[#006399] shadow-sm transition hover:-translate-y-0.5 hover:border-[#006399] hover:bg-[#f4f2ff]"
              >
                <SocialIcon src="/icons/social/instagram.svg" />
              </Link>

              <Link
                href={`mailto:${yoloContacts.email}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email YOLO"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#006399]/20 bg-white text-[#006399] shadow-sm transition hover:-translate-y-0.5 hover:border-[#006399] hover:bg-[#f4f2ff]"
              >
                <Mail size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
              Menu
            </h3>

            <div className="mt-5 grid gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold text-[#3f4851] transition hover:text-[#006399]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#006399]">
              Kontak
            </h3>

            <div className="mt-5 grid gap-5">
              <FooterContact label="Telepon" value={yoloContacts.phone} />

              <FooterContact
                label="Instagram"
                value={yoloContacts.instagram}
                href={yoloContacts.instagramUrl}
              />

              <FooterContact
                label="Email"
                value={yoloContacts.email}
                href={`mailto:${yoloContacts.email}`}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#d9d9f5] pt-6 text-sm text-[#3f4851] md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} {yoloProfile.name}. All rights reserved.
          </p>

          <p className="font-semibold text-[#006399]">{yoloProfile.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterContact({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006399]/70">
        {label}
      </p>

      {href ? (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex font-semibold text-[#3f4851] transition hover:text-[#006399]"
        >
          {value}
        </Link>
      ) : (
        <p className="mt-1 font-semibold text-[#3f4851]">{value}</p>
      )}
    </div>
  );
}