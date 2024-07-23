"use client";
import {
  TravelLog,
  TravelLogKey,
  TravelLogKeys,
} from "@/models/TravelLog.model";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import TravelLogContext from "@/context/TravelLog/TravelLogContext";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { travelLogInputs } from "@/app/map/_libs";
import { ScrollArea } from "@/ui/scroll-area";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Spinner } from "@/ui/loading-spinner";
import { User } from "lucia";

type Props = {
  userSession: User;
};
export default function TravelLogForm({ userSession }: Props) {
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
      const userId = userSession.id;
      const response = await fetch("/api/travel_logs", {
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
        router.refresh();
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
    <ScrollArea className="py-4 max-w-[calc(100vw-20px)] w-[350px] max-h-[calc(100vh-70px)] ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mx-auto py-4 px-4"
      >
        {formError && (
          <div>
            <AlertCircle />
            <span>{formError}</span>
          </div>
        )}
        {Object.entries(travelLogInputs).map(([name, value]) => {
          const key = name as TravelLogKey;
          return name !== "latitude" && name !== "longitude" ? (
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
          ) : null;
        })}
        <section className="flex gap-4 pb-4">
          <div className="flex gap-2 flex-col">
            <Label htmlFor={TravelLogKeys.latitude}>
              {travelLogInputs.latitude.label}
            </Label>
            <Input
              id={travelLogInputs.latitude.label}
              type={travelLogInputs.latitude.type}
              className={`${errors[TravelLogKeys.latitude] ? "border-red-700" : ""}`}
              {...register(TravelLogKeys.latitude, {
                onChange: (e) =>
                  handleInputChange(TravelLogKeys.latitude, e.target.value),
              })}
            />
            {errors[TravelLogKeys.latitude] && (
              <span className="text-red-700">
                {errors[TravelLogKeys.latitude]?.message}
              </span>
            )}
          </div>

          <div className="flex gap-2 flex-col">
            <Label htmlFor={TravelLogKeys.longitude}>
              {travelLogInputs.longitude.label}
            </Label>
            <Input
              id={TravelLogKeys.longitude}
              type={travelLogInputs.longitude.type}
              className={`${errors[TravelLogKeys.longitude] ? "border-red-700" : ""}`}
              {...register(TravelLogKeys.longitude, {
                onChange: (e) =>
                  handleInputChange(TravelLogKeys.longitude, e.target.value),
              })}
            />
            {errors[TravelLogKeys.longitude] && (
              <span className="text-red-700">
                {errors[TravelLogKeys.longitude]?.message}
              </span>
            )}
          </div>
        </section>

        <Button disabled={isLoading}>
          {isLoading ? <Spinner /> : "Crear"}
        </Button>
      </form>
    </ScrollArea>
  );
}
