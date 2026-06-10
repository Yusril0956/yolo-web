"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navItems } from "@/data/navigation";
import { yoloContacts, yoloProfile } from "@/data/yolo";
import { IconClose, IconMenu } from "@/components/Icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#e0e0ff] bg-[#fbf8ff]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 md:px-16">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/images/logo.jpg"
            alt="YOLO Logo"
            width={42}
            height={42}
            className="rounded-full object-contain"
            priority
          />

          <div className="hidden md:block">
            <p className="text-xl font-bold leading-none text-[#006399]">
              {yoloProfile.name}
            </p>
            <p className="mt-1 text-xs font-semibold text-[#3f4851]">
              {yoloProfile.fullName}
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-[#3f4851] transition hover:text-[#006399] active:scale-95"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={yoloContacts.whatsapp}
            target="_blank"
            className="rounded-full border border-[#006399] px-5 py-2.5 text-sm font-semibold text-[#006399] transition hover:bg-[#f4f2ff] active:scale-95"
          >
            WhatsApp
          </Link>

          <Link
            href="/donasi"
            className="rounded-full bg-[#006399] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1da1f2] active:scale-95"
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
      </div>

      {isOpen && (
        <div className="border-t border-[#e0e0ff] bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl px-4 py-3 font-semibold text-[#3f4851] transition hover:bg-[#f4f2ff] hover:text-[#006399]"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link
                href={yoloContacts.whatsapp}
                target="_blank"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-[#006399] px-4 py-3 text-center text-sm font-semibold text-[#006399]"
              >
                WhatsApp
              </Link>

              <Link
                href="/donasi"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-[#006399] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Donasi
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
