"use client"
import DeleteTravelLog from "../DeleteTravelLog";
import EditTravelLog from "../EditTravelLog";
import { SelectTravelLog } from "@/db/schema";

export function PopUpActions({ log }: { log: SelectTravelLog }) {
  return (
    <section className="flex items-center justify-end gap-1">
      <DeleteTravelLog log={log} />
      <EditTravelLog log={log} />
    </section>
  );
}
