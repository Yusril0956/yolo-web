import {
  APIErrorCode,
  isFullPage,
  isNotionClientError,
  type PageObjectResponse,
  type RichTextItemResponse,
} from "@notionhq/client";
import { cache } from "react";
import type { NotionEnv } from "@/lib/notion";
import { getNotionClient, getNotionEnv } from "@/lib/notion";

export type NotionPageSummary = {
  id: string;
  title: string;
  url: string;
  lastEditedTime: string;
  imageUrls: string[]; // ✅ perbaikan: nama dan tipe disamakan
  details: Array<{
    label: string;
    value: string;
  }>;
};

export type NotionCollectionSnapshot = {
  label: string;
  envKey: keyof NotionEnv;
  sourceType: "database" | "data_source";
  sourceId: string;
  sourceTitle: string;
  schemaFields: Array<{
    name: string;
    type: string;
  }>;
  items: Array<NotionPageSummary>;
  itemCount: number;
  hasMore: boolean;
};

export type NotionOverview = {
  members: NotionCollectionSnapshot;
  activities: NotionCollectionSnapshot;
};

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
});

function richTextToPlainText(parts: Array<RichTextItemResponse>) {
  return parts
    .map((part) => part.plain_text)
    .join("")
    .trim();
}

function formatNamedObject(value: { id: string; name?: string | null }) {
  return value.name && value.name.trim().length > 0 ? value.name : value.id;
}

function formatDate(value: string | null | undefined) {
  if (!value) {
    return null;
  }
  return dateFormatter.format(new Date(value));
}

function formatFormulaValue(
  formula: Extract<
    PageObjectResponse["properties"][string],
    { type: "formula" }
  >,
) {
  switch (formula.formula.type) {
    case "boolean":
      return formula.formula.boolean ? "Yes" : "No";
    case "date": {
      const start = formatDate(formula.formula.date?.start);
      const end = formatDate(formula.formula.date?.end);
      if (!start) return null;
      return end ? `${start} - ${end}` : start;
    }
    case "number":
      return formula.formula.number === null
        ? null
        : formula.formula.number.toLocaleString("id-ID");
    case "string":
      return formula.formula.string?.trim() || null;
    default:
      return null;
  }
}

function formatPageProperty(
  property: PageObjectResponse["properties"][string],
) {
  switch (property.type) {
    case "title":
      return richTextToPlainText(property.title) || null;
    case "rich_text":
      return richTextToPlainText(property.rich_text) || null;
    case "select":
      return property.select?.name ?? null;
    case "status":
      return property.status?.name ?? null;
    case "multi_select":
      return property.multi_select.length > 0
        ? property.multi_select.map((item) => item.name).join(", ")
        : null;
    case "date": {
      const start = formatDate(property.date?.start);
      const end = formatDate(property.date?.end);
      if (!start) return null;
      return end ? `${start} - ${end}` : start;
    }
    case "number":
      return property.number === null
        ? null
        : property.number.toLocaleString("id-ID");
    case "url":
      return property.url ?? null;
    case "email":
      return property.email ?? null;
    case "phone_number":
      return property.phone_number ?? null;
    case "checkbox":
      return property.checkbox ? "Yes" : "No";
    case "people":
      return property.people.length > 0
        ? property.people.map((person) => formatNamedObject(person)).join(", ")
        : null;
    case "files":
      return property.files.length > 0
        ? `${property.files.length} file${property.files.length > 1 ? "s" : ""}`
        : null;
    case "relation":
      return property.relation.length > 0
        ? `${property.relation.length} linked`
        : null;
    case "created_by":
      return formatNamedObject(property.created_by);
    case "created_time":
      return formatDate(property.created_time);
    case "last_edited_by":
      return formatNamedObject(property.last_edited_by);
    case "last_edited_time":
      return formatDate(property.last_edited_time);
    case "unique_id":
      return property.unique_id.number === null
        ? property.unique_id.prefix
        : `${property.unique_id.prefix ? `${property.unique_id.prefix}-` : ""}${property.unique_id.number}`;
    case "formula":
      return formatFormulaValue(property);
    case "verification":
      return property.verification?.state ?? null;
    default:
      return null;
  }
}

