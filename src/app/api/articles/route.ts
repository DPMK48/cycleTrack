import { db } from "@/db";
import { articles } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("language");
    const cat = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    let query = db.select().from(articles).orderBy(articles.id);

    const allArticles = await query;

    let filtered = allArticles;
    if (lang && lang !== "All") {
      filtered = filtered.filter((a) => a.language === lang);
    }
    if (cat && cat !== "All") {
      filtered = filtered.filter((a) => a.category === cat);
    }

    const paginated = filtered.slice(offset, offset + limit);

    return NextResponse.json(paginated);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
