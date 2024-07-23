import { z } from "zod";

const errors = {
  title: "El titulo no puede estar vacío.",
  description: "La descripción no puede estar vacía.",
  image: "El texto debe ser un enlace.",
  latitude: "Tiene que ser un número entre -90 y 90.",
  longitude: "Tiene que ser un número entre -180 y 180.",
};
export const TravelLog = z.object({
  title: z.string().trim().min(1, errors.title),
  description: z.string().trim().min(1, errors.description),
  image: z.string().url(errors.image),
  rating: z.coerce.number().min(0).max(10).default(5),
  visitDate: z.coerce.date(),
  latitude: z.coerce
    .number({ invalid_type_error: errors.latitude })
    .min(-90)
    .max(90),
  longitude: z.coerce
    .number({ required_error: errors.longitude })
    .min(-180)
    .max(180),
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
export type TravelLogWithUserIdAndID = z.infer<typeof TravelLogWithUserIdAndID>;

const editFormErrors = {
  title: "El titulo no puede estar vacío.",
  description: "La descripción no puede estar vacía.",
  image: "El texto debe ser un enlace.",
};
export const EditFormData = z.object({
  title: z.string().trim().min(1, editFormErrors.title),
  description: z.string().trim().min(1, editFormErrors.description),
  image: z.string().url(editFormErrors.image),
  rating: z.coerce.number().min(0).max(10).default(5),
  visitDate: z.coerce.date(),
});
export const EditFormDataWithId = EditFormData.extend({
  id: z.string().trim().min(1),
});
export type EditFormDataType = z.infer<typeof EditFormData>;
export const EditFormDataKeys = EditFormData.keyof().Enum;
export type EditFormDataKey = keyof typeof EditFormDataKeys;