function summarizePage(page: PageObjectResponse): NotionPageSummary {
  const titleEntry = Object.entries(page.properties).find(
    ([, property]) => property.type === "title",
  );

  const title =
    titleEntry && titleEntry[1].type === "title"
      ? richTextToPlainText(titleEntry[1].title) || "Untitled page"
      : "Untitled page";

  const details = Object.entries(page.properties)
    .filter(([, property]) => property.type !== "title")
    .map(([label, property]) => ({
      label,
      value: formatPageProperty(property),
    }))
    .filter((item): item is { label: string; value: string } =>
      Boolean(item.value && item.value.trim().length > 0),
    )
    .slice(0, 3);

  // ✅ kumpulkan semua URL gambar dari properti bertipe files
  const imageUrls: string[] = [];
  for (const prop of Object.values(page.properties)) {
    if (prop.type === "files" && prop.files.length > 0) {
      for (const file of prop.files) {
        if (file.type === "file") {
          imageUrls.push(file.file.url);
        } else if (file.type === "external") {
          imageUrls.push(file.external.url);
        }
      }
    }
  }

  return {
    id: page.id,
    title,
    url: page.url,
    lastEditedTime: page.last_edited_time,
    imageUrls, // ✅ properti yang dikembalikan
    details,
  };
}

function readSourceTitle(source: object, fallback: string) {
  if ("title" in source) {
    const titleValue = (source as { title?: Array<RichTextItemResponse> })
      .title;
    if (titleValue) {
      const title = richTextToPlainText(titleValue);
      if (title) return title;
    }
  }
  return fallback;
}

async function resolveDataSourceId(rawId: string, fallbackLabel: string) {
  const notion = getNotionClient();

  try {
    const dataSource = await notion.dataSources.retrieve({
      data_source_id: rawId,
    });

    return {
      sourceType: "data_source" as const,
      sourceId: dataSource.id,
      sourceTitle: readSourceTitle(dataSource, fallbackLabel),
      schemaFields: Object.values(dataSource.properties).map((property) => ({
        name: property.name,
        type: property.type,
      })),
    };
  } catch (error) {
    if (
      !isNotionClientError(error) ||
      error.code !== APIErrorCode.ObjectNotFound
    ) {
      throw error;
    }
  }

  const database = await notion.databases.retrieve({ database_id: rawId });

  if (!("data_sources" in database) || database.data_sources.length === 0) {
    throw new Error(
      `Database ${rawId} is available, but it does not expose a data source.`,
    );
  }

  const primarySourceId = database.data_sources[0].id;
  const dataSource = await notion.dataSources.retrieve({
    data_source_id: primarySourceId,
  });

  return {
    sourceType: "database" as const,
    sourceId: dataSource.id,
    sourceTitle: readSourceTitle(
      "title" in dataSource ? dataSource : database,
      fallbackLabel,
    ),
    schemaFields: Object.values(dataSource.properties).map((property) => ({
      name: property.name,
      type: property.type,
    })),
  };
}

async function loadCollection(envKey: keyof NotionEnv, label: string) {
  const env = getNotionEnv();
  const rawId = env[envKey];
  const notion = getNotionClient();
  const resolved = await resolveDataSourceId(rawId, label);
  const response = await notion.dataSources.query({
    data_source_id: resolved.sourceId,
    page_size: 5,
    result_type: "page",
    sorts: [
      {
        timestamp: "last_edited_time",
        direction: "descending",
      },
    ],
  });

  const items = response.results.filter(isFullPage).map(summarizePage);

  return {
    label,
    envKey,
    sourceType: resolved.sourceType,
    sourceId: resolved.sourceId,
    sourceTitle: resolved.sourceTitle,
    schemaFields: resolved.schemaFields.slice(0, 8),
    items,
    itemCount: items.length,
    hasMore: response.has_more,
  } satisfies NotionCollectionSnapshot;
}

export const getNotionOverview = cache(async () => {
  const [members, activities] = await Promise.all([
    loadCollection("membersDatabaseId", "Members"),
    loadCollection("activitiesDatabaseId", "Activities"),
  ]);

  return {
    members,
    activities,
  } satisfies NotionOverview;
});
