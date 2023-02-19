"use client";
import { TravelLog, TravelLogKey } from "@/models/TravelLog.model";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import TravelLogContext from "@/context/TravelLog/TravelLogContext";
const travelLogInputs: Record<
  TravelLogKey,
  {
    type?: "text" | "textarea" | "number" | "date" | "url";
    label: string;
    value?: string | number;
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
  visitDate: {
    type: "date",
    label: "Fecha de visita",
  },
  latitude: {
    label: "Latitud",
  },
  longitude: {
    label: "Longitud",
  },
};

const now = new Date();
const padNum = (input: number) => input.toString().padStart(2, "0");
const nowString = new Date(
  `${now.getFullYear()}-${padNum(now.getMonth() + 1)}-${padNum(now.getDate())}`
);

type TravelLogFormProps = {
  onComplete: () => void;
  onCancel: () => void;
};
export default function TravelLogForm({
  onCancel,
  onComplete,
}: TravelLogFormProps) {
  const [formError, setFormError] = useState("");
  const { state, dispatch } = useContext(TravelLogContext);
  const router = useRouter();

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TravelLog>({
    resolver: zodResolver(TravelLog),
    defaultValues: {
      title: "",
      description: "",
      latitude: state.currentMarkerLocation?.lat || 90,
      longitude: state.currentMarkerLocation?.lng || 180,
      rating: 5,
      visitDate: nowString,
    },
  });

  useEffect(() => {
    if (!state.currentMarkerLocation) return;
    setValue("latitude", Number(state.currentMarkerLocation.lat.toFixed(6)));
    setValue("longitude", Number(state.currentMarkerLocation.lng.toFixed(6)));
  }, [state.currentMarkerLocation]);
  const onSubmit: SubmitHandler<TravelLog> = async (data) => {
    try {
      setFormError("");
      const session = await fetch("/api/auth/session");
      const sessionData = await session.json();
      const userId = sessionData.user.id;
      const response = await fetch("/api/travel-logs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...data,
          userId,
        }),
      });
      if (response.ok) {
        router.push("/map");
        dispatch({ type: "SET_CURRENT_MARKER_LOCATION", data: null });
        reset();
        onComplete();
      } else {
        const json = await response.json();
        throw new Error(json.message);
      }
    } catch (e) {
      const error = e as Error;
      if (error.message.includes("sessionData.user")) {
        setFormError("No has iniciado sesión");
      } else {
        setFormError(error.message);
      }
    }
  };

  return (
    <div className="w-full bg-base-100 p-2 rounded-lg">
      <div className="flex justify-end mx-4 my-2 ">
        <button
          onClick={() => {
            dispatch({ type: "SET_CURRENT_MARKER_LOCATION", data: null });
            onCancel();
            reset();
          }}
          className="btn btn-secondary btn-sm"
        >
          X
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mx-auto max-w-md px-4"
      >
        {formError && (
          <div className="alert alert-error shadow-lg">
            <div>
              <WarnIcon />
              <span>{formError}</span>
            </div>
          </div>
        )}
        {Object.entries(travelLogInputs).map(([name, value]) => {
          const key = name as TravelLogKey;
          return (
            <div key={name} className="flex flex-col gap-2">
              <label>
                <span>{value.label || key}</span>
              </label>
              {value.type === "textarea" ? (
                <textarea
                  {...register(key)}
                  className={`textarea textarea-bordered ${
                    errors[key] ? "textarea-error" : ""
                  }`}
                />
              ) : (
                <input
                  type={value.type}
                  {...register(key)}
                  className={`input input-bordered w-full max-w-xs ${
                    errors[key] ? "input-error" : ""
                  }`}
                />
              )}
              {errors[key] && (
                <span className="text-error">{errors[key]?.message}</span>
              )}
            </div>
          );
        })}
        <button className="btn">Crear</button>
      </form>
    </div>
  );
}

function WarnIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-current flex-shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
