import { db } from "@/db";
import { teas } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    const allTeas = await db
      .select()
      .from(teas)
      .orderBy(teas.id)
      .limit(limit)
      .offset(offset);

    return NextResponse.json(allTeas);
  } catch (error) {
    console.error("Error fetching teas:", error);
    return NextResponse.json({ error: "Failed to fetch teas" }, { status: 500 });
  }
}
