"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navItems } from "@/data/navigation";
import { IconClose, IconMenu } from "@/components/Icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#fbf8ff]/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 md:px-16">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/images/yolo-logo.jpg"
            alt="YOLO Logo"
            width={40}
            height={40}
            className="rounded-full object-contain"
            priority
          />

          <span className="hidden text-2xl font-bold text-[#006399] md:block">
            YOLO
          </span>
        </Link>

        <div className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-base transition active:scale-95 ${
                item.label === "Home"
                  ? "border-b-2 border-[#006399] pb-1 text-[#006399]"
                  : "text-[#3f4851] hover:text-[#006399]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden gap-4 md:flex">
          <Link
            href="/gabung"
            className="rounded-full border border-[#006399] px-6 py-2 text-sm font-semibold text-[#006399] transition hover:bg-[#f4f2ff] active:scale-95"
          >
            Volunteer
          </Link>

          <Link
            href="/donasi"
            className="rounded-full bg-[#006399] px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1da1f2] hover:text-[#003554] active:scale-95"
          >
            Donate
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#006399] shadow-sm md:hidden"
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
        <div className="border-t border-[#e0e0ff] bg-white px-4 py-4 md:hidden">
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
                href="/gabung"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-[#006399] px-4 py-3 text-center text-sm font-semibold text-[#006399]"
              >
                Volunteer
              </Link>

              <Link
                href="/donasi"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-[#006399] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}