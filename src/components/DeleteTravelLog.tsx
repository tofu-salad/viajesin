import { useState } from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { TravelLogWithId } from "@/models/TravelLog.model";
import { Spinner } from "./LoadingSpinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function DeleteTravelLog({ log }: { log: TravelLogWithId }) {
  const [open, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  function handleIsOpen() {
    setIsOpen(!open);
  }
  const router = useRouter();

  async function onSubmit() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/travellogs", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ log: log.id }),
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
        <Button variant="ghost" className="p-0">
          <Trash />
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
          <Button disabled={isLoading}>Cancelar</Button>
          <Button
            disabled={isLoading}
            type="submit"
            onSubmit={onSubmit}
            variant={"destructive"}
          >
            {isLoading ? <Spinner /> : "Continuar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
