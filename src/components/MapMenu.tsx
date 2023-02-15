"use client";
import { Provider as JotaiProvider, useAtom } from "jotai";
import { positionAtom } from "./Map";
import TravelLogForm from "./TravelForm";

export default function MapMenu() {
  const [position] = useAtom(positionAtom);
  return position !== "" ? (
    <JotaiProvider>
      <div className="fixed top-2 right-2 z-[999]">
        <button className="btn btn-secondary">Agregar</button>
        <div className="fixed h-full top-0 right-0 p-4 w-80 bg-base-100 text-base-content z-[999] overflow-y-auto">
          <TravelLogForm position={position} />
        </div>
      </div>
    </JotaiProvider>
  ) : null;
}
