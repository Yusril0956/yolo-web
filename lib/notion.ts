import { Client } from "@notionhq/client";

export type NotionEnv = {
  apiKey: string;
  membersDatabaseId: string;
  activitiesDatabaseId: string;
  notionVersion: string;
};

let notionClient: Client | null = null;

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy .env.example to .env.local and fill in the Notion credentials.`,
    );
  }

  return value;
}

export function getNotionEnv(): NotionEnv {
  return {
    apiKey: requireEnv("NOTION_API_KEY"),
    membersDatabaseId: requireEnv("NOTION_MEMBERS_DB_ID"),
    activitiesDatabaseId: requireEnv("NOTION_ACTIVITIES_DB_ID"),
    notionVersion:
      process.env.NOTION_VERSION ?? Client.defaultNotionVersion,
  };
}

export function getNotionClient() {
  if (!notionClient) {
    const { apiKey, notionVersion } = getNotionEnv();

    notionClient = new Client({
      auth: apiKey,
      notionVersion,
    });
  }

  return notionClient;
}
