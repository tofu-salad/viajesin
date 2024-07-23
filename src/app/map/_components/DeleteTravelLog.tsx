import { FormEvent, useContext, useState } from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { TravelLogWithId } from "@/models/TravelLog.model";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Spinner } from "./ui/loading-spinner";
import TravelLogContext from "@/context/TravelLog/TravelLogContext";

export default function DeleteTravelLog({ log }: { log: TravelLogWithId }) {
  const [open, setIsOpen] = useState<boolean>(false);
  const { dispatch } = useContext(TravelLogContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  function handleIsOpen() {
    setIsOpen(!open);
  }
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(`/api/travel_logs?id=${log.id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        router.refresh();
        setIsOpen(false);
        setIsLoading(false);
      } else {
        const json = await response.json();
        throw new Error(json.message);
      }
    } catch (e) {
      const err = e as Error;
      setError(err.message);
    }
  }
  return (
    <Dialog open={open} onOpenChange={handleIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => {
            dispatch({ type: "SET_SIDEBAR_VISIBLE", data: false });
          }}
        >
          <Trash className="text-pink-200" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {error ? <div>{error}</div> : null}
          <DialogTitle>Estás seguro?</DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. El registro del viaje se borrara
            de los servidores.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isLoading} onClick={handleIsOpen}>
            Cancelar
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isLoading}
            variant={"destructive"}
            type="submit"
          >
            {isLoading ? <Spinner /> : "Continuar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
