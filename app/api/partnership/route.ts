import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: "2025-09-03",
});

type PartnershipPayload = {
  name?: string;
  organization?: string;
  email?: string;
  whatsapp?: string;
  collaborationType?: string;
  title?: string;
  description?: string;
  targetDate?: string;
  note?: string;
  website?: string;
};

const allowedCollaborationTypes = [
  "Kolaborasi Program",
  "Media Partner",
  "Sponsorship",
  "Dukungan Pendidikan",
  "Volunteering",
  "Lainnya",
];

const rateLimitStore = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

function cleanText(value: unknown, maxLength = 2000) {
  if (typeof value !== "string") return "";

  return value.trim().slice(0, maxLength);
}

function makeRichText(content: string) {
  if (!content) {
    return [];
  }

  return [
    {
      text: {
        content,
      },
    },
  ];
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidDate(value: string) {
  if (!value) return true;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsedDate = new Date(`${value}T00:00:00.000Z`);

  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === value
  );
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return true;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  current.count += 1;
  return true;
}

async function parsePayload(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > MAX_BODY_BYTES) {
    return {
      payload: null,
      error: "Ukuran data form terlalu besar.",
    };
  }

  const rawBody = await request.text();
  const bodySize = new TextEncoder().encode(rawBody).byteLength;

  if (bodySize > MAX_BODY_BYTES) {
    return {
      payload: null,
      error: "Ukuran data form terlalu besar.",
    };
  }

  try {
    const parsed: unknown = JSON.parse(rawBody);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {
        payload: null,
        error: "Data form tidak valid.",
      };
    }

    return {
      payload: parsed as PartnershipPayload,
      error: "",
    };
  } catch {
    return {
      payload: null,
      error: "Data form tidak valid.",
    };
  }
}

function makeError(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status },
  );
}

export async function POST(request: Request) {
  try {
    if (!checkRateLimit(getClientKey(request))) {
      return makeError(
        "Terlalu banyak pengajuan. Silakan coba lagi beberapa menit.",
        429,
      );
    }

    const dataSourceId = process.env.NOTION_PARTNERSHIP_DATA_SOURCE_ID;

    if (!process.env.NOTION_TOKEN) {
      return makeError("NOTION_TOKEN belum diisi.", 500);
    }

    if (!dataSourceId) {
      return makeError("NOTION_PARTNERSHIP_DATA_SOURCE_ID belum diisi.", 500);
    }

    const { payload: body, error: parseError } = await parsePayload(request);

    if (!body) {
      return makeError(parseError || "Data form tidak valid.");
    }

    if (body.website) {
      return NextResponse.json({
        success: true,
        message: "Pengajuan berhasil dikirim.",
      });
    }

    const name = cleanText(body.name, 120);
    const organization = cleanText(body.organization, 160);
    const email = cleanText(body.email, 160);
    const whatsapp = cleanText(body.whatsapp, 40);
    const collaborationType = cleanText(body.collaborationType, 80);
    const title = cleanText(body.title, 160);
    const description = cleanText(body.description, 2000);
    const targetDate = cleanText(body.targetDate, 40);
    const note = cleanText(body.note, 1000);

    if (!name) {
      return makeError("Nama wajib diisi.");
    }

    if (!organization) {
      return makeError("Instansi atau komunitas wajib diisi.");
    }

    if (!email || !isValidEmail(email)) {
      return makeError("Email tidak valid.");
    }

    if (!whatsapp) {
      return makeError("Nomor WhatsApp wajib diisi.");
    }

    if (!allowedCollaborationTypes.includes(collaborationType)) {
      return makeError("Jenis kolaborasi tidak valid.");
    }

    if (!title) {
      return makeError("Judul pengajuan wajib diisi.");
    }

    if (!description || description.length < 20) {
      return makeError("Deskripsi pengajuan minimal 20 karakter.");
    }

    if (!isValidDate(targetDate)) {
      return makeError("Format target waktu tidak valid.");
    }

    await notion.pages.create({
      parent: {
        type: "data_source_id",
        data_source_id: dataSourceId,
      },
      properties: {
        Nama: {
          title: makeRichText(name),
        },
        Instansi: {
          rich_text: makeRichText(organization),
        },
        Email: {
          email,
        },
        WhatsApp: {
          phone_number: whatsapp,
        },
        "Jenis Kolaborasi": {
          select: {
            name: collaborationType,
          },
        },
        "Judul Pengajuan": {
          rich_text: makeRichText(title),
        },
        Deskripsi: {
          rich_text: makeRichText(description),
        },
        ...(targetDate
          ? {
              "Target Waktu": {
                date: {
                  start: targetDate,
                },
              },
            }
          : {}),
        Catatan: {
          rich_text: makeRichText(note),
        },
        Status: {
          status: {
            name: "Baru",
          },
        },
        "Tanggal Masuk": {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Pengajuan kolaborasi berhasil dikirim.",
    });
  } catch (error) {
    console.error("Partnership submit error:", error);

    return makeError(
      "Pengajuan belum bisa dikirim. Silakan coba lagi beberapa saat.",
      500,
    );
  }
}
