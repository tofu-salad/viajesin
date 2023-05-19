import { db } from "@/db/db";
import { travelLogs } from "@/db/schema";
import { TravelLogWithUserId } from "@/models/TravelLog.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    TravelLogWithUserId[] | TravelLogWithUserId | { message: string }
  >
) {
  try {
    if (req.method === "GET") {
      const logs = await db.select().from(travelLogs);
      res.status(200).json(logs);
    } else if (req.method === "POST") {
      const {
        image,
        title,
        rating,
        visitDate,
        description,
        latitude,
        longitude,
        userId,
      } = await TravelLogWithUserId.parseAsync(req.body);
      const createLog = await db
        .insert(travelLogs)
        .values({
            id: crypto.randomUUID(),
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
      res.status(200).json(createLog);
    } else {
      res.status(405).json({ message: "Not supported" });
    }
  } catch (e) {
    const error = e as Error;
    console.error({ message: error.message });
    res.status(500).json({ message: error.message });
  }
}
