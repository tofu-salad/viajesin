import { z } from "zod";

const errors = {
  title: "El titulo no puede estar vacío.",
  description: "La descripción no puede estar vacía.",
  image: "El texto debe ser un enlace.",
};
export const TravelLog = z.object({
  title: z.string().trim().min(1, errors.title),
  description: z.string().trim().min(1, errors.description),
  image: z.string().url(errors.image),
  rating: z.coerce.number().min(0).max(10).default(5),
  visitDate: z.coerce.date(),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
});

export const TravelLogWithId = TravelLog.extend({
  id: z.string().trim().min(1),
});
export const TravelLogWithUserId = TravelLog.extend({
  userId: z.string().trim().min(1),
});

export const TravelLogWithUserIdAndID = TravelLog.extend({
  id: z.string().trim().min(1),
  userId: z.string().trim().min(1),
});

export const TravelLogKeys = TravelLog.keyof().Enum;
export type TravelLogKey = keyof typeof TravelLogKeys;
export type TravelLog = z.infer<typeof TravelLog>;
export type TravelLogWithUserId = z.infer<typeof TravelLogWithUserId>;
export type TravelLogWithId = z.infer<typeof TravelLogWithId>;
export type TravelLogWithUserIdAndID = z.infer<typeof TravelLogWithUserIdAndID>
