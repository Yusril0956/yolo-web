"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, HeartHandshake } from "lucide-react";
import { navItems } from "@/data/navigation";
import { yoloContacts } from "@/data/yolo";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

function SocialIcon({ src, className }: { src: string; className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-[20px] w-[20px] ${className}`}
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

  return (
    <header className="sticky top-0 z-50 border-b border-[#e0e0ff] bg-[#fbf8ff]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 md:px-16">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="inline-flex items-center"
          aria-label="YOLO Homepage"
        >
          <div className="relative flex h-11 w-[160px] items-center md:h-12 md:w-[158px]">
            <Image
              src="/images/logo_yolo.png"
              alt="YOLO Logo"
              fill
              sizes="(max-width: 768px) 140px, 158px"
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative py-2 text-sm font-semibold transition ${
                  active
                    ? "text-[#006399]"
                    : "text-[#3f4851] hover:text-[#006399]"
                }`}
              >
                {item.label}

                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-[#006399] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={yoloContacts.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubungi YOLO lewat WhatsApp"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#006399]/25 bg-white text-[#006399] shadow-sm transition hover:border-[#006399] hover:bg-[#f4f2ff]"
          >
            <SocialIcon
              src="/icons/social/whatsapp.svg"
              className="bg-[#006399]"
            />
          </Link>

          <Link
            href="/donasi"
            className="inline-flex items-center gap-2 rounded-full bg-[#006399] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#1da1f2] active:scale-95"
          >
            <HeartHandshake className="h-4 w-4" strokeWidth={2.4} />
            Donasi
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#006399] shadow-sm ring-1 ring-[#e0e0ff] transition hover:bg-[#f4f2ff] lg:hidden"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" strokeWidth={2.5} />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={2.5} />
          )}
        </button>
      </nav>

      {isOpen && (
        <div
          id="mobile-menu"
          className="border-t border-[#e0e0ff] bg-white px-4 py-4 shadow-lg lg:hidden"
        >
          <div className="mx-auto flex max-w-[1280px] flex-col gap-1">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-bold transition ${
                    active
                      ? "bg-[#f4f2ff] text-[#006399]"
                      : "text-[#3f4851] hover:bg-[#f4f2ff] hover:text-[#006399]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#e0e0ff] pt-4">
              <Link
                href={yoloContacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#006399] px-4 py-3 text-center text-sm font-bold text-[#006399] transition hover:bg-[#f4f2ff]"
              >
                <SocialIcon
                  src="/icons/social/whatsapp.svg"
                  className="bg-[#006399]"
                />
                WhatsApp
              </Link>

              <Link
                href="/donasi"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006399] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#1da1f2]"
              >
                <HeartHandshake className="h-4 w-4" strokeWidth={2.4} />
                Donasi
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}