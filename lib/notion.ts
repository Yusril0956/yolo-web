import { Client } from "@notionhq/client";

export type YoloActivity = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  date: string;
  location: string;
  description: string;
  poster: string;
  gallery: string[];
  registrationLink: string;
  documentationLink: string;
};

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: "2026-03-11",
});

const dataSourceId = process.env.NOTION_DATA_SOURCE_ID;

function getPlainText(property: any) {
  if (!property) return "";

  if (property.type === "title") {
    return property.title.map((item: any) => item.plain_text).join("");
  }

  if (property.type === "rich_text") {
    return property.rich_text.map((item: any) => item.plain_text).join("");
  }

  return "";
}

function getSelectName(property: any) {
  if (!property || property.type !== "select") return "";
  return property.select?.name ?? "";
}

function getDate(property: any) {
  if (!property || property.type !== "date") return "";
  return property.date?.start ?? "";
}

function getUrl(property: any) {
  if (!property || property.type !== "url") return "";
  return property.url ?? "";
}

function getFiles(property: any) {
  if (!property || property.type !== "files") return [];

  return property.files
    .map((file: any) => {
      if (file.type === "external") {
        return file.external?.url;
      }

      if (file.type === "file") {
        return file.file?.url;
      }

      return "";
    })
    .filter(Boolean);
}

function formatDate(date: string) {
  if (!date) return "Tanggal menyusul";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function mapNotionPageToActivity(page: any): YoloActivity {
  const properties = page.properties;

  const title = getPlainText(properties.Judul);
  const slug = getPlainText(properties.Slug);
  const gallery = getFiles(properties.Galeri);

  return {
    id: page.id,
    title,
    slug,
    category: getSelectName(properties.Kategori),
    status: getSelectName(properties.Status),
    date: formatDate(getDate(properties.Tanggal)),
    location: getPlainText(properties.Lokasi),
    description: getPlainText(properties.Deskripsi),
    poster: getFiles(properties.Poster)[0] ?? "",
    gallery: gallery.slice(0, 6),
    registrationLink: getUrl(properties["Link Daftar"]),
    documentationLink: getUrl(properties["Link Dokumentasi"]),
  };
}

export async function getYoloActivities() {
  if (!dataSourceId) {
    throw new Error("NOTION_DATA_SOURCE_ID belum diisi di .env.local");
  }

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
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

  return response.results.map(mapNotionPageToActivity);
}

export async function getYoloActivityBySlug(slug: string) {
  if (!dataSourceId) {
    throw new Error("NOTION_DATA_SOURCE_ID belum diisi di .env.local");
  }

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
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

  const page = response.results[0];

  if (!page) {
    return null;
  }

  return mapNotionPageToActivity(page);
}
