import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

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
    const dataSourceId = process.env.NOTION_PARTNERSHIP_DATA_SOURCE_ID;

    if (!process.env.NOTION_TOKEN) {
      return makeError("NOTION_TOKEN belum diisi.", 500);
    }

    if (!dataSourceId) {
      return makeError("NOTION_PARTNERSHIP_DATA_SOURCE_ID belum diisi.", 500);
    }

    const body = (await request.json().catch(() => null)) as
      | PartnershipPayload
      | null;

    if (!body) {
      return makeError("Data form tidak valid.");
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