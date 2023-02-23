"use client";
import { TravelLog, TravelLogKey } from "@/models/TravelLog.model";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import TravelLogContext from "@/context/TravelLog/TravelLogContext";
import { Spinner } from "./LoadingSpinner";
import { useRouter } from "next/navigation";
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

const now = new Date();
const formattedDate = now.toISOString().substring(0, 10);
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
  const isOpen = state.sideBarVisible;
  const [isLoading, setIsLoading] = useState(false);
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
      // @ts-ignore
      visitDate: formattedDate,
    },
  });

  useEffect(() => {
    if (!state.currentMarkerLocation) return;
    setValue("latitude", Number(state.currentMarkerLocation.lat.toFixed(6)));
    setValue("longitude", Number(state.currentMarkerLocation.lng.toFixed(6)));
  }, [state.currentMarkerLocation, setValue]);
  const onSubmit: SubmitHandler<TravelLog> = async (data) => {
    try {
      setFormError("");
      setIsLoading(true);
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
        dispatch({ type: "SET_CURRENT_MARKER_LOCATION", data: null });
        reset();
        onComplete();
        window.location.reload();
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-sm bg-base-100 p-2 md:rounded-lg">
      <div className="flex justify-end mx-4 my-2 ">
        <button
          onClick={() => {
            dispatch({ type: "SET_CURRENT_MARKER_LOCATION", data: null });
            onCancel();
            reset();
          }}
          className={`btn btn-secondary btn-sm ${
            isOpen ? "md:hidden" : "hidden"
          }`}
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
              <label className="label">
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
                  max={key === "rating" ? 10 : undefined}
                  min={key === "rating" ? 0 : undefined}
                />
              )}
              {errors[key] && (
                <span className="text-error">{errors[key]?.message}</span>
              )}
            </div>
          );
        })}
        {/* TODO: Make both latitude and longitude be in the same row */}
        {/* <div> */}
        {/*   <label>Latitud y longitud</label> */}
        {/*   <input {...register("latitude")}></input> */}
        {/*   <input {...register("longitude")}></input> */}
        {/* </div> */}
        <button disabled={isLoading} className="btn">
          {isLoading ? <Spinner /> : "Crear"}
        </button>
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
