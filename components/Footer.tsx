import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/data/navigation";
import { yoloContacts, yoloProfile } from "@/data/yolo";

const footerLinks = [
  {
    label: "Kontak",
    href: "/kontak",
  },
  {
    label: "Instagram",
    href: yoloContacts.instagramUrl,
  },
  {
    label: "WhatsApp",
    href: yoloContacts.whatsapp,
  },
  {
    label: "Email",
    href: `mailto:${yoloContacts.email}`,
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-[#e0e0ff]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 md:grid-cols-[1.1fr_0.8fr_0.9fr] md:px-16">
        <div>
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo.jpg"
              alt="YOLO Logo"
              width={42}
              height={42}
              className="rounded-full object-contain"
            />

            <div>
              <p className="text-xl font-bold leading-none text-[#006399]">
                {yoloProfile.name}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#3f4851]">
                {yoloProfile.fullName}
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-md leading-7 text-[#3f4851]">
            {yoloProfile.shortDescription} YOLO hadir untuk menjadi ruang
            tumbuh, bergerak, dan bermanfaat bagi masyarakat.
          </p>

          <p className="mt-5 text-sm font-semibold text-[#000767]">
            © 2026 {yoloProfile.name}. All rights reserved.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#000767]">Menu</h3>

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
          <h3 className="text-lg font-bold text-[#000767]">Kontak YOLO</h3>

          <div className="mt-5 grid gap-4">
            <ContactItem label="Telepon" value={yoloContacts.phone} />

            <ContactItem label="Instagram" value={yoloContacts.instagram} />

            <ContactItem label="Email" value={yoloContacts.email} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {footerLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target={
                  item.href.startsWith("http") || item.href.startsWith("mailto")
                    ? "_blank"
                    : undefined
                }
                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#006399] transition hover:bg-[#006399] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#006399]">
        {label}
      </p>

      <p className="mt-1 font-semibold text-[#3f4851]">{value}</p>
    </div>
  );
}
