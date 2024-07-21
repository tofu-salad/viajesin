import { TravelLogKey } from "@/models/TravelLog.model";

export const travelLogInputs: Record<
	TravelLogKey,
	{
		type?: "text" | "textarea" | "number" | "date" | "url";
		label: string;
		value?: string | number;
	}
> = {
	title: {
		type: "text",
		label: "Título",
	},
	description: {
		type: "textarea",
		label: "Descripción",
	},
	image: {
		type: "url",
		label: "URL de la Imagen",
	},
	rating: {
		type: "number",
		label: "Puntuación",
	},
	visitDate: {
		type: "date",
		label: "Fecha de la visita",
	},
	latitude: {
		label: "Latitud",
	},
	longitude: {
		label: "Longitud",
	},
};
