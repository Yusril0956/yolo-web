"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HeartHandshake, Menu, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { yoloContacts } from "@/data/yolo";

const mainNavItems = navItems.filter((item) => item.href !== "/donasi");

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

function SocialIcon({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-5 w-5 ${className}`}
      style={{
        WebkitMask: `url('${src}') center / contain no-repeat`,
        mask: `url('${src}') center / contain no-repeat`,
      }}
    />
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setHasScrolled(window.scrollY > 8);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 py-3">
      <nav
        className={`mx-auto flex max-w-[1180px] items-center justify-between rounded-full border px-3 py-2 transition-all duration-300 md:px-4 lg:grid lg:grid-cols-[190px_minmax(0,1fr)_190px] xl:grid-cols-[220px_minmax(0,1fr)_220px] ${
          hasScrolled
            ? "border-[#d9d9f5] bg-[#fbf8ff]/95 shadow-lg shadow-[#000767]/5 backdrop-blur-xl"
            : "border-[#e0e0ff]/80 bg-[#fbf8ff]/88 shadow-sm backdrop-blur-xl"
        }`}
      >
        <Link
          href="/"
          className="group inline-flex shrink-0 items-center lg:justify-self-start"
          aria-label="YOLO Homepage"
        >
          <div className="relative h-10 w-[132px] sm:w-[142px] md:h-11 md:w-[152px] lg:w-[158px]">
            <Image
              src="/images/logo_yolo.png"
              alt="YOLO Logo"
              fill
              sizes="(max-width: 640px) 132px, (max-width: 1024px) 152px, 158px"
              className="object-contain object-left transition duration-300 group-hover:scale-[1.02]"
              priority
            />
          </div>
        </Link>

        <div className="hidden items-center justify-center gap-1 lg:flex">
          {mainNavItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-[#eaf7ff] text-[#006399]"
                    : "text-[#3f4851] hover:bg-white/70 hover:text-[#006399]"
                }`}
              >
                {item.label}

                <span
                  className={`absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#006399] transition-all duration-300 ${
                    active ? "w-4" : "w-0 group-hover:w-4"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="hidden shrink-0 items-center justify-end gap-2 lg:flex">
          <Link
            href={yoloContacts.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubungi YOLO lewat WhatsApp"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#006399]/20 bg-white text-[#006399] shadow-sm transition hover:-translate-y-0.5 hover:border-[#006399]/50 hover:bg-[#f4f2ff]"
          >
            <SocialIcon
              src="/icons/social/whatsapp.svg"
              className="bg-[#006399]"
            />
          </Link>

          <Link
            href="/donasi"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[#006399] px-4 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#1da1f2] active:scale-95"
          >
            <HeartHandshake className="h-4 w-4" strokeWidth={2.4} />
            Donasi
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#006399]/20 bg-white text-[#006399] shadow-sm transition hover:bg-[#f4f2ff] lg:hidden"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? (
            <X className="h-5 w-5" strokeWidth={2.5} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={2.5} />
          )}
        </button>
      </nav>

      {isOpen ? (
        <div
          id="mobile-menu"
          className="mx-auto mt-2 max-w-[1180px] rounded-[1.75rem] border border-[#e0e0ff] bg-white/95 p-3 shadow-xl shadow-[#000767]/10 backdrop-blur-xl lg:hidden"
        >
          <div className="grid gap-1">
            {mainNavItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition ${
                    active
                      ? "bg-[#f4f2ff] text-[#006399]"
                      : "text-[#3f4851] hover:bg-[#f4f2ff] hover:text-[#006399]"
                  }`}
                >
                  {item.label}

                  {active ? (
                    <span className="h-2 w-2 rounded-full bg-[#006399]" />
                  ) : null}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#e0e0ff] pt-4">
            <Link
              href={yoloContacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#006399]/30 bg-white px-4 py-3 text-center text-sm font-bold text-[#006399] transition hover:bg-[#f4f2ff]"
            >
              <SocialIcon
                src="/icons/social/whatsapp.svg"
                className="bg-[#006399]"
              />
              WhatsApp
            </Link>

            <Link
              href="/donasi"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#1da1f2]"
            >
              <HeartHandshake className="h-4 w-4" strokeWidth={2.4} />
              Donasi
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
