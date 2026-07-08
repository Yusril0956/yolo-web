"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import type { YoloTeamMember } from "@/lib/notion-team";

interface MembersDisplaySectionProps {
  members: YoloTeamMember[];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function MemberCard({ member }: { member: YoloTeamMember }) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-[#e0e0ff] transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70 bg-white">
      <div className="aspect-[4/5] overflow-hidden bg-[#e0e0ff]">
        {member.photo ? (
          <SafeImage
            src={member.photo}
            alt={`Foto ${member.name}`}
            className="h-full w-full object-cover"
            fallbackClassName="h-full w-full"
            fallbackLabel={`Foto ${member.name}`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#cde5ff] text-3xl font-bold text-[#006399]">
            {getInitials(member.name)}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {member.division ? (
            <span className="rounded-full bg-[#cde5ff] px-3 py-1 text-[11px] font-bold text-[#006399]">
              {member.division}
            </span>
          ) : null}

          {member.period ? (
            <span className="rounded-full bg-[#f4f2ff] px-3 py-1 text-[11px] font-bold text-[#3f4851]">
              {member.period}
            </span>
          ) : null}
        </div>

        <h3 className="text-base font-bold leading-tight text-[#000767]">
          {member.name}
        </h3>

        <p className="mt-1 text-sm font-semibold text-[#006399]">
          {member.role}
        </p>

        {member.description ? (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#3f4851]">
            {member.description}
          </p>
        ) : null}

        {member.instagram ? (
          <Link
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex text-sm font-bold text-[#006399] transition hover:text-[#1da1f2]"
          >
            Instagram
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export default function MembersDisplaySection({
  members,
}: MembersDisplaySectionProps) {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_DISPLAY = 8;
  const displayedMembers = showAll ? members : members.slice(0, INITIAL_DISPLAY);
  const hasMore = members.length > INITIAL_DISPLAY;

  return (
    <>
      <div className="mb-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {displayedMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 rounded-full border border-[#006399] bg-white px-6 py-3 text-sm font-bold text-[#006399] transition hover:bg-[#f4f2ff]"
          >
            {showAll ? "Sembunyikan" : "Lihat Lengkap"}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                showAll ? "rotate-180" : ""
              }`}
              strokeWidth={2.5}
            />
          </button>
        </div>
      )}
    </>
  );
}
