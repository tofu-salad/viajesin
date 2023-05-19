"use client";
import { TravelLog, TravelLogKey } from "@/models/TravelLog.model";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import TravelLogContext from "@/context/TravelLog/TravelLogContext";
import { Spinner } from "./LoadingSpinner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TravelLogForm() {
  const { state, dispatch } = useContext(TravelLogContext);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    reset,
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TravelLog>({
    resolver: zodResolver(TravelLog),
    defaultValues: {
      ...state.formData,
      latitude: state.currentMarkerLocation?.lat || state.formData.latitude,
      longitude: state.currentMarkerLocation?.lng || state.formData.longitude,
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
      const response = await fetch("/api/travellogs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...data,
          userId,
        }),
      });
      if (response.ok) {
        dispatch({ type: "SET_CURRENT_MARKER_LOCATION", data: null });
        dispatch({ type: "SET_FORM_DATA", data: {} });
        reset();
        router.refresh()
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
  const handleInputChange = (_k: TravelLogKey, _e: EventTarget) => {
    const formData = watch();
    dispatch({ type: "SET_FORM_DATA", data: formData });
  };

  return (
    <ScrollArea className="h-[575px] md:h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mx-auto w-[350px] h-full py-4 px-4"
      >
        {formError && (
          <div>
            <AlertCircle />
            <span>{formError}</span>
          </div>
        )}
        {Object.entries(travelLogInputs).map(([name, value]) => {
          const key = name as TravelLogKey;
          return (
            <div key={name} className="flex flex-col gap-2">
              <Label htmlFor={name}>{value.label}</Label>
              {value.type === "textarea" ? (
                <Textarea
                  {...register(key, {
                    onChange: (e) => handleInputChange(key, e.target.value),
                  })}
                  className={` ${errors[key] ? "border-red-700" : ""} `}
                />
              ) : (
                <Input
                  id={name}
                  type={value.type}
                  className={`${errors[key] ? "border-red-700" : ""}`}
                  {...register(key, {
                    onChange: (e) => handleInputChange(key, e.target.value),
                  })}
                />
              )}
              {errors[key] && (
                <span className="text-red-700">{errors[key]?.message}</span>
              )}
            </div>
          );
        })}
        <Button disabled={isLoading}>
          {isLoading ? <Spinner /> : "Crear"}
        </Button>
      </form>
    </ScrollArea>
  );
}

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
