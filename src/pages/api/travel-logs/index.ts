import client from "@/lib/prismadb";
import { TravelLogWithId } from "@/models/TravelLog.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    TravelLogWithId[] | TravelLogWithId | { message: string }
  >
) {
  try {
    if (req.method === "GET") {
      const logs = await client.travelLog.findMany({});
      res.status(200).json(logs);
    } else if (req.method === "POST") {
      const {
        userId,
        image,
        title,
        rating,
        latitude,
        longitude,
        visitDate,
        description,
      } = await TravelLogWithId.parseAsync(req.body);
      const createLog = await client.travelLog.create({
        data: {
          userId,
          image,
          title,
          rating,
          latitude,
          longitude,
          visitDate,
          description,
        },
      });
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
