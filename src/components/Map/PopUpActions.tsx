"use client"
import { TravelLogWithId } from "@/models/TravelLog.model";
import DeleteTravelLog from "../DeleteTravelLog";
import EditTravelLog from "../EditTravelLog";

export function PopUpActions({ log }: { log: TravelLogWithId }) {
  return (
    <section className="flex items-center justify-end gap-1">
      <DeleteTravelLog log={log} />
      <EditTravelLog log={log} />
    </section>
  );
}
