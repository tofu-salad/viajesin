"use client";
import { TravelLog, TravelLogKey } from "@/models/TravelLog.model";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
const travelLogInputs: Record<
  TravelLogKey,
  {
    type: "text" | "textarea" | "number" | "date" | "url";
    label: string;
    value?: string | number;
  }
> = {
  latitude: {
    type: "number",
    label: "Latitud",
  },
  longitude: {
    type: "number",
    label: "Longitud",
  },
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
  visitDate: {
    type: "date",
    label: "Fecha de visita",
  },
};

const now = new Date();
const padNum = (input: number) => input.toString().padStart(2, "0");
const nowString = `${now.getFullYear()}-${padNum(now.getMonth() + 1)}-${padNum(
  now.getDate()
)}`;
export default function TravelLogForm({ position }: any) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TravelLog>({
    resolver: zodResolver(TravelLog),
    defaultValues: {
      title: "",
      description: "",
      rating: 5,
      // @ts-ignore
      visitDate: nowString,
    },
  });

  const onSubmit: SubmitHandler<TravelLog> = async (data) => {
    const session = await fetch("/api/auth/session");
    const sessionData = await session.json();
    const userId = sessionData.user.id;
    const response = await fetch("/api/travel-logs", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...data,
        userId,
        latitude: position[0],
        longitude: position[1],
      }),
    });
    const json = await response.json();
    console.log(json);
    router.push("/map");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mx-auto max-w-md px-4"
      >
        {Object.entries(travelLogInputs).map(([name, value]) => {
          const key = name as TravelLogKey;
          const inputValue =
            key === "latitude"
              ? position[0]
              : key === "longitude"
              ? position[1]
              : value.value;
          return (
            <div key={name} className="flex flex-col gap-2">
              <label>
                <span>{value.label || key}</span>
              </label>
              {value.type === "textarea" ? (
                <textarea
                  {...register(key)}
                  className={`textarea textarea-bordered ${
                    errors[key] ? "shadow-sm shadow-red-800/50" : ""
                  }`}
                />
              ) : (
                <input
                  type={value.type}
                  value={inputValue}
                  {...register(key)}
                  className={`input input-bordered w-full max-w-xs ${
                    errors[key] ? "shadow-sm shadow-red-800/50" : ""
                  }`}
                />
              )}
              {errors[key] && (
                <span className="text-red-800 font-bold text-sm">
                  {errors[key]?.message}
                </span>
              )}
            </div>
          );
        })}
        <button>Crear</button>
      </form>
    </>
  );
}
