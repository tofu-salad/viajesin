"use client";
import { TravelLogWithId } from "@/models/TravelLog.model";
import L from "leaflet";
import { useCallback, useContext, useLayoutEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import TravelLogContext from "@/context/TravelLog/TravelLogContext";
import "leaflet/dist/leaflet.css";
import { Star } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { ClickIcon, DefaultIcon } from "./Map/map-icons";
import { PopUpActions } from "./Map/PopUpActions";

type TravelLogMapProps = {
  logs: TravelLogWithId[];
};
L.Map.prototype.options.attributionControl = false;
L.Map.prototype.options.zoomControl = false;

type InitMapProps = {
  onMapClick: (event: L.LeafletMouseEvent) => void;
  logs: TravelLogWithId[];
};

const InitMap = ({ logs, onMapClick }: InitMapProps) => {
  const map = useMap();

  useLayoutEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
      if (logs.length > 0) {
        const bounds = new L.LatLngBounds(
          logs.map((log) => [log.latitude, log.longitude])
        );
        map.fitBounds(bounds);
        map.setZoom(4);
      } else {
        map.setZoom(2);
        map.setView([-34, -64]);
      }
      map.on("click", onMapClick);
    }, 200);
  }, [map, logs, onMapClick]);
  return null;
};

export default function Map({ logs }: TravelLogMapProps) {
  const { state, dispatch } = useContext(TravelLogContext);

  const onMapClick = useCallback(
    (e: L.LeafletMouseEvent) => {
      dispatch({
        type: "SET_CURRENT_MARKER_LOCATION",
        data: e.latlng,
      });
    },
    [dispatch]
  );
  return (
    <MapContainer
      className="z-0 w-screen h-screen"
      style={{ background: "#171717" }}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      maxBoundsViscosity={1.1}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'"
        maxZoom={15}
        minZoom={3}
      />
      <InitMap logs={logs} onMapClick={onMapClick} />
      {state.currentMarkerLocation ? (
        <Marker
          position={state.currentMarkerLocation}
          icon={ClickIcon}
        ></Marker>
      ) : null}
      {logs.map((log) => (
        <Marker
          key={log.id}
          position={[log.latitude, log.longitude]}
          icon={DefaultIcon}
        >
          <Popup className="w-80 text-primary">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 bg-gradient-to-tr from-red-200 to-indigo-500 bg-clip-text text-transparent">
              {log.title}
            </h2>
            <div className="text-primary text-sm text-muted-foreground flex items-center justify-between p-2 gap-1">
              <span>
                {new Date(log.visitDate.toString()).toLocaleDateString()}
              </span>

              <span className="flex gap-1 items-center">
                {log.rating} / 10
                <Star className="text-orange-800 w-4 h-4" />
              </span>
            </div>
            <img
              src={log.image}
              alt={log.title}
              className="h-36 rounded-lg object-cover mb-2 w-full"
            />
            <ScrollArea className="h-24">
              <p className="text-primary mt-6 border-l-2 pl-4 italic pr-2">
                {log.description}
              </p>
            </ScrollArea>
            <PopUpActions log={log} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
