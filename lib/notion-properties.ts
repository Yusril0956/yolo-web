import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type NotionPageProperties = PageObjectResponse["properties"];
type NotionProperty = NotionPageProperties[string];

export function isFullPage(page: unknown): page is PageObjectResponse {
  return (
    typeof page === "object" &&
    page !== null &&
    "object" in page &&
    page.object === "page" &&
    "properties" in page
  );
}

export function getProperty(
  properties: NotionPageProperties,
  names: string[],
): NotionProperty | undefined {
  for (const name of names) {
    const property = properties[name];

    if (property) {
      return property;
    }
  }

  return undefined;
}

export function getPlainTextFromItems(
  items: Array<{ plain_text?: string }> | undefined,
) {
  if (!items) return "";

  return items
    .map((item) => item.plain_text ?? "")
    .join("")
    .trim();
}

export function getText(properties: NotionPageProperties, names: string[]) {
  const property = getProperty(properties, names);

  if (!property) return "";

  if (property.type === "title") {
    return getPlainTextFromItems(property.title);
  }

  if (property.type === "rich_text") {
    return getPlainTextFromItems(property.rich_text);
  }

  if (property.type === "phone_number") {
    return property.phone_number ?? "";
  }

  if (property.type === "email") {
    return property.email ?? "";
  }

  if (property.type === "select") {
    return property.select?.name ?? "";
  }

  if (property.type === "status") {
    return property.status?.name ?? "";
  }

  if (property.type === "url") {
    return property.url ?? "";
  }

  return "";
}

export function getSelectName(
  properties: NotionPageProperties,
  names: string[],
) {
  const property = getProperty(properties, names);

  if (!property) return "";

  if (property.type === "select") {
    return property.select?.name ?? "";
  }

  if (property.type === "status") {
    return property.status?.name ?? "";
  }

  return "";
}

export function getDateRange(
  properties: NotionPageProperties,
  names: string[],
) {
  const property = getProperty(properties, names);

  if (!property || property.type !== "date") {
    return {
      start: "",
      end: "",
    };
  }

  return {
    start: property.date?.start ?? "",
    end: property.date?.end ?? "",
  };
}

export function getUrl(properties: NotionPageProperties, names: string[]) {
  const property = getProperty(properties, names);

  if (!property || property.type !== "url") return "";

  return property.url ?? "";
}

export function getNumber(properties: NotionPageProperties, names: string[]) {
  const property = getProperty(properties, names);

  if (!property || property.type !== "number") return 999;

  return property.number ?? 999;
}

export function getFiles(properties: NotionPageProperties, names: string[]) {
  const property = getProperty(properties, names);

  if (!property || property.type !== "files") return [];

  return property.files
    .map((file) => {
      if (file.type === "external") {
        return file.external.url;
      }

      if (file.type === "file") {
        return file.file.url;
      }

      return "";
    })
    .filter(Boolean);
}

export function getCheckbox(properties: NotionPageProperties, names: string[]) {
  const property = getProperty(properties, names);

  if (!property || property.type !== "checkbox") return false;

  return property.checkbox;
}
