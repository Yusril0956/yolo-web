import "server-only";

import { Client } from "@notionhq/client";
import { cache } from "react";
import {
  getDateRange,
  getFiles,
  getSelectName,
  getText,
  getUrl,
  isFullPage,
} from "@/lib/notion-properties";
import type { NotionPageProperties } from "@/lib/notion-properties";

export type YoloActivity = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  date: string;
  rawDate: string;
  rawEndDate: string;
  location: string;
  description: string;
  poster: string;
  gallery: string[];
  registrationLink: string;
  documentationLink: string;
};

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: "2025-09-03",
});

const dataSourceId = process.env.NOTION_DATA_SOURCE_ID;

function assertNotionEnv() {
  if (!process.env.NOTION_TOKEN) {
    throw new Error("NOTION_TOKEN belum diisi di .env.local");
  }

  if (!dataSourceId) {
    throw new Error("NOTION_DATA_SOURCE_ID belum diisi di .env.local");
  }
}

function getFriendlyError(error: unknown) {
  const message =
    error instanceof Error ? error.message : "Terjadi error tidak diketahui.";

  if (
    message.includes("Could not find") ||
    message.includes("object_not_found")
  ) {
    return [
      "Data source Notion tidak ditemukan atau belum bisa diakses.",
      "Pastikan NOTION_DATA_SOURCE_ID benar.",
      "Pastikan database Notion sudah di-share ke integration YOLO.",
      "Pastikan yang dipakai adalah data source asli, bukan linked database.",
      "",
      `Detail: ${message}`,
    ].join("\n");
  }

  if (message.includes("Unauthorized") || message.includes("unauthorized")) {
    return [
      "Token Notion tidak valid atau tidak punya akses.",
      "Pastikan NOTION_TOKEN benar dan integration YOLO masih aktif.",
      "",
      `Detail: ${message}`,
    ].join("\n");
  }

  if (message.includes("Published")) {
    return [
      "Kolom Published belum ditemukan di Notion.",
      "Pastikan ada kolom Published dengan tipe Checkbox.",
      "",
      `Detail: ${message}`,
    ].join("\n");
  }

  if (message.includes("Tanggal")) {
    return [
      "Kolom Tanggal belum ditemukan atau tipenya salah.",
      "Pastikan ada kolom Tanggal dengan tipe Date.",
      "",
      `Detail: ${message}`,
    ].join("\n");
  }

  return message;
}

function formatSingleDate(date: string) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

function formatDateRange(start: string, end: string) {
  const formattedStart = formatSingleDate(start);
  const formattedEnd = formatSingleDate(end);

  if (!formattedStart) return "Tanggal menyusul";

  if (!formattedEnd || formattedStart === formattedEnd) {
    return formattedStart;
  }

  return `${formattedStart} - ${formattedEnd}`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapNotionPageToActivity(page: { id: string; properties: NotionPageProperties }): YoloActivity {
  const properties = page.properties;

  const title = getText(properties, ["Judul"]) || "Tanpa Judul";
  const slugFromNotion = getText(properties, ["Slug"]);
  const dateRange = getDateRange(properties, ["Tanggal"]);
  const rawDate = dateRange.start;
  const rawEndDate = dateRange.end;
  const gallery = getFiles(properties, ["Galeri"]);

  return {
    id: page.id,
    title,
    slug: slugFromNotion || slugify(title),
    category: getSelectName(properties, ["Kategori"]) || "Kegiatan",
    status: getSelectName(properties, ["Status"]) || "Published",
    date: formatDateRange(rawDate, rawEndDate),
    rawDate,
    rawEndDate,
    location: getText(properties, ["Lokasi"]) || "Lokasi menyusul",
    description: getText(properties, ["Deskripsi"]),
    poster: getFiles(properties, ["Poster"])[0] ?? "",
    gallery: gallery.slice(0, 6),
    registrationLink: getUrl(properties, ["Link Daftar"]),
    documentationLink: getUrl(properties, ["Link Dokumentasi"]),
  };
}

export async function getYoloActivities() {
  assertNotionEnv();

  try {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId as string,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Tanggal",
          direction: "descending",
        },
      ],
    });

    return response.results
      .filter(isFullPage)
      .map(mapNotionPageToActivity)
      .filter((activity) => activity.title !== "Tanpa Judul");
  } catch (error) {
    throw new Error(getFriendlyError(error));
  }
}

export const getYoloActivityBySlug = cache(async function getYoloActivityBySlug(
  slug: string,
) {
  assertNotionEnv();

  try {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId as string,
      filter: {
        and: [
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
          {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
        ],
      },
      page_size: 1,
    });

    const page = response.results.find(isFullPage);

    if (page) {
      return mapNotionPageToActivity(page);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (!message.includes("Slug")) {
      throw new Error(getFriendlyError(error));
    }
  }

  const activities = await getYoloActivities();

  return activities.find((activity) => activity.slug === slug) ?? null;
});
