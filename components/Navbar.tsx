"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/data/navigation";
import { yoloContacts, yoloProfile } from "@/data/yolo";
import { IconClose, IconMenu } from "@/components/Icons";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e0e0ff] bg-[#fbf8ff]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 md:px-16">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.jpg"
            alt="YOLO Logo"
            width={44}
            height={44}
            className="rounded-full object-contain"
            priority
          />

          <div>
            <p className="text-lg font-bold leading-none text-[#006399]">
              {yoloProfile.name}
            </p>
            <p className="mt-1 hidden text-xs font-semibold text-[#3f4851] sm:block">
              {yoloProfile.fullName}
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative py-2 text-sm font-semibold transition ${
                  active
                    ? "text-[#006399]"
                    : "text-[#3f4851] hover:text-[#006399]"
                }`}
              >
                {item.label}

                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-[#006399] transition-all ${
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
            className="text-sm font-bold text-[#006399] transition hover:text-[#1da1f2]"
          >
            WhatsApp
          </Link>

          <Link
            href="/donasi"
            className="rounded-full bg-[#006399] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1da1f2] active:scale-95"
          >
            Donasi
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#006399] shadow-sm ring-1 ring-[#e0e0ff] lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <IconClose className="h-6 w-6" />
          ) : (
            <IconMenu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-[#e0e0ff] bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-1">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-2xl px-4 py-3 font-semibold transition ${
                    active
                      ? "bg-[#f4f2ff] text-[#006399]"
                      : "text-[#3f4851] hover:bg-[#f4f2ff] hover:text-[#006399]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link
                href={yoloContacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-[#006399] px-4 py-3 text-center text-sm font-bold text-[#006399]"
              >
                WhatsApp
              </Link>

              <Link
                href="/donasi"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-[#006399] px-4 py-3 text-center text-sm font-bold text-white"
              >
                Donasi
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}