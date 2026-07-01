"use client";

import Image from "next/image";
import { useState } from "react";
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

type SafeImageProps = {
  src?: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  fallbackLabel?: string;
  sizes?: string;
  priority?: boolean;
};

export default function SafeImage({
  src,
  alt,
  className = "",
  fallbackClassName = "",
  fallbackLabel = "Gambar belum tersedia",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-[#f4f2ff] p-6 text-center ${fallbackClassName}`}
      >
        <div>
          <IconImage className="mx-auto h-12 w-12 text-[#006399]" />

          <p className="mt-3 text-sm font-bold text-[#006399]">
            {fallbackLabel}
          </p>
        </div>
      </div>
    );
  }

  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </span>
  );
}

function IconImage(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <rect x="8" y="12" width="48" height="40" rx="8" fill="currentColor" />
      <circle cx="24" cy="26" r="5" fill="white" />
      <path
        d="M16 44l12-12 9 9 6-6 7 9H16z"
        fill="white"
        opacity="0.9"
      />
    </svg>
  );
}
