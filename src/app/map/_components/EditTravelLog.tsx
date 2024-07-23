import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EditFormData,
  EditFormDataKey,
  EditFormDataType,
  TravelLogWithId,
} from "@/models/TravelLog.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Edit } from "lucide-react";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import { format } from "date-fns/format";
import { Spinner } from "./ui/loading-spinner";
import TravelLogContext from "@/context/TravelLog/TravelLogContext";

export default function EditTravelLog({ log }: { log: TravelLogWithId }) {
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(TravelLogContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditFormData),
    defaultValues: {
      title: log.title,
      description: log.description,
      image: log.image,
      rating: log.rating,
      visitDate: format(
        new Date(log.visitDate),
        "yyyy-MM-dd"
      ) as unknown as Date,
    },
  });

  function handleIsOpen() {
    setIsOpen(!isOpen);
  }

  const onSubmit: SubmitHandler<EditFormDataType> = async (data) => {
    try {
      setFormError("");
      setIsLoading(true);
      const response = await fetch("/api/travel_logs", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, id: log.id }),
      });

      if (response.ok) {
        reset();
        setIsOpen(false);
        setIsLoading(false);
        router.refresh();
      } else {
        const json = await response.json();
        throw new Error(json.message);
      }
    } catch (e) {
      const err = e as Error;
      if (err.message.includes("sessionData.user")) {
        setFormError("No has iniciadio sesión");
      } else {
        setFormError(err.message);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => dispatch({ type: "SET_SIDEBAR_VISIBLE", data: false })}
        >
          <Edit className="text-purple-200" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>Edita tu registro de viaje</DialogDescription>
          {formError && (
            <div>
              <AlertCircle />
              <span>{formError}</span>
            </div>
          )}
        </DialogHeader>
        <form
          className="grid py-4 sticky z-[999]"
          id="editForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          {Object.entries(logInputs).map(([name, value]) => {
            const key = name as EditFormDataKey;
            return (
              <div className="grid " key={name}>
                <Label htmlFor={name} className="text-right py-4">
                  {value.label}
                </Label>
                {value.type === "textarea" ? (
                  <Textarea
                    id={name}
                    className={`${errors[key] ? "border-red-700" : ""}`}
                    {...register(key)}
                  />
                ) : (
                  <Input
                    id={name}
                    type={value.type}
                    className={`${errors[key] ? "border-red-700" : ""}`}
                    {...register(key)}
                  />
                )}
                {errors[key] && (
                  <span className="text-red-700">{errors[key]?.message}</span>
                )}
              </div>
            );
          })}
        </form>
        <DialogFooter>
          <Button disabled={isLoading} form="editForm" type="submit">
            {isLoading ? <Spinner /> : "editar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
const logInputs: Record<
  EditFormDataKey,
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
};
