"use client";
import {
  TravelLog,
  TravelLogKey,
  TravelLogWithId,
} from "@/models/TravelLog.model";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const travelLogInputs: Record<
  TravelLogKey,
  {
    type: "text" | "textarea" | "number" | "date" | "url";
    label?: string;
  }
> = {
  title: {
    type: "text",
    label: "Titulo",
  },
  description: {
    type: "textarea",
    label: "Descripcion",
  },
  image: {
    type: "url",
    label: "Imagen",
  },
  rating: {
    type: "number",
    label: "Puntaje",
  },
  latitude: {
    type: "number",
    label: "Latitud",
  },
  longitude: {
    type: "number",
    label: "Longitud",
  },
  visitDate: {
    type: "date",
    label: "Fecha de Visita",
  },
};

export default function TravelLogForm({
  userId,
}: {
  userId: string | undefined;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TravelLog>({ resolver: zodResolver(TravelLog) });

  const onSubmit: SubmitHandler<TravelLog> = async (data) => {
    const response = await fetch("/api/travel-logs", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId, ...data }),
    });
    const json = await response.json();
    console.log(json);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Object.entries(travelLogInputs).map(([name, value]) => {
        const key = name as TravelLogKey;
        return (
          <div key={key}>
            <label>
              <span>{value.label || key}</span>
            </label>
            {value.type === "textarea" ? (
              <textarea {...register(key)} />
            ) : (
              <input type={value.type} {...register(key)} />
            )}
            {errors[key] && <span>{errors[key]?.message}</span>}
          </div>
        );
      })}
      <button>Crear</button>
    </form>
  );
}
