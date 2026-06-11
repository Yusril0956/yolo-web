import { Client } from "@notionhq/client";

export type YoloTeamMember = {
  id: string;
  name: string;
  role: string;
  division: string;
  status: string;
  period: string;
  photo: string;
  instagram: string;
  description: string;
  order: number;
};

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: "2025-09-03",
});

const teamDataSourceId = process.env.NOTION_TEAM_DATA_SOURCE_ID;

let teamCache: {
  data: YoloTeamMember[];
  savedAt: number;
} | null = null;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isTemporaryError(error: unknown) {
  const message =
    error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

  return (
    message.includes("fetch failed") ||
    message.includes("timeout") ||
    message.includes("network") ||
    message.includes("econnreset") ||
    message.includes("etimedout") ||
    message.includes("socket") ||
    message.includes("rate_limited") ||
    message.includes("429") ||
    message.includes("502") ||
    message.includes("503") ||
    message.includes("504")
  );
}

async function withRetry<T>(callback: () => Promise<T>) {
  const delays = [500, 1200, 2500];
  let lastError: unknown;

  for (let attempt = 0; attempt <= delays.length; attempt++) {
    try {
      return await callback();
    } catch (error) {
      lastError = error;

      if (!isTemporaryError(error) || attempt === delays.length) {
        break;
      }

      await sleep(delays[attempt]);
    }
  }

  throw lastError;
}

function getProperty(properties: any, names: string[]) {
  for (const name of names) {
    if (properties?.[name]) {
      return properties[name];
    }
  }

  return null;
}

function getText(properties: any, names: string[]) {
  const property = getProperty(properties, names);

  if (!property) return "";

  if (property.type === "title") {
    return property.title
      ?.map((item: any) => item.plain_text ?? "")
      .join("")
      .trim();
  }

  if (property.type === "rich_text") {
    return property.rich_text
      ?.map((item: any) => item.plain_text ?? "")
      .join("")
      .trim();
  }

  if (property.type === "select") {
    return property.select?.name ?? "";
  }

  if (property.type === "url") {
    return property.url ?? "";
  }

  return "";
}

function getNumber(properties: any, names: string[]) {
  const property = getProperty(properties, names);

  if (!property || property.type !== "number") return 999;

  return property.number ?? 999;
}

function getFiles(properties: any, names: string[]) {
  const property = getProperty(properties, names);

  if (!property || property.type !== "files") return [];

  return property.files
    .map((file: any) => {
      if (file.type === "external") {
        return file.external?.url ?? "";
      }

      if (file.type === "file") {
        return file.file?.url ?? "";
      }

      return "";
    })
    .filter(Boolean);
}

function mapNotionPageToTeamMember(page: any): YoloTeamMember {
  const properties = page.properties ?? {};

  return {
    id: page.id,
    name: getText(properties, ["Nama", "Name"]) || "Tanpa Nama",
    role: getText(properties, ["Jabatan"]) || "Anggota",
    division: getText(properties, ["Divisi"]) || "YOLO",
    status: getText(properties, ["Status"]) || "Aktif",
    period: getText(properties, ["Periode"]) || "",
    photo: getFiles(properties, ["Foto"])[0] ?? "",
    instagram: getText(properties, ["Instagram"]) || "",
    description: getText(properties, ["Deskripsi"]) || "",
    order: getNumber(properties, ["Urutan"]),
  };
}

export async function getYoloTeamMembers() {
  if (!process.env.NOTION_TOKEN || !teamDataSourceId) {
    return [];
  }

  try {
    const response = await withRetry(() =>
      notion.dataSources.query({
        data_source_id: teamDataSourceId,
        filter: {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
        sorts: [
          {
            property: "Urutan",
            direction: "ascending",
          },
        ],
      }),
    );

    const members = response.results
      .map(mapNotionPageToTeamMember)
      .filter((member) => member.name !== "Tanpa Nama");

    teamCache = {
      data: members,
      savedAt: Date.now(),
    };

    return members;
  } catch (error) {
    if (isTemporaryError(error) && teamCache) {
      return teamCache.data;
    }

    console.error("Gagal mengambil data Team YOLO:", error);

    return [];
  }
}