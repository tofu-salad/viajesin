import { db } from "@/db/db";
import { travelLogs } from "@/db/schema";
import { TravelLogWithUserId } from "@/models/TravelLog.model";
import { NextResponse } from "next/server";

export async function GET() {
  const logs = await db.select().from(travelLogs);
  return NextResponse.json(logs);
}

export async function POST(request: Request) {
  try {
    const {
      image,
      title,
      rating,
      visitDate,
      description,
      latitude,
      longitude,
      userId,
    } = await TravelLogWithUserId.parseAsync(request.body);
    const createLog = await db
      .insert(travelLogs)
      .values({
        image,
        title,
        rating,
        visitDate,
        description,
        latitude,
        longitude,
        userId,
      })
      .returning();
    return NextResponse.json({ createLog }, { status: 500 });
  } catch (e) {
    const error = e as Error;
    console.error({ message: error.message });
    return NextResponse.json({ message: error.message });
  }
}
