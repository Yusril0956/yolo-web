import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    label: "Contact Us",
    href: "/kontak",
  },
  {
    label: "Privacy Policy",
    href: "#",
  },
  {
    label: "Terms of Service",
    href: "#",
  },
  {
    label: "FAQ",
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-[#e0e0ff]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 px-4 py-12 md:flex-row md:px-16">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/images/yolo-logo.jpg"
              alt="YOLO Logo"
              width={32}
              height={32}
              className="rounded-full object-contain grayscale opacity-70"
            />

            <span className="text-2xl font-bold text-[#006399]">YOLO</span>
          </div>

          <p className="text-sm font-semibold text-[#000767]">
            © 2026 YOLO Community. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          {footerLinks.map((item) => (
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
    </footer>
  );
}
