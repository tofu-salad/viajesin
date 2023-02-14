import client from "@/lib/prismadb";
import { TravelLogWithUserId } from "@/models/TravelLog.model";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    TravelLogWithUserId[] | TravelLogWithUserId | { message: string }
  >
) {
  try {
    if (req.method === "GET") {
      const logs = await client.travelLog.findMany({});
      res.status(200).json(logs);
    } else if (req.method === "POST") {
      const session = await getServerSession(req, res, authOptions);
      console.log(session);
      if (session) {
        const userId = session.user.id;
        console.log(req.body);
        console.log(userId);
        const {
          image,
          title,
          rating,
          latitude,
          longitude,
          visitDate,
          description,
        } = await TravelLogWithUserId.parseAsync(req.body);
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
        console.log("xd", userId);
        res.status(200).json(createLog);
      } else {
        res.status(400).send({ message: "Session not found" });
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
