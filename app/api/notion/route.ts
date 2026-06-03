import { getNotionOverview } from "@/lib/notion-data";

export async function GET() {
  const overview = await getNotionOverview();

  return Response.json(overview);
}
