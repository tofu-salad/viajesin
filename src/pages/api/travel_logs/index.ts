import { db } from "@/db/db";
import {
  EditFormDataWithId,
  TravelLogWithUserId,
} from "@/models/TravelLog.model";
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
        const logs = await db.travelLogs.findMany({ where: { id } });
        res.status(200).json(logs);
      } else {
        const logs = await db.travelLogs.findMany({});
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
      const createLog = await db.travelLogs.create({
        data: {
          image,
          title,
          rating,
          visitDate,
          description,
          latitude,
          longitude,
          userId,
        },
      });
      res.status(200).json(createLog);
    } else if (req.method === "PUT") {
      const { id, image, title, rating, visitDate, description } =
        await EditFormDataWithId.parseAsync(req.body);

      const updateLog = db.travelLogs.update({
        data: {
          image,
          title,
          rating,
          visitDate,
          description,
        },
        where: { id },
      });
      res
        .status(200)
        .json({ message: `travel-log ${updateLog} edited correctly` });
    } else if (req.method === "DELETE") {
      const { id } = req.query;
      if (id && !Array.isArray(id)) {
        const deletedLog = await db.travelLogs.delete({ where: { id } });

        res.status(200).json({ message: `Log deleted ${deletedLog}` });
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
