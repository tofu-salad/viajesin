import { db } from "@/db/db";
import { travelLogs } from "@/db/schema";
import {
  EditFormDataWithId,
  TravelLogWithUserId,
} from "@/models/TravelLog.model";
import { InferModel, eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    TravelLogWithUserId[] | TravelLogWithUserId | { message: string }
  >
) {
  try {
    if (req.method === "GET") {
      const { id } = req.query;
      if (id && !Array.isArray(id)) {
        const logs = await db
          .select()
          .from(travelLogs)
          .where(eq(travelLogs.id, id));
        res.status(200).json(logs);
      } else {
        const logs = await db.select().from(travelLogs);
        res.status(200).json(logs);
      }
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
    } else if (req.method === "PUT") {
      const { id, image, title, rating, visitDate, description } =
        await EditFormDataWithId.parseAsync(req.body);
      const updateLog = db
        .update(travelLogs)
        .set({
          image,
          title,
          rating,
          visitDate,
          description,
        })
        .where(eq(travelLogs.id, id))
        .returning({ id: travelLogs.id })
        .then((res) => res[0]);

      res
        .status(200)
        .json({ message: `travel-log ${updateLog} edited correctly` });
    } else if (req.method === "DELETE") {
      const { id } = req.query;
      if (id && !Array.isArray(id)) {
        const deletedLog = await db
          .delete(travelLogs)
          .where(eq(travelLogs.id, id))
          .returning({ deletedLog: travelLogs.id });

        res.status(200).json({ message: `Log deleted ${deletedLog}` });
      } else {
        const logs = await db.select().from(travelLogs);
        res.status(200).json(logs);
      }
    } else {
      res.status(405).json({ message: "Not supported" });
    }
  } catch (e) {
    const error = e as Error;
    console.error({ message: error.message });
    res.status(500).json({ message: error.message });
  }
}
