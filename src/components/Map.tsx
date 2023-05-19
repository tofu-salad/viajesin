"use client";
import { TravelLogWithId } from "@/models/TravelLog.model";
import L from "leaflet";
import { useCallback, useContext, useLayoutEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { ClickIcon, DefaultIcon } from "./MapIcons";
import TravelLogContext from "@/context/TravelLog/TravelLogContext";
import "leaflet/dist/leaflet.css";
import EditTravelLog from "./EditTravelLog";
import { Star } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import DeleteTravelLog from "./DeleteTravelLog";

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
      } else {
        map.setZoom(6);
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
      className="z-0 h-screen w-screen"
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
          <Popup className="w-80">
            <h2
              className="
          scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0
          "
            >
              {log.title}
            </h2>
            <div className="text-sm text-muted-foreground flex items-center justify-between p-2 gap-1">
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
              <p className="mt-6 border-l-2 pl-4 italic pr-2">
                {log.description}
              </p>
            </ScrollArea>
            <div className="flex items-center justify-end gap-1">
              <DeleteTravelLog log={log} />
              <EditTravelLog log={log} />
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
