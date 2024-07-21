import { createTravelLog, deleteTravelLog, getAllTravelLogs, getTravelLogsById, updateTravelLog } from "@/db/queries";
import { SelectTravelLog } from "@/db/schema";
import {
  EditFormDataWithId,
  TravelLogWithUserId,
} from "@/models/TravelLog.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    SelectTravelLog[] | TravelLogWithUserId | { message: string }
  >
) {
  try {
    if (req.method === "GET") {
      const { id } = req.query;
      if (id && !Array.isArray(id)) {
        const logs = await getTravelLogsById(id)
        res.status(200).json(logs);
      } else {
        const logs = await getAllTravelLogs()
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

      await createTravelLog({
        image,
        title,
        rating,
        visitDate,
        description,
        latitude,
        longitude,
        userId,
      });
      res.status(200).json({ message: `Log created ${createTravelLog}` })

    } else if (req.method === "PUT") {
      const { id, image, title, rating, visitDate, description } =
        await EditFormDataWithId.parseAsync(req.body);

      const updateLog = updateTravelLog(id, {
        image,
        title,
        rating,
        visitDate,
        description,
      });
      res
        .status(200)
        .json({ message: `travel-log ${updateLog} edited correctly` });
    } else if (req.method === "DELETE") {
      const { id } = req.query;
      if (id && !Array.isArray(id)) {
        const deletedLog = deleteTravelLog(id)

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
