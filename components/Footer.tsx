import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { navItems } from "@/data/navigation";
import { yoloContacts, yoloLinks, yoloProfile } from "@/data/yolo";

const currentYear = new Date().getFullYear();

const footerLinks = navItems.filter((item) => item.href !== "/donasi");

const quickLinks = [
  {
    label: "Gabung YOLO",
    href: yoloLinks.join,
  },
  {
    label: "Konfirmasi Donasi",
    href: yoloLinks.donationConfirmation,
  },
  {
    label: "Ajukan Kolaborasi",
    href: "/kolaborasi",
  },
  {
    label: "Lihat Kegiatan",
    href: "/kegiatan",
  },
];

function SocialIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden="true"
      className="h-[17px] w-[17px] bg-[#006399] md:h-[18px] md:w-[18px]"
      style={{
        WebkitMask: `url('${src}') center / contain no-repeat`,
        mask: `url('${src}') center / contain no-repeat`,
      }}
    />
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[#d9d9f5] bg-[#f7fbff] text-[#000767]">
      <div className="mx-auto max-w-[1180px] px-4 py-9 md:px-8 md:py-12 lg:px-0">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.65fr_0.75fr_0.9fr] lg:gap-10">
          <div>
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="YOLO Homepage"
            >
              <div className="relative h-10 w-[136px] md:h-14 md:w-[178px]">
                <Image
                  src="/images/logo_yolo.png"
                  alt="YOLO Logo"
                  fill
                  sizes="(max-width: 768px) 136px, 178px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#3f4851] md:mt-5 md:leading-7">
              {yoloProfile.shortDescription} Komunitas kepemudaan yang bergerak
              dalam pendidikan, sosial, pembinaan, dan ruang bertumbuh untuk
              pemuda muslim.
            </p>

            <div className="mt-5 flex items-center gap-2.5 md:mt-6 md:gap-3">
              <SocialLink
                href={yoloContacts.whatsapp}
                label="WhatsApp YOLO"
                icon={<SocialIcon src="/icons/social/whatsapp.svg" />}
              />

              <SocialLink
                href={yoloContacts.instagramUrl}
                label="Instagram YOLO"
                icon={<SocialIcon src="/icons/social/instagram.svg" />}
              />

              <SocialLink
                href={`mailto:${yoloContacts.email}`}
                label="Email YOLO"
                icon={
                  <Mail
                    className="h-[17px] w-[17px] md:h-[18px] md:w-[18px]"
                    strokeWidth={2.3}
                  />
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-7 lg:contents">
            <FooterGroup title="Navigasi">
              <div className="grid gap-2">
                {footerLinks.map((item) => (
                  <FooterLink
                    key={item.label}
                    href={item.href}
                    label={item.label}
                  />
                ))}
              </div>
            </FooterGroup>

            <FooterGroup title="Akses Cepat">
              <div className="grid gap-2">
                {quickLinks.map((item) => (
                  <FooterLink
                    key={item.label}
                    href={item.href}
                    label={item.label}
                    external={item.href.startsWith("http")}
                  />
                ))}
              </div>
            </FooterGroup>
          </div>

          <FooterGroup title="Kontak">
            <div className="grid gap-3 md:gap-4">
              <ContactItem
                icon={<Phone className="h-4 w-4" strokeWidth={2.3} />}
                label="Telepon"
                value={yoloContacts.phone}
              />

              <ContactItem
                icon={<MessageCircle className="h-4 w-4" strokeWidth={2.3} />}
                label="WhatsApp"
                value="Hubungi admin YOLO"
                href={yoloContacts.whatsapp}
              />

              <ContactItem
                icon={<Mail className="h-4 w-4" strokeWidth={2.3} />}
                label="Email"
                value={yoloContacts.email}
                href={`mailto:${yoloContacts.email}`}
              />
            </div>
          </FooterGroup>
        </div>

        <div className="mt-8 border-t border-[#d9d9f5] pt-4 md:mt-10 md:pt-5">
          <div className="flex flex-col gap-3 text-xs text-[#3f4851] md:flex-row md:items-center md:justify-between md:text-sm">
            <p>
              © {currentYear}{" "}
              <span className="font-semibold text-[#000767]">
                {yoloProfile.fullName}
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 md:gap-x-4">
              <Link
                href="/about"
                className="font-semibold text-[#3f4851] transition hover:text-[#006399]"
              >
                Tentang
              </Link>

              <span className="h-1 w-1 rounded-full bg-[#9aa9b8]" />

              <Link
                href="/kolaborasi"
                className="font-semibold text-[#3f4851] transition hover:text-[#006399]"
              >
                Kolaborasi
              </Link>

              <span className="h-1 w-1 rounded-full bg-[#9aa9b8]" />

              <Link
                href="/donasi"
                className="font-semibold text-[#006399] transition hover:text-[#1da1f2]"
              >
                Donasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#006399] md:text-xs md:tracking-[0.22em]">
        {title}
      </h3>

      <div className="mt-3 md:mt-4">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold leading-5 text-[#3f4851] transition hover:text-[#006399] md:text-sm"
    >
      {label}

      <ArrowUpRight
        className="h-3 w-3 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 md:h-3.5 md:w-3.5"
        strokeWidth={2.4}
      />
    </Link>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d9d9f5] bg-white text-[#006399] shadow-sm transition hover:-translate-y-0.5 hover:border-[#006399]/40 hover:bg-[#f4f2ff] md:h-10 md:w-10"
    >
      {icon}
    </Link>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf7ff] text-[#006399]">
        {icon}
      </span>

      <span>
        <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#006399]/70 md:text-xs md:tracking-[0.16em]">
          {label}
        </span>

        <span className="mt-0.5 block break-all text-[13px] font-semibold leading-5 text-[#3f4851] md:mt-1 md:text-sm md:leading-6">
          {value}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="group flex gap-3 transition hover:text-[#006399]"
      >
        {content}
      </Link>
    );
  }

  return <div className="flex gap-3">{content}</div>;
}
