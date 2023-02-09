import { z } from "zod";

export const TravelLog = z.object({
  userId: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  rating: z.number().min(0).max(10).default(5),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  visitDate: z.coerce.date(),
});

export type TravelLog = z.infer<typeof TravelLog>;
