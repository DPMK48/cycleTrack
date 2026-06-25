import { db } from "@/db";
import { cycleEntries } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId = 1, date, symptoms, mood, flow, notes } = body;

    const entry = await db
      .insert(cycleEntries)
      .values({
        userId,
        date,
        symptoms: symptoms || [],
        mood: mood || null,
        flow: flow || null,
        notes: notes || null,
      })
      .returning();

    return NextResponse.json(entry[0]);
  } catch (error) {
    console.error("Error creating cycle entry:", error);
    return NextResponse.json({ error: "Failed to create entry" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = parseInt(searchParams.get("userId") || "1");

    const entries = await db
      .select()
      .from(cycleEntries)
      .where(eq(cycleEntries.userId, userId))
      .orderBy(cycleEntries.date);

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching cycle entries:", error);
    return NextResponse.json({ error: "Failed to fetch entries" }, { status: 500 });
  }
}
