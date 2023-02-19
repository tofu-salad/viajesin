"use client";
import { TravelLogWithId } from "@/models/TravelLog.model";
import L from "leaflet";
import { useCallback, useContext, useEffect, useLayoutEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ClickIcon, DefaultIcon } from "./MapIcons";
import TravelLogContext from "@/context/TravelLog/TravelLogContext";

type TravelLogMapProps = {
  logs: TravelLogWithId[];
};
L.Map.prototype.options.attributionControl = false;

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
      className="h-screen w-screen"
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
        maxZoom={10}
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
            <p className="text-neutral text-2xl">{log.title}</p>
            <p>Puntuacion: {log.rating}</p>
            <img
              src={log.image}
              alt={log.title}
              className="w-full rounded-lg"
            />
            <p>{log.description}</p>
            <p>{new Date(log.visitDate.toString()).toLocaleDateString()}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
